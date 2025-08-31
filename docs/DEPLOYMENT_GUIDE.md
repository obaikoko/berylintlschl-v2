# Deployment Guide - Beryl International School Management System

This guide provides step-by-step instructions for deploying the Beryl International School Management System to production environments.

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Environment Setup](#environment-setup)
3. [Database Setup](#database-setup)
4. [Backend Deployment](#backend-deployment)
5. [Frontend Deployment](#frontend-deployment)
6. [Domain & SSL Setup](#domain--ssl-setup)
7. [Monitoring & Maintenance](#monitoring--maintenance)
8. [Troubleshooting](#troubleshooting)

## 🔧 Prerequisites

### Required Services

- **VPS/Cloud Server** (DigitalOcean, AWS, Google Cloud, etc.)
- **Domain Name** (for production URL)
- **MongoDB Atlas** (cloud database)
- **Cloudinary** (file storage)
- **Email Service** (Gmail, SendGrid, etc.)

### Server Requirements

- **OS**: Ubuntu 20.04+ or CentOS 8+
- **RAM**: Minimum 2GB (4GB recommended)
- **Storage**: 20GB+ SSD
- **CPU**: 2+ cores
- **Node.js**: 18+ LTS

## 🌍 Environment Setup

### 1. Server Preparation

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 (Process Manager)
sudo npm install -g pm2

# Install Nginx
sudo apt install nginx -y

# Install Certbot (SSL)
sudo apt install certbot python3-certbot-nginx -y

# Install Git
sudo apt install git -y
```

### 2. Create Application User

```bash
# Create user
sudo adduser berylschool
sudo usermod -aG sudo berylschool

# Switch to user
su - berylschool

# Create app directory
mkdir -p /home/berylschool/app
cd /home/berylschool/app
```

### 3. Clone Repository

```bash
# Clone the repository
git clone <your-repository-url> berylintlschl-v2
cd berylintlschl-v2

# Install dependencies
cd backend && npm install
cd ../client && npm install
```

## 🗄️ Database Setup

### MongoDB Atlas Setup

1. **Create MongoDB Atlas Account**

   - Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Create free account
   - Create new cluster

2. **Configure Database**

   ```bash
   # Get connection string from Atlas
   # Format: mongodb+srv://username:password@cluster.mongodb.net/database
   ```

3. **Set Up Database User**
   - Create database user with read/write permissions
   - Whitelist your server IP address

### Environment Variables

Create production environment files:

**Backend (.env)**

```env
# Database
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/beryl_school

# JWT
JWT_SECRET=your-super-secure-jwt-secret-key-here

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Email
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Server
PORT=5000
NODE_ENV=production
FRONTEND_URL=https://your-domain.com
```

**Frontend (.env.production)**

```env
NEXT_PUBLIC_API_URL=https://your-domain.com/api
NEXT_PUBLIC_APP_NAME=Beryl International School
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

## 🔧 Backend Deployment

### 1. Build Backend

```bash
cd backend

# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Push database schema
npx prisma db push

# Build for production
npm run build
```

### 2. PM2 Configuration

Create `ecosystem.config.js` in the backend directory:

```javascript
module.exports = {
  apps: [
    {
      name: "beryl-backend",
      script: "dist/server.js",
      instances: "max",
      exec_mode: "cluster",
      env: {
        NODE_ENV: "production",
        PORT: 5000,
      },
      error_file: "./logs/err.log",
      out_file: "./logs/out.log",
      log_file: "./logs/combined.log",
      time: true,
      max_memory_restart: "1G",
      restart_delay: 4000,
      max_restarts: 10,
    },
  ],
};
```

### 3. Start Backend Service

```bash
# Create logs directory
mkdir logs

# Start with PM2
pm2 start ecosystem.config.js

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup
```

### 4. Nginx Configuration for Backend

Create `/etc/nginx/sites-available/beryl-backend`:

```nginx
server {
    listen 80;
    server_name api.your-domain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Increase upload size for file uploads
    client_max_body_size 10M;
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/beryl-backend /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## 🎨 Frontend Deployment

### 1. Build Frontend

```bash
cd client

# Set production environment
export NODE_ENV=production

# Build the application
npm run build

# Test the build
npm start
```

### 2. PM2 Configuration for Frontend

Create `ecosystem.config.js` in the client directory:

```javascript
module.exports = {
  apps: [
    {
      name: "beryl-frontend",
      script: "npm",
      args: "start",
      instances: "max",
      exec_mode: "cluster",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
      error_file: "./logs/err.log",
      out_file: "./logs/out.log",
      log_file: "./logs/combined.log",
      time: true,
      max_memory_restart: "1G",
      restart_delay: 4000,
      max_restarts: 10,
    },
  ],
};
```

### 3. Start Frontend Service

```bash
# Create logs directory
mkdir logs

# Start with PM2
pm2 start ecosystem.config.js

# Save PM2 configuration
pm2 save
```

### 4. Nginx Configuration for Frontend

Create `/etc/nginx/sites-available/beryl-frontend`:

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    root /home/berylschool/app/berylintlschl-v2/client/.next;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied expired no-cache no-store private must-revalidate auth;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/javascript;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Static files caching
    location /_next/static/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # API proxy
    location /api/ {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/beryl-frontend /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## 🔒 Domain & SSL Setup

### 1. Domain Configuration

1. **Point Domain to Server**

   - Add A record: `your-domain.com` → Server IP
   - Add A record: `api.your-domain.com` → Server IP
   - Add CNAME record: `www.your-domain.com` → `your-domain.com`

2. **Wait for DNS Propagation** (up to 48 hours)

### 2. SSL Certificate Setup

```bash
# Install SSL for main domain
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Install SSL for API subdomain
sudo certbot --nginx -d api.your-domain.com

# Auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

### 3. Final Nginx Configuration

Update the Nginx configurations to include SSL:

**Frontend (`/etc/nginx/sites-available/beryl-frontend`)**

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com www.your-domain.com;

    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;

    # SSL configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;

    # Security headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;

    root /home/berylschool/app/berylintlschl-v2/client/.next;
    index index.html;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    location /api/ {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 📊 Monitoring & Maintenance

### 1. PM2 Monitoring

```bash
# Monitor applications
pm2 monit

# View logs
pm2 logs

# Check status
pm2 status

# Restart applications
pm2 restart all
```

### 2. System Monitoring

```bash
# Install monitoring tools
sudo apt install htop iotop nethogs -y

# Monitor system resources
htop
```

### 3. Log Management

```bash
# View Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log

# View application logs
pm2 logs beryl-backend
pm2 logs beryl-frontend
```

### 4. Backup Strategy

```bash
# Create backup script
nano /home/berylschool/backup.sh
```

```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/home/berylschool/backups"

# Create backup directory
mkdir -p $BACKUP_DIR

# Backup application files
tar -czf $BACKUP_DIR/app_$DATE.tar.gz /home/berylschool/app

# Backup environment files
cp /home/berylschool/app/berylintlschl-v2/backend/.env $BACKUP_DIR/env_backend_$DATE
cp /home/berylschool/app/berylintlschl-v2/client/.env.production $BACKUP_DIR/env_frontend_$DATE

# Clean old backups (keep last 7 days)
find $BACKUP_DIR -name "*.tar.gz" -mtime +7 -delete
find $BACKUP_DIR -name "env_*" -mtime +7 -delete

echo "Backup completed: $DATE"
```

```bash
# Make executable
chmod +x /home/berylschool/backup.sh

# Add to crontab (daily backup at 2 AM)
crontab -e
# Add: 0 2 * * * /home/berylschool/backup.sh
```

### 5. Update Strategy

```bash
# Create update script
nano /home/berylschool/update.sh
```

```bash
#!/bin/bash
cd /home/berylschool/app/berylintlschl-v2

# Pull latest changes
git pull origin main

# Update backend
cd backend
npm install
npx prisma generate
npx prisma db push
npm run build
pm2 restart beryl-backend

# Update frontend
cd ../client
npm install
npm run build
pm2 restart beryl-frontend

echo "Update completed: $(date)"
```

## 🔧 Troubleshooting

### Common Issues

#### 1. Application Not Starting

```bash
# Check PM2 status
pm2 status

# Check logs
pm2 logs

# Restart applications
pm2 restart all
```

#### 2. Database Connection Issues

```bash
# Test MongoDB connection
mongo "mongodb+srv://cluster.mongodb.net/beryl_school" --username username

# Check environment variables
cat /home/berylschool/app/berylintlschl-v2/backend/.env
```

#### 3. Nginx Issues

```bash
# Test Nginx configuration
sudo nginx -t

# Check Nginx status
sudo systemctl status nginx

# Restart Nginx
sudo systemctl restart nginx
```

#### 4. SSL Certificate Issues

```bash
# Check certificate status
sudo certbot certificates

# Renew certificates
sudo certbot renew

# Check SSL configuration
sudo nginx -t
```

#### 5. Port Conflicts

```bash
# Check what's using ports
sudo netstat -tulpn | grep :3000
sudo netstat -tulpn | grep :5000

# Kill processes if needed
sudo kill -9 <PID>
```

### Performance Optimization

#### 1. Database Optimization

```javascript
// Add indexes to MongoDB
db.students.createIndex({ firstName: 1, lastName: 1 });
db.results.createIndex({ studentId: 1, term: 1, session: 1 });
db.users.createIndex({ email: 1 });
```

#### 2. Nginx Optimization

```nginx
# Add to nginx.conf
worker_processes auto;
worker_connections 1024;
keepalive_timeout 65;
gzip on;
gzip_types text/plain text/css application/json application/javascript;
```

#### 3. PM2 Optimization

```javascript
// ecosystem.config.js
module.exports = {
  apps: [
    {
      name: "beryl-backend",
      script: "dist/server.js",
      instances: "max",
      exec_mode: "cluster",
      max_memory_restart: "1G",
      node_args: "--max-old-space-size=1024",
    },
  ],
};
```

## 📞 Support

### Emergency Contacts

- **Server Provider**: Your VPS provider support
- **Domain Registrar**: Your domain registrar support
- **MongoDB Atlas**: MongoDB Atlas support

### Monitoring Tools

- **PM2**: Process monitoring
- **Nginx**: Web server monitoring
- **Certbot**: SSL certificate monitoring
- **System**: Resource monitoring

---

**Last Updated**: December 2024  
**Version**: 2.0.0
