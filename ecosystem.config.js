module.exports = {
  apps : [
  {
    name   : "uvicorn",
    script: "uvicorn",
    args: "main:app --host 0.0.0.0 --port 9001",
    interpreter: "python3",
    cwd: "./Backend_new",
    watch: false,
    env: {
      "REDIS_URL": process.env.REDIS_URL,
      "FRONTEND_URL": process.env.FRONTEND_URL,
    },
  },
  {
    name   : "celery",
    script: "celery",
    args: "-A tasks worker --loglevel=info -c 4",
    interpreter: "python3",
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
  },
  {
    name   : "next",
    script : "npm",
    args: "run start",
    cwd: "./Frontend",
    watch: false,
    env: {
      "NEXT_PUBLIC_BACKEND_URL": process.env.NEXT_PUBLIC_BACKEND_URL
    },
    exec_interpreter: "node" 
  },
]
}
