## Subdomain Setup for Pixel Streaming

### 1. DNS Configuration
Add these records to your DNS settings:

```
Type  Name                     Value
A     pixelstream             [Your Azure VM IP]
AAAA  pixelstream             [Your Azure VM IPv6 if available]
```

### 2. SSL Certificate
```bash
# Install certbot if not already installed
sudo apt install certbot

# Get certificate for subdomain
sudo certbot certonly --standalone -d pixelstream.kustomautowrx.com

# Configure auto-renewal
sudo certbot renew --dry-run
```

### 3. Nginx Configuration
```nginx
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name pixelstream.kustomautowrx.com;

    ssl_certificate /etc/letsencrypt/live/pixelstream.kustomautowrx.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/pixelstream.kustomautowrx.com/privkey.pem;

    # Modern SSL configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;

    # HSTS
    add_header Strict-Transport-Security "max-age=63072000" always;

    # WebSocket proxy for Pixel Streaming
    location /ws {
        proxy_pass http://localhost:8888;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # WebSocket specific settings
        proxy_read_timeout 300s;
        proxy_send_timeout 300s;
        proxy_connect_timeout 75s;
    }

    # Static file serving
    location / {
        root /var/www/pixelstream.kustomautowrx.com;
        index index.html;
        try_files $uri $uri/ /index.html;

        # Cache static assets
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
            expires 30d;
            add_header Cache-Control "public, no-transform";
        }
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Content-Security-Policy "default-src 'self' https: wss:; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';" always;
}

# Redirect HTTP to HTTPS
server {
    listen 80;
    listen [::]:80;
    server_name pixelstream.kustomautowrx.com;
    return 301 https://$server_name$request_uri;
}
```

### 4. Azure Configuration

1. Update Network Security Group:
```bash
# Allow HTTPS traffic
az network nsg rule create \
  --resource-group your-resource-group \
  --nsg-name your-nsg \
  --name allow-https \
  --protocol Tcp \
  --priority 200 \
  --destination-port-range 443
```

2. Update application settings:
```powershell
# Update Unreal Engine pixel streaming settings
YourGame.exe -PixelStreamingURL=wss://pixelstream.kustomautowrx.com/ws
```

### 5. Testing

1. SSL verification:
```bash
curl -vI https://pixelstream.kustomautowrx.com
```

2. WebSocket connection:
```javascript
// Browser console
const ws = new WebSocket('wss://pixelstream.kustomautowrx.com/ws');
ws.onopen = () => console.log('Connected');
```

### 6. Monitoring

1. SSL certificate monitoring:
```bash
# Set up certificate expiry monitoring
echo "0 0 * * * certbot renew --quiet" | sudo tee -a /etc/crontab
```

2. Add uptime monitoring:
```bash
# Install monitoring agent
curl -s https://healthchecks.io/client/your-ping-key | sudo tee /etc/cron.d/healthchecks
```