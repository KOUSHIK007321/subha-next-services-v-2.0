import { NextResponse } from 'next/server';

// This would typically interact with a database in a real application
let projects = [
  {
    id: '1',
    title: 'Project Alpha',
    description: 'Develop new feature',
    status: 'Planning',
    priority: 'High',
    client: 'TechCorp'
  },
  {
    id: '2',
    title: 'Project Beta',
    description: 'Design user interface',
    status: 'In Progress',
    priority: 'Medium',
    client: 'StartupX'
  },
  {
    id: '3',
    title: 'Project Gamma',
    description: 'Conduct market research',
    status: 'Completed',
    priority: 'Low',
    client: 'InnovateInc'
  },
  {
    id: '4',
    title: 'Project Delta',
    description: 'Client meeting preparation',
    status: 'Pending',
    priority: 'High',
    client: 'GlobalSolutions'
  },
  {
    id: '5',
    title: 'Project Epsilon',
    description: 'Technical architecture review',
    status: 'Review',
    priority: 'Critical',
    client: 'EnterpriseNet'
  }
];

export async function POST(request) {
  try {
    // Parse the incoming ID mapping
    const idMappings = await request.json();

    // Validate input
    if (!Array.isArray(idMappings)) {
      return NextResponse.json(
        { error: 'Invalid input format' }, 
        { status: 400 }
      );
    }

    // Prepare response with ID mappings
    const mappingResponse = idMappings.map(mapping => ({
      originalId: mapping.originalId,
      newId: mapping.newId
    }));

    // In a real application, you would:
    // 1. Validate the mappings
    // 2. Update the database with new ordering
    // 3. Potentially log the reordering

    return NextResponse.json({
      message: 'Project order updated successfully',
      mapping: mappingResponse
    }, { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process reordering' }, 
      { status: 500 }
    );
  }
}