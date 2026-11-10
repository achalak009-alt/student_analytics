import os
import hmac
from pathlib import Path
from functools import wraps

import pandas as pd

from flask import (
    Flask,
    render_template,
    request,
    redirect,
    url_for,
    session,
    flash
)

app = Flask(__name__)

app.secret_key = os.environ.get(
    "SECRET_KEY",
    "change-this-secret-before-deployment"
)

app.config["SESSION_COOKIE_HTTPONLY"] = True
app.config["SESSION_COOKIE_SAMESITE"] = "Lax"

# --------------------------------
# LOGIN CONFIGURATION
# --------------------------------

ADMIN_ID = "admin"
ADMIN_PASSWORD = "Admin@123"

STUDENT_PASSWORD = "Student@123"

# --------------------------------
# LOAD DATASET
# --------------------------------

DATA_FILE = Path(__file__).with_name("student_data.csv")

if not DATA_FILE.exists():
    raise FileNotFoundError(
        "student_data.csv not found. Keep it beside app.py."
    )

df = pd.read_csv(DATA_FILE)

LOGIN_COLUMN = "Student_ID"

if LOGIN_COLUMN not in df.columns:
    raise ValueError("Student_ID column not found in dataset.")

df[LOGIN_COLUMN] = (
    df[LOGIN_COLUMN]
    .fillna("")
    .astype(str)
    .str.strip()
)

df = df[df[LOGIN_COLUMN] != ""].copy()

# --------------------------------
# CREATE ONE PROFILE PER STUDENT
# --------------------------------

NUMERIC_FIELDS = [
    "GPA",
    "attendance_rate",
    "avg_course_grade",
    "course_progress_percent",
    "forum_interactions",
    "quiz_average_score",
    "video_completion_rate",
    "assignment_submission_rate",
    "lms_logins_past_month",
    "login_frequency_per_week"
]

CATEGORY_FIELDS = [
    "course_category",
    "major",
    "Engagement_Level",
    "dropout_risk",
    "enrollment_status",
    "device_type"
]

profile_rows = []

for student_id, group in df.groupby(
    LOGIN_COLUMN,
    sort=True
):

    profile = {
        "Student_ID": student_id
    }

    # Average numerical values
    for col in NUMERIC_FIELDS:

        if col in group.columns:

            values = pd.to_numeric(
                group[col],
                errors="coerce"
            ).dropna()

            if not values.empty:
                profile[col] = round(
                    float(values.mean()), 2
                )
            else:
                profile[col] = "—"

    # Most common categorical values
    for col in CATEGORY_FIELDS:

        if col in group.columns:

            modes = (
                group[col]
                .dropna()
                .astype(str)
                .mode()
            )

            profile[col] = (
                modes.iloc[0]
                if not modes.empty
                else "—"
            )

    profile["activity_records"] = len(group)

    profile_rows.append(profile)


profiles = pd.DataFrame(profile_rows).fillna("—")

# --------------------------------
# AUTHENTICATION DECORATORS
# --------------------------------

def student_required(view):

    @wraps(view)
    def wrapped(*args, **kwargs):

        if session.get("role") != "student":
            return redirect(url_for("login"))

        return view(*args, **kwargs)

    return wrapped


def admin_required(view):

    @wraps(view)
    def wrapped(*args, **kwargs):

        if session.get("role") != "admin":
            return redirect(url_for("login"))

        return view(*args, **kwargs)

    return wrapped


# --------------------------------
# FORMAT DATA
# --------------------------------

def get_value(row, key, percent=False):

    value = row.get(key, "—")

    if value is None or pd.isna(value):
        return "—"

    if isinstance(value, (int, float)):

        if percent and key == "attendance_rate":
            if value <= 1:
                value = value * 100

        if percent:
            return f"{value:.1f}%"

        return f"{value:.2f}"

    return str(value)


# --------------------------------
# LOGIN PAGE
# --------------------------------

