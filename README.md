
# 🎓 ASPIRE — Automated Student Performance Identification for Risk and Engagement

### A Multi-Modal Learning Analytics Platform for Student Engagement, Academic Risk, and Learning Behaviour

<p align="center">
  <strong>Student Analytics • Forum Participation • Engagement Profiling • Dropout Risk • MOOC Behaviour</strong>
</p>

---

## 🌟 Overview

**ASPIRE (Automated Student Performance Identification for Risk and Engagement)** is a student analytics platform designed to explore learning behaviour and identify patterns associated with student engagement, academic performance, and potential dropout risk.

The project brings together four educational analytics dimensions:

1. **Forum Disengagement & Social Isolation** – Examines forum interactions and participation patterns.
2. **Active vs. Passive Engagement** – Explores activity indicators and engagement proxy scores.
3. **At-Risk & Dropout Analysis** – Presents student risk categories alongside academic and attendance indicators.
4. **MOOC Behaviour & Pattern Detection** – Explores course progress, video activity, LMS logins, sessions, and learning activity.

The platform includes a React-based dashboard interface and a Python Flask data API. It is designed as an academic analytics prototype for exploring student records and supporting further development of early-warning and student-support workflows.

> **Note:** The current React interface uses demonstration/profile data defined in `src/data/mockData.js`. The Flask API separately loads and analyses `student_data.csv`. The two components should not be considered fully integrated live analytics unless the API integration is implemented.

---

## ❗ Problem Statement

Online learning platforms and digital education environments generate large amounts of student activity data.

However, educators and institutions may face difficulties in interpreting these records and identifying students who require additional academic support.

Some major challenges include:

- Limited visibility into student engagement.
- Reduced participation in online discussion forums.
- Difficulty identifying inactive learners.
- Challenges in identifying students at academic risk.
- Lack of unified student activity analysis.
- Difficulty understanding student learning behaviour.
- Delayed identification of potential dropout risk.

ASPIRE aims to explore these challenges through data analytics, visualization, and machine learning-oriented analysis.

---

## 🎯 Objectives

- Develop a unified student learning analytics platform.
- Analyse student forum participation and social engagement.
- Identify active and passive engagement patterns.
- Examine student academic performance and dropout-risk categories.
- Analyse MOOC learning behaviour and activity patterns.
- Visualize important student performance indicators.
- Support data-driven academic monitoring.
- Provide a foundation for future early-warning systems.

---

## ✨ Key Features

### 💬 1. Forum Disengagement & Social Isolation

Analyse student participation in online learning forums.

**Key indicators:**
- Forum interaction frequency.
- Forum participation patterns.
- Discussion activity.
- Student social engagement.
- Low-participation behaviour.

### 📊 2. Active vs. Passive Engagement Profiling

Explore student engagement using academic and behavioural activity indicators.

**Key indicators:**
- Login frequency.
- Average session duration.
- Video watching activity.
- Course progress.
- Assignment completion.
- Quiz performance.
- Overall engagement indicators.

### ⚠️ 3. At-Risk & Dropout Analysis

Explore student risk categories and identify patterns associated with academic difficulties.

**Key indicators:**
- Dropout-risk categories.
- Attendance rate.
- Academic performance.
- Course progress.
- Assignment submission.
- Student activity indicators.

### 🧠 4. MOOC Behaviour & Pattern Detection

Analyse learning behaviour in Massive Open Online Courses (MOOCs).

**Key indicators:**
- LMS login activity.
- Video watch percentage.
- Session duration.
- Learning progress.
- Resource access frequency.
- Quiz and assignment activity.

---

## 🖥️ Dashboard Features

The ASPIRE dashboard provides an interactive interface for exploring student analytics.

Features include:

- Student analytics overview.
- Engagement statistics.
- Forum participation analysis.
- Academic risk visualization.
- Student activity summaries.
- Behavioural analytics.
- Course category filtering.
- Engagement-type filtering.
- Student record exploration.
- Individual student details.

---

## 🛠️ Technology Stack

### Frontend

- React.js
- JavaScript
- Vite
- HTML5
- CSS3

### Backend

- Python
- Flask
- REST API

### Data Processing & Analytics

- Pandas
- NumPy
- Scikit-learn
- Data preprocessing
- Feature analysis
- Machine learning workflows

### Data Visualization

- Interactive dashboard components
- Charts and graphical representations
- Student analytics visualizations

### Development Tools

- Visual Studio Code
- Git
- GitHub
- Node.js
- npm
- Python

---

## 🏗️ System Architecture

The project consists of a React-based frontend and a Flask-based backend API.

