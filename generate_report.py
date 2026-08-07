import os
from fpdf import FPDF

class PDFReport(FPDF):
    def header(self):
        # Draw header on all pages except the cover page
        if self.page_no() > 1:
            self.set_font('Helvetica', 'B', 8)
            self.set_text_color(128, 128, 128)
            self.cell(0, 10, 'HAYA HEALTH CARE - PROJECT SUMMARY REPORT', border=0, ln=1, align='R')
            self.line(10, 18, 200, 18)
            self.ln(5)

    def footer(self):
        # Draw footer on all pages except the cover page
        if self.page_no() > 1:
            self.set_y(-15)
            self.set_font('Helvetica', 'I', 8)
            self.set_text_color(128, 128, 128)
            self.cell(0, 10, f'Page {self.page_no()}', border=0, ln=0, align='C')

def create_report():
    pdf = PDFReport()
    pdf.set_auto_page_break(auto=True, margin=15)
    
    # ---------------- PAGE 1: COVER PAGE ----------------
    pdf.add_page()
    
    # Top margin padding
    pdf.ln(30)
    
    # Title
    pdf.set_font('Helvetica', 'B', 32)
    pdf.set_text_color(30, 136, 229) # Medical Blue
    pdf.cell(0, 15, 'HAYA HEALTH CARE', border=0, ln=1, align='C')
    
    # Subtitle / Tagline
    pdf.set_font('Helvetica', 'I', 16)
    pdf.set_text_color(16, 185, 129) # Emerald Green
    pdf.cell(0, 10, '"Predict Today, Protect Tomorrow"', border=0, ln=1, align='C')
    
    pdf.ln(20)
    
    # Horizontal divider line
    pdf.set_draw_color(30, 136, 229)
    pdf.set_line_width(1)
    pdf.line(40, 95, 170, 95)
    
    pdf.ln(20)
    
    # Project Description
    pdf.set_font('Helvetica', 'B', 12)
    pdf.set_text_color(30, 41, 59)
    pdf.cell(0, 8, 'PROJECT TYPE:', border=0, ln=1, align='C')
    pdf.set_font('Helvetica', '', 12)
    pdf.cell(0, 8, 'AI-Powered Multi-Disease Prediction and Healthcare Analytics Platform', border=0, ln=1, align='C')
    
    pdf.ln(40)
    
    # Metadata footer on cover page
    pdf.set_font('Helvetica', 'B', 10)
    pdf.set_text_color(71, 85, 105)
    pdf.cell(0, 6, 'FOUNDER & LEAD ENGINEER:', border=0, ln=1, align='C')
    pdf.set_font('Helvetica', '', 10)
    pdf.cell(0, 6, 'Hariprasath L', border=0, ln=1, align='C')
    pdf.cell(0, 6, 'AI & Data Science Student | Python Full Stack Developer', border=0, ln=1, align='C')
    pdf.cell(0, 6, 'June 2026', border=0, ln=1, align='C')

    # ---------------- PAGE 2: EXEC SUMMARY & TECH STACK ----------------
    pdf.add_page()
    pdf.ln(10)
    
    # Section Title
    pdf.set_font('Helvetica', 'B', 16)
    pdf.set_text_color(30, 136, 229)
    pdf.cell(0, 10, '1. Executive Summary', border=0, ln=1)
    pdf.ln(2)
    
    # Section Body
    pdf.set_font('Helvetica', '', 10)
    pdf.set_text_color(51, 65, 85)
    exec_summary_text = (
        "Haya Health Care is an advanced medical software platform designed to optimize disease risk assessment "
        "and patient health data profiling. By integrating statistical Machine Learning classifiers with a highly "
        "responsive web layout, Haya enables clinical practitioners, doctors, and healthcare administrators to "
        "predict high-risk status indexes for multiple disease vectors immediately. The system facilitates "
        "personalized analytics trends, secure patient records registry, and natural-voice interface operations "
        "to maximize medical documentation speed and diagnostic accuracies."
    )
    pdf.multi_cell(0, 6, exec_summary_text)
    pdf.ln(10)
    
    # Tech Stack
    pdf.set_font('Helvetica', 'B', 16)
    pdf.set_text_color(30, 136, 229)
    pdf.cell(0, 10, '2. Technical Architecture & Tech Stack', border=0, ln=1)
    pdf.ln(2)
    
    # Table of Tech Stack
    pdf.set_font('Helvetica', 'B', 10)
    pdf.set_fill_color(241, 245, 249)
    pdf.cell(60, 8, 'Layer', border=1, ln=0, fill=True)
    pdf.cell(130, 8, 'Technologies Utilized', border=1, ln=1, fill=True)
    
    pdf.set_font('Helvetica', '', 10)
    tech_stack = [
        ('Frontend Core', 'React.js, Tailwind CSS (v4), Bootstrap, Material UI'),
        ('Visualizations', 'Chart.js, React-Chartjs-2'),
        ('Backend API', 'Python, FastAPI, Uvicorn, CORS Middleware'),
        ('AI & Machine Learning', 'Scikit-Learn, TensorFlow, XGBoost, Pandas, NumPy'),
        ('Database Structures', 'MongoDB (NoSQL), MySQL (RDBMS)'),
        ('Dev Environment', 'VS Code workspace tasks & launch debuggers'),
        ('Inference Utilities', 'HTML5 Speech Recognition (Voice input), Text-to-Speech (Voice out)')
      ]
    
    for layer, tech in tech_stack:
        pdf.cell(60, 8, layer, border=1)
        pdf.cell(130, 8, tech, border=1, ln=1)
        
    # ---------------- PAGE 3: DETAILED FEATURES ----------------
    pdf.add_page()
    pdf.ln(10)
    
    # Features Section
    pdf.set_font('Helvetica', 'B', 16)
    pdf.set_text_color(30, 136, 229)
    pdf.cell(0, 10, '3. Core Platform Modules & Features', border=0, ln=1)
    pdf.ln(2)
    
    features = [
        ("Multi-Disease Diagnostic Pipelines", 
         "Includes 7 clinical classifiers covering Kidney Disease, Diabetes, Heart Disease, Liver Disease, Parkinson's Disease, Lung Cancer, and Stroke risk prediction. All parameters are evaluated via simulated Decision Bounds mirroring ML thresholds."),
        
        ("Dynamic Admin Control Deck", 
         "Allows administrators to modify founder details, upload founder profile photos, manage active doctors directory, edit patient registrations, and trigger model retrains dynamically with automatic LocalStorage data persistence."),
        
        ("Symptom & AI Chatbot Companion", 
         "A diagnostic chatbot leveraging hybrid LLM endpoints to check symptoms, suggest dietary guidelines, formulate exercise workouts, and trigger critical medical alerts for emergency parameters."),
        
        ("Dataset Upload Profiler & Download Center", 
         "Allows doctors to drag-and-drop clinical CSV/Excel files to calculate data structures (row counts, missing values, duplicates) and generate summary statistics. Provides export hubs for CSV data downloads."),

        ("Voice Control & Accessibility Integration",
         "Includes speech synthesis (voice readings of predictions) and web speech recognition (voice commands to autofill form values) for enhanced accessibility.")
    ]
    
    for title, desc in features:
        pdf.set_font('Helvetica', 'B', 11)
        pdf.set_text_color(13, 71, 161)
        pdf.cell(0, 6, f'- {title}', border=0, ln=1)
        pdf.set_font('Helvetica', '', 10)
        pdf.set_text_color(51, 65, 85)
        pdf.multi_cell(0, 5, desc)
        pdf.ln(4)

    # ---------------- PAGE 4: FOUNDER PROFILE ----------------
    pdf.add_page()
    pdf.ln(10)
    
    # Founder Section
    pdf.set_font('Helvetica', 'B', 16)
    pdf.set_text_color(30, 136, 229)
    pdf.cell(0, 10, '4. Founder & Lead Architect Profile', border=0, ln=1)
    pdf.ln(2)
    
    # Founder details block
    pdf.set_font('Helvetica', 'B', 12)
    pdf.set_text_color(30, 41, 59)
    pdf.cell(0, 6, 'Hariprasath L', border=0, ln=1)
    pdf.set_font('Helvetica', 'I', 10)
    pdf.set_text_color(128, 128, 128)
    pdf.cell(0, 6, 'AI Engineer | Full Stack Developer | Machine Learning Enthusiast', border=0, ln=1)
    pdf.ln(4)
    
    pdf.set_font('Helvetica', '', 10)
    pdf.set_text_color(51, 65, 85)
    founder_detailed_profile = (
        "Hariprasath L is a dedicated developer with deep capabilities in designing statistical Machine Learning "
        "pipelines and scalable web client-server systems. With expertise in Python (Django, FastAPI), React, "
        "and SQL/NoSQL databases, Hariprasath leads the architecture of Haya Health Care, creating secure "
        "medical diagnostic networks designed to optimize clinical operations and increase diagnostic speeds."
    )
    pdf.multi_cell(0, 5.5, founder_detailed_profile)
    pdf.ln(6)
    
    # Skillsets table
    pdf.set_font('Helvetica', 'B', 11)
    pdf.set_text_color(30, 136, 229)
    pdf.cell(0, 8, 'Key Technical Skillsets:', border=0, ln=1)
    
    pdf.set_font('Helvetica', '', 10)
    pdf.set_text_color(51, 65, 85)
    pdf.cell(45, 6, '- AI & ML:', border=0)
    pdf.cell(0, 6, 'Machine Learning, Deep Learning, Data Analytics, NLP, Computer Vision', border=0, ln=1)
    pdf.cell(45, 6, '- Backend Stack:', border=0)
    pdf.cell(0, 6, 'Python, Django, FastAPI', border=0, ln=1)
    pdf.cell(45, 6, '- Frontend Dev:', border=0)
    pdf.cell(0, 6, 'React.js, Tailwind CSS, Bootstrap, JavaScript, HTML5, CSS3', border=0, ln=1)
    pdf.cell(45, 6, '- Databases:', border=0)
    pdf.cell(0, 6, 'MySQL, MongoDB', border=0, ln=1)
    pdf.cell(45, 6, '- Tools & Platforms:', border=0)
    pdf.cell(0, 6, 'Git & GitHub, VS Code, Jupyter, Google Colab, Streamlit', border=0, ln=1)

    # ---------------- PAGE 5: APP USER INTERFACES ----------------
    pdf.add_page()
    pdf.ln(10)
    
    # Visualizations Section
    pdf.set_font('Helvetica', 'B', 16)
    pdf.set_text_color(30, 136, 229)
    pdf.cell(0, 10, '5. App User Interfaces & Visualizations', border=0, ln=1)
    pdf.ln(2)
    
    pdf.set_font('Helvetica', '', 10)
    pdf.set_text_color(51, 65, 85)
    pdf.multi_cell(0, 5.5, "Below are high-fidelity user interface layouts representing Haya Health Care's main analytics dashboard and disease prediction panels.")
    pdf.ln(5)
    
    # Embed Dashboard UI Image
    if os.path.exists('public/dashboard_ui.png'):
        pdf.image('public/dashboard_ui.png', x=35, y=45, w=140)
        pdf.ln(80) # spacing to skip image height
        
    pdf.set_font('Helvetica', 'B', 11)
    pdf.set_text_color(13, 71, 161)
    pdf.cell(0, 6, 'Figure 5.1: Haya Health Care Analytics Dashboard UI', border=0, ln=1, align='C')
    pdf.ln(5)
    
    # Embed Prediction UI Image
    pdf.add_page()
    pdf.ln(10)
    if os.path.exists('public/predict_ui.png'):
        pdf.image('public/predict_ui.png', x=35, y=30, w=140)
        pdf.ln(80)
        
    pdf.set_font('Helvetica', 'B', 11)
    pdf.set_text_color(13, 71, 161)
    pdf.cell(0, 6, 'Figure 5.2: Kidney Disease Parameter Assessment UI', border=0, ln=1, align='C')
    pdf.ln(5)
    
    # Write to files
    os.makedirs('public', exist_ok=True)
    pdf.output('public/haya_health_care_report.pdf')
    pdf.output('C:/Users/Lenovo/Downloads/haya_health_care_report.pdf')
    print("PDF Report generated successfully!")

if __name__ == '__main__':
    create_report()
