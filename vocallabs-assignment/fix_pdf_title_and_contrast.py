import os
from reportlab.lib.pagesizes import letter, landscape
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, Frame, PageTemplate, HRFlowable
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors

output_dir = r"u:\My-Automations\vocallabs-assignment\02_pitch_deck"
drive_dir = r"u:\My-Automations\vocallabs-assignment\Vocallabs_Founders_Office_Utsav"

def draw_dark_canvas(canvas, doc):
    canvas.saveState()
    # Explicit PDF Title Metadata to fix (anonymous) in Chrome PDF Viewer!
    canvas.setTitle(doc.title if hasattr(doc, 'title') and doc.title else "Vocallabs Founder's Office Strategy")
    canvas.setAuthor("Utsav")
    canvas.setSubject("Vocallabs Strategy Assignment")
    
    # 100% Solid Dark Slate Background for EVERY page
    canvas.setFillColor(colors.HexColor('#0B0F17'))
    canvas.rect(0, 0, doc.pagesize[0], doc.pagesize[1], fill=True, stroke=False)
    
    # Top Accent Bar (Indigo)
    canvas.setFillColor(colors.HexColor('#6366F1'))
    canvas.rect(0, doc.pagesize[1] - 5, doc.pagesize[0], 5, fill=True, stroke=False)
    
    # Footer
    canvas.setFont("Helvetica-Bold", 8)
    canvas.setFillColor(colors.HexColor('#64748B'))
    canvas.drawString(0.6 * 72, 0.35 * 72, "VOCALLABS AI | FOUNDER'S OFFICE STRATEGY")
    canvas.drawRightString(doc.pagesize[0] - 0.6 * 72, 0.35 * 72, f"PAGE {doc.page}")
    canvas.restoreState()

styles = getSampleStyleSheet()

style_cat = ParagraphStyle(
    'Cat',
    parent=styles['Normal'],
    fontName='Helvetica-Bold',
    fontSize=9,
    textColor=colors.HexColor('#818CF8'),
    spaceAfter=2
)

style_title = ParagraphStyle(
    'Title',
    parent=styles['Heading1'],
    fontName='Helvetica-Bold',
    fontSize=18,
    textColor=colors.HexColor('#FFFFFF'),
    spaceAfter=8
)

style_sec = ParagraphStyle(
    'Sec',
    parent=styles['Heading2'],
    fontName='Helvetica-Bold',
    fontSize=12,
    textColor=colors.HexColor('#34D399'),
    spaceBefore=6,
    spaceAfter=4
)

style_body = ParagraphStyle(
    'Body',
    parent=styles['BodyText'],
    fontName='Helvetica',
    fontSize=9,
    textColor=colors.HexColor('#F8FAFC'),
    leading=13,
    spaceAfter=4
)

style_ch = ParagraphStyle('CH', parent=style_body, fontName='Helvetica-Bold', textColor=colors.HexColor('#A5B4FC'))
style_cb = ParagraphStyle('CB', parent=style_body, fontSize=8.5, textColor=colors.HexColor('#F8FAFC'))

def build_pristine_pdf(filename, pdf_title, category, story_elements):
    pdf_path = os.path.join(output_dir, filename)
    doc = SimpleDocTemplate(
        pdf_path,
        pagesize=(13.333 * 72, 7.5 * 72),
        leftMargin=0.6 * 72,
        rightMargin=0.6 * 72,
        topMargin=0.45 * 72,
        bottomMargin=0.45 * 72,
        title=pdf_title,
        author="Utsav"
    )
    
    frame = Frame(
        doc.leftMargin, doc.bottomMargin,
        doc.width, doc.height,
        id='normal',
        topPadding=0, bottomPadding=0, leftPadding=0, rightPadding=0
    )
    
    template = PageTemplate(id='dark_canvas', frames=frame, onPage=draw_dark_canvas)
    doc.addPageTemplates([template])
    
    story = [
        Paragraph(category.upper(), style_cat),
        Paragraph(pdf_title, style_title),
        HRFlowable(width="100%", thickness=1, color=colors.HexColor('#1E293B'), spaceAfter=8)
    ]
    story.extend(story_elements)
    
    doc.build(story)
    print(f"[PRISTINE PDF OK] Saved {pdf_path}")

