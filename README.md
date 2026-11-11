🎓 ASPIRE — Automated Student Performance Identification for Risk and Engagement
A Multi-Modal Learning Analytics Platform for Student Engagement, Academic Risk, and Learning Behaviour
<p align="center">
  <strong>Student Analytics • Forum Participation • Engagement Profiling • Dropout Risk • MOOC Behaviour</strong>
</p>🌟 Overview
ASPIRE (Automated Student Performance Identification for Risk and Engagement) is a student analytics platform designed to explore learning behaviour and identify patterns associated with student engagement, academic performance, and potential dropout risk.

The project brings together four educational analytics dimensions:
1. Forum Disengagement & Social Isolation — examines forum interactions and participation patterns.
2. Active vs. Passive Engagement — explores activity indicators and engagement proxy scores.
3. At-Risk & Dropout Analysis — presents student risk categories alongside academic and attendance indicators.
4. MOOC Behaviour & Pattern Detection — explores course progress, video activity, LMS logins, sessions, and learning activity.
The project includes a React-based dashboard interface and a Python Flask data API. It is intended as an academic analytics prototype for exploring student records and supporting further development of early-warning and student-support workflows.
Important: The current React interface uses demonstration/profile data defined in src/data/mockData.js. The Flask API separately loads and analyses student_data.csv. The current source does not show the React dashboard fetching the Flask API endpoints, so the two parts should not be described as fully integrated live analytics unless that integration is added.

❗ Problem Statement
Online learning platforms and digital education environments generate large amounts of student activity data. However, it can be difficult for educators and institutions to interpret these records and identify students who may need additional support.

Common challenges include:
- Limited visibility into student participation in discussion forums.
- Difficulty distinguishing active learning from passive platform activity.
- Delayed identification of students with elevated academic risk.
- Fragmented information about attendance, grades, course progress, and learning activity.
- Lack of a unified view of student engagement indicators.
- Difficulty translating raw learning records into understandable insights.
A useful student analytics platform should bring these indicators together in an accessible interface and make it easier to explore patterns across students and course categories.
✨ Solution
ASPIRE provides a unified dashboard experience for exploring student engagement and academic indicators. It organises the analysis into four specialised exploration areas and provides workspace views, student profiles, what-if simulations, and platform-status information.

The Flask API provides dataset loading, filtering, summary statistics, chart-ready aggregations, and individual student-record retrieval.
🎯 Objectives
- Analyse student forum participation and possible social-isolation signals.
- Explore active and passive engagement patterns.
- Present dropout-risk categories with academic and behavioural indicators.
- Examine MOOC learning behaviour through login, video, session, and progress data.
- Provide a centralised dashboard for student and cohort-level exploration.
- Allow administrators to explore student metrics and update selected profile metrics in the interface.
- Support CSV and Excel dataset uploads through the Flask API.
- Establish a foundation for future predictive modelling and student-support interventions.
🚀 Key Features
🧭 Student Analytics Workspace
The workspace provides a central area for viewing student and cohort-level learning indicators. The interface includes summary cards, course-category information, engagement summaries, and academic performance indicators using the project's configured demonstration data.
💬 1. Forum & Isolation Dynamics
Explores discussion participation and forum activity.

Key indicators include:
- Forum interaction count.
- Forum participation count.
- Participation patterns.
- Low forum-interaction indicators.
- Cohort-level forum comparisons.
The aim is to help identify students with limited discussion activity who may benefit from additional academic or peer support.
📊 2. Active vs. Passive Engagement
Explores student activity using multiple learning indicators, including:
- Assignment submission rate.
- Video completion and watch percentage.
- Attendance rate.
- Login frequency.
- Average session duration.
- Engagement proxy score.
The project dataset contains an Engagement_Level field. In the Flask API, this is treated as a dataset-provided label. The API also returns a note that Active/Passive labels are proxy labels derived from activity indicators and are not verified ground truth.
⚠️ 3. At-Risk & Dropout Analysis
Presents risk categories and related academic indicators, such as:
- Dropout-risk category.
- Attendance rate.
- Average course grade.
- Course progress.
- Assignment submission rate.
- Enrollment status.
The API counts Medium and High dropout-risk categories as at-risk records in its summary statistics. These categories are read from the dataset; the current Flask code does not train a new dropout prediction model when the dashboard is opened.
🌐 4. MOOC Behaviour & Pattern Detection
Explores learning-platform behaviour through indicators such as:
- LMS logins in the past month.
- Login frequency per week.
- Average session minutes.
- Video watch percentage.
- Video completion rate.
- Course progress percentage.
- Resource and activity information.
🧪 What-If Simulation
The interface includes a What-If Simulation modal intended to explore changes in selected student metrics and their displayed profile context. It is an interactive prototype feature, not a validated intervention or a guarantee of future student outcomes.
👤 Student & Admin Experiences
The authentication interface supports Student and Admin roles, account registration, sign-in, and a forgot-password flow.

