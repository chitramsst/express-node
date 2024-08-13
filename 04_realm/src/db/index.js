import Realm from "realm";
import { DB_NAME } from "../constant.js";

let app;

const ConnectDB = async () => {
    try {
        // MongoDB Realm App initialization
        app = new Realm.App({ id: "application-0-bwvllcb" });
        console.log('Realm app initialized:', app);
    } catch (e) {
        console.error('Connection error', e);
        process.exit(1);
    }
};

export { app };  // Exporting the app instance
export default ConnectDB;