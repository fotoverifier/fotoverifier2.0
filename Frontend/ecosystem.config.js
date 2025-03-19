module.exports = {
  apps : [
  {
    name   : "fastapi",
    script : "uvicorn",
    args: "main:app --host 0.0.0.0 --port 9001",
    interpreter: "/home/ubuntu/fotoverifier2.0/Backend/venv/bin/python",
    cwd: "./Backend_new",
    watch: false,
    env: {
        "CLOUD_NAME":"dhwi6wtrj",
        "CLOUD_API_KEY":"237324986757275",
        "CLOUD_API_SECRET":"dVF-YkIcaEcw5jwINxBYrudiGeE",
        "REDIS_URL":"redis://localhost:6379/0",
        "TF_ENABLE_ONEDNN_OPTS":"0",
        "SERPAPI_SECRET_KEY":"b945106cd612c06211da4507b158c6861c6e1059c0de67d92f0aedcd889f29ab"
    }
  },
  {
    name   : "celery",
    script : "celery",
    args: "-A tasks worker --loglevel=info --concurrency 4",
    interpreter: "/home/ubuntu/fotoverifier2.0/Backend/venv/bin/python",
    cwd: "./Backend_new",
    watch: false,
    env: {
        "CLOUD_NAME":"dhwi6wtrj",
        "CLOUD_API_KEY":"237324986757275",
        "CLOUD_API_SECRET":"dVF-YkIcaEcw5jwINxBYrudiGeE",
        "REDIS_URL":"redis://localhost:6379/0",
        "TF_ENABLE_ONEDNN_OPTS":"0",
        "SERPAPI_SECRET_KEY":"b945106cd612c06211da4507b158c6861c6e1059c0de67d92f0aedcd889f29ab"
    }
  },
  {
    name   : "next",
    script : "npm",
    args: "run start",
    cwd: "./Frontend",
    watch: false,
  },
]
}
