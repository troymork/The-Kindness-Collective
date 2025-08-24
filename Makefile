.PHONY: run logs smoke stop

run:
	@bash scripts/run_server.sh

logs:
	@tail -f logs/server.log

smoke:
	@bash scripts/smoke_test.sh

stop:
	@lsof -nP -iTCP:8000 -sTCP:LISTEN -t | xargs kill -9 2>/dev/null || true
