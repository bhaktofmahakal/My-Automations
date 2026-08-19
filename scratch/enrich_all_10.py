import subprocess
import json
import time

companies = [
    {"name": "Tri-Arc Food Systems", "domain": "bojanglesrdu.com", "roles": ["President", "Chief Executive Officer", "Vice President of Operations"]},
    {"name": "Preferred Restaurant Group", "domain": "thepreferredcompanies.com", "roles": ["President", "Chief Executive Officer", "Chief Operating Officer"]},
    {"name": "Legacy Restaurant Group", "domain": "legacywendys.com", "roles": ["President", "Managing Member", "Director of Operations"]},
    {"name": "Quality Restaurant Group", "domain": "qualityrestaurantgroup.com", "roles": ["Chief Executive Officer", "Chief Operating Officer", "Vice President"]},
    {"name": "Alvarado Restaurant Nation", "domain": "alvaradorn.com", "roles": ["President", "Vice President of Operations", "Director of IT"]},
    {"name": "Pacific Bells LLC", "domain": "pacificbells.com", "roles": ["Chief Executive Officer", "Vice President of Operations", "Director of IT"]},
    {"name": "Bell American Group", "domain": "bellamerican.com", "roles": ["President", "Vice President of Operations", "Director of Operations"]},
    {"name": "High-Rise Restaurant Group", "domain": "highrisegroup.com", "roles": ["Managing Partner", "Vice President of Operations", "Director"]},
    {"name": "Primary QSR LLC", "domain": "primaryqsr.com", "roles": ["President", "Director of Operations"]},
    {"name": "Midwest QSR Holdings LLC", "domain": "midwestqsr.com", "roles": ["Managing Director", "Vice President of Operations"]}
]

for c in companies:
    payload = {
        "domain": c["domain"],
        "company_name": c["name"],
        "roles": c["roles"]
    }
    with open("scratch/temp_target.json", "w") as f:
        json.dump(payload, f)
    
    print(f"--- Running Deepline Play for {c['name']} ({c['domain']}) ---")
    cmd = "deepline plays run prebuilt/company-to-contact --input @scratch/temp_target.json"
    proc = subprocess.run(cmd, shell=True, capture_output=True, text=True, encoding='utf-8', errors='ignore')
    print("Output preview:", proc.stdout[:250])
    time.sleep(1)
