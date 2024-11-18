# LoginFlow

## Overview

**LoginFlow** is a simple Node.js-based backend application providing user authentication features such as user registration, login, and fetching user profile details. It uses JWT (JSON Web Token) for secure authentication and MySQL as the database.

---

## Prerequisites

Before starting, ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/en/download/) (v14 or above)
- [MySQL](https://dev.mysql.com/downloads/installer/) server

## Getting Started

### 1. Clone the Repository

To get a copy of the project up and running on your local machine:

```bash
git clone <repository-url>
```

### 2. Navigate to the Project Directory

```bash
cd LoginFlow
```

### 3. Set Up Environment Variables

Create a `.env` file in the root of the `LoginFlow` project directory. Add the following environment variables to configure your MySQL database and secret key:

```env
MYSQL_HOST="localhost"
MYSQL_USER="your-username"
MYSQL_PASSWORD="your-password"
MYSQL_DATABASE="database_name"
SECRET_KEY="your-secret-key"
```

Replace the values with your MySQL credentials and desired secret key for JWT.

### 4. Install Dependencies

```bash
npm install
```

### 5. Start the Server

To run the backend server:

```bash
npm start
```

The server will start on `http://localhost:5000`.

---

## API Documentation

The API supports user registration, login, and profile retrieval.

### 1. **Register User**

- **Endpoint:** `POST http://localhost:5000/api/register`
- **Description:** Registers a new user in the system.
- **Request Body:**

  ```json
  {
    "name": "Kishan",
    "email": "jaiswalkishan09@gmail.com",
    "phoneNumber": "9060060839",
    "country": "India",
    "password": "Kishan@123"
  }
  ```

- **Response:**

  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImphaXN3YWxraXNoYW5AZ21haWwuY29tIiwiaWF0IjoxNzMxODk4MDE1fQ.XlI54ti2sCOfi-yfUFts16TXzYrv3f7h3gJvQaceOkE",
    "message": ["User registration successful."]
  }
  ```

- **Details:**
  - This endpoint registers a new user and returns a JWT token upon successful registration.
  - The token can be used for further authentication.

### 2. **User Login**

- **Endpoint:** `POST http://localhost:5000/api/login`
- **Description:** Authenticates the user and returns a JWT token.
- **Request Body:**

  ```json
  {
    "email": "jaiswalkishan09@gmail.com",
    "password": "Kishan@123"
  }
  ```

- **Response:**

  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImphaXN3YWxraXNoYW4wOUBnbWFpbC5jb20iLCJpYXQiOjE3MzE4OTgwODh9.rGstO_AfSzo9syCeNkn3GDnPx8mSxbA_Fwy14aQV_KA"
  }
  ```

- **Details:**
  - If the email and password match, a JWT token is generated and returned in the response.
  - The token should be included in the header for accessing protected endpoints.

### 3. **Get User Profile**

- **Endpoint:** `GET http://localhost:5000/api/profile`
- **Description:** Fetches the profile details of the authenticated user.
- **Headers:**

  ```bash
  authorization: Bearer <JWT_TOKEN>
  ```

- **Response:**

  ```json
  {
    "name": "Kishan",
    "email": "jaiswalkishan09@gmail.com",
    "country": "India",
    "phoneNumber": "9060060839"
  }
  ```

- **Details:**
  - This endpoint requires the JWT token obtained during registration or login.
  - It retrieves the user’s profile information from the database.

---

## Error Handling

The application includes basic error handling for invalid requests and server errors.

- **400 Bad Request:** Missing or invalid input data.
- **401 Unauthorized:** Invalid or missing JWT token.
- **500 Internal Server Error:** Unexpected server issues.
- **409 Conflict:**This error occurs when there is a conflict with the current state of the server, such as attempting to register with an existing email .
- **403 Forbidden:** The server understands the request but refuses to authorize it.
- **404 Not Found:** The server cannot find the requested resource..

**Example Error Response:**

```json
{
  "message": [
    "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character."
  ]
}
```

---

## Database Schema

The following MySQL table structure is used for the application:

```
CREATE TABLE user_basic_details (
    Name VARCHAR(100) NOT NULL,
    Email VARCHAR(100) PRIMARY KEY,
    Phone_Number VARCHAR(20),
    Country VARCHAR(50),
    Password VARCHAR(255) NOT NULL,
    Status ENUM('Active', 'Inactive') DEFAULT 'Active',
    Failed_Attempt INT DEFAULT 0,
    Last_Login VARCHAR(50),
    Created_On VARCHAR(50)
)

```

---

## Technologies Used

- **Node.js**: Server-side JavaScript runtime
- **Express.js**: Web framework for Node.js
- **MySQL**: Relational database
- **JWT**: JSON Web Token for authentication
- **dotenv**: Environment variable management
- **bcrypt**: Password hashing
- **luxon**: For dealing with dates and times in JavaScript.
- **knex**: Query Builder for MySql

---

## Author

**Kishan Jaiswal**  
GitHub: [jaiswalkishan09](https://github.com/jaiswalkishan09)  
LinkedIn: [Kishan Jaiswal](https://linkedin.com/in/jaiswalkishan09)

---

## Contact

For any queries or feedback, please contact [jaiswalkishan09@gmail.com](mailto:jaiswalkishan09@gmail.com).

---
