# Anchiale

## About

**Anchiale was the Titan goddess of the warming heat of fire.**

Anchiale is an internet of things solution for temperature sampling with raspberry pi. It is designed around a scalable architecture, so it is capable of handling a big sample rate.

## Installation

Clone the project:

    git clone git@github.com:xrazis/Anchiale-pi.git

## Run Locally

NPM install

    npm install --prefix ./client
    npm install --prefix ./server

## Development mode

Running the server

    npm run dev prefix ./server

Running the client

    npm run dev prefix ./client

You can span as many clients as you want!

## Run in Docker

Start the database

    bash ./database/database.sh

Configure the database on localhost:8086. Be sure to set and export the token, org and bucket on /server/config/creds.ts.

Start the server

    bash ./server/server.sh

Start the client

    bash ./client/client.sh

> Note: This guide assumes that you run all containers localy and use the tempTestMeasure() on client.
