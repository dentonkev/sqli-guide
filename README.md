# SQL Guide

This project was my Something Awesome for the course COMP6841 which I took in 24T3. It is a platform designed to teach users about SQL injection through interactive challenges. 

**Note:** Use a chromium based browser to run the project since other browser such as Firefox blocks cross-origin resource sharing (cors).

## Installation
Follow these steps to setup the project on a Mac.

1. **Clone the Repository**
```bash
# Via ssh 
git clone git@github.com:dentonkev/sqli-guide.git

# OR 

# Via http
git clone https://github.com/dentonkev/sqli-guide.git

cd sqli-guide
```
2. **Install PostgreSQL:**

- Install postgresql using homebrew:
```bash
brew install postgresql@15
```

- Start the PostgreSQL service:
```bash
brew services start postgresql@15
```

- Create the database:
```bash
createdb sqli_guide
```

3. **Backend**
- Navigate to the backend directory:
```bash
cd backend
npm install
```

4. **Frontend**
- Navigate to the frontend directory:
```bash
cd ../frontend
npm install
``` 

## Setup
Before running the project, you need to set up environment variables. Since the `.env` file is not included in the repository, create a `.env` file in the `backend` directory with the following contents:
```
PORT=5000
HOST=localhost
DATABASE=sqli_guide
DB_PORT=5432
```

## Database Setup
**Note:** First ensure the PostgreSQL database (`sqli_guide`) is already created, and PostgreSQL is running.

Load the schema and questions in the `backend` directory.
```bash
psql -d sqli_guide -f src/db/schema.sql
psql -d sqli_guide -f src/db/questions.sql
```

## Running the Project
1. **Backend**

- In the `backend` directory run:
```bash
npm start
```

2. **Frontend**

- In a new terminal in the `frontend` directory run:
```bash
cd ../frontend
npm start
```

Once both servers are running, you can access the platform at http://localhost:3000.

**Note:** Backend should be running on port 5000 and cors allows connection between frontend and backend. 