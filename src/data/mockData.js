// Luxury Student Analytics Data Architecture
// Synchronized with student_data.csv baseline metrics

export const INITIAL_USER = {
  id: "STU-8821",
  name: "Aiman Vance",
  email: "aiman.vance@analytics.edu",
  role: "Student", // 'Student' | 'Admin'
  degree: "B.Sc. Data Science & Machine Learning",
  standing: "Presidential Scholar",
  gpa: 3.88,
  cohort: "Class of 2026 · Alpha Cohort",
  avatarInitials: "AV",
  currentSemester: "Semester 5 (Fall)",
  activeCourses: [
    { code: "CS-401", title: "Advanced Deep Learning", grade: 92.4, status: "Active" },
    { code: "DS-310", title: "Bayesian Statistical Modeling", grade: 87.5, status: "Active" },
    { code: "UX-204", title: "Human Centered AI Interfaces", grade: 94.0, status: "Active" },
    { code: "ETH-301", title: "Algorithmic Ethics & Policy", grade: 89.2, status: "Active" },
  ],
  metrics: {
    attendanceRate: 91.5,
    assignmentSubmissionRate: 96.0,
    avgCourseGrade: 88.4,
    gpa: 3.88,
    forumInteractions: 34,
    forumParticipationCount: 14,
    videoCompletionRate: 92.0,
    videoWatchPercent: 88.5,
    lmsLoginsPastMonth: 28,
    loginFrequencyPerWeek: 6.5,
    avgSessionMinutes: 42.0,
    dropoutRisk: "Low", // Low | Medium | High
    engagementLevel: "Active Pioneer",
    proxyScore: 0.88,
  }
};

export const GLOBAL_WORKSPACE_DATA = {
  totalStudents: 500,
  activeEngagementCount: 312,
  activeEngagementPct: 62.4,
  passiveEngagementCount: 188,
  passiveEngagementPct: 37.6,
  dropoutRiskSummary: {
    low: 285,
    lowPct: 57.0,
    medium: 144,
    mediumPct: 28.8,
    high: 71,
    highPct: 14.2,
  },
  globalAverages: {
    attendance: 82.4,
    grade: 78.6,
    assignmentRate: 84.1,
    videoCompletion: 76.8,
    sessionDuration: 34.5,
    forumPosts: 16.2,
  },
  courseCategories: [
    { name: "AI & Machine Learning", students: 134, avgGrade: 81.2, attendance: 85.4, riskIndex: "Low", color: "#581825" },
    { name: "Design & UX Strategy", students: 96, avgGrade: 79.5, attendance: 83.1, riskIndex: "Low", color: "#842437" },
    { name: "Advanced Engineering", students: 118, avgGrade: 77.1, attendance: 80.2, riskIndex: "Medium", color: "#D4AF37" },
    { name: "Business Analytics", students: 88, avgGrade: 78.9, attendance: 81.6, riskIndex: "Medium", color: "#9E8022" },
    { name: "Digital Arts & Media", students: 64, avgGrade: 80.4, attendance: 84.7, riskIndex: "Low", color: "#6A1D2D" },
  ],
  monthlyTrend: [
    { month: "Aug", active: 290, grade: 76.2 },
    { month: "Sep", active: 305, grade: 77.8 },
    { month: "Oct", active: 318, grade: 78.5 },
    { month: "Nov", active: 312, grade: 78.6 },
  ]
};