@app.route("/", methods=["GET", "POST"])
def login():

    if session.get("role") == "admin":
        return redirect(url_for("admin_dashboard"))

    if session.get("role") == "student":
        return redirect(url_for("student_dashboard"))

    if request.method == "POST":

        login_id = request.form.get(
            "student_id", ""
        ).strip()

        password = request.form.get(
            "password", ""
        )

        # ADMIN LOGIN

        if (
            hmac.compare_digest(login_id, ADMIN_ID)
            and hmac.compare_digest(password, ADMIN_PASSWORD)
        ):

            session.clear()

            session["role"] = "admin"
            session["login_id"] = ADMIN_ID

            return redirect(
                url_for("admin_dashboard")
            )

        # STUDENT LOGIN

        found = profiles[
            profiles["Student_ID"]
            .astype(str)
            .str.casefold()
            == login_id.casefold()
        ]

        if (
            not found.empty
            and hmac.compare_digest(
                password,
                STUDENT_PASSWORD
            )
        ):

            session.clear()

            session["role"] = "student"

            session["login_id"] = str(
                found.iloc[0]["Student_ID"]
            )

            return redirect(
                url_for("student_dashboard")
            )

        flash(
            "Invalid Student ID or Password!",
            "error"
        )

    return render_template("login.html")


# --------------------------------
# STUDENT DASHBOARD
# --------------------------------

@app.route("/student")
@student_required
def student_dashboard():

    found = profiles[
        profiles["Student_ID"].astype(str)
        == session.get("login_id")
    ]

    if found.empty:

        session.clear()

        return redirect(url_for("login"))

    row = found.iloc[0]

    student = {

        "id": get_value(row, "Student_ID"),

        "course": get_value(
            row, "course_category"
        ),

        "major": get_value(
            row, "major"
        ),

        "engagement": get_value(
            row, "Engagement_Level"
        ),

        "risk": get_value(
            row, "dropout_risk"
        ),

        "attendance": get_value(
            row, "attendance_rate", True
        ),

        "grade": get_value(
            row, "avg_course_grade"
        ),

        "progress": get_value(
            row, "course_progress_percent", True
        ),

        "forum": get_value(
            row, "forum_interactions"
        ),

        "status": get_value(
            row, "enrollment_status"
        ),

        "gpa": get_value(
            row, "GPA"
        ),

        "quiz": get_value(
            row, "quiz_average_score"
        ),

        "activity_records": get_value(
            row, "activity_records"
        )
    }

    return render_template(
        "student.html",
        student=student
    )


# --------------------------------
# ADMIN DASHBOARD
# --------------------------------

@app.route("/admin")
@admin_required
def admin_dashboard():

    records = []

    for _, row in profiles.iterrows():

        records.append({

            "id": get_value(
                row, "Student_ID"
            ),

            "course": get_value(
                row, "course_category"
            ),

            "major": get_value(
                row, "major"
            ),

            "engagement": get_value(
                row, "Engagement_Level"
            ),

            "risk": get_value(
                row, "dropout_risk"
            ),

            "attendance": get_value(
                row, "attendance_rate", True
            ),

            "grade": get_value(
                row, "avg_course_grade"
            ),

            "progress": get_value(
                row, "course_progress_percent", True
            ),

            "status": get_value(
                row, "enrollment_status"
            )

        })

    total = len(profiles)

    risk_values = (
        profiles["dropout_risk"]
        .astype(str)
        .str.lower()
    )

    high_risk = int(
        (risk_values == "high").sum()
    )

    medium_risk = int(
        (risk_values == "medium").sum()
    )

    low_risk = int(
        (risk_values == "low").sum()
    )

    return render_template(
        "admin.html",
        records=records,
        total=total,
        high_risk=high_risk,
        medium_risk=medium_risk,
        low_risk=low_risk
    )


# --------------------------------
# LOGOUT
# --------------------------------

@app.route("/logout")
def logout():

    session.clear()

    return redirect(url_for("login"))


# --------------------------------
# RUN APPLICATION
# --------------------------------

if __name__ == "__main__":

    app.run(
        host="127.0.0.1",
        port=5000,
        debug=True
    )