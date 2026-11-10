from flask import Flask, jsonify, request, send_file, send_from_directory
import pandas as pd
import numpy as np
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
DIST_DIR = BASE_DIR / "dist"

app = Flask(__name__, static_folder=str(DIST_DIR / "assets"), static_url_path="/assets")
DATA_FILE = BASE_DIR / "student_data.csv"

def prepare_data(raw):
    df = raw.copy()
    # The dashboard expects the workbook's documented column names.
    required = ["student_id", "course_category", "Engagement_Level", "dropout_risk",
                "forum_interactions", "attendance_rate", "avg_course_grade",
                "course_progress_percent", "enrollment_status"]
    missing = [c for c in required if c not in df.columns]
    if missing:
        raise ValueError("Missing required columns: " + ", ".join(missing))
    optional = ["forum_participation_count", "assignment_submission_rate", "GPA",
                "video_completion_rate", "video_watch_percent", "lms_logins_past_month",
                "login_frequency_per_week", "avg_session_minutes", "risk_level",
                "Original_Engagement_Level", "action_type", "major", "device_type",
                "Engagement_Score_Proxy", "age"]
    for col in optional:
        if col not in df.columns:
            df[col] = np.nan
    numeric = ["attendance_rate", "assignment_submission_rate", "avg_course_grade", "GPA",
               "course_progress_percent", "video_completion_rate", "video_watch_percent",
               "forum_interactions", "forum_participation_count", "lms_logins_past_month",
               "login_frequency_per_week", "avg_session_minutes", "Engagement_Score_Proxy"]
    for col in numeric:
        df[col] = pd.to_numeric(df[col], errors="coerce")
    df["student_id"] = df["student_id"].astype(str)
    return df

def load_data():
    raw = pd.read_csv(DATA_FILE)
    return prepare_data(raw)

DF = load_data()


def clean(v):
    if pd.isna(v): return None
    if isinstance(v, (np.integer,)): return int(v)
    if isinstance(v, (np.floating,)): return round(float(v), 3)
    return str(v)

def stats_for(df):
    n=len(df)
    active=(df["Engagement_Level"].astype(str).str.lower()=="active").sum()
    passive=(df["Engagement_Level"].astype(str).str.lower()=="passive").sum()
    risk=df["dropout_risk"].astype(str).str.lower().isin(["high","medium"]).sum()
    return {
        "students":n, "active":int(active), "passive":int(passive),
        "active_pct":round(active/n*100,1) if n else 0,
        "forum_low":int((df["forum_interactions"].fillna(0)<10).sum()),
        "at_risk":int(risk), "avg_attendance":round(df["attendance_rate"].mean()*100,1) if n else 0,
        "avg_grade":round(df["avg_course_grade"].mean(),1) if n else 0,
        "avg_progress":round(df["course_progress_percent"].mean(),1) if n else 0,
        "avg_video_completion":round(df["video_completion_rate"].mean()*100,1) if n else 0,
        "avg_logins":round(df["lms_logins_past_month"].mean(),1) if n else 0,
        "avg_session":round(df["avg_session_minutes"].mean(),1) if n else 0
    }

@app.route("/")
def home():
    dist_index = DIST_DIR / "index.html"
    if dist_index.exists():
        return send_file(dist_index)
    return send_file(BASE_DIR / "index.html")

@app.route("/<path:filename>")
def serve_static(filename):
    if (DIST_DIR / filename).exists():
        return send_file(DIST_DIR / filename)
    return send_file(DIST_DIR / "index.html") if (DIST_DIR / "index.html").exists() else ("Not found", 404)


@app.route("/api/upload", methods=["POST"])
def upload_dataset():
    global DF
    file = request.files.get("dataset")
    if not file or not file.filename:
        return jsonify({"error": "Choose an Excel or CSV file first."}), 400
    ext = Path(file.filename).suffix.lower()
    if ext not in [".xlsx", ".xls", ".csv"]:
        return jsonify({"error": "Supported formats: .xlsx, .xls and .csv"}), 400
    try:
        if ext == ".csv":
            raw = pd.read_csv(file)
        else:
            book = pd.ExcelFile(file)
            sheet = "Dataset" if "Dataset" in book.sheet_names else book.sheet_names[0]
            raw = pd.read_excel(book, sheet_name=sheet)
        if raw.empty:
            raise ValueError("The selected file has no data rows.")
        prepared = prepare_data(raw)
        DF = prepared
        return jsonify({"message": f"Successfully loaded {len(DF):,} student records.",
                        "rows": len(DF), "columns": len(DF.columns),
                        "filename": file.filename})
    except Exception as exc:
        return jsonify({"error": str(exc)}), 400

