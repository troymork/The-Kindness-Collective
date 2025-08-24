import sqlite3, threading, time
DB_PATH = "tkc.sqlite3"
_lock = threading.Lock()

def _conn():
    c = sqlite3.connect(DB_PATH, check_same_thread=False)
    c.row_factory = sqlite3.Row
    return c

def init_db():
    with _lock, _conn() as c:
        c.executescript("""
        PRAGMA journal_mode=WAL;
        CREATE TABLE IF NOT EXISTS submissions(
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          content TEXT NOT NULL,
          created_at INTEGER NOT NULL
        );
        CREATE TABLE IF NOT EXISTS verifications(
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          submission_id INTEGER NOT NULL,
          created_at INTEGER NOT NULL,
          FOREIGN KEY(submission_id) REFERENCES submissions(id)
        );
        CREATE TABLE IF NOT EXISTS rewards(
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          verification_id INTEGER NOT NULL,
          created_at INTEGER NOT NULL,
          FOREIGN KEY(verification_id) REFERENCES verifications(id)
        );
        """)
    return True

def now_ms(): return int(time.time() * 1000)

def add_submission(content:str)->int:
    with _lock, _conn() as c:
        cur = c.execute("INSERT INTO submissions(content,created_at) VALUES(?,?)",
                        (content, now_ms()))
        return cur.lastrowid

def add_verification(submission_id:int)->int:
    with _lock, _conn() as c:
        cur = c.execute("INSERT INTO verifications(submission_id,created_at) VALUES(?,?)",
                        (submission_id, now_ms()))
        return cur.lastrowid

def add_reward(verification_id:int)->int:
    with _lock, _conn() as c:
        cur = c.execute("INSERT INTO rewards(verification_id,created_at) VALUES(?,?)",
                        (verification_id, now_ms()))
        return cur.lastrowid

def list_submissions(limit:int=20):
    with _lock, _conn() as c:
        rows = c.execute(
          "SELECT id, content, created_at FROM submissions ORDER BY id DESC LIMIT ?",
          (limit,)
        ).fetchall()
        return [dict(r) for r in rows][::-1]
