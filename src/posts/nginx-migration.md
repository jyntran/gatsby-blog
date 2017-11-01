---
title: "Nginx Migration"
tags:
  - nginx
  - php
  - nodejs
  - virtual host
date: "2016-10-04T21:35:00.000Z"
---

On a new VPS, nothing has been set up, so I have to make sure everything is installed and working.

    $ sudo apt-get install nginx

For allowing PHP sites to run properly, I needed to have php installed:

    $ sudo apt-get install php-cli
    $ sudo apt-get install php-fpm

Next, the domain and subdomain setup must be configured. The way virtual hosts on nginx works is very similar to Apache2, so that was a relief.

Make sure your current directory is `/etc/nginx/sites-available/`.

## Public IP

Basically this follows from nginx's default configuration, so it was really simple to get it up and running. This site will be displayed when I go directly to the public IP.

[Gist](https://gist.github.com/jyntran/cce000b3a673dba1f88396c5538fb3ea)

    server {
        listen 80 default_server;
        listen [::]:80 default_server;

        root /var/www/default_html;
        index index.html index.htm index.nginx-debian.html;

        server_name localhost;

        location / {
            # First attempt to serve request as file, then
            # as directory, then fall back to displaying a 404.
            try_files $uri $uri/ =404;
        }
    }

## Domain (nodeJS)

This one will host my nodeJS site, currently served from port 8080. This is where my domain will take me.

[Gist](https://gist.github.com/jyntran/f5fbf268b3c07dbcd5e63797ba662790)

    server {
    	listen 80;
    	listen [::]:80;

    	server_name jyntran.ca www.jyntran.ca;

    	location / {
        		proxy_pass http://localhost:8080;
    		proxy_http_version 1.1;
    		proxy_set_header Upgrade $http_upgrade;
    		proxy_set_header Connection 'upgrade';
    		proxy_set_header Host $host;
    		proxy_cache_bypass $http_upgrade;
    	}
    }

## Subdomain

A site on a subdomain with nothing fancy - just HTML/CSS/JS.

[Gist](https://gist.github.com/jyntran/bf1b342eebe99124f1aebc37c1c8da4d)

    server {
    	listen 80;
    	listen [::]:80;

    	server_name findbenji.jyntran.ca;

    	root /var/www/findbenji.jyntran.ca/src;
    	index index.html index.htm;

    	location / {
    		# First attempt to serve request as file, then
    		# as directory, then fall back to displaying a 404.
    		try_files $uri $uri/ =404;
    	}
    }

## Subdomain (nodeJS)

My Hexo blog is also a nodeJS site, served from port 4000.

[Gist](https://gist.github.com/jyntran/031f5a275e6f0ba9e82920f0e3a8eb40)

    server {
    	listen 80;
    	listen [::]:80;

    	server_name blog.jyntran.ca;

    	location / {
    		proxy_pass http://localhost:4000;
    		proxy_http_version 1.1;
    		proxy_set_header Upgrade $http_upgrade;
    		proxy_set_header Connection 'upgrade';
    		proxy_set_header Host $host;
    		proxy_cache_bypass $http_upgrade;
    	}
    }

## Subdomain (PHP)

The following is for any simple PHP site on a subdomain.

[Gist](https://gist.github.com/jyntran/aaef37bb4c2290dad0a7f91820307890)

    server {
    	listen 80;
    	listen [::]:80;

    	server_name absolution.jyntran.ca;

    	root /var/www/absolution.jyntran.ca/public;
    	index index.php;

    	location / {
    		# First attempt to serve request as file, then
    		# as directory, then fall back to displaying a 404.
    		try_files $uri $uri/ =404;
    	}

    	# pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
    	#
    	location ~ \.php$ {
    		include snippets/fastcgi-php.conf;

    		# With php7.0-cgi alone:
    		#fastcgi_pass 127.0.0.1:9000;
    		# With php7.0-fpm:
    		fastcgi_pass unix:/run/php/php7.0-fpm.sock;

    		fastcgi_param REQUEST_METHOD $request_method;
    		fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
    	}
    }

Once I figure it out, I will cover setting up a Wordpress site on a virtual host and add it to this entry.

After finishing all the configuration files, make sure there's a symbolic link between the `sites-available` and the `sites-enabled` files.

    sudo ln -s /etc/nginx/sites-available/default /etc/nginx/sites-enabled/default

Repeat for all hosts. Now it's time to restart nginx.

    sudo service nginx start

If that did not seem to restart nginx, you may have to use this command instead:

    sudo systemctl restart nginx && sudo service nginx start

The second half of the command may be all you need, but I found that I had to add the first half to ensure nginx is indeed restarted.

Now test out the sites and see if it works!