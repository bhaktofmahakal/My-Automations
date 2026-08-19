import matplotlib.pyplot as plt
import numpy as np
import os

output_dir = r"u:\My-Automations\vocallabs-assignment\03_visuals"
os.makedirs(output_dir, exist_ok=True)
plt.style.use('dark_background')

# Chart: Weekly Time Split
fig, ax = plt.subplots(figsize=(8, 5))
activities = ['Partner Growth & Deals', 'Product & Eng Sync', 'Partner CS & Retention', 'Ops & Dogfooding']
time_pct = [40, 30, 20, 10]
hours = [18, 14, 9, 4] # Based on standard 45h startup week
bar_colors = ['#6366F1', '#10B981', '#F59E0B', '#EC4899']

bars = ax.barh(activities, time_pct, color=bar_colors, height=0.55, edgecolor='#1E293B')
ax.set_xlim(0, 50)
ax.set_xlabel('Percentage of Weekly Allocation (%)', fontsize=11, color='#9CA3AF')
ax.set_title('Founder\'s Office Weekly Time Prioritization Ratio', fontsize=14, pad=15, weight='bold', color='#FFFFFF')
ax.spines['top'].set_visible(False)
ax.spines['right'].set_visible(False)
ax.spines['bottom'].set_color('#374151')
ax.spines['left'].set_color('#374151')

for bar, h in zip(bars, hours):
    width = bar.get_width()
    ax.text(width + 1.5, bar.get_y() + bar.get_height()/2, f'{int(width)}% (~{h} hrs/wk)', 
            va='center', ha='left', color='white', fontweight='bold', fontsize=11)

plt.tight_layout()
chart2_path = os.path.join(output_dir, "time_allocation_chart.png")
plt.savefig(chart2_path, dpi=300, bbox_inches='tight', transparent=False, facecolor='#0B0F17')
plt.close()
print(f"Chart updated: {chart2_path}")
