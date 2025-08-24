#!/usr/bin/env python3
import json, os, sys, urllib.request, urllib.error

def main():
    # Usage: emit_spark_event.py <event_type> <payload-json>
    # Example:
    #   emit_spark_event.py act_verified '{"submission_id":1,"verification_id":1}'
    if len(sys.argv) != 3:
        print("Usage: emit_spark_event.py <event_type> <payload-json>", file=sys.stderr)
        sys.exit(2)

    event_type = sys.argv[1]
    try:
        payload = json.loads(sys.argv[2])
    except Exception as e:
        print(f"Invalid JSON payload: {e}", file=sys.stderr)
        sys.exit(2)

    url = os.getenv("SPARK_WEBHOOK_URL")
    if not url:
        print("Missing SPARK_WEBHOOK_URL in environment.", file=sys.stderr)
        sys.exit(2)
    api_key = os.getenv("SPARK_API_KEY", "")

    body = json.dumps({
        "source": "TKC",
        "event_type": event_type,
        "payload": payload,
    }).encode("utf-8")

    req = urllib.request.Request(url, data=body, method="POST")
    req.add_header("Content-Type", "application/json")
    if api_key:
        req.add_header("Authorization", f"Bearer {api_key}")

    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            out = resp.read().decode("utf-8", "replace")
            print(out)
    except urllib.error.HTTPError as e:
        print(f"HTTP {e.code}: {e.read().decode('utf-8','replace')}", file=sys.stderr)
        sys.exit(1)
    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    main()
