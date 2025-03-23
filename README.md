# **TransactFlow**

**TransactFlow** is a backend project created by Ana Molina Romero that allows you to manage users and their transactions. 
Users can register, modify their personal data, reset their password, create transactions, consult them, and delete them from their history. 
It also includes the management of profile photos for each user in jpeg, jpg, and/or png format. Users can delete their account along with all their transactions and personal data. This action is irreversible. 
You can also add balance from your profile. 
This project uses technologies such as **Express**, **CORS**, **bcrypt**, **dotenv**, **jsonwebtoken**, **mongoose**, **multer**, **nodemailer** and **MongoDB**.

## Technologies Used

- **Express**: Framework for Node.js that simplifies the creation of web servers.
- **CORS**: Middleware to enable access to API resources from different domains.
- **bcrypt**: Library for password encryption.
- **dotenv**: Manages environment variables in the project.
- **jsonwebtoken**: Used for the creation and verification of JSON Web Tokens (JWT) for authentication.
- **mongoose**: Data modeling library for MongoDB.
- **multer**: Middleware for managing files in forms (image uploads).
- **nodemailer**: Used for sending emails.

## Functionalities

- **User registration**: Allows you to create a user account with personal data. When registering, a confirmation email is sent.
- **Modify personal data**: Users can update their profile information.
- **Reset password**: Functionality to recover and change the password in case of forgetting. After changing the password, an email is sent notifying you of the change.
- **Create transactions**: Users can create transactions with the associated data. A confirmation email is sent when a transaction is successful.
- **View transactions**: Users can see their transaction history.
- **Delete transactions**: Users can delete transactions from their history.
- **Profile photo management**: Users can upload and update their profile photo in **jpeg**, **jpg**, or **png** format.
- **Delete account**: Users can delete their account along with all their transactions and personal data. This action is irreversible.
- **Add balance**: Users can add balance to their account from their profile.

## API Routes

### **Authentication**
- **POST /signup**: Register a new user.
- **POST /login**: Log in and obtain a JWT token.
- **GET /refresh**: Refresh the JWT token.

### **User**
- **GET /users**: Get all users.
- **POST /users**: Create a new user.
- **POST /change-password**: Change user password.
- **GET /users/:_id**: Get a specific user by ID.
- **PATCH /users/:_id**: Update user information.
- **DELETE /users/:_id**: Delete user by ID.
- **POST /upload**: Upload profile photo.

### **Transactions**
- **POST /transactions**: Create a new transaction.
- **DELETE /transactions/:_id**: Delete a specific transaction.
- **GET /transaction/**: Get user transactions.
- **PATCH /transactions/:_id**: Update transaction status.
- **GET /transactions/:_id**: Get transaction details.


## Email Notifications

The system sends emails in the following situations:

- **Upon registration**: When a user registers successfully, they receive a welcome email.
- **When changing the password**: If a user changes their password, an email is sent notifying them of the change.
- **Upon receiving a transaction**: Users receive an email when they receive a transaction to their account.
- **When sending a transaction**: When a user sends a transaction, an email is sent confirming that the transaction has been successfully completed.

## Installation

1. **Clone the repository**

   `bash
   git clone https://github.com/Ana83-ui/final-project-blockchain-backend.git

2. **Install dependencies**

cd blockchain-backend
npm install

3. **Run the server**

npm run dev

## License

This project is under the MIT License


