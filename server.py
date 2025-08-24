import http.server, json, time
from urllib.parse import urlparse, parse_qs
import db

START_TS = time.time()
db.init_db()

class KindnessAPI(http.server.BaseHTTPRequestHandler):
    def _send(self, code=200, payload=None):
        body = json.dumps(payload or {}, ensure_ascii=False).encode("utf-8")
        self.send_response(code); self.send_header("Content-Type","application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body))); self.end_headers(); self.wfile.write(body)

    def _json_body(self):
        length = int(self.headers.get("Content-Length","0") or 0)
        if length == 0: return {}
        try: return json.loads(self.rfile.read(length))
        except Exception: return {}

    def do_GET(self):
        p = urlparse(self.path); path, q = p.path, parse_qs(p.query)
        if path == "/health":
            return self._send(200, {"ok": True, "uptime_ms": int((time.time()-START_TS)*1000)})
        if path == "/feed":
            try: limit = int(q.get("limit",["20"])[0])
            except: limit = 20
            return self._send(200, {"ok": True, "items": db.list_submissions(limit)})

        # Legacy GET fallbacks
        if path == "/submit":
            content = q.get("content",[None])[0]
            if not content: return self._send(400, {"ok": False, "error":"content required"})
            sid = db.add_submission(content); print(f"[submit] id={sid} content={content}")
            return self._send(200, {"ok": True, "submission_id": sid})
        if path == "/verify":
            sid = q.get("submission_id",[None])[0]
            if not sid: return self._send(400, {"ok": False, "error":"submission_id required"})
            try: sid = int(sid)
            except: return self._send(400, {"ok": False, "error":"submission_id must be int"})
            vid = db.add_verification(sid); print(f"[verify] id={vid} submission_id={sid}")
            return self._send(200, {"ok": True, "verification_id": vid})
        if path == "/reward":
            vid = q.get("verification_id",[None])[0]
            if not vid: return self._send(400, {"ok": False, "error":"verification_id required"})
            try: vid = int(vid)
            except: return self._send(400, {"ok": False, "error":"verification_id must be int"})
            rid = db.add_reward(vid); print(f"[reward] id={rid} verification_id={vid}")
            return self._send(200, {"ok": True, "reward_id": rid})

        return self._send(404, {"ok": False, "error":"route not found"})

    def do_POST(self):
        p = urlparse(self.path); path = p.path; data = self._json_body()
        if path == "/submit":
            content = data.get("content")
            if not content: return self._send(400, {"ok": False, "error":"content required"})
            sid = db.add_submission(content); print(f"[submit] id={sid} content={content}")
            return self._send(200, {"ok": True, "submission_id": sid})
        if path == "/verify":
            sid = data.get("submission_id")
            if sid is None: return self._send(400, {"ok": False, "error":"submission_id required"})
            try: sid = int(sid)
            except: return self._send(400, {"ok": False, "error":"submission_id must be int"})
            vid = db.add_verification(sid); print(f"[verify] id={vid} submission_id={sid}")
            return self._send(200, {"ok": True, "verification_id": vid})
        if path == "/reward":
            vid = data.get("verification_id")
            if vid is None: return self._send(400, {"ok": False, "error":"verification_id required"})
            try: vid = int(vid)
            except: return self._send(400, {"ok": False, "error":"verification_id must be int"})
            rid = db.add_reward(vid); print(f"[reward] id={rid} verification_id={vid}")
            return self._send(200, {"ok": True, "reward_id": rid})
        return self._send(404, {"ok": False, "error":"route not found"})

    def log_message(self, fmt, *args): return

if __name__ == "__main__":
    http.server.HTTPServer(("", 8000), KindnessAPI).serve_forever()
