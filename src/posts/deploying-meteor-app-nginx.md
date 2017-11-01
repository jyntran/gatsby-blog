---
title: "Deploying a Meteor App on Nginx"
tags:
  - meteor
  - nginx
  - deployment
  - linux
  - ubuntu
date: "2017-06-07T04:00:00.000Z"
---


I finally finished my [portfolio site](http://jyntran.ca)! I used Kube as the main CSS framework and React for the Javascript. On the back end is Meteor as it was easy to set up and get going.

The idea is a single page application (SPA) which consists of displaying my projects and a contact form, supported by Mailgun.

After completing it all, there are several things to take care of.

## Remove insecure and autopublish packages

The `insecure` and `autopublish` packages are automatically included at the start of a Meteor app using `meteor create`, but for production purposes they should be removed.

	$ cd portfolio
	$ meteor remove insecure
	$ meteor remove autopublish

However, the projects I have added are now gone from the client. This is not a problem if I finished [step 10 of the Meteor tutorial](https://www.meteor.com/tutorials/react/publish-and-subscribe):

In my `imports.api.projects.js`, let's publish:

	export const Projects = new Mongo.Collection('projects');
  
	if (Meteor.isServer) {
	  // This code only runs on the server
	  Meteor.publish('projects', function projectsPublication() {
	    return Projects.find();
	  });
	}

	// ...

And in my `imports/ui/App.jsx`, let's subscribe:

	// ...

	export default createContainer(() => {
	  Meteor.subscribe('projects');

	// ...

## Ensure private keys are safely hidden

A bad habit to get into is using private keys (e.g. for APIs) in the source code. It wouldn't do to commit them on GitHub so everyone can see. So for this Meteor app, I use a `settings.json` to place my keys in.

	{
        "private": {
            "mailgun" : {
                    "mail_url" : "smtp://YOURDOMAIN:YOURPASSWORD@smtp.mailgun.org:587"
            }
    	},
        "public": {
                "resume" : "dl/jensen-tran-cv.pdf",
                "github" : "https://github.com/jyntran"
        }
    }

This will be added into Meteor when running the command `meteor --settings settings.json`, so I don't need to worry about it.

Make sure to add it to the `.gitignore` in the project folder as well.

## Copy the MongoDB database

On my site, I have a single collection called `projects` with 6 objects.

Here is how to export the database to a JSON file for a future import.

	$ meteor mongo --url
	> mongodb://127.0.0.1:3001/meteor

	$ mongoexport --host 127.0.0.1 --port=3001 --db meteor --collection projects --out projectsexport.json

## Make a new user

To keep things secure, I need to have a non-root user devoted to running the app.

	$ useradd -s /bin/bash -m -d /home/safeuser -c "safe user" safeuser

	$ passwd safeuser

	$ usermod -aG sudo safeuser

## Set up MongoDB

First, make sure that MongoDB is installed.

	$ sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927

	$ echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list

	$ sudo apt update
	$ sudo apt install -y mongodb

Check that it works.

	$ mongo

Now, update `\etc\mongod.conf` so that replication is active for this new database.

	# rest of mongod.conf
	# ...

	# add the following with the name of the database
	# in my case, "meteor"
	replSet = meteor

After modifying the configuration, restart Mongo.

	$ sudo service mongodb restart

	$ mongo
	> var config = {_id: "meteor", members: [{_id: 0, host: "127.0.0.1:27017"}]}
	> rs.initiate(config)
	> rs.status()

The response for `rs.status()` should be along the lines of this: 

	{
		"set" : "meteor",
		"date" : ISODate("2017-06-08T00:23:20Z"),
		"myState" : 1,
		"members" : [
			{
				"_id" : 0,
				"name" : "127.0.0.1:27017",
				"health" : 1,
				"state" : 1,
				"stateStr" : "PRIMARY",
				"uptime" : 68579,
				"optime" : Timestamp(1496812871, 6),
				"optimeDate" : ISODate("2017-06-07T05:21:11Z"),
				"electionTime" : Timestamp(1496812821, 11),
				"electionDate" : ISODate("2017-06-07T05:20:21Z"),
				"self" : true
			}
		],
		"ok" : 1
	}

Now that MongoDB is set up, I can import the database from development:

	$ sudo mongoimport --db meteor --collection projects --file projectsexport.json
	> connected to: 127.0.0.1
	> imported 6 documents

To double-check, enter the following;

	$ mongo meteor
	> db.projects.count()
	> 6

So far, so good!

## Create Meteor build

My app is done, but it still needs to be exported properly for deployment.

Time to enter the project folder, called `portfolio`, and proceed to making a Meteor bundle. This will be outputted outside the project folder. I also passed in my deployment server's architecture.

	$ cd portfolio
	$ meteor build ../output --architecture os.linux.x86_32

After the process is done, get a copy of the archive file in `output` called `portfolio.tar.gz` to where the deployment will take place.

	$ cd ../output; ls
	> portfolio.tar.gz

## Install the build on the server

Now on the deployment server, I log in with the safe user I made earlier, and make a new folder in `/opt/portfolio`:

	$ cd /opt
	$ sudo tar -xzf portfolio.tar.gz

A `bundle` directory appears, but feel free to rename it. I changed it to `portfolio` myself.

	$ sudo mv bundle portfolio

Now for the app installation!

	$ cd portfolio/programs/server
	$ sudo npm install

## Run the app with pm2

Using pm2, I can keep the app running without my supervision.

First, install pm2, and set it up so that it runs on startup, in case the machine needs to restart.

	$ sudo npm install pm2 -g
	$ sudo pm2 startup ubuntu

Now, let's create a configuration file for pm2

	$ cd ~
	$ vim pm2.json

Here is where I can define the apps I want pm2 to run. The following is a template for `pm2.json`.

	"apps": [{
	  "name": "portfolio",
	  "cwd": "/opt/portfolio",
	  "script": "main.js",
	  "env": {
	    "NODE_ENV": "production",
	    "WORKER_ID": "0",
	    "PORT": "3000",
	    "ROOT_URL": "http://jyntran.ca",
	    "MONGO_URL": "mongodb://localhost:27017/meteor",
	    "MONGO_OPLOG_URL": "mongodb://localhost:27017/local",
	    "HTTP_FORWARDED_COUNT": "1",
	    "METEOR_SETTINGS": {
	        "private": {
                "mailgun" : {
                        "mail_url" : "smtp://YOURDOMAIN:YOURPASSWORD@smtp.mailgun.org:587"
                }
        	},
	        "public": {
	                "resume" : "dl/jensen-tran-cv.pdf",
	                "github" : "https://github.com/jyntran"
	        }
	    }
	  }
	}]

Some things to note:
- the port here is 3000 so change it to whichever suits your needs
- change the ROOT_URL to the proper domain
- add Meteor settings files such as `settings.json` if they exist

Finally, I can start pm2 by entering this command:

	$ sudo pm2 start pm2.json

It should run on the domain and port 3000. Well done.

## Set up nginx

For my portfolio site, I want it to run on port 8080 as that is the port for HTTP. So I changed the port in my `pm2.json`.

Now for the nginx configuration, make a copy of the default nginx configuration file for the app.

	$ cd /etc/nginx/sites-available
	$ sudo cp default portfolio.conf
	$ sudo vim portfolio.conf

Let's modify some settings:

	server {
		listen 80;
		listen [::]:80;

		server_name jyntran.ca www.jyntran.ca;

		location / {
        	proxy_pass http://localhost:8080;
		}
	}

After saving, make sure there's a symbolic link to `sites-enabled` so that the site is activated.

	$ sudo ln -s /etc/nginx/sites-available/portfolio.conf /etc/nginx/sites-enabled/portfolio.conf

Perform an nginx configuration test:

	$ sudo nginx -t
	> nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
	> nginx: configuration file /etc/nginx/nginx.conf test is successful

Then reload nginx:

	$ sudo service nginx restart

## It's alive!

Now the app should be live and running on the chosen domain.

You can view my portfolio here to see it in action:

http://jyntran.ca

### Helpful sources

- https://github.com/pkumar-uk/meteor-deploy
- https://www.digitalocean.com/community/tutorials/how-to-deploy-a-meteor-js-application-on-ubuntu-14-04-with-nginx
- https://www.meteor.com/tutorials/react/publish-and-subscribe
- https://themeteorchef.com/tutorials/making-use-of-settings-json