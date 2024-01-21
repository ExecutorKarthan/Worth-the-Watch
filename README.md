# Worth-the-Watch
This is a group project that lets you view movie reviews submitted by blog members. It can be found here: [https://worth-the-watch-4fed4e43ed4e.herokuapp.com/](https://worth-the-watch-4fed4e43ed4e.herokuapp.com/).

## Description
This application is dedicated to allowing users to find and leave reviews on any movie. If a movie does not exist in the database and a user wants to leave a review, they are prompted to add the movie with their review. Users can also view reviews left by other users. The application also utilizes bcrypt to allow a user to save a stored, hashed password. This password is then used for verification to ensure a user is logged into their account. Without this login, the app will restrict user activity in the app until the user authenticates via logging in. When logged in, users can view their dashboard which displays a list of all reviews left by that user with the option to edit or delete those reviews. 

## Installation
This project requires the following packages to function:
1) "bcrypt" which can be found at [https://www.npmjs.com/package/bcrypt](https://www.npmjs.com/package/bcrypt) 
2) "connect-session-sequelize" which can be found at [https://www.npmjs.com/package/connect-session-sequelize](https://www.npmjs.com/package/connect-session-sequelize)
3) "dotenv" which can be found at [https://www.npmjs.com/package/dotenv](https://www.npmjs.com/package/dotenv)
4) "express" which can be found at [https://expressjs.com/](https://expressjs.com/) 
5) "express-handlebars" which can be found at [https://www.npmjs.com/package/express-handlebars/v/5.2.0](https://www.npmjs.com/package/express-handlebars/v/5.2.0)
6) "express-session" which can be found at [https://www.npmjs.com/package/express-session](https://www.npmjs.com/package/express-session)
7) "handlebars" which can be found at [https://handlebarsjs.com/](https://handlebarsjs.com/)
8) "mysql2" which can be found at [https://www.npmjs.com/package/mysql2](https://www.npmjs.com/package/mysql2)
9) "sequelize" which can be found at [https://sequelize.org/docs/v6/](https://sequelize.org/docs/v6/)

The user must also have a .env file with their SQL credentials stored for the program to interact with the SQL database locally. Otherwise, this program runs via Heroku and requires no installations.

## Usage
Once installed, the user needs to start their npm server with the command '''npm start''. Then the user can navigate to "hostlocal:3001" to see the app. Alternatively, a user can navigate to [https://worth-the-watch-4fed4e43ed4e.herokuapp.com/](https://worth-the-watch-4fed4e43ed4e.herokuapp.com/). From there, the user can have the web experience of the app. 

## License
![License: MIT License](https://img.shields.io/badge/License-MIT-red)

## Contributing
Alex Messina (Github: [ExecutorKarthan](https://github.com/ExecutorKarthan))
Zach Elbring (Github: [elbringz](https://github.com/elbringz))
Jared Woodcock (Github: [JaredWoodcock](https://github.com/JaredWoodcock))
Katy Thompson (Github: [katycaroline](https://github.com/katycaroline))

## Tests
No tests were prepared for this project.

## Questions
This project can be found at [https://github.com/ExecutorKarthan/Worth-the-Watch](https://github.com/ExecutorKarthan/Worth-the-Watch).
