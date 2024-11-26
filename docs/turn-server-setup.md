## TURN Server Setup Guide

### Install Coturn on Ubuntu Server

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Coturn
sudo apt install coturn -y

# Enable the service
sudo systemctl enable coturn

# Configure Coturn
sudo nano /etc/turnserver.conf
```

Add this configuration:
```conf
# Basic configuration
listening-port=3478
tls-listening-port=5349
listening-ip=YOUR_SERVER_IP
external-ip=YOUR_SERVER_IP

# Authentication
lt-cred-mech
user=your_username:your_password

# TLS configuration (required for production)
cert=/etc/letsencrypt/live/your-domain.com/fullchain.pem
pkey=/etc/letsencrypt/live/your-domain.com/privkey.pem

# Performance tuning
total-quota=100
max-bps=0
stale-nonce=600
realm=your-domain.com

# Logging for debugging
verbose
fingerprint

# Security
no-tcp-relay
no-cli
no-tlsv1
no-tlsv1_1
min-port=49152
max-port=65535
```

### Start the Service

```bash
sudo systemctl start coturn
sudo systemctl status coturn
```

### Firewall Configuration

```bash
# Allow TURN ports
sudo ufw allow 3478/tcp
sudo ufw allow 3478/udp
sudo ufw allow 5349/tcp
sudo ufw allow 5349/udp
sudo ufw allow 49152:65535/udp
```

### Test TURN Server

```bash
# Install testing tool
sudo apt install nodejs npm -y
npm install -g webrtc-cli

# Test TURN server
webrtc-cli turn-test turn:your-server-ip:3478 your_username your_password
```

### Monitoring

```bash
# View logs
sudo journalctl -u coturn -f

# Monitor connections
sudo netstat -anp | grep turnserver
```

### High Availability Setup

1. Set up multiple TURN servers
2. Use DNS round-robin or load balancer
3. Configure backup servers in client application
4. Monitor server health with automated failover

### Security Best Practices

1. Use strong credentials
2. Enable TLS
3. Regularly update server
4. Monitor for abuse
5. Rate limit connections
6. Use firewall rules

### Performance Tuning

1. Adjust system limits:
```bash
# /etc/security/limits.conf
* soft nofile 1048576
* hard nofile 1048576
```

2. Optimize kernel parameters:
```bash
# /etc/sysctl.conf
net.core.rmem_max=12582912
net.core.wmem_max=12582912
```

### Cost Optimization

1. Use bandwidth monitoring
2. Implement connection limits
3. Configure timeout policies
4. Use auto-scaling based on load