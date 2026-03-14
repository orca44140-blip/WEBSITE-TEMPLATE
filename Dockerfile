# Use official Apache image
FROM httpd:2.4-alpine

# Set working directory inside container
WORKDIR /usr/local/apache2/htdocs/
# Copy your HTML files into Apache’s web root
COPY . .

# Expose port 80 for HTTP traffic
EXPOSE 80

# Apache runs automatically with this base image
