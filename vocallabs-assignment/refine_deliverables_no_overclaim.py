import os
import re

assignment_dir = r"u:\My-Automations\vocallabs-assignment"

# Refine python scripts and markdown files to change "60 Hrs/Wk" to "Weekly Operating Allocation (40% / 30% / 20% / 10%)"

def replace_in_file(filepath):
    if not os.path.exists(filepath):
        return
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
        
    # Replacements
    content = content.replace("60 Hrs/Wk Execution", "Weekly Operating Allocation Matrix")
    content = content.replace("(60 Hrs/Wk)", "(Operating Capacity Split)")
    content = content.replace("60-hour/week", "weekly capacity-based")
    content = content.replace("60-hour week", "weekly operating schedule")
    content = content.replace("60 hours/week", "weekly allocation ratio")
    content = content.replace("60-hour time split", "capacity-based time split")
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"[REFINED] {filepath}")

# Process files
files_to_refine = [
    r"u:\My-Automations\vocallabs-assignment\03_visuals\generate_charts.py",
    r"u:\My-Automations\vocallabs-assignment\build_worldclass_deliverables.py",
    r"u:\My-Automations\vocallabs-assignment\fix_pdf_title_and_contrast.py",
    r"u:\My-Automations\vocallabs-assignment\01_strategy\crore_budget_and_time_allocation.md",
    r"u:\My-Automations\vocallabs-assignment\01_strategy\candidate_positioning_and_pitch.md",
    r"u:\My-Automations\vocallabs-assignment\04_video_script\video_script_5min.md",
    r"u:\My-Automations\vocallabs-assignment\05_submission\SUBMISSION_MANIFEST.md",
    r"u:\My-Automations\vocallabs-assignment\Vocallabs_Founders_Office_Utsav\1_Video_Submission\Video_Script_and_Transcript.md",
    r"u:\My-Automations\vocallabs-assignment\Vocallabs_Founders_Office_Utsav\README_FOR_EVALUATOR.md"
]

for fp in files_to_refine:
    replace_in_file(fp)

print("Refinement completed!")
