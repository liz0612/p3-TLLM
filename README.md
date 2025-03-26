# Interactive MERN Stack Single-Page Application

This project is a collaborative MERN-stack single-page application designed to solve real-world challenges with a focus on user experience, scalability, and responsiveness.

## Description
The application combines a MongoDB back end, a GraphQL API, and an Express.js and Node.js server with a React front end. It implements user authentication using JWT and provides a polished, interactive, and responsive user interface.

## Features
- **Frontend**: Built with React for a dynamic and responsive user experience.
- **Backend**: Node.js, Express.js server with a GraphQL API for efficient data handling.
- **Database**: MongoDB with Mongoose ODM for scalable data storage.
- **Authentication**: Secure user authentication using JWT.
- **Deployment**: Hosted on Render with MongoDB Atlas for live data.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Interactive UI**: Accepts and responds to user input seamlessly.

## Technologies Used
- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Express.js, GraphQL
- **Database**: MongoDB, Mongoose
- **Authentication**: JSON Web Tokens (JWT)
- **Deployment**: Render, MongoDB Atlas

## Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd <project-directory>
   ```
3. Install dependencies for both frontend and backend:
   ```bash
   cd frontend && npm install
   cd ../backend && npm install
   ```
4. **Steps to Get Your MongoDB URI**:
   1. **Create a MongoDB Cluster**:
      - Go to [MongoDB Atlas](https://www.mongodb.com/atlas/database).
      - Sign up or log in.
      - Create a new cluster (a free tier should be fine for development).
   2. **Create a Database User**:
      - Once the cluster is created, go to the **Database Access** tab.
      - Add a new database user with a password. This is the password you will use in the `<db_password>` section of your URI.
   3. **Get the Connection URI**:
      - After creating the cluster, go to the **Clusters** tab, and click **Connect**.
      - Select **Connect your application**.
      - MongoDB Atlas will give you a connection string with your username and password placeholder.
      - Replace `<db_password>` with the actual password of the user you created.

5. Set up environment variables in the backend `.env` file:
   Create a `.env` file in the `backend` directory and add the following:
   ```
   PORT=4000
   MONGO_URI=your_mongo_database_url_here
   JWT_SECRET=your_jwt_secret_key_here
   ```
   Replace `your_mongo_database_url_here` with your actual MongoDB URI and `your_jwt_secret_key_here` with a secure secret key for JWT authentication.

   Example `.env` file:
   ```
   # Port configuration
   PORT=4000

   # MongoDB connection URI with password
   MONGO_URI=mongodb+srv://exampleUser:examplePassword@cluster0.mongodb.net/myDatabase?retryWrites=true&w=majority

   # JWT Secret for token generation
   JWT_SECRET=supersecuresecretkey12345
   ```

6. **Generate a Secure JWT Secret**:
   If you want to generate a secure JWT secret, you can use Node.js. Run the following command in your terminal:
   ```bash
   node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
   ```
   This will generate a random, secure secret key that you can use for `JWT_SECRET`.

7. Start the development servers:
   ```bash
   cd backend && npm run dev
   cd ../frontend && npm start
   ```

## Screenshots
![Image Alt]()
![Image Alt]()

## Deployed Application
- **Live URL**: [https://your-deployed-app-url.com](https://your-deployed-app-url.com)
- **GitHub Repository**: [https://github.com/your-repo-url](https://github.com/your-repo-url)

## Future Enhancements
- Implement Progressive Web App (PWA) features:
  - Add a web manifest.
  - Use a service worker for offline functionality.
  - Make the app installable.
- Integrate a payment platform like Stripe for donations or e-commerce functionality.
- Add more advanced analytics and reporting features.

## License
This project is licensed under the MIT License.
