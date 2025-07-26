// /pages/api/createService.js
import { getCollection } from "@/lib/db";

// POST method - Add a new service
export async function POST(request) {
  try {
    const { SrvTitle, SrvDescription } = await request.json();
    console.log("Received data:", { SrvTitle, SrvDescription });

    if (!SrvTitle || !SrvDescription) {
      return new Response(
        JSON.stringify({ message: "Service Title and Description are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Connect to the MongoDB collection
    const userCollection = await getCollection("Services");

    // Insert the new service into the database
    const result = await userCollection.insertOne({
      SrvTitle,
      SrvDescription,
      createdAt: new Date(),
    });

    console.log("Inserted service:", result);

    // Fetch the inserted service to return the full document
    const insertedService = await userCollection.findOne({ _id: result.insertedId });

    return new Response(
      JSON.stringify({
        message: "Service created successfully",
        service: insertedService,
      }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error creating service:", error);
    return new Response(
      JSON.stringify({ message: "Failed to create service" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
