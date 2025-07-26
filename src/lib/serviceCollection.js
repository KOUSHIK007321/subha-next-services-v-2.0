import { getCollection } from "@/lib/db";
import { AdminServiceForm } from "@/lib/rules";

export async function addServiceCollection(state, formData) {
  const validatedFields = AdminServiceForm.safeParse({
    CardHeader: formData.get("CardHeader"),
    CardDescription: formData.get("CardDescription"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      CardHeader: formData.get("CardHeader"),
      CardDescription: formData.get("CardDescription"),
    };
  }

  console.log(validatedFields);
  const userCollection = await getCollection("Services");

  const results = await userCollection.insertOne({
    CardHeader: validatedFields.data.CardHeader,
    CardDescription: validatedFields.data.CardDescription,
  });

  console.log(results);
}