# --- PDF 1: Ops Presentation Answers ---
q1_data = [
    [Paragraph("PHASE", style_ch), Paragraph("TIMELINE", style_ch), Paragraph("TELEMETRY & TECHNICAL ACTIONS", style_ch), Paragraph("EXECUTIVE SLA", style_ch)],
    [Paragraph("Phase 1", style_cb), Paragraph("Hours 00 - 02", style_cb), Paragraph("Audit VocalStack logs over 30 days. Isolate STT Word Error Rate (WER), LLM tool latency, SIP packet loss.", style_cb), Paragraph("120-min C-suite SLA memo sent to Client VP Ops.", style_cb)],
    [Paragraph("Phase 2", style_cb), Paragraph("Hours 02 - 12", style_cb), Paragraph("Fine-tune STT acoustic dictionary with 200+ domain terms. Prune prompts to <400ms latency. Deploy SIP trunk failover.", style_cb), Paragraph("Solutions Engineer & AI Voice Architect war room.", style_cb)],
    [Paragraph("Phase 3", style_cb), Paragraph("Hours 12 - 24", style_cb), Paragraph("Structure 30-Day Performance Guarantee (50% credit on infra fees if metrics miss 25% target in 14 days).", style_cb), Paragraph("Brief Co-Founders (Mritunjoy/Rag/Nileesh).", style_cb)],
    [Paragraph("Phase 4", style_cb), Paragraph("Hours 24 - 48", style_cb), Paragraph("C-suite summit with client VP Ops. Present transparent telemetry & live sub-400ms audio comparison.", style_cb), Paragraph("Establish weekly joint steering committee & lock renewal.", style_cb)]
]
t1 = Table(q1_data, colWidths=[1.1*72, 1.2*72, 6.2*72, 3.6*72])
t1.setStyle(TableStyle([
    ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#1E293B')),
    ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#334155')),
    ('TOPPADDING', (0,0), (-1,-1), 4),
    ('BOTTOMPADDING', (0,0), (-1,-1), 4),
]))

q2_data = [
    [Paragraph("PILLAR", style_ch), Paragraph("AMOUNT", style_ch), Paragraph("SHARE", style_ch), Paragraph("STRATEGIC TARGET", style_ch)],
    [Paragraph("Partner Acquisition Engine", style_cb), Paragraph("INR 40,00,000", style_cb), Paragraph("40%", style_cb), Paragraph("B2B outbound engine & funding first 10k partner call mins", style_cb)],
    [Paragraph("Developer & OS Ecosystem", style_cb), Paragraph("INR 35,00,000", style_cb), Paragraph("35%", style_cb), Paragraph("VocalFlow OS & PocoDisk OS grants + production MCP Servers", style_cb)],
    [Paragraph("Global Telephony & Infra", style_cb), Paragraph("INR 15,00,000", style_cb), Paragraph("15%", style_cb), Paragraph("Multi-region edge nodes (Mumbai, US, EU) & SIP trunk failover", style_cb)],
    [Paragraph("Founder's Office Reserve", style_cb), Paragraph("INR 10,00,000", style_cb), Paragraph("10%", style_cb), Paragraph("Key account turnaround credits & quick micro-experiments", style_cb)]
]
t2 = Table(q2_data, colWidths=[2.3*72, 1.4*72, 1.0*72, 7.4*72])
t2.setStyle(TableStyle([
    ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#1E293B')),
    ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#334155')),
    ('TOPPADDING', (0,0), (-1,-1), 4),
    ('BOTTOMPADDING', (0,0), (-1,-1), 4),
]))

