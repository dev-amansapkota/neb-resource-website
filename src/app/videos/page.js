export default function VideosPage() {
    const videos = [
      { id: 1, title: 'Physics Lecture 1', description: 'Introduction to Motion.' },
      { id: 2, title: 'Chemistry Lecture 1', description: 'Understanding Atomic Structures.' },
    ];
  
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Video Lectures</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {videos.map((video) => (
            <div
              key={video.id}
              className="border p-4 rounded-lg shadow hover:shadow-lg transition"
            >
              <h2 className="font-semibold text-lg">{video.title}</h2>
              <p>{video.description}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
  