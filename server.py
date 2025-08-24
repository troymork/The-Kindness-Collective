import http.server, json, time, threading
from urllib.parse import urlparse, parse_qs

START_TS = time.time()

store_lock = threading.Lock()
store = {"submissions": [], "verifications": [], "rewards": []}
counters = {"submission": 0, "verification": 0, "reward": 0}

def _now_ms(): return int(time.time() * 1000)
def _next_id(kind: str) -> int:
    counters[kind] += 1
    return counters[kind]

class KindnessAPI(http.server.BaseHTTPRequestHandler):
    def _send(self, code=200, payload=None):
        body = json.dumps(payload or {}, ensure_ascii=False).encode("utf-8")
        self.send_response(code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def _json_body(self):
        length = int(self.headers.get("Content-Length", "0") or 0)
        if length == 0: return {}
        raw = self.rfile.read(length)
        try: return json.loads(raw)
        except Exception: return {}

    def do_GET(self):
        parsed = urlparse(self.path)
        path, q = parsed.path, parse_qs(parsed.query)

        if path == "/health":
            self._send(200, {"ok": True, "uptime_ms": int((time.time() - START_TS)*1000)})
            return

        if path == "/feed":
            try: limit = int(q.get("limit", ["20"])[0])
            except Exception: limit = 20
            with store_lock:
                items = list(store["submissions"])[-limit:]
            self._send(200, {"ok": True, "items": items})
            return

        # Backward-compatible GET fallbacks
        if path == "/submit":
            content = q.get("content", [None])[0]
            if not content:
                self._send(400, {"ok": False, "error": "content required"}); return
            with store_lock:
                sid = _next_id("submission")
                store["submissions"].append({"id": sid, "content": content, "created_at": _now_ms()})
            print(f"[submit] id={sid} content={content}")
            self._send(200, {"ok": True, "submission_id": sid}); return

        if path == "/verify":
            sid = q.get("submission_id", [None])[0]
            if not sid:
                self._send(400, {"ok": False, "error": "submission_id required"}); return
            try: sid = int(sid)
            except Exception:
                self._send(400, {"ok": False, "error": "submission_id must be int"}); return
            with store_lock:
                vid = _next_id("verification")
                store["verifications"].append({"id": vid, "submission_id": sid, "created_at": _now_ms()})
            print(f"[verify] id={vid} submission_id={sid}")
            self._send(200, {"ok": True, "verification_id": vid}); return

        if path == "/reward":
            vid = q.get("verification_id", [None])[0]
            if not vid:
                self._send(400, {"ok": False, "error": "verification_id required"}); return
            try: vid = int(vid)
            except Exception:
                self._send(400, {"ok": False, "error": "verification_id must be int"}); return
            with store_lock:
                rid = _next_id("reward")
                store["rewards"].append({"id": rid, "verification_id": vid, "created_at": _now_ms()})
            print(f"[reward] id={rid} verification_id={vid}")
            self._send(200, {"ok": True, "reward_id": rid}); return

        self._send(404, {"ok": False, "error": "route not found"})

    def do_POST(self):
        parsed = urlparse(self.path)
        path = parsed.path
        data = self._json_body()

        if path == "/submit":
            content = data.get("content")
            if not content:
                self._send(400, {"ok": False, "error": "content required"}); return
            with store_lock:
                sid = _next_id("submission")
                store["submissions"].append({"id": sid, "content": content, "created_at": _now_ms()})
            print(f"[submit] id={sid} content={content}")
            self._send(200, {"ok": True, "submission_id": sid}); return

        if path == "/verify":
            sid = data.get("submission_id")
            if sid is None:
                self._send(400, {"ok": False, "error": "submission_id required"}); return
            try: sid = int(sid)
            except Exception:
                self._send(400, {"ok": False, "error": "submission_id must be int"}); return
            with store_lock:
                vid = _next_id("verification")
                store["verifications"].append({"id": vid, "submission_id": sid, "created_at": _now_ms()})
            print(f"[verify] id={vid} submission_id={sid}")
            self._send(200, {"ok": True, "verification_id": vid}); return

        if path == "/reward":
            vid = data.get("verification_id")
            if vid is None:
                self._send(400, {"ok": False, "error": "verification_id required"}); return
            try: vid = int(vid)
            except Exception:
                self._send(400, {"ok": False, "error": "verification_id must be int"}); return
            with store_lock:
                rid = _next_id("reward")
                store["rewards"].append({"id": rid, "verification_id": vid, "created_at": _now_ms()})
            print(f"[reward] id={rid} verification_id={vid}")
            self._send(200, {"ok": True, "reward_id": rid}); return

        self._send(404, {"ok": False, "error": "route not found"})

    def log_message(self, fmt, *args):
        return

if __name__ == "__main__":
    httpd = http.server.HTTPServer(("", 8000), KindnessAPI)
    print("Kindness API listening on port 8000...")
    httpd.serve_forever()
