# SmartBrain

SmartBrain uses AI to automatically detect faces (other objects soon), and has a secure back-end with an encrypted SQL database for login details. Currently live; check it out ^ and have a go. Check out the back-end source code on my <a href="https://github.com/yusufabukar/smartbrain-api">SmartBrain-API</a> repository.

# Tech Stack
* **Front End**
  * HTML5
  * CSS3
  * JavaScript
  * React

* **Back End**
  * Node
  * Express

* **Database**
  * PostgreSQL
  
# Cloning this project
* Clone the API repo and edit the ```process.env``` environment variables to your own
  * ```process.env.PORT``` -> any open port
  * ```process.env.API_CLARIFAI``` -> you will need your own API key from Clarifai
  * ```process.env.DATABASE_URL``` -> your own server link
  * (```knex``` connection settings need to be change if you are using ```localhost``` )
  
* Clone this repo and put in your own back end links
* Create a PostgreSQL database with 2 tables, users and login
* Check the ```package.json``` for dependencies and versions you need
