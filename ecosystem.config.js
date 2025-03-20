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
    }
  },
  {
    name   : "next",
    script : "npm",
    args: "run buildnstart",
    cwd: "./Frontend",
    watch: false,
    env: {
      "NEXT_PUBLIC_BACKEND_URL": process.env.NEXT_PUBLIC_BACKEND_URL
    }
  },
]
}