The current authentication implementation stores registered accounts in browser localStorage. It is a front-end demonstration mechanism, not production-grade authentication. Do not use real passwords or sensitive personal information.
🏅 College Honors & Profile
The application includes profile and college-honors modals accessible through the navigation interface.
🖥️ Platform Status
The Platform Status section displays configured infrastructure and service-status information. Its ping interaction is a front-end simulation; the displayed telemetry values should not be interpreted as verified live infrastructure monitoring.
📁 Dataset Upload API
The Flask backend provides an upload endpoint for CSV and Excel files. It validates required columns, prepares numeric fields, and replaces the in-memory dataset used by the API for the current process.

Supported file formats:
- .csv
- .xlsx
- .xls
🛠️ Technology Stack
Frontend
- React 18 — component-based user interface.
- Vite 6 — frontend development server and build tool.
- Tailwind CSS 3 — styling and responsive layouts.
- Lucide React — interface icons.
- JavaScript (ES Modules) — application logic.
Backend & Data Processing
- Python — backend data processing.
- Flask — REST API and static-file serving.
- Pandas — tabular data processing.
- NumPy — numerical operations.
- OpenPyXL — Excel workbook support.
- Gunicorn — production WSGI server.
Data
- CSV dataset: student_data.csv
- Default dataset included in the project: 500 records and 56 columns.
🏗️ System Architecture
                 ASPIRE STUDENT ANALYTICS
                           |
             +-------------+-------------+
             |                           |
       React Frontend                Flask Backend
       (Vite + React)              (Python + Flask)
             |                           |
       User Interface               Dataset Loader
             |                           |
   +---------+----------+          student_data.csv
   |         |          |                 |
Workspace  Exploration  Profile       Pandas / NumPy
           Engines      & Modals           |
   |         |          |             Data Preparation
   |         |          |                 |
   +---------+----------+              REST API
                                           |
                              +------------+------------+
                              |            |            |
                          Dashboard     Student      Dataset
                           Summary       Details      Upload
Integration note: The Vite development configuration proxies /api requests to http://127.0.0.1:5000. The React components currently included in this source use local demonstration data and do not make API fetch calls. The Flask API can be tested independently, or the frontend can be connected to it in a future integration step.
📂 Project Structure
student_analytics-main-2/
│
├── app.py                         # Flask backend and REST API
├── student_data.csv               # Default student dataset
├── index.html                     # Vite HTML entry point
├── package.json                   # Frontend dependencies and scripts
├── package-lock.json              # Locked npm dependency versions
├── requirements.txt               # Python data/deployment dependencies
├── vite.config.js                 # Vite configuration and API proxy
├── tailwind.config.js              # Tailwind CSS configuration
├── postcss.config.js               # PostCSS configuration
├── .gitignore
│
├── src/
│   ├── main.jsx                    # React application entry point
│   ├── App.jsx                     # Main application and navigation state
│   ├── index.css                   # Global styles
│   │
│   ├── components/
│   │   ├── AuthScreen.jsx          # Login, registration and password reset
│   │   ├── Navbar.jsx              # Main navigation
│   │   ├── WorkspaceView.jsx       # Main analytics workspace
│   │   ├── ExplorationEnginesView.jsx
│   │   ├── TopicWindow.jsx         # Individual analytics topic view
│   │   ├── WhatIfSimulationModal.jsx
│   │   ├── ProfileModal.jsx
│   │   ├── CollegeHonorsModal.jsx
│   │   └── PlatformStatusView.jsx
│   │
│   └── data/
│       └── mockData.js             # Frontend demonstration data
│
└── dist/                           # Production frontend build output
    ├── index.html
    └── assets/
