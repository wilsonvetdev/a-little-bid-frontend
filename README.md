# A-Little-Bid
The single-page app is intended to allow a user to post job information and allows contractors to submit bid-related information to home constructions.  * Not deployed *

# General Info
A-Little-Bid is a Flatiron School Web Developement Module 3 project to demonstrate working knowledge of drawing an ERD(entity relational database), Active Records Associations, Create, Read, Update and Delete (CRUD) methods, a developer's knowledge of Ruby on Rails, and heavy focus into Vanilla Javascript for interactions between user and browser. A passing requirement of this project is the user being able to perform actions without triggering a full-page refresh.

# Tech Stack
This web app employs the following technologies(not inclusive):

* Ruby [2.6.1]
* Rails [6.0.3.2]
* Vanilla Javascript - enables the building of single page applications
* PostgresQL - Database
* Faker - seed fake data for rendering and behavior driven development purposes
* rack-cors - provides support for Cross-Origin Resource Sharing for Rack compatible web applications(allows the front-end portion of this project to perform fetch requests)
* active_model_serializers - allows customization and rendering of data in JSON format as responses to requests
* Bootstrap 4 - styling


# Set-Up
1. clone this repo to your local environment -- git clone < git repository >
2. cd(change directory) into the repo
3. cd into the frontend repo and type 'open index.html' into your command line
* **NOTE: This requires a few more steps. Please read below.**
4. visit https://github.com/wilsonvetdev/a-little-bid-api
5. clone the backend/api repo to your local environment -- git clone < git repository >
6. $ bundle install - installs gems and dependencies
7. $ rails db:migrate - creates the tables for the database
8. $ rails db:seed - seed the data necessary
9. rails s to start the server
10. With the server running as a result from Step 9, the application should be working in the browser now.

# What's Next?
Database schema will need to be updated with more tables to add more features. Frontend will also be greatly improved, and will be revisited in the future after the end of the Web Dev Fellowship at Flatiron. Javascript code needs refactoring and make more modular. I actually might rewrite all the code from scratch and use React instead. I really want to deploy this after I'm finished with Flatiron Fellowship.

# Nice to have features(not final):

* Authentication & Authorization
* Better editing capabilities on job posts and bid posts

# Known Issues so far:
* Bid editing can only be edited once after submitting.
* Submitting multiple bids on the same job post is buggy(it seems to trigger a full-page refresh).

# Sample Images(video walk-through coming soon):
![project sample image](https://github.com/wilsonvetdev/a-little-bid-api/blob/master/app/images/Screen%20Shot%202020-10-01%20at%204.01.58%20PM.png)
![project sample image](https://github.com/wilsonvetdev/a-little-bid-api/blob/master/app/images/Screen%20Shot%202020-10-01%20at%204.02.45%20PM.png)

**The form for a home owner to add a new job post.**
![project sample image](https://github.com/wilsonvetdev/a-little-bid-api/blob/master/app/images/Screen%20Shot%202020-10-01%20at%204.14.43%20PM.png)