@app.route("/api/dashboard")
def dashboard():
    df=DF.copy()
    category=request.args.get("category","All")
    engagement=request.args.get("engagement","All")
    if category!="All": df=df[df["course_category"].astype(str)==category]
    if engagement!="All": df=df[df["Engagement_Level"].astype(str)==engagement]
    def counts(col):
        s=df[col].fillna("Unknown").astype(str).value_counts()
        return [{"label":str(k),"value":int(v)} for k,v in s.items()]
    def avg_by(col, metric):
        x=df.groupby(col)[metric].mean().dropna().sort_values(ascending=False)
        return [{"label":str(k),"value":round(float(v),2)} for k,v in x.items()]
    fields=["student_id","course_category","major","Engagement_Level","dropout_risk","enrollment_status",
            "forum_interactions","attendance_rate","assignment_submission_rate","avg_course_grade",
            "course_progress_percent","video_completion_rate","lms_logins_past_month","login_frequency_per_week",
            "avg_session_minutes","risk_level"]
    rows=[]
    for _,r in df[fields].iterrows():
        rows.append({k:clean(r[k]) for k in fields})
    forum_low=df[df["forum_interactions"].fillna(0)<10]
    passive=df[df["Engagement_Level"].astype(str)=="Passive"]
    highrisk=df[df["dropout_risk"].astype(str).str.lower()=="high"]
    return jsonify({
        "stats":stats_for(df),
        "categories":["All"]+sorted(DF["course_category"].dropna().astype(str).unique().tolist()),
        "engagement_types":["All","Active","Passive"],
        "charts":{
            "engagement":counts("Engagement_Level"),
            "forum": [{"label":"Low (0–9)","value":int((df.forum_interactions.fillna(0)<10).sum())},
                      {"label":"Moderate (10–29)","value":int(df.forum_interactions.between(10,29).sum())},
                      {"label":"High (30+)","value":int((df.forum_interactions>=30).sum())}],
            "dropout":counts("dropout_risk"),
            "enrollment":counts("enrollment_status"),
            "course":counts("course_category"),
            "risk_level":counts("risk_level"),
            "engagement_by_course":avg_by("course_category","Engagement_Score_Proxy"),
            "forum_by_course":avg_by("course_category","forum_interactions"),
            "grade_by_engagement":avg_by("Engagement_Level","avg_course_grade"),
            "progress_by_engagement":avg_by("Engagement_Level","course_progress_percent"),
            "activity":counts("action_type"),
            "major":counts("major")
        },
        "insights":{
            "forum_low_pct":round(len(forum_low)/len(df)*100,1) if len(df) else 0,
            "passive_count":len(passive),
            "highrisk_count":len(highrisk),
            "proxy_note":"Active/Passive labels are proxy labels derived from eight activity indicators, not verified ground truth."
        },
        "students":rows
    })

@app.route("/api/student/<student_id>")
def student_detail(student_id):
    found=DF[DF["student_id"].astype(str)==str(student_id)]
    if found.empty: return jsonify({"error":"Student not found"}),404
    r=found.iloc[0]
    cols=["student_id","course_category","major","age","GPA","Engagement_Level","Engagement_Score_Proxy",
          "forum_interactions","forum_participation_count","attendance_rate","assignment_submission_rate",
          "avg_course_grade","course_progress_percent","video_completion_rate","video_watch_percent",
          "lms_logins_past_month","login_frequency_per_week","avg_session_minutes","dropout_risk","enrollment_status"]
    return jsonify({c:clean(r[c]) for c in cols})

if __name__ == "__main__":
    app.run(debug=True, host="127.0.0.1", port=5000)