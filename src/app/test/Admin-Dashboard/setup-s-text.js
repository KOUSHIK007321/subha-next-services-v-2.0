// Using your existing database connection approach

import { getCollection } from "../../lib/db.js";


async function setupDatabase() {
    try {

        // Check if collection exists
        const collections = await getCollection("screenTexts").listCollections().toArray();
        if (collections.length === 0) {
            await getCollection("screenTexts").createCollection();
            console.log("Created 'screenTexts' collection");s
        } else {
            console.log("'screenTexts' collection already exists");
        }

        // Insert or update welcome message
        const result = await getCollection("screenTexts").updateOne(
            { key: "welcomeMessage" },
            { $set: { key: "welcomeMessage", value: "Welcome to SCS Admin Dashboard" } },
            { upsert: true }
        );

        if (result.upsertedCount > 0) {
            console.log("Added welcome message document");
        } else if (result.modifiedCount > 0) {
            console.log("Updated existing welcome message document");
        } else {
            console.log("Welcome message already up to date");
        }

        console.log("Database setup completed successfully");
    } catch (error) {
        console.error("Database setup failed:", error);
    } finally {
        await client.close();
        console.log("MongoDB connection closed");
    }
}

setupDatabase();