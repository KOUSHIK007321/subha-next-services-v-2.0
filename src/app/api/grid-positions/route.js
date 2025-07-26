export async function GET(request) {
  try {
    // Fetch from your database
    // const data = await db.gridPositions.findUnique({
    //   where: { userId: userId },
    // });

    // Mock data for demonstration
    const data = {
      items: [
        { id: "item-1", content: "Item 1" },
        { id: "item-2", content: "Item 2" },
        { id: "item-3", content: "Item 3" },
        { id: "item-4", content: "Item 4" },
        { id: "item-5", content: "Item 5" },
        { id: "item-6", content: "Item 6" },
        { id: "item-7", content: "Item 7" },
        { id: "item-8", content: "Item 8" },
        { id: "item-9", content: "Item 9" },
      ], // Replace with actual data fetch logic
    };

    return Response.json(data);
  } catch (error) {
    console.error("Error fetching grid positions:", error);
    return Response.json(
      { message: "Failed to fetch grid positions" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const { items } = await request.json();

    if (!items || !Array.isArray(items)) {
      return Response.json({ message: "Invalid items data" }, { status: 400 });
    }

    // Save to database
    // await db.gridPositions.upsert({
    //   where: { userId: userId },
    //   update: { positions: items },
    //   create: { userId: userId, positions: items },
    // });

    return Response.json({ success: true, message: "Grid positions saved" });
  } catch (error) {
    console.error("Error saving grid positions:", error);
    return Response.json(
      { message: "Failed to save grid positions" },
      { status: 500 }
    );
  }
}
