import { app } from './index.js';  // Import the initialized app instance
import Realm from "realm";
// Register a new user
export async function registerUser(email, password) {
    try {
        await app.emailPasswordAuth.registerUser({ email, password });
        console.log("User registered successfully.");
    } catch (err) {
        console.error("Error registering user:", err);
        throw err;
    }
}

// Log in an existing user
export async function loginUser(email, password) {
    const credentials = Realm.Credentials.emailPassword(email, password);
    try {
        const user = await app.logIn(credentials);
        console.log("User logged in successfully:", user);
        return user; // Return the user object if needed elsewhere
    } catch (err) {
        console.error("Error logging in user:", err);
        throw err;
    }
}