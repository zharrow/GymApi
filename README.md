# Gym Management API

<<<<<<< Updated upstream
About this projet
This is a school projet where we have to develop an API about any thing we want. I choose Gym Management where user can subscribe to one or many gyms, they can found on a map
=======
## About this project
This is a school project where we have to develop an API about anything we want. I chose Gym Management, where users can subscribe to one or many gyms that they can find on a map.

## Getting Started with Docker

### Prerequisites
- Install [Docker](https://www.docker.com/get-started)
- Install [Docker Compose](https://docs.docker.com/compose/install/)

### Running the project

1. Clone the repository:
   ```bash
   git clone <repo_url>
   cd <repo_name>
   ```

2. Create a `.env` file and configure the necessary environment variables:
   ```env
   DATABASE_URL="mysql://gymuser:gympass@db:3306/gymdb"
   ```

3. Build and start the services using Docker Compose:
   ```bash
   docker-compose up --build
   ```

4. Run Prisma migrations to set up the database:
   ```bash
   docker exec -it gym_api npx prisma migrate dev --name init
   ```

5. The API should now be running on `http://localhost:3000`

### Stopping the project
To stop the running containers:
```bash
docker-compose down
```

### Running the project without Docker
If you prefer to run the project manually:
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the server:
   ```bash
   npm start
   ```

## API Documentation
The API is documented using OpenAPI. You can access the API docs at:
```
http://localhost:3000/api-docs
```
>>>>>>> Stashed changes
