module.exports = {
  apps : [
  {
    name   : "fastapi",
    script : "uvicorn",
    args: "main:app --host 0.0.0.0 --port 9001",
    interpreter: "/home/ubuntu/fotoverifier2.0/Backend_new/venv/bin/python",
    cwd: "./Backend_new",
    watch: false,
    env: {
        "CLOUD_NAME": process.env.CLOUD_NAME,
        "CLOUD_API_KEY": process.env.CLOUD_API_KEY,
        "CLOUD_API_SECRET": process.env.CLOUD_API_SECRET,
        "REDIS_URL": process.env.REDIS_URL,
        "TF_ENABLE_ONEDNN_OPTS": process.env.TF_ENABLE_ONEDNN_OPTS,
        "SERPAPI_SECRET_KEY": process.env.SERPAPI_SECRET_KEY
    }
  },
  {
    name   : "celery",
    script : "celery",
    args: "-A tasks worker --loglevel=info -c 4",
    interpreter: "/home/ubuntu/fotoverifier2.0/Backend_new/venv/bin/python",
    cwd: "./Backend_new",
    watch: false,
    env: {
      "CLOUD_NAME": process.env.CLOUD_NAME,
      "CLOUD_API_KEY": process.env.CLOUD_API_KEY,
      "CLOUD_API_SECRET": process.env.CLOUD_API_SECRET,
      "REDIS_URL": process.env.REDIS_URL,
      "TF_ENABLE_ONEDNN_OPTS": process.env.TF_ENABLE_ONEDNN_OPTS,
      "SERPAPI_SECRET_KEY": process.env.SERPAPI_SECRET_KEY
    }
  },
  {
    name   : "next",
    script : "npm",
    args: "run start",
    cwd: "./Frontend",
    watch: false,
    env: {
      "NEXT_PUBLIC_BACKEND_URL": process.env.NEXT_PUBLIC_BACKEND_URL
    }
  },
]
}
