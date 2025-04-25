
# 📚Book-keeping service
  - This is Book-keeping inventory management for libraries backend application.


## 🐱‍🏍Features
  **Authentication & Authorization:**
  - Role-based access control (author, borrower, admin)
  - Protected routes with middleware
  - JWT based authentication

  **Book Management:**
  - CRUD operations for books
  - Image upload to Firebase Storage
  - Association with authors and libraries

  **User Management:**
  - Registration and login
  - Different roles (author, borrower, admin)

  **Library Management:**
  - CRUD operations for libraries
  - Inventory management
  - Book assignment to libraries

  **Borrowing System:**
  - Borrow books with due dates and charges
  - Return books

  **Multilingual Support:**
  - English and Hindi translations
  - Language selection via Accept-Language header

  **Error Handling:**
  - Custom error handling middleware
  - Consistent error responses



## Local Setup

### Prerequisites
- **Node.js** and **npm** must be installed on your local machine.
  - Install Node.js from [here](https://nodejs.org/)
  - Install npm: `npm install `
  
- **MongoDB** must be installed and running on your local machine.
  - Download and install MongoDB from [here](https://www.mongodb.com/try/download/compass)

### Installation Steps

1. **Clone the repository**:
    ```bash
    git clone https://github.com/Prity25-coder/Book-Keeping.git
    cd Book-Keeping
    ```

2. **Install dependencies** using npm:
    ```bash
    npm install
    ```

3. **Set up environment variables**:
    Create a `.env` file in the root of the project with the following environment variables:

    ```
    PORT=***
    MONGO_URI
    ```

4. **Set up MongoDB**:
    - Create a database in MongoDB.
    - Use Mongoose  for database interaction. Ensure the database schema is set up correctly based on the model.

    ```bash
    npm run migrate:setup
    ```

5. **Run the application**:
    ```bash
    npm run start
    ```

6. **Access the web page**:
    Open your browser and go to [http://localhost:4200](http://localhost:4200) to access the tool.

## API Reference

## Deployment
    [Live Demo Link](Comming Soon)