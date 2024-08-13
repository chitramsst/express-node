
// Global handlers for unhandled promise rejections and uncaught exceptions
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    // Optionally exit the process if needed
    // process.exit(1);
});

process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception thrown:', error);
    // Optionally exit the process if needed
    // process.exit(1);
});

import {app} from './app.js'
import dotenv from 'dotenv'
import ConnectDB from './db/index.js'
import { createUser, getAllUsers, emptyUsersCollection } from "./controllers/user.controller.js";
import { registerUser, loginUser } from './db/userAuth.js';
import Realm from 'realm';

dotenv.config({
path: './.env'
})

const PORT =  process.env.PORT || 4000
ConnectDB()
    .then(async () => {
        console.log(`Server is connected to the database`);

        try {
            const user = await loginUser("test@gmail.com", "123456");
            console.log("Logged in user:", user);

            const newUser = {
                _id: new Realm.BSON.ObjectId(),
                name: "new1",
                email: "jane.doe@example.com",
                age: 28,
            };
           // await emptyUsersCollection();
            await createUser(newUser);
            console.log("User created successfully");

           handleGetAllUsers();
        } catch (err) {
            console.error("Error in operations:", err);
        }

        // Start the server after a successful DB connection
        app.listen(PORT, () => {
            console.log(`Server is listening on port: ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Connection error", err);
    });

    const handleGetAllUsers = async () => {
        try {
           
            const users = await getAllUsers();
            console.log("Users:", users);
        } catch (error) {
            console.error("Failed to fetch users:", error);
        }
    };