⚡ Installation & Setup
📋 Prerequisites
Install the following before running the project:
- Node.js (recommended: Node.js 18 or later).
- npm (included with Node.js).
- Python 3.10 or later.
- pip.
Check the installed versions:
node --version
npm --version
python3 --version
pip3 --version
📥 1. Clone the Repository
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd student_analytics-main-2
Replace <YOUR_GITHUB_REPOSITORY_URL> with the repository URL.
📦 2. Install Frontend Dependencies
npm install
🐍 3. Install Backend Dependencies
Create and activate a virtual environment (recommended).

macOS / Linux:
python3 -m venv venv
source venv/bin/activate
Windows PowerShell:
python -m venv venv
venv\Scripts\Activate.ps1
Install the packages listed in requirements.txt and Flask:
python -m pip install -r requirements.txt
python -m pip install Flask
Flask is imported by app.py but is not currently listed in the supplied requirements.txt. Install it separately as shown above, or add Flask to requirements.txt before deployment.

▶️ 4. Run the Flask Backend
From the project root:
python app.py
The backend runs at:
http://127.0.0.1:5000
🌐 5. Run the React Frontend
Open a second terminal, move to the project root, and run:
npm run dev
Vite normally starts at:
http://localhost:5173
Open the displayed local URL in your browser.
🏗️ 6. Create a Production Frontend Build
npm run build
Vite generates the production build in the dist/ directory.

To preview the production build locally:
npm run preview
🔌 Backend API Endpoints
The Flask backend exposes the following endpoints:
Method	Endpoint	Description
GET	/	Serves the production frontend from dist/index.html when available; otherwise serves the root index.html.
GET	/api/dashboard	Returns summary statistics, chart aggregations, filters, insights, and student rows.
GET	/api/student/<student_id>	Returns details for the matching student ID.
POST	/api/upload	Uploads and validates a CSV or Excel dataset and replaces the in-memory dataset.


Example API Requests
Get dashboard data:
curl http://127.0.0.1:5000/api/dashboard
Filter by course category:
curl "http://127.0.0.1:5000/api/dashboard?category=AI%20%26%20Machine%20Learning"
Filter by engagement type:
curl "http://127.0.0.1:5000/api/dashboard?engagement=Active"
Get a student record:
curl http://127.0.0.1:5000/api/student/STUDENT_ID
Replace STUDENT_ID with an ID present in the dataset.

Upload a CSV dataset:
curl -X POST \
  -F "dataset=@student_data.csv" \
  http://127.0.0.1:5000/api/upload
The upload endpoint also accepts .xlsx and .xls files. If the Excel workbook contains a sheet named Dataset, the backend reads that sheet; otherwise, it reads the first sheet.
🧾 Dataset Requirements
The default dataset is:
student_data.csv
It contains 500 rows and 56 columns in the supplied project archive.
Required columns
The Flask backend requires these exact column names:
Column	Purpose
student_id	Student record identifier
course_category	Course category
Engagement_Level	Engagement label
dropout_risk	Dropout-risk category
forum_interactions	Forum interaction count
attendance_rate	Attendance indicator
avg_course_grade	Average course grade
course_progress_percent	Course progress
enrollment_status	Enrollment status


Optional columns
The backend also recognises the following optional fields and adds them as missing values if they are absent:
- forum_participation_count
- assignment_submission_rate
- GPA
- video_completion_rate
- video_watch_percent
- lms_logins_past_month
- login_frequency_per_week
- avg_session_minutes
- risk_level
- Original_Engagement_Level
- action_type
- major
- device_type
- Engagement_Score_Proxy
- age
Numeric fields are converted to numeric values where possible. Invalid numeric entries are treated as missing values.
Dataset privacy: Before publishing the repository or uploading a dataset, check that it does not contain real student names, email addresses, enrollment numbers, identifiable IDs, or other confidential information. Use anonymised or synthetic data for public demonstrations.

