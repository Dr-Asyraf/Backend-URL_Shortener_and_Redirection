# Backend-URL_Shortener_and_Redirection

A simple URL shortener service built with Node.js, Express and PostgreSQL.
This project allows users to create short URLs, retrieve the original URLs and generate CSV reports of all URLs.

## Features

- **Shorten URL**: Generate a short URL for a given destination URL.
- **Redirect**: Redirect from a short URL to the destination URL.
- **Generate Report**: Generate a CSV report of all URLs.

## Prerequisites

- Node.js
- PostgreSQL
- npm

## API endpoints

Authentication:
- POST /register : User registration
- POST /login : Useer login

URL management:
- POST /urls : Create short url
- GET /urls : List all urls
- GET /urls/:id : View url by id
- PUT /urls/:id : Update url by id
- DELETE /urls/:id : Delete url by id

Redirection:
- GET /:shortUrl : Redirect to the destination url

Analytics:
- GET /urls/:id/analytics : Get view count
- GET /urls/:id/report : Generate a CSV report of all urls

## Usage
- Use tools like Insomnia or Postman to test the API endpoints
