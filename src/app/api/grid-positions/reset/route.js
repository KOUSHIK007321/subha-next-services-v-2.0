// pages/api/grid-positions/reset.js (for Pages Router)
// OR
// app/api/grid-positions/reset/route.js (for App Router)

// If using Pages Router:
export default async function handler(req, res) {
    if (req.method === 'POST') {
      try {
        // Here you would delete or reset the saved positions in your database
        // Example with a hypothetical database client:
        // await db.gridPositions.delete({
        //   where: { userId: req.session.userId },
        // });
        
        res.status(200).json({ success: true, message: 'Grid positions reset' });
      } catch (error) {
        console.error('Error resetting grid positions:', error);
        res.status(500).json({ message: 'Failed to reset grid positions' });
      }
    } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).json({ message: `Method ${req.method} not allowed` });
    }
  }
  
  // If using App Router:
  // export async function POST(request) {
  //   try {
  //     // Delete or reset the saved positions
  //     // await db.gridPositions.delete({
  //     //   where: { userId: userId },
  //     // });
  //     
  //     return Response.json({ success: true, message: 'Grid positions reset' });
  //   } catch (error) {
  //     console.error('Error resetting grid positions:', error);
  //     return Response.json(
  //       { message: 'Failed to reset grid positions' },
  //       { status: 500 }
  //     );
  //   }
  // }