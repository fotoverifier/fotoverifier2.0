import redis

try:
    r = redis.Redis(host='localhost', port=6379, db=0)
    r.ping()  # This will return True if Redis is running
    print("Redis is running.")
except redis.ConnectionError:
    print("Redis is not running.")
