#!/bin/bash
# This script is used to initialize the Postgresql database
docker pull postgres:latest
docker run -d -p 5432:5432 --name my-postgres -e POSTGRES_DB=foxbase -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=password -v ./db-data:/var/lib/postgresql/data -it postgres:latest
