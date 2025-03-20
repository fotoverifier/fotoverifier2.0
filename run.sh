source Backend_new/new_venv/bin/activate
REDIS_URL="redis://127.0.0.1:6379" FRONTEND_URL="http://fotoverifier.eu:9000" NEXT_PUBLIC_BACKEND_URL="http://fotoverifier.eu:9001"  npx pm2 start ecosystem.config.js
