# Create USER-API

deskripsi singkat 

## Deskripsi Proyek

Proyek ini adalah aplikasi web yang memungkinkan pengguna untuk melakukan operasi CRUD (Create, Read, Update, Delete) pada data pengguna. Aplikasi ini menggunakan Node.js sebagai backend, Express.js untuk routing, dan MongoDB sebagai database.

## Instruksi Install dan Menjalankannya

Pastikan anda sudah menginstall node.js (versi terbaru),  mongoDB dan npm 

### Langkah-Langkah Instalasi

1. Clone repositori ini ke penyimpanan local anda
    ```bash
    git clone https://github.com/ramadhanySS/rimba-fullstack-evaluation.git
2. cd user-api
3. npm install / npm i
4. configurasi pada .env dengan format beribuk 

SERVICE_NAME=server
SECRETE_KEY=ramadhany
DB_HOST=localhost
DB_PORT=27017
DB_USER=eduwork
DB_PASS=dhany12
DB_NAME=user-api

5. jalankan dengan npm start

## Uji test dan demo

1. Menggunakan npx jest tests/user.test.js
2. insomnia 

GET: http://localhost:3002/users/
GETID: http://localhost:3002/users/id
POST: http://localhost:3002/users/
PUT: http://localhost:3002/users/id
DELETE: http://localhost:3002/users/id

## Teknologi yang digunakan


Backend: Node.js, Express.js
Database: MongoDB
Validasi Input: express-validator

## Penulis

Ramadhany Setiawan Shogira