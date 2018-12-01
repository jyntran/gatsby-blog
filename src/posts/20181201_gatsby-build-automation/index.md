---
title: "Gatsby Build Automation"
tags:
  - gatsby
  - git
  - hooks
  - blog
date: "2018-12-01T04:01:00.000Z"
---

What I wanted to simplify for myself is the following process:
- write a blog post on Sublime Text on my laptop
- push it to the repository's master branch
- push it to the production server
- Gatsby builds all the static files and deploys it

Thanks to [DigitalOcean's guide on automating with Git hooks](https://www.digitalocean.com/community/tutorials/how-to-use-git-hooks-to-automate-development-and-deployment-tasks), I was able to set everything up the way I want it.

Several locations need to be established.
- My local machine:
  - `/home/localuser/git/blog/`
- My remote production server:
  - `/home/remoteuser/blog`
  - `/var/www/blog/prod`

### Nginx setup

On my remote machine, Nginx is installed and is statically serving my blog domain, `blog.jyntran.ca`.

If it's not already, you may need to go through the [installation process](https://www.nginx.com/resources/wiki/start/topics/tutorials/install/):

```
sudo apt-get update
sudo apt-get install nginx
``` 

Inside a new file called `/etc/nginx/sites-available/blog`:

```
server {
        listen 80;
        listen [::]:80;

        server_name blog.jyntran.ca;
        root /var/www/blog/prod/public;
        index index.html;
        ...
```

Notice how the root is going to the subdirectory `public`? It's the place where the static files, including `index.html` will reside after a build.

Now make a symlink to `sites-enabled`, check that your Nginx configurations are ok, then restart Nginx. Note: you may need `sudo` for these commands.

```
ln -s /etc/nginx/sites-available/blog /etc/nginx/sites-enabled/blog
nginx -t
service nginx reload
```

### Production directory

I set up a space for the production blog at `/var/www/blog`.

Inside it I set up a directory where the push happens.

```
cd /var/www/blog
mkdir prod
cd prod
```

Make sure the user has proper privileges to write to the folder:

```
sudo chown -R `whoami`:`id -gn` /var/www/blog/prod
```

### Git hook

Now go to the home directory, and create a directory for the blog's Git hooks will be.

```
cd ~/blog
git init --bare
```

With the `--bare` argument, this creates a Git instance with no working directory. Since my working directory is on my local machine, this is fine with me.

Now, for the creation of the hook itself:

```
vim hooks/post-receive
```

And the contents, mostly ripped from the guide above:
```
#!/bin/bash

while read oldrev newrev ref
  do
    # ref = refs/head/master
    if [[ $ref =~ .*/master$ ]]; then
      echo "Master ref received. Deploying master branch to production..."
      git --work-tree=/var/www/blog/prod --git-dir=/home/remoteuser/blog checkout -f
      cd /var/www/blog/prod
      yarn install && gatsby build
    elseh
      echo "Ref $ref successfully received. Doing nothing: only the master branch may be deployed on this server."
    fi
  done
```   

What's happening here? Read in the received data: if the ref is referring to the master branch, checkout the repo in the production folder, and once in there, use Yarn to install any packages that's changed, and use Gatsby to build.

### Local setup

Now to set up the client side, that is, my local machine.

I have my remote origin set up to my GitHub repository. We need to do the same for the production repository.

Let's go to the working directory:

```
cd /home/localuser/git/blog
```

Before running these commands, make sure you replace some of these values: `remoteuser` and `server_domain_or_IP`, and `blog` if your home subfolder is named something else.

For pushing to both GitHub and to production:

```
git remote set-url --add --push origin git@github.com:jyntran/gatsby-blog.git
git remote set-url --add --push origin remoteuser@server_domain_or_IP:blog

```

Check them with the flag verbose:

```
git remote -v
```

And the result:

```
origin	git@github.com:jyntran/gatsby-blog.git (fetch)
origin	git@github.com:jyntran/gatsby-blog.git (push)
origin	remoteuser@server_domain_or_IP:blog (push)
```

### The final product

Now to test the push!

```
git push origin master
```

You might be prompted for the password of your production server if SSH keys are not set up. If you read the message that returns, you will now see the client message from the `post-receive` hook, as well as output from `yarn install` and `gatsby build`:

```
Counting objects: 6, done.
Delta compression using up to 4 threads.
Compressing objects: 100% (5/5), done.
Writing objects: 100% (6/6), 3.01 KiB | 0 bytes/s, done.
Total 6 (delta 3), reused 0 (delta 0)
remote: Resolving deltas: 100% (3/3), completed with 3 local objects.
To git@github.com:jyntran/gatsby-blog.git
 + a0c5a49...08aa6cb master -> master
remoteuser@server's password: 
Counting objects: 6, done.
Delta compression using up to 4 threads.
Compressing objects: 100% (5/5), done.
Writing objects: 100% (6/6), 3.01 KiB | 0 bytes/s, done.
Total 6 (delta 3), reused 0 (delta 0)
remote: Master ref received. Deploying master branch to production...
remote: yarn install v1.12.3
remote: success Already up-to-date.
remote: Done in 1.59s.
remote: Running gatsby build...
remote: success open and validate gatsby-configs — 0.013 s
remote: success load plugins — 0.377 s
remote: success onPreInit — 0.375 s
remote: success delete html and css files from previous builds — 0.076 s
remote: success initialize cache — 0.010 s
remote: success copy gatsby files — 0.085 s
remote: success onPreBootstrap — 0.021 s
remote: success source and transform nodes — 0.218 s
remote: success building schema — 0.656 s
remote: success createPages — 0.113 s
remote: success createPagesStatefully — 0.046 s
remote: success onPreExtractQueries — 0.000 s
remote: success update schema — 0.243 s
remote: success extract queries from components — 0.093 s
remote: success run graphql queries — 0.194 s — 6/6 31.22 queries/second
remote: success write out page data — 0.006 s
remote: success write out redirect data — 0.001 s
remote: success onPostBootstrap — 0.001 s
remote: 
remote: info bootstrap finished - 5.049 s
remote: 
remote: success Building production JavaScript and CSS bundles — 13.028 s
remote: success Building static HTML for pages — 2.542 s — 32/32 49.69 pages/second
remote: info Done building in 20.632 sec
To remoteuser@server:blog
 + a0c5a49...08aa6cb master -> master
``` 

Now that Gatsby has finished the build, the `/var/www/blog/prod/public` directory is populated with the static files for Nginx to find. 

Finally, it's all set - an automated Gatsby build process for the production server. Hurray!