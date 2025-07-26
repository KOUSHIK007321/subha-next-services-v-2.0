// /pages/api/deleteService.js
import { getCollection } from "@/lib/db";

export async function DELETE(request) {
  try {
    const { id } = await request.json(); // Get service ID from the request body
    console.log("Received service ID:", id);

    if (!id) {
      return new Response(
        JSON.stringify({ message: "Service ID is required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Convert to MongoDB ObjectId
    const { ObjectId } = require("mongodb");
    const objectId = new ObjectId(id);

    // Get the Services collection
    const userCollection = await getCollection("Services");

    // Delete the service from the collection
    const result = await userCollection.deleteOne({ _id: objectId });

    if (result.deletedCount === 1) {
      return new Response(
        JSON.stringify({ message: "Service deleted successfully" }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    } else {
      return new Response(
        JSON.stringify({ message: "Service not found" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  } catch (error) {
    console.error("Error deleting service:", error);
    return new Response(
      JSON.stringify({ message: "Failed to delete service" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
