"use server";

import bcrypt from "bcryptjs";
import { getCollection } from "@/lib/db";
import { RegisterFormSchema, LoginFormSchema } from "@/lib/rules";
import { redirect } from "next/navigation";
import { createSession } from "@/lib/sessions";
import { cookies } from "next/headers";

export async function register(state, formData) {
  // await new Promise((resolve) => setTimeout(resolve, 3000));

  const validatedFields = RegisterFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      email: formData.get("email"),
    };
  }

  console.log(validatedFields);

  // Extract form fields
  const { email, password } = validatedFields.data;

  // Check if email is already registered
  const userCollection = await getCollection("users");
  if (!userCollection) return { errors: { email: "Server error!" } };

  const existingUser = await userCollection.findOne({ email });
  if (existingUser) {
    return {
      errors: {
        email: "Email already exists in our database!",
      },
    };
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Save in DB

  const lastUser = await userCollection
    .find({})
    .sort({ usrID: -1 })
    .limit(1)
    .toArray();

  const nextUserID = lastUser.length > 0 ? lastUser[0].usrID + 1 : 1;

  const results = await userCollection.insertOne({
    usrID: nextUserID,
    email,
    password: hashedPassword,
    CreatedOn: new Date(),
    CreatedBy: "UsrOwn",
    isActive: "true"
  });

  // Create a session
  await createSession(results.insertedId.toString());
  // Redirect
  redirect("/Admin-Dashboard");
}

export async function login(state, formData) {
  // Validate form fields
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // If any form fields are invalid
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      email: formData.get("email"),
    };
  }

  // Extract form fields
  const { email, password } = validatedFields.data;

  // Check if email exists in our DB
  const userCollection = await getCollection("users");
  if (!userCollection) return { errors: { email: "Server error!" } };

  const existingUser = await userCollection.findOne({ email });
  if (!existingUser) return { errors: { email: "Invalid credentials." } };

  // Check password
  const matchedPassword = await bcrypt.compare(password, existingUser.password);
  if (!matchedPassword) return { errors: { email: "Invalid credentials." } };

  // Create a session
  await createSession(existingUser._id.toString());

  console.log(existingUser);

  // Redirect
  redirect("/Admin-Dashboard");
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
  redirect("/Login-Signup");

}
