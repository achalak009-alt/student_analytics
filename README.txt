STUDENT ANALYTICS DASHBOARD — SIMPLE VERSION

This version has no nested folders. Keep these four files together:
- app.py
- index.html
- student_data.csv
- requirements.txt

Run locally on Mac:
1. Open Terminal and cd into this folder.
2. Run: python3 -m pip install -r requirements.txt
3. Run: python3 app.py
4. Open: http://127.0.0.1:5000

For Render deployment:
Build command: pip install -r requirements.txt
Start command: gunicorn app:app --bind 0.0.0.0:$PORT

IMPORTANT: Before publishing this repository publicly, verify that student_data.csv contains no real names, email addresses, student IDs, or other identifiable student information. Use anonymised or synthetic data for a public demo.
