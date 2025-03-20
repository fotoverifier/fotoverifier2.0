module.exports = {
  apps : [
  {
    name   : "uvicorn",
    script: "uvicorn",
    args: "main:app --host 0.0.0.0 --port 9001",
    interpreter: "/home/ubuntu/fotoverifier2.0/Backend_new/new_venv/bin/python3",
    cwd: "./Backend_new",
    watch: false,
    env: {
      "REDIS_URL": process.env.REDIS_URL,
      "FRONTEND_URL": process.env.FRONTEND_URL,
    },
    exec_interpreter: "node"
  },
  {
    name   : "celery",
    script: "celery",
    args: "-A tasks worker --loglevel=info -c 4",
    interpreter: "/home/ubuntu/fotoverifier2.0/Backend_new/new_venv/bin/python3",
    cwd: "./Backend_new",
    watch: false,
    env: {
      "CLOUD_NAME": process.env.CLOUD_NAME,
      "CLOUD_API_KEY": process.env.CLOUD_API_KEY,
      "CLOUD_API_SECRET": process.env.CLOUD_API_SECRET,
      "REDIS_URL": process.env.REDIS_URL,
      "FRONTEND_URL": process.env.FRONTEND_URL,
      "SERPAPI_SECRET_KEY": process.env.SERPAPI_SECRET_KEY
    },
    exec_interpreter: "node"
  },
  {
    name   : "next",
    script : "npm",
    args: "run buildnstart",
    cwd: "./Frontend",
    watch: false,
    env: {
      "NEXT_PUBLIC_BACKEND_URL": process.env.NEXT_PUBLIC_BACKEND_URL
    },
    exec_interpreter: "node" 
  },
]
}
