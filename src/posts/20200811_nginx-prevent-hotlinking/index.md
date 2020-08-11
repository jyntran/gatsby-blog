---
title: "Preventing Hotlinking with Nginx"
tags:
  - nginx
  - hotlinking
date: "2020-08-11T04:01:00.000Z"
---

I will be going over how to prevent hotlinking with Nginx.

[Hotlinking](https://en.wikipedia.org/wiki/Inline_linking) refers to accessing objects, usually images, through ways aside from the original site. This includes external sites embedding objects and requesting the object on its own directly through the address bar.

Nginx has a module called [ngx_http_referer_module](http://nginx.org/en/docs/http/ngx_http_referer_module.html) with an example configuration in its documentation.

For this, I needed to use the `valid_referers` directive to list the referers that are considered valid and can make the requests, and `$invalid_referer` as a condition to handle the logic for any other referers.

Note that `server_names` is used to refer to the `server_name` value declared on the `server` level.

```
# disable direct linking
valid_referers server_names *.jyntran.ca;
if ($invalid_referer) {
	return 403;
}
```

There is also the `error_page` directive to support a custom error page to load upon certain HTTP status codes.

```
# custom error page
# HTTP status code, then the path to the page
# this one is relative to root
error_page 403 /403.html
```

Here is a quick example of an Nginx server with disabled hotlinking on the `assets` subdirectory.

```
server {

	server_name site.jyntran.ca
	root /var/www/html

	location / {
		try_files $uri $uri/ =404;
	}

	location /assets/ {

		# custom error page
		error_page 403 /403.html;

		# disable direct linking
		valid_referers server_names *.jyntran.ca;
		if ($invalid_referer) {
			return 403;
		}
	        
	}

}
```

The [Gist](https://gist.github.com/jyntran/32e97587b0c718ff03e0aed184a1dfe3) link if you're interested.