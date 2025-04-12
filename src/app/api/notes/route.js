export async function GET() {
    const notes = [
      { id: 1, title: 'Physics - Motion', description: 'Grade 12 Chapter 1 Notes.' },
      { id: 2, title: 'Chemistry - Atoms', description: 'Grade 11 Atomic Structure Notes.' },
    ];
    return new Response(JSON.stringify(notes), { status: 200 });
  }
  