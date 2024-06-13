# Task Manager Application

Welcome to the Task Manager Application! This project is a full-stack web application designed to manage tasks efficiently. It includes both backend and frontend implementations using the MERN stack (MongoDB, Express.js, React, Node.js).

## Key Features
- **User Authentication:** Secure login and registration system.
- **Password Reset:** Users can reset their passwords via email.
- **Profile Update:** Users can update their profile information.
- **Task Management:** Create, view, edit, and delete tasks.

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites
- Node.js
- MongoDB
- npm or yarn

### Installation
**Clone the repository:**
   ```bash
   git clone https://github.com/ouadoudev/MERN-Stack-Task-Management-System.git
   ```
### Running the Application

This guide will walk you through setting up and running The application on your local machine. 

**Prerequisites:**

* Node.js and npm (or yarn) installed on your system. You can check installation guides at the official Node.js website: [URLnodejs org]

**Steps:**

1. **Start the Backend Server:**

   - Open a terminal or command prompt.
   - Navigate to the `backend` directory of your cloned repository. You can achieve this using the following command:

     ```bash
     cd \MERN Stack Task Manager\backend
     ```

   - Install the project's dependencies:

     ```bash
     npm install
     ``` 

   - Start the backend server in development mode. There are two options:

     - Option 1 (using `npm start`):

       ```bash
       npm start
       ```

     - Option 2 (using `nodemon` for automatic restarts):

       ```bash
       nodemon ./server.js
       ```

2. **Start the Frontend App:**

   - Open a separate terminal or command prompt window.
   - Navigate to the `frontend` directory of your cloned repository:

     ```bash
     cd \MERN Stack Task Manager\frontend
     ```

   - Install the project's frontend dependencies:

     ```bash
     npm install
     ``` 

   - Start the frontend development server:

     ```bash
     npm run dev
     ``` 

**Explanation:**

* We use separate terminal windows for backend and frontend as they are typically run concurrently during development.
* `nodemon` is a helpful tool that automatically restarts the backend server whenever you make changes to the code, saving you the time of manually restarting it.

