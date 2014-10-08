#!/bin/bash
mongod --dbpath=/home/fede/mongodb_data  --port 27017 --smallfiles &
node server.js
