# 2dv610

## Assignment 1. Part 2. XUnit testing

### description
This web app will sync the embedded youtube player to all visitors. Meaning if one visitor stops the video, it stops for everyone. If one visitor changes the url to another video, it will change for everyone.

### Installation
* Requires node.js.
* Run `npm install` to install all dependencies.

### Run & build
* `npm start` will start the webserver
* `npm run dev` will do 3 things:
  * start the webserver using nodemon which will automatically restart the server on file change
  * Watch client script files and automatically build bundle.js with browserify
  * Automatically re-run tests on save
* `npm run build` to build bundle.js

### testing
* `npm test` to run tests
* `npm run cover` for test coverage
