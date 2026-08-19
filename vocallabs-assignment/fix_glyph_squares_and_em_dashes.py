import os
import re

assignment_dir = r"u:\My-Automations\vocallabs-assignment"

def fix_content(filepath):
    if not os.path.exists(filepath):
        return
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 1. Replace ₹ with INR or Rs.
    content = content.replace("₹1,00,00,000", "INR 1,00,00,000")
    content = content.replace("₹1 Crore", "INR 1 Crore")
    content = content.replace("₹1.0 Cr", "INR 1.0 Cr")
    content = content.replace("₹1 Cr", "INR 1 Cr")
    content = content.replace("₹40,00,000", "INR 40,00,000")
    content = content.replace("₹40L", "INR 40L")
    content = content.replace("₹40 Lakhs", "INR 40 Lakhs")
    content = content.replace("₹35,00,000", "INR 35,00,000")
    content = content.replace("₹35L", "INR 35L")
    content = content.replace("₹35 Lakhs", "INR 35 Lakhs")
    content = content.replace("₹15,00,000", "INR 15,00,000")
    content = content.replace("₹15L", "INR 15L")
    content = content.replace("₹15 Lakhs", "INR 15 Lakhs")
    content = content.replace("₹10,00,000", "INR 10,00,000")
    content = content.replace("₹10L", "INR 10L")
    content = content.replace("₹10 Lakhs", "INR 10 Lakhs")
    content = content.replace("₹18,00,000", "INR 18,00,000")
    content = content.replace("₹7,00,000", "INR 7,00,000")
    content = content.replace("₹9,00,000", "INR 9,00,000")
    content = content.replace("₹6,00,000", "INR 6,00,000")
    content = content.replace("₹4,00,000", "INR 4,00,000")
    content = content.replace("₹1.20", "INR 1.20")
    content = content.replace("₹0.45", "INR 0.45")
    content = content.replace("₹3.00", "INR 3.00")
    content = content.replace("₹5.00", "INR 5.00")
    content = content.replace("₹3", "INR 3")
    content = content.replace("₹5", "INR 5")
    content = content.replace("₹5.2 Cr", "INR 5.2 Cr")
    content = content.replace("₹5.2 Crore", "INR 5.2 Crore")
    content = content.replace("₹5+ Crore", "INR 5+ Crore")
    content = content.replace("₹1.2 Cr", "INR 1.2 Cr")
    content = content.replace("₹2.8 Cr", "INR 2.8 Cr")
    content = content.replace("₹1,20,000", "INR 1,20,000")
    content = content.replace("₹2L+", "INR 2L+")
    content = content.replace("₹", "INR ")

    # 2. Replace em-dashes (—) and en-dashes (–) with standard hyphens (-) or colons (:)
    content = content.replace(" — ", ": ")
    content = content.replace("—", " - ")
    content = content.replace("–", "-")

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"[FIXED GLYPHS & DASHES] {filepath}")

# List of files
target_files = [
    r"u:\My-Automations\vocallabs-assignment\fix_pdf_title_and_contrast.py",
    r"u:\My-Automations\vocallabs-assignment\03_visuals\generate_charts.py",
    r"u:\My-Automations\vocallabs-assignment\01_strategy\client_escalation_48h_playbook.md",
    r"u:\My-Automations\vocallabs-assignment\01_strategy\crore_budget_and_time_allocation.md",
    r"u:\My-Automations\vocallabs-assignment\01_strategy\candidate_positioning_and_pitch.md",
    r"u:\My-Automations\vocallabs-assignment\04_video_script\video_script_5min.md",
    r"u:\My-Automations\vocallabs-assignment\05_submission\SUBMISSION_MANIFEST.md",
    r"u:\My-Automations\vocallabs-assignment\Vocallabs_Founders_Office_Utsav\1_Video_Submission\Video_Script_and_Transcript.md",
    r"u:\My-Automations\vocallabs-assignment\Vocallabs_Founders_Office_Utsav\README_FOR_EVALUATOR.md"
]

for tf in target_files:
    fix_content(tf)

print("Glyph & Dash fixing script executed!")
