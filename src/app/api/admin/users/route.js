// app/api/admin/users/route.js
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getCollection } from "@/lib/db.js"; // Adjust the import path as needed
import bcrypt from "bcryptjs";

const collectionName = "users";

// GET handler - Fetch all users
export async function GET(request) {
  try {
    const userCollection = await getCollection(collectionName);
    const users = await userCollection.find({}).toArray();

    return NextResponse.json(users);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

// POST handler - Create a new user or delete a user based on action parameter
export async function POST(request) {
  try {
    // Adjust based on what your connectToDatabase actually returns
    const collection = await getCollection(collectionName);

    const body = await request.json();

    // Check for action parameter to determine operation
    const action = body.action || "create";


    // Modify the user operation here

    if (action === "updateStatus") {
      const { userId, isActive } = body;

      if (!userId) {
        return NextResponse.json(
          { error: "User ID is required" },
          { status: 400 }
        );
      }

      if (!ObjectId.isValid(userId)) {
        return NextResponse.json(
          { error: "Invalid user ID format" },
          { status: 400 }
        );
      }

      const result = await collection.updateOne(
        { _id: new ObjectId(userId) },
        { $set: { isActive: isActive } }
      );

      if (result.matchedCount === 0) {
        return NextResponse.json(
          { error: "User not found" },
          { status: 404 }
        );
      }

      return NextResponse.json({
        message: "User status updated successfully",
        isActive: isActive,
        status: 202
      });
    }

    // Delete user operation
    if (action === "delete") {
      const userId = body.userId;

      // Validate userId
      if (!userId) {
        return NextResponse.json(
          { error: "User ID is required" },
          { status: 400 }
        );
      }

      // Validate ObjectId if using MongoDB's ObjectId
      if (!ObjectId.isValid(userId)) {
        return NextResponse.json(
          { error: "Invalid user ID format" },
          { status: 400 }
        );
      }

      const result = await collection.deleteOne({ _id: new ObjectId(userId) });

      if (result.deletedCount === 0) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }

      return NextResponse.json({ message: "User deleted successfully" });
    }

    // Create user operation (default)
    else {
      // Basic validation
      if (!body.email || !body.password) {
        return NextResponse.json(
          { error: "Email and password are required" },
          { status: 400 }
        );
      }

      // Check if email already exists
      const existingUser = await collection.findOne({ email: body.email });
      if (existingUser) {
        return NextResponse.json(
          { error: "User with this email already exists" },
          { status: 409 }
        );
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(body.password, 10);

      // Find the Last user ID and make NextUserID

      const lastUser = await collection
        .find({})
        .sort({ usrID: -1 })
        .limit(1)
        .toArray();

      const nextUserID = lastUser.length > 0 ? lastUser[0].usrID + 1 : 1;

      // Create new user
      // In a real app, you should hash the password before storing
      const newUser = {
        usrID: nextUserID,
        email: body.email,
        password: hashedPassword, // Consider using bcrypt to hash this
        CreatedOn: new Date(),
        CreatedBy: body.CreatedBy || "Admin",
        isActive: body.isActive || true,
      };

      const result = await collection.insertOne(newUser);
      newUser._id = result.insertedId;

      return NextResponse.json(newUser, { status: 201 });
    }
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to process user operation" },
      { status: 500 }
    );
  }
}

