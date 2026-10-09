
#!/usr/bin/env bash

set -u

echo "================================"
echo " TaskFlow Host Health Check"
echo "================================"

echo "Hostname: $(hostname)"
echo "Date: $(date)"
echo "Uptime: $(uptime -p)"

echo
echo "System status:"
systemctl is-system-running || true

echo
echo "Disk usage:"
df -h /

root_usage=$(df -P / | awk 'NR==2 {gsub(/%/, "", $5); print $5}')

echo
echo "Memory usage:"
free -h

memory_usage=$(awk '
/MemTotal:/ {total=$2}
/MemAvailable:/ {available=$2}
END {
    if (total > 0)
        printf "%.0f", ((total - available) / total) * 100
    else
        print "unknown"
}' /proc/meminfo)

echo
echo "Root filesystem usage: ${root_usage}%"
echo "Estimated memory usage: ${memory_usage}%"

if [[ "$root_usage" =~ ^[0-9]+$ ]] && (( root_usage >= 80 )); then
    echo "WARNING: Root filesystem usage is at least 80%."
else
    echo "OK: Root filesystem usage is below 80%."
fi

echo "================================"
echo " Health check completed"
echo "================================"

