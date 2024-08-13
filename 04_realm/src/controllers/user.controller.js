import Realm from "realm";
import { app } from "../db/index.js";

class User extends Realm.Object {
    static schema = {
        name: "User",
        primaryKey: "_id",
        properties: {
            _id: { type: "objectId", default: () => new Realm.BSON.ObjectId() },
            name: "string",
        email: "string",
        age: "int?",
        },
    };
}


// Function to open a Realm instance with Flexible Sync
const openRealm = async () => {
    try {
        const user = app.currentUser;
        console.log("user" + user)
        if (!user) {
            throw new Error("User is not authenticated");
        }

        const config = {
            schema: [User],
            sync: {
                user,
                flexible: true, // Enable Flexible Sync
                onSessionStateChange: (session) => {
                    console.log('Sync session state:', session.state);
                    if (session.state === 'invalid') {
                        console.error('Sync session became invalid.');
                        // Handle invalid session (e.g., retry connection)
                    }
                    console.error('Sync session became valid.');
                }
            },
        };

        const realm = await Realm.open(config);
        console.log('Realm opened successfully');
        // Ensure the subscription is created
        await realm.subscriptions.update((subs) => {
            subs.add(realm.objects(User));
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
            realm.create(User, userData);
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
    let realm, usersArray;
    try {
        realm = await openRealm();
        const users = realm.objects("User");

        // Convert the results to a plain JavaScript array
        usersArray = users.map(user => ({
            _id: user._id.toString(), // Convert ObjectId to string for easier handling
            name: user.name,
            email: user.email,
            age: user.age,
        }));
        console.log(usersArray);

    } catch (error) {
        console.error("Error fetching users:", error);
        throw error; // Propagate the error to the caller
    } finally {
        // Ensure the Realm instance is closed
        if (realm) {
            realm.close();
        }

        return usersArray;
    }
};

const emptyUsersCollection = async () => {
    let realm;
    try {
        realm = await openRealm();
        realm.write(() => {
            const allUsers = realm.objects('User');
            realm.delete(allUsers); // This deletes all User objects in the collection
        });
        console.log("All users have been deleted from the collection.");
    } catch (error) {
        console.error("Error emptying the users collection:", error);
    }
};

// Export operations
export {
    createUser,
    getAllUsers,
    emptyUsersCollection
};