ops_elements = [
    Paragraph("Question 1: 48-Hour Key Client Crisis Protocol", style_sec),
    t1,
    Spacer(1, 6),
    Paragraph("Question 2: INR 1 Crore Capital Deployment Matrix", style_sec),
    t2,
    Spacer(1, 6),
    Paragraph("Question 3: Candidate Positioning & 10/10 Match", style_sec),
    Paragraph("• <b>Mritunjoy's 'Ours Ship' Alignment:</b> Built code, presentations, strategy docs, and video scripts - zero 3-month deck fluff.", style_body),
    Paragraph("• <b>Technical & Business Dual-Threat:</b> Bridges audio pipeline telemetry (sub-400ms latency) with BPO gross-margin arbitrage.", style_body),
    Paragraph("• <b>Dogfooding Meta-Signal:</b> Recognized Hiringg (app.hiringg.ai) as Vocallabs' internal AI candidate platform.", style_body)
]

build_pristine_pdf("vocallabs_ops_presentation.pdf", "Vocallabs Operational Response & Strategy (Q1, Q2, Q3)", "VOCALLABS AI | FOUNDER'S OFFICE STRATEGY PLAYBOOK", ops_elements)


# --- PDF 2: Investment Deck ---
inv_data = [
    [Paragraph("METRIC / PILLAR", style_ch), Paragraph("VOCALLABS PARADIGM", style_ch), Paragraph("BENCHMARK / GOAL", style_ch)],
    [Paragraph("The Foil (Legacy APIs)", style_cb), Paragraph("Raw wrappers (Retell/Vapi) disintermediate partners and destroy margins.", style_cb), Paragraph("100% White-Label Sovereignty", style_cb)],
    [Paragraph("Partner Unit Economics", style_cb), Paragraph("Partners buy wholesale at INR 1.20/min and retail at INR 3.00-INR 5.00/min.", style_cb), Paragraph("Partner retains ~65% gross margin", style_cb)],
    [Paragraph("Infra Gross Margin", style_cb), Paragraph("Vocallabs runtime infrastructure gross margin.", style_cb), Paragraph("62.5% Gross Margin on traffic", style_cb)],
    [Paragraph("Developer Moat", style_cb), Paragraph("VocalFlow (OS visual builder), PocoDisk (audio cache) & MCP Server plugins.", style_cb), Paragraph("10,000+ developer integrations", style_cb)],
    [Paragraph("12-Month Targets", style_cb), Paragraph("Scaling active BPO & Agency reseller partners.", style_cb), Paragraph("100 Active Partners | INR 5.2 Cr ARR", style_cb)]
]
t_inv = Table(inv_data, colWidths=[2.3*72, 6.5*72, 3.3*72])
t_inv.setStyle(TableStyle([
    ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#1E293B')),
    ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#334155')),
    ('TOPPADDING', (0,0), (-1,-1), 4),
    ('BOTTOMPADDING', (0,0), (-1,-1), 4),
]))

inv_elements = [
    Paragraph("Executive Summary & Market Arbitrage Model", style_sec),
    t_inv,
    Spacer(1, 8),
    Paragraph("Integrated Product Architecture & Reseller Flywheel", style_sec),
    Paragraph("• <b>VocalStack Voice + Vocalassist AI:</b> Sub-400ms low-latency runtime engine with context-aware interruption handling.", style_body),
    Paragraph("• <b>MCP Server + VocalFlow (OS) + PocoDisk (OS):</b> Open-source developer tools driving viral developer adoption.", style_body),
    Paragraph("• <b>Hiringg + Vocal Dialer:</b> Live dogfooded AI candidate interviewing engine and predictive outbound telephony.", style_body)
]

build_pristine_pdf("vocallabs_investment_deck.pdf", "Vocallabs White-Label Voice AI Investment Deck", "VOCALLABS AI | INTERNAL STRATEGIC PROPOSAL", inv_elements)

# Copy to Drive folder
import shutil
shutil.copy(os.path.join(output_dir, "vocallabs_ops_presentation.pdf"), os.path.join(drive_dir, "2_Presentation_Operational_Answers"))
shutil.copy(os.path.join(output_dir, "vocallabs_investment_deck.pdf"), os.path.join(drive_dir, "3_Investment_Pitch_Deck"))
print("[PRISTINE SYNC COMPLETE]")
