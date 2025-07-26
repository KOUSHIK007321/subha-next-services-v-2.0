import { getCollection } from "@/lib/db";

// GET method - Fetch all services
export async function GET() {
  try {
    const userCollection = await getCollection("Services");
    const services = await userCollection.find().toArray();
    return new Response(JSON.stringify({services}), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching services:", error);
    return new Response(
      JSON.stringify({ message: "Failed to fetch services" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

// DELETE method - Delete a service by ID
export async function DELETE(request) {
  try {
    const userCollection = await getCollection("Services");

    const { id } = await request.json();

    if (!id) {
      return new Response(
        JSON.stringify({ message: "Service ID is required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const { ObjectId } = require("mongodb");
    const objectId = new ObjectId(id);

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
      return new Response(JSON.stringify({ message: "Service not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
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
