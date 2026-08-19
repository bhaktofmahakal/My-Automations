import json, re, sys
sys.stdout.reconfigure(encoding='utf-8')

with open(r'C:\Users\movie\.gemini\antigravity\brain\9f44dde4-ef47-4aa3-b8ca-959ea628963e\.system_generated\steps\2424\content.md', 'r', encoding='utf-8') as f:
    text = f.read()

match = re.search(r'<script id="__NEXT_DATA__"[^>]*>(.*?)</script>', text)
if match:
    data = json.loads(match.group(1))
    postTree = data.get('props', {}).get('pageProps', {}).get('postTree', {})
    print("postTree keys:", list(postTree.keys()))
    print(json.dumps(postTree, indent=2)[:2000])