```text
                 ASPIRE PLATFORM
                        |
           +------------+------------+
           |                         |
      React Frontend            Flask Backend
           |                         |
      Dashboard UI             REST API
           |                         |
   Demonstration Data          CSV Dataset
   (mockData.js)               (student_data.csv)
           |                         |
   Analytics Dashboard       Data Processing
           |                         |
   Student Visualizations    Analytics & Results
```

> The current frontend demonstration data and Flask API data-processing workflow operate separately.

---

## 📂 Project Structure

```text
student_analytics/
│
├── src/
│   ├── components/
│   ├── data/
│   │   └── mockData.js
│   ├── pages/
│   ├── App.jsx
│   └── main.jsx
│
├── public/
│
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   └── student_data.csv
│
├── package.json
├── package-lock.json
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── README.md
└── .gitignore
```

*Note: The structure above is a simplified representation. Refer to the repository for the complete directory and file list.*

---

## ⚡ Installation & Setup

Follow these steps to run the project locally.

### 📥 1. Clone the Repository

```bash
git clone https://github.com/achalak009-alt/student_analytics.git
```

Navigate into the project directory:

```bash
cd student_analytics
```

### 🌐 2. Setup Frontend

Navigate to the frontend project directory:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL displayed in your terminal, usually:

```text
http://localhost:5173
```

### ⚙️ 3. Setup Backend

Open another terminal and navigate to the backend directory:

```bash
cd backend
```

Install the required Python dependencies:

```bash
pip install -r requirements.txt
```

If Flask is not included in the requirements file, install it separately:

```bash
pip install flask flask-cors pandas numpy scikit-learn
```

Run the Flask application:

```bash
python app.py
```

The backend will run at the host and port configured in `app.py`.

---

## 📁 Dataset Information

The project uses student activity data for educational analytics.

The dataset includes information related to:

- Student identification.
- Forum participation.
- Login frequency.
- Session duration.
- Video activity.
- Course progress.
- Assignment completion.
- Quiz performance.
- Attendance.
- Academic performance.
- Dropout-risk indicators.

### Dataset Processing

The backend uses Python libraries to:

1. Load the dataset.
2. Process student records.
3. Handle missing values where implemented.
4. Analyse student activity indicators.
5. Generate analytics responses.
6. Provide data through backend API endpoints.

**Dataset note:** The availability and meaning of individual columns depend on the CSV file supplied with the project.

---

## 🔄 Working Workflow

1. Launch the ASPIRE web application.
2. Open the student analytics dashboard.
3. Explore the available analytics modules.
4. View forum participation indicators.
5. Analyse active and passive engagement.
6. Explore academic and dropout-risk categories.
7. Examine MOOC learning behaviour.
8. Apply available filters.
9. Explore student records and individual details.
10. Use the backend API for CSV-based data analysis.

---

## 📈 Expected Project Impact

ASPIRE aims to support educational institutions by:

- Improving visibility into student engagement.
- Identifying patterns of low forum participation.
- Understanding student learning behaviour.
- Supporting academic risk monitoring.
- Encouraging data-driven academic decisions.
- Providing a foundation for early student intervention.

---

## 🔒 Privacy & Responsible Use

- Student information should be handled responsibly.
- Personal identifiers should be protected.
- Dataset access should be restricted to authorized users.
- Analytics results should be interpreted carefully.
- Proxy labels and risk categories should not be treated as verified student outcomes.
- Automated analysis should support, not replace, educator judgment.

---

## 🚀 Future Enhancements

- Integration of live LMS data.
- Advanced machine learning models for student risk prediction.
- Improved forum disengagement detection.
- Real-time student engagement monitoring.
- Explainable AI using SHAP and LIME.
- Advanced dropout prediction.
- Personalized learning recommendations.
- Student early-warning notification system.
- Improved dashboard-to-backend integration.
- Cloud-based deployment.
- Larger benchmark dataset integration.
- Advanced learning pathway discovery.

---

## 🎓 Project Domain

**Artificial Intelligence and Machine Learning**

- Educational Data Mining
- Learning Analytics
- Machine Learning
- Student Behaviour Analysis
- Predictive Analytics
- Data Visualization
- MOOC Analytics

---

## 👩‍💻 Contributors

Developed as an academic project focused on student learning analytics and educational data mining.

---

## 📄 License

This project is intended for academic and educational purposes.

---
### 💙 Thank You!

<p align="center">
  <strong>🎓 ASPIRE — Making Student Learning Behaviour More Understandable Through Data and Analytics.</strong>
</p>
