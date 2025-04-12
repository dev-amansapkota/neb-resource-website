export default function QAPage() {
  const questions = [
    {
      id: 1,
      question: "How do I integrate a custom database with Next.js?",
      answers: 2,
    },
    {
      id: 2,
      question: "What are the best practices for optimizing Next.js performance?",
      answers: 5,
    },
    {
      id: 3,
      question: "How to implement authentication in a Next.js app?",
      answers: 3,
    },
    {
      id: 4,
      question: "What is the difference between SSR and SSG in Next.js?",
      answers: 4,
    },
    {
      id: 5,
      question: "How can I deploy a Next.js application for free?",
      answers: 6,
    },
  ];

  return (
    <div className="container mx-auto p-6 max-w-3xl">
      <h1 className="text-4xl font-bold mb-6 text-center">Q&A Forum</h1>
      <p className="text-lg text-gray-600 text-center mb-6">
        Submit your questions and get answers from experts and peers.
      </p>

      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <input
          type="text"
          placeholder="Ask a question..."
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="w-full mt-3 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Submit Question
        </button>
      </div>

      <div className="space-y-4">
        {questions.map((q) => (
          <div
            key={q.id}
            className="bg-gray-100 p-4 rounded-lg shadow hover:shadow-lg transition-all cursor-pointer"
          >
            <h2 className="text-lg font-semibold">{q.question}</h2>
            <p className="text-gray-500">{q.answers} answers</p>
          </div>
        ))}
      </div>
    </div>
  );
}
