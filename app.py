import os
import json
from pathlib import Path
from fastapi import FastAPI
from fastapi.responses import HTMLResponse

BASE_DIR = Path(__file__).resolve().parent
HTML_FILE = BASE_DIR / "public" / "index.html"
SERVER_URL = os.environ.get("SERVER_URL", "").strip().rstrip("/")
# For your unified server, we can just use the same URL for both
SERVER_URL_NSFW = os.environ.get("SERVER_URL_NSFW", SERVER_URL).strip().rstrip("/")

app = FastAPI()

@app.get("/", response_class=HTMLResponse)
def index():
    html = HTML_FILE.read_text(encoding="utf-8")
    # Inject the server URLs into the placeholders we already have in the HTML
    html = html.replace('"__SERVER_URL__"', json.dumps(SERVER_URL))
    html = html.replace('"__SERVER_URL_NSFW__"', json.dumps(SERVER_URL_NSFW))
    return html

@app.get("/health")
def health():
    return {"status": "ok"}
