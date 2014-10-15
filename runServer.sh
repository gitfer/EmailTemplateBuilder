#!/bin/bash
mongod --dbpath=/home/fede/mongodb_data  --port 27033 --smallfiles &
node server.js