export const ENGINES_DATA = [
  {
    id: "forum",
    number: "01",
    title: "Forum & Isolation Dynamics",
    category: "Modality I · Discursive",
    subtitle: "Peer Discursive Velocity & Cognitive Isolation Diagnostics",
    tagline: "Track participation frequency and identify silent attrition signals.",
    accentColor: "#D4AF37",
    userMetric: "34 interactions",
    cohortBenchmark: "16.2 avg",
    statusBadge: "Exemplary · Top 8%",
    description: "Evaluates community dialogue volume, discussion thread initiative, and peer assistance frequency to protect against solitary online disengagement.",
    keyFinding: "High participation velocity in technical inquiry threads correlates with strong academic self-efficacy and low alienation risks.",
    pros: [
      "Consistent contributor in technical troubleshooting and math proofs.",
      "Zero solitary inactivity flags detected across 8 consecutive module weeks.",
      "Initiates proactive group queries that increase peer response speed by 35%."
    ],
    cons: [
      "Participation dips noticeably in weeks preceding major midterm deadlines.",
      "Limited engagement within non-technical cohort lounge channels."
    ],
    chartData: [
      { label: "Technical Q&A", personal: 18, cohort: 6 },
      { label: "Study Group Prep", personal: 8, cohort: 4 },
      { label: "Peer Code Reviews", personal: 6, cohort: 3 },
      { label: "General Discussions", personal: 2, cohort: 3.2 },
    ],
    adminFields: [
      { key: "forumInteractions", label: "Forum Interactions Count", type: "number", step: 1, min: 0, max: 100 },
      { key: "forumParticipationCount", label: "Active Threads Started", type: "number", step: 1, min: 0, max: 50 },
      { key: "isolationScore", label: "Isolation Risk Index (0-100)", type: "number", step: 1, min: 0, max: 100 }
    ]
  },
  {
    id: "engagement",
    number: "02",
    title: "Active vs. Passive Engagement",
    category: "Modality II · Behavioral",
    subtitle: "Multi-indicator Behavioral Proxy & Deep Work Absorption",
    tagline: "Distinguish between superficial click-throughs and true cognitive mastery.",
    accentColor: "#581825",
    userMetric: "0.88 Proxy Score",
    cohortBenchmark: "0.64 avg",
    statusBadge: "Active Pioneer",
    description: "Synthesizes 8 telemetry vectors—including video completion, assignment prompt response time, and sandbox code checkpoints—into an unvarnished engagement taxonomy.",
    keyFinding: "Classified as Active Pioneer. Video watch completion of 92% is paired with a stellar 96% assignment timeliness rate.",
    pros: [
      "Submits coursework an average of 41 hours prior to midnight deadlines.",
      "Rewatches dense algorithmic derivations 2.4x more than standard peers.",
      "Interactive coding terminal checkpoints verified at 100% completion."
    ],
    cons: [
      "Late-night activity spikes (after 1:00 AM) occasionally correlate with lower retention.",
      "Video playback speed exceeds 1.75x on foundational lecture primers."
    ],
    chartData: [
      { label: "Assignment Submissions", personal: 96, cohort: 84 },
      { label: "Video Watch Rate", personal: 92, cohort: 76 },
      { label: "Code Checkpoints", personal: 98, cohort: 72 },
      { label: "Lab Attendance", personal: 91, cohort: 82 },
    ],
    adminFields: [
      { key: "assignmentSubmissionRate", label: "Assignment Submission Rate (%)", type: "number", step: 1, min: 0, max: 100 },
      { key: "videoCompletionRate", label: "Video Completion Rate (%)", type: "number", step: 1, min: 0, max: 100 },
      { key: "proxyScore", label: "Engagement Score Proxy (0.0-1.0)", type: "number", step: 0.01, min: 0, max: 1 }
    ]
  },
  {
    id: "risk",
    number: "03",
    title: "At-Risk Diagnostic Matrix",
    category: "Modality III · Predictive Risk",
    subtitle: "Attrition Warning Indicators & Multi-Tier Safety Guardrails",
    tagline: "Early vulnerability detection synthesizing attendance decay and quiz volatility.",
    accentColor: "#842437",
    userMetric: "Low Risk (4.8%)",
    cohortBenchmark: "14.2% High Risk",
    statusBadge: "High Resilience",
    description: "Predictive early warning system evaluating attendance anomalies, quiz score swings, and absence chains to trigger timely academic advisory interventions.",
    keyFinding: "Very low attrition vulnerability. Excellent attendance (91.5%) forms a protective hedge against grade volatility.",
    pros: [
      "Zero unexcused absence chains across the current academic term.",
      "Rapid grade rebound observed after challenging midterm diagnostics.",
      "LMS authentication telemetry confirms stable, reliable daily study rhythms."
    ],
    cons: [
      "Heavy academic load (5 intense STEM modules) creates vulnerability to mid-semester fatigue.",
      "Session duration fluctuates significantly around exam preparation periods."
    ],
    chartData: [
      { label: "Attendance Buffer", personal: 92, cohort: 82 },
      { label: "Quiz Resilience", personal: 88, cohort: 75 },
      { label: "Login Regularity", personal: 94, cohort: 78 },
      { label: "Timely Submission", personal: 96, cohort: 81 },
    ],
    adminFields: [
      { key: "attendanceRate", label: "Attendance Rate (%)", type: "number", step: 0.5, min: 0, max: 100 },
      { key: "avgCourseGrade", label: "Average Course Grade", type: "number", step: 0.5, min: 0, max: 100 },
      { key: "dropoutRisk", label: "Assigned Risk Level (Low/Medium/High)", type: "select", options: ["Low", "Medium", "High"] }
    ]
  },
  {
    id: "mooc",
    number: "04",
    title: "MOOC Behavioral Mastery",
    category: "Modality IV · Temporal Pacing",
    subtitle: "Asynchronous Progression Cadence & Knowledge Longevity",
    tagline: "Dissect self-directed pacing, resource retrieval bursts, and retention durability.",
    accentColor: "#9E8022",
    userMetric: "42 min/session",
    cohortBenchmark: "34.5 min avg",
    statusBadge: "Autonomous Master",
    description: "Evaluates self-directed pacing consistency, textbook and reading download cycles, and knowledge retrieval durability across asynchronous modules.",
    keyFinding: "High study discipline: maintains structured 42-minute focus blocks with 6.5 login touchpoints weekly, preventing last-minute cramming.",
    pros: [
      "Reading materials and supplementary PDFs accessed within 48h of syllabus release.",
      "Consistent session durations reflect deliberate spaced repetition techniques.",
      "Regular weekend review bursts reinforce cumulative retention."
    ],
    cons: [
      "Low utilization of optional synthetic practice question banks.",
      "Study distribution is skewed heavily toward weeknight prime hours."
    ],
    chartData: [
      { label: "Weekly Logins", personal: 6.5, cohort: 3.8 },
      { label: "Avg Session (mins)", personal: 42, cohort: 34.5 },
      { label: "PDF Downloads", personal: 14, cohort: 8 },
      { label: "Pacing Score (%)", personal: 94, cohort: 77 },
    ],
    adminFields: [
      { key: "loginFrequencyPerWeek", label: "Weekly Logins", type: "number", step: 0.5, min: 0, max: 20 },
      { key: "avgSessionMinutes", label: "Avg Session Duration (Minutes)", type: "number", step: 1, min: 5, max: 180 },
      { key: "lmsLoginsPastMonth", label: "Monthly Logins", type: "number", step: 1, min: 0, max: 100 }
    ]
  }
];

export const PLATFORM_STATUS_DATA = {
  health: "Optimal",
  uptime: "99.98%",
  apiLatency: "18 ms",
  activeConnections: 142,
  datasetState: "student_data.csv Synced",
  totalRecordsLoaded: 500,
  lastSyncTimestamp: "Just now",
  dataIntegrity: "100% Validated (0 Null Primary Keys)",
  serverStack: "Flask API v3.1 + Vite 6 React Framework",
  cacheHitRatio: "94.6%",
  memoryUsage: "48.2 MB / 512 MB",
  services: [
    { name: "Analytics Query Engine", status: "Online", latency: "14ms", uptime: "100%" },
    { name: "Simulation Inference Service", status: "Online", latency: "22ms", uptime: "99.9%" },
    { name: "Student Record Store (CSV)", status: "Mounted", latency: "4ms", uptime: "100%" },
    { name: "Role-Based Access Controller", status: "Enforced", latency: "2ms", uptime: "100%" },
    { name: "What-If Forecasting Engine", status: "Ready", latency: "19ms", uptime: "99.95%" }
  ]
};

