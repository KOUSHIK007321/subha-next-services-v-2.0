import { NextResponse } from 'next/server';

// Mock project data (simulating a database)
const projects = [
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

export async function GET(request) {
  // Simulate some async processing (like database fetch)
  await new Promise(resolve => setTimeout(resolve, 500));

  // Optional: Add query parameter support for filtering
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');
  const priority = searchParams.get('priority');

  let filteredProjects = projects;

  if (status) {
    filteredProjects = filteredProjects.filter(
      project => project.status.toLowerCase() === status.toLowerCase()
    );
  }

  if (priority) {
    filteredProjects = filteredProjects.filter(
      project => project.priority.toLowerCase() === priority.toLowerCase()
    );
  }

  return NextResponse.json(filteredProjects, { 
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store, max-age=0'
    }
  });
}

// Optional: POST method for creating new projects
export async function POST(request) {
  try {
    const newProject = await request.json();
    
    // Validate project data
    if (!newProject.title || !newProject.description || !newProject.status) {
      return NextResponse.json(
        { error: 'Missing required fields' }, 
        { status: 400 }
      );
    }

    // Generate new ID (in real app, this would be done by database)
    newProject.id = `${projects.length + 1}`;

    // Add to projects (in real app, this would be a database insert)
    projects.push(newProject);

    return NextResponse.json(newProject, { 
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request body' }, 
      { status: 400 }
    );
  }
}