📊 Dashboard Metrics & Insights
The Flask dashboard summary calculates or returns:
- Total student records.
- Active and passive engagement counts and percentages.
- Number of students with low forum interaction.
- Number of students in Medium or High dropout-risk categories.
- Average attendance.
- Average course grade.
- Average course progress.
- Average video completion.
- Average LMS logins.
- Average session duration.
The API also provides chart-ready counts and group averages for engagement, forum activity, dropout risk, enrollment, course category, risk level, course engagement score, forum interactions, grades, progress, activity type, and major.

These values are calculated from the currently loaded dataset. They are descriptive analytics and should not be interpreted as proof of causation or as validated model predictions.
🎥 Demo Workflow
1. Start the Flask backend.
2. Start the React frontend.
3. Open the application in a browser.
4. Register a Student or Admin demonstration account.
5. Sign in using the registered credentials.
6. Explore the main analytics workspace.
7. Open the Exploration Engines section.
8. Review Forum & Isolation Dynamics.
9. Explore Active vs. Passive Engagement.
10. Review At-Risk & Dropout Analysis.
11. Explore MOOC Behaviour & Pattern Detection.
12. Open the What-If Simulation interface.
13. View profile, college honors, and platform-status sections.
14. Test the Flask API endpoints separately using a browser or API client.
🔐 Security & Limitations
- The supplied authentication flow is implemented in the frontend and stores account details in browser localStorage.
- Passwords are stored as plain text in that browser storage. This is not secure for real users.
- The Flask upload endpoint replaces the in-memory dataset for the running server process; it does not save the uploaded file as a permanent database.
- The supplied backend uses a global in-memory DataFrame and is intended as a prototype, not a multi-user production data service.
- The React components use demonstration data from src/data/mockData.js; the API integration needs to be completed before presenting the frontend as a live, dataset-connected dashboard.
- Platform telemetry values and ping behaviour shown in the interface are demonstration values/interactions.
- Engagement and dropout-risk labels depend on the supplied dataset and its labelling method.
- The project should not be used to make high-impact academic decisions without validation, privacy safeguards, human review, and appropriate institutional approval.
🚀 Deployment
Frontend Deployment
The React frontend can be built using:
npm install
npm run build
Deploy the generated dist/ directory to a static hosting provider that supports Vite builds.

Typical build settings:
Setting	Value
Build command	npm run build
Output directory	dist
Install command	npm install


If the frontend is hosted separately from Flask, configure the API base URL and CORS appropriately when you complete the frontend-backend integration. The current Vite proxy is for local development.
Flask Backend Deployment
For a Python hosting provider such as Render, use:

Build command
pip install -r requirements.txt && pip install Flask
Start command
gunicorn app:app --bind 0.0.0.0:$PORT
Ensure the deployment includes app.py, student_data.csv, and the dist/ directory if Flask is expected to serve the built frontend.

For a production deployment, add Flask to requirements.txt, configure environment variables, disable debug mode, and implement secure authentication and persistent storage before handling real student information.
📈 Future Enhancements
- Connect React dashboard components to the Flask REST API.
- Implement secure backend authentication with hashed passwords and role-based authorisation.
- Add persistent database storage for student records and uploaded datasets.
- Train and validate dedicated ML models for forum disengagement and dropout-risk prediction.
- Add explainable AI methods to communicate the factors behind model outputs.
- Introduce time-based student engagement trend analysis.
- Add validated early-warning alerts for students who may need support.
- Improve accessibility and multilingual support.
- Add audit logs, data retention controls, and privacy-preserving analytics.
- Add automated tests and API documentation.
🤝 Contributing
Contributions, suggestions, and improvements are welcome.
1. Fork the repository.
2. Create a feature branch.
3. Make your changes.
4. Test the frontend and backend.
5. Commit your changes with a clear message.
6. Open a Pull Request describing the changes.
Example:
git checkout -b feature/your-feature-name
git add .
git commit -m "Add: your feature description"
git push origin feature/your-feature-name
📚 Project Information
Project Name: ASPIRE — Automated Student Performance Identification for Risk and Engagement
Project Type: Student Learning Analytics Dashboard
Frontend: React + Vite
Backend: Python + Flask
Data Processing: Pandas + NumPy
Dataset: student_data.csv (500 records in the supplied archive)
