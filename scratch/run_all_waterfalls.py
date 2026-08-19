import subprocess
import json
import time

targets = [
    {"name": "Tri-Arc Food Systems", "domain": "bojanglesrdu.com", "roles": ["President", "Chief Executive Officer", "Vice President"]},
    {"name": "Legacy Restaurant Group", "domain": "legacywendys.com", "roles": ["President", "Managing Member", "Director of Operations"]},
    {"name": "Quality Restaurant Group", "domain": "qualityrestaurantgroup.com", "roles": ["Chief Executive Officer", "Chief Operating Officer", "Vice President"]},
    {"name": "Alvarado Restaurant Nation", "domain": "alvaradorn.com", "roles": ["President", "Vice President", "Director"]}
]

for t in targets:
    input_data = {
        "domain": t["domain"],
        "company_name": t["name"],
        "roles": t["roles"]
    }
    with open("scratch/temp_target.json", "w") as f:
        json.dump(input_data, f)
    
    print(f"Executing Deepline Waterfall Play for {t['name']} ({t['domain']})...")
    cmd = "deepline plays run prebuilt/company-to-contact --input @scratch/temp_target.json"
    proc = subprocess.run(cmd, shell=True, capture_output=True, text=True)
    print("STDOUT:", proc.stdout[:300])
    time.sleep(3)
