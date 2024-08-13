import Realm from "realm";
import { app } from "../db/index.js";


// Define your schemas
const UserSchema = {
    name: "User",
    properties: {
        _id: "objectId",
        name: "string",
        email: "string",
        age: "int?",
    },
    primaryKey: "_id",
};

// Function to open a Realm instance with Flexible Sync
const openRealm = async () => {
    try {
        const user = app.currentUser;
        if (!user) {
            throw new Error("User is not authenticated");
        }

        const config = {
            schema: [UserSchema],
            sync: {
                user,
                flexible: true, // Enable Flexible Sync
            },
        };

        const realm = await Realm.open(config);

        // Ensure the subscription is created
        realm.subscriptions.update((subs) => {
            subs.add(realm.objects("User"));
        });

        return realm;
    } catch (error) {
        console.error("Error opening Realm:", error);
        throw error;
    }
};

// Database operation examples

const createUser = async (userData) => {
    let realm;
    try {
        // Open a Realm instance
        realm = await openRealm();

        // Use a write transaction to create a new user
        realm.write(() => {
            realm.create("User", userData);
        });

        console.log("User created successfully");
    } catch (error) {
        console.error("Error creating user:", error);
        throw error; // Propagate the error to the caller
    } finally {
        // Ensure the Realm instance is closed
        if (realm) {
            realm.close();
        }
    }
};

const getAllUsers = async () => {
    let realm;
    try {
        realm = await openRealm();
        const users = realm.objects("User");

        // Convert the results to a plain JavaScript array
        const usersArray = users.map(user => ({
            _id: user._id.toString(), // Convert ObjectId to string for easier handling
            name: user.name,
            email: user.email,
            age: user.age,
        }));

        return usersArray;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error; // Propagate the error to the caller
    } finally {
        // Ensure the Realm instance is closed
        if (realm) {
            realm.close();
        }
    }
};
// Export operations
export {
    createUser,
    getAllUsers
};