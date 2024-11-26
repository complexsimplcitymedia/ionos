## Domain Redirect Setup for Pixel Streaming

### 1. IONOS DNS Configuration

1. Log into your IONOS Control Panel
2. Go to Domains & SSL > everythingsawrap.com > DNS
3. Add these DNS records:

```
Type    Name              Content                         TTL
A       pixelstream       [Your Azure VM IP]             600
CNAME   www.pixelstream   pixelstream.everythingsawrap.com  600
```

### 2. SSL Certificate Setup

1. In IONOS Control Panel:
   - Go to SSL Certificates
   - Order/Generate new certificate for: `pixelstream.everythingsawrap.com`
   - Download both certificate (.crt) and private key (.key)
   - Copy these files to your Azure VM at:
     ```
     C:\nginx\ssl\pixelstream.everythingsawrap.com.crt
     C:\nginx\ssl\pixelstream.everythingsawrap.com.key
     ```

### 3. Azure Configuration

1. Add DNS Name in Azure Portal:
   - Go to Azure Portal > Your VM > Overview
   - Click on "Configure" under DNS name
   - Add: `pixelstream.everythingsawrap.com`

2. Update Network Security Group:
   ```powershell
   # Allow HTTPS traffic
   New-NetFirewallRule -DisplayName "HTTPS" -Direction Inbound -LocalPort 443 -Protocol TCP -Action Allow
   ```

### 4. Update Nginx Configuration

Update C:\nginx\conf\nginx.conf:

```nginx
worker_processes auto;
events {
    worker_connections 1024;
}
http {
    upstream pixelstream {
        server 127.0.0.1:8888;
    }

    # Redirect all HTTP to HTTPS
    server {
        listen 80;
        server_name pixelstream.everythingsawrap.com
                    www.pixelstream.everythingsawrap.com;
        return 301 https://pixelstream.everythingsawrap.com$request_uri;
    }

    # Main HTTPS Server
    server {
        listen 443 ssl;
        server_name pixelstream.everythingsawrap.com
                    www.pixelstream.everythingsawrap.com;

        # SSL Configuration
        ssl_certificate C:/nginx/ssl/pixelstream.everythingsawrap.com.crt;
        ssl_certificate_key C:/nginx/ssl/pixelstream.everythingsawrap.com.key;
        
        # SSL Security Settings
        ssl_session_timeout 1d;
        ssl_session_cache shared:SSL:50m;
        ssl_session_tickets off;
        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384;
        ssl_prefer_server_ciphers off;
        
        # HSTS
        add_header Strict-Transport-Security "max-age=63072000" always;

        # Proxy Settings
        location / {
            proxy_pass http://pixelstream;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;

            # WebSocket timeouts
            proxy_read_timeout 300s;
            proxy_send_timeout 300s;
            proxy_connect_timeout 75s;
        }
    }
}
```

### 5. Update Environment Variables

Update your .env file:
```env
VITE_PIXEL_STREAM_URL=wss://pixelstream.everythingsawrap.com
```

### 6. Verify Configuration

1. Restart Nginx:
   ```powershell
   Restart-Service nginx
   ```

2. Test SSL Configuration:
   ```powershell
   # Test Nginx config
   nginx -t
   ```

3. Verify DNS Propagation:
   ```powershell
   nslookup pixelstream.everythingsawrap.com
   ```

### 7. Troubleshooting

1. DNS Issues:
   - Use `nslookup` to verify DNS resolution
   - Check IONOS DNS settings
   - Allow up to 24 hours for DNS propagation

2. SSL Issues:
   - Verify certificate paths in nginx.conf
   - Check certificate expiration:
     ```powershell
     openssl x509 -in C:/nginx/ssl/pixelstream.everythingsawrap.com.crt -noout -dates
     ```
   - Test SSL configuration:
     ```
     https://www.ssllabs.com/ssltest/analyze.html?d=pixelstream.everythingsawrap.com
     ```

3. Connection Issues:
   - Check Windows Firewall
   - Verify Azure NSG rules
   - Test WebSocket connection:
     ```javascript
     // Browser Console
     const ws = new WebSocket('wss://pixelstream.everythingsawrap.com');
     ws.onopen = () => console.log('Connected');
     ```

### 8. Maintenance

1. SSL Certificate Renewal:
   - Monitor expiration in IONOS Control Panel
   - Download renewed certificates when needed
   - Replace files in C:\nginx\ssl\
   - Restart Nginx:
     ```powershell
     Restart-Service nginx
     ```

2. Regular Checks:
   - Monitor certificate expiration in IONOS panel
   - Check nginx error logs:
     ```powershell
     Get-Content C:\nginx\logs\error.log -Tail 50
     ```
   - Verify WebSocket connectivity