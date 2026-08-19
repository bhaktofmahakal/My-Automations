import requests
import json
import time
from datetime import datetime

# ==========================================
# CONFIGURATION
# ==========================================
SUBREDDITS = ["SaaS", "Entrepreneur", "startups", "B2B"]
KEYWORDS = ["struggling with sales", "need leads", "how to get customers", "outbound", "cold email"]
N8N_WEBHOOK_URL = "https://n8n.yourdomain.com/webhook/reddit-leads"
# ==========================================

def fetch_reddit_posts(subreddit, limit=50):
    """Fetches recent posts from a specific subreddit without requiring OAuth."""
    url = f"https://www.reddit.com/r/{subreddit}/new.json?limit={limit}"
    # Custom User-Agent to prevent Reddit from blocking the request
    headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) GTM_Automation_Bot/1.0"}
    
    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        return response.json().get("data", {}).get("children", [])
    except Exception as e:
        print(f"[ERROR] Failed to fetch r/{subreddit}: {e}")
        return []

def score_lead_intent(title, text):
    """
    Passes the text to an LLM (Claude/OpenAI) to score the buyer intent (1-10).
    (Stubbed here for portfolio demonstration).
    """
    content = (title + " " + text).lower()
    
    # Keyword-based pre-filtering before hitting LLM API to save costs
    matches = [kw for kw in KEYWORDS if kw in content]
    
    if not matches:
        return 0, "No keyword match"
        
    # In production: Send to Claude/OpenAI API here.
    # payload = {"model": "claude-3-haiku", "messages": [{"role": "user", "content": f"Score this lead intent from 1-10: {content}"}]}
    # return extract_score(response), "LLM Reason"
    
    return 8, f"High intent detected. Matched keywords: {matches}"

def route_to_n8n(lead_data):
    """Routes the qualified lead to an n8n webhook for CRM enrichment and Slack alerts."""
    try:
        response = requests.post(N8N_WEBHOOK_URL, json=lead_data)
        if response.status_code == 200:
            print(f"[SUCCESS] Routed lead to n8n: {lead_data['url']}")
        else:
            print(f"[FAILED] Webhook returned {response.status_code}")
    except Exception as e:
        print(f"[ERROR] Webhook failed: {e}")

def main():
    print(f"[{datetime.now()}] Starting Reddit ICP Scanner...")
    
    for sub in SUBREDDITS:
        print(f"Scanning r/{sub}...")
        posts = fetch_reddit_posts(sub)
        
        for post in posts:
            data = post["data"]
            title = data.get("title", "")
            text = data.get("selftext", "")
            author = data.get("author", "")
            url = f"https://reddit.com{data.get('permalink', '')}"
            
            score, reason = score_lead_intent(title, text)
            
            if score >= 7:
                print(f"\n🔥 HOT LEAD FOUND in r/{sub}:")
                print(f"Title: {title}")
                print(f"Author: u/{author}")
                print(f"Reason: {reason}")
                
                lead_payload = {
                    "source": "Reddit",
                    "subreddit": sub,
                    "author": author,
                    "title": title,
                    "content": text,
                    "url": url,
                    "intent_score": score,
                    "intent_reason": reason,
                    "timestamp": datetime.now().isoformat()
                }
                
                # Send to n8n for enrichment (Clay) and CRM sync (HubSpot)
                route_to_n8n(lead_payload)
                
        # Sleep to respect rate limits
        time.sleep(2)
        
    print("Scan complete.")

if __name__ == "__main__":
    main()
