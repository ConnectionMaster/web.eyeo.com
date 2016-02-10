from datetime import datetime

def humanize_date(date):
  return datetime.strptime(date, "%Y-%m-%d").strftime("%B %d, %Y")
