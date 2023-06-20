# Questionnaire based on Vue.js - Prisma - GraphQL Apollo

## For development:

#### Requirements: :whale:
* ```sh
   node >= v19.6.1
   ```
* ```sh
   npm >= 9.7.1
   ```
* ```sh
   docker >= 24.0.2
   ```
* ```sh
   docker compose  >= v2.18.1
   ```

#### How to run the postgresql database: :bar_chart:
1. Clone the repository
2. Run the docker compose command:
   ```sh
   cd ./server && docker-compose up -d
   ```
3. Check if the database is running on port `5432`:
   ```sh
   nc -zv localhost 5432
   ```

#### How to run the backend service: :rocket:

1. Add a .env file in the server directory with the following variables (check `.env.example`):
   * `DATABASE_URL ` 
2. Install the dependencies:
   ```sh
   npm install
   ```
3. Generate the Prisma client:
   ```sh
   npx prisma generate
   ```
4. Run migrations with Prisma:
   ```sh
   npx prisma migrate dev
   ```
5. Run the development server:
   ```sh
   npm run dev
   ```
6. For testing, run:
   ```sh
   npm run test
   ```

#### How to run the frontend: :nail_care:
1. Go to the client directory:
   ```sh
   cd ./client
   ```
2. Install the dependencies:
   ```sh
   npm install
   ```
3. Run the development server:
   ```sh
   npm run dev
   ```


## For production:

*Cooming soon...*