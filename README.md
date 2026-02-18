# KaamWali.AI

Financial Inclusion for Women – AI Solutions for Economic Empowerment & Financial Literacy

# Overview

KaamWali.AI is a voice-first platform designed to empower domestic workers and other low-literacy women by creating professional digital profiles, connecting them with job opportunities, and providing verifiable trust and feedback systems. The platform eliminates literacy and digital skill barriers, ensuring that every woman can participate in the gig economy using only her voice.

## Problem Statement
Domestic workers face an **invisibility crisis in the digital economy**:

- **Digital Invisibility** – No online presence, profiles, or reviews.  
- **Literacy Barrier** – Platforms require typing skills and English proficiency.  
- **Exploitative Intermediaries** – Dependence on middlemen reduces earnings.  
- **Absence of Verified Trust** – Workers judged by background instead of work history.  


## Key Features
- **Voice-Based Onboarding** – Create profiles by speaking in local languages.  
- **AI Profile Generation** – Converts speech into structured resumes and WhatsApp-ready posters.  
- **Digital Identity** – Shareable profiles with QR codes for easy verification.  
- **Smart Local Matching** – Connects workers with employers within a 5 km radius.  
- **Trust & Feedback Loop** – Tracks work history to build verifiable trust scores.  
- **Inclusive Design** – Fully voice-driven, low-data, mobile-friendly experience.  
- **Privacy-First** – Personal information shared only with verified users via consent.  
- **Bias-Free Matching** – Skills, trust, and proximity determine matches; no caste, religion, or education filters.  

---

## Tech Stack
- **Frontend**: React.js, Tailwind CSS, Web Speech API  
- **Backend**: Node.js, Express.js  
- **AI / Logic**: Browser-based Speech-to-Text, Rule-based NLP, Matching Algorithm, TRAE.ai  
- **Database**: MongoDB  
- **Location Services**: Google Maps API  
- **Trust System**: Rule-based Scoring  
- **Security**: OTP via Firebase / Mock  
- **Deployment**: Vercel / Render  

---

## Architecture Workflow
1. **Voice-Based Onboarding** – Users speak personal details and skills.  
2. **AI Profile Generation** – Converts audio into structured text and resumes.  
3. **Digital Identity Creation** – Profiles converted into shareable posters with QR codes.  
4. **Inclusive & Accessible Design** – Audio prompts, intuitive icons, low-data interface.  
5. **Trust & Feedback Loop** – Employer reviews update trust scores after each job.  
6. **Smart Local Matching** – Skills and location-based matching within a 5 km radius.

---

# Folder Structure
kaamwali-ai/<br>
│<br>
├── backend/<br>
│   ├── models/<br>
│   │   └── Worker.js<br>
│   ├── routes/<br>
│   │   ├── feedback.js<br>
│   │   └── i18n.js<br>
│   ├── templates/<br>
│   │   └── workerResumeTemplate.js<br>
│   ├── api.js<br>
│   ├── db.js<br>
│   ├── firebase.js<br>
│   ├── generateWorkerPDF.js<br>
│   ├── profileParser.js<br>
│   └── package.json<br>
│<br>
├── frontend/<br>
│   ├── components/<br>
│   ├── contexts/<br>
│   ├── hooks/<br>
│   ├── styles/<br>
│   ├── AuthPage.jsx<br>
│   ├── EmployerDashboard.jsx<br>
│   ├── EmployerMatches.jsx<br>
│   ├── EmployerSearch.jsx<br>
│   ├── Feedback.jsx<br>
│   ├── Landing.jsx<br>
│   ├── SharePoster.jsx<br>
│   ├── VoiceOnboarding.jsx<br>
│   ├── WorkerDashboard.jsx<br>
│   ├── WorkerProfile.jsx<br>
│   ├── WorkerResume.jsx<br>
│   ├── WorkersList.jsx<br>
│   ├── App.jsx<br>
│   └── main.jsx<br>
│<br>
└── assets/images/<br>

---

## Results
- Enabled **digital presence for workers** previously offline.  
- Increased **employment opportunities** through smart local matching.  
- Built a **trust-based ecosystem** with verifiable ratings and reviews.  
- Reduced **dependency on exploitative middlemen**, improving worker earnings.  
- Supported **inclusive access**, accommodating low literacy and regional languages.  

---

## Usage
1. Open the app on a smartphone.  
2. Use voice onboarding to create a profile in your local language.  
3. Generate digital resume and share via WhatsApp.  
4. Employers can view profiles, provide feedback, and hire trusted workers.  

---

## Team Members
- **[Akanksha Maurya]**   
- **[Shabnam Mehla]** 
- **[Gladies Priyanka]** 
  
