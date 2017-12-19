---
title: "Wordpress Migration (continuation from Nginx Migration)"
tags:
  - wordpress
  - nginx
  - virtual host
date: "2016-10-11T18:33:00.000Z"
---

After some trial and error, Wordpress migration was a success. The toughest part was getting the site to run with the new host's nameservers (as the other sites were simply using the same ones as the old host - the domain's nameservers). It only takes a bit of head-wrapping to get it to click.

Since I'm keeping the same domain after the migration, the database is exactly the same. So to migrate, it's a case of exporting the database and moving the files to the new host. The export can be done through PHPMyAdmin or through one of Wordpress's plugins (I used [WP-DB-Backup](https://wordpress.org/plugins/wp-db-backup/)). Then I zip the site files and download it to my computer, then upload it to the new host via FTP, such as Filezilla.

From my new host's control panel, I had to create a new DNS zone for the domain. Then inside, the three nameservers have been set up with NS records to the public IP address so that's all good. There are two records to be added for the domain to be resolved correctly: an A record with the name of the domain, and an A record for `www`.

Now to add the domain as a virtual host. Wordpress uses PHP so it's the same deal as setting up a PHP subdomain I covered earlier, but since this is a domain and not a subdomain, the nginx file will look like this:

[Gist](https://gist.github.com/jyntran/c23abf8cf6f95a53081c0f4d3257677b)

    server {
    	listen 80;

    	server_name huateasa.tk www.huateasa.tk;

    	root /var/www/huateasa.tk;
    	index index.php index.html index.htm;

    	location / {
    		try_files $uri $uri/ /index.php?$args;
    	}

    	location ~ \.php$ {
    		include snippets/fastcgi-php.conf;

    		# With php7.0-cgi alone:
    		#fastcgi_pass 127.0.0.1:9000;
    		# With php7.0-fpm:
    		fastcgi_pass unix:/run/php/php5.6-fpm.sock;

    		fastcgi_param REQUEST_METHOD $request_method;
       		fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
    	}

        location = /favicon.ico {
            log_not_found off;
            access_log off;
        }

        location = /robots.txt {
            allow all;
            log_not_found off;
            access_log off;
        }

        location ~ /\. {
            deny all;
        }

        location ~* /(?:uploads|files)/.*\.php$ {
            deny all;
        }
    }

It's important to note the PHP segment of the file: Ubuntu 16.04 uses PHP7, which is the latest update, but this does not support MySQL (it uses MySQLi and PDO instead). However my site uses MySQL and I do not want to change the database settings just yet. So I install PHP5.6 in order to let Wordpress maintain its MySQL database connections. This is shown here in the configuration file.

So I got the nginx files and the DNS records set up, now to take care of the database. Since this is on a new VPS, I need to install MySQL.

    $ sudo apt-get install mysql-server php-mysql

    $ sudo /etc/init.d/mysql restart

Now to start using mysql:

    $ mysql -u root -p

First, I need to recreate the main database. I checked the name of the database that was used before on the old host and enter it in:

    CREATE DATABASE wp-db

I also recreate the user that was used before with a new and secure password:

    CREATE USER wp-user@localhost IDENTIFIED BY 'password';

Finally, give the user the proper privileges, and let MySQL flush privileges so it updates with the recent changes:

    GRANT ALL PRIVILEGES ON wp-db.* TO wp-user@localhost;
    FLUSH PRIVILEGES;

Done with MySQL setup! Now let's get out of here:

    exit

Make sure everything is fine by going through the admin page of the Wordpress site (wpdomain.com/admin).

If pretty permalinks do not work, it may need a quick re-save by going to Settings > Permalinks then Save Changes.
