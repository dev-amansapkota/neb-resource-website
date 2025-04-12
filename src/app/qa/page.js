"use client";

import { useState } from "react";
import { FaSearch, FaComment, FaThumbsUp, FaEye, FaFilter, FaPlus, FaTimes } from "react-icons/fa";

export default function QAPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [askingQuestion, setAskingQuestion] = useState(false);
  const [newQuestion, setNewQuestion] = useState("");
  const [filterActive, setFilterActive] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("recent");
  const [questions, setQuestions] = useState([
    {
      id: 1,
      question: "How do I integrate a custom database with Next.js?",
      answers: 2,
      votes: 15,
      views: 124,
      date: "2 days ago",
      author: "sushank",
      tags: ["database", "next.js", "integration"]
    },
   
  ]);

  const handleSubmitQuestion = () => {
    if (newQuestion.trim()) {
      const newQuestionObj = {
        id: questions.length + 1,
        question: newQuestion,
        answers: 0,
        votes: 0,
        views: 0,
        date: "Just now",
        author: "You",
        tags: ["next.js"]
      };
      
      setQuestions([newQuestionObj, ...questions]);
      setNewQuestion("");
      setAskingQuestion(false);
    }
  };

  const filteredQuestions = questions
    .filter(q => q.question.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (selectedFilter === "popular") return b.votes - a.votes;
      if (selectedFilter === "mostAnswers") return b.answers - a.answers;
      if (selectedFilter === "mostViews") return b.views - a.views;
      return 0; // "recent" is default, already sorted
    });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">Q&A Community Forum</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get help from our community of experts and fellow developers. Find answers or share your knowledge.
          </p>
        </div>

        {/* Search and Ask Button */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-sm"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                <FaTimes />
              </button>
            )}
          </div>
          <button 
            onClick={() => setAskingQuestion(true)}
            className="flex items-center justify-center gap-2 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm hover:shadow whitespace-nowrap"
          >
            <FaPlus />
            <span>Ask Question</span>
          </button>
        </div>

        {/* Ask Question Form */}
        {askingQuestion && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8 border border-blue-100 animate-fadeIn">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Ask a New Question</h2>
              <button 
                onClick={() => setAskingQuestion(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FaTimes />
              </button>
            </div>
            <textarea
              placeholder="Type your question here..."
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-32"
            />
            <div className="flex justify-end mt-4 gap-3">
              <button 
                onClick={() => setAskingQuestion(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={handleSubmitQuestion}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!newQuestion.trim()}
              >
                Post Question
              </button>
            </div>
          </div>
        )}

        {/* Filter Section */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-sm text-gray-600">
            Showing {filteredQuestions.length} questions
          </div>
          <div className="relative">
            <button
              onClick={() => setFilterActive(!filterActive)}
              className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 text-sm"
            >
              <FaFilter className="text-gray-500" />
              <span>
                Sort by: {" "}
                {selectedFilter === "recent" && "Recent"}
                {selectedFilter === "popular" && "Popular"}
                {selectedFilter === "mostAnswers" && "Most Answers"}
                {selectedFilter === "mostViews" && "Most Views"}
              </span>
            </button>
            
            {filterActive && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10 py-1">
                <button
                  onClick={() => {
                    setSelectedFilter("recent");
                    setFilterActive(false);
                  }}
                  className={`block w-full text-left px-4 py-2 text-sm ${selectedFilter === "recent" ? "bg-blue-50 text-blue-600" : "hover:bg-gray-50"}`}
                >
                  Recent
                </button>
                <button
                  onClick={() => {
                    setSelectedFilter("popular");
                    setFilterActive(false);
                  }}
                  className={`block w-full text-left px-4 py-2 text-sm ${selectedFilter === "popular" ? "bg-blue-50 text-blue-600" : "hover:bg-gray-50"}`}
                >
                  Popular
                </button>
                <button
                  onClick={() => {
                    setSelectedFilter("mostAnswers");
                    setFilterActive(false);
                  }}
                  className={`block w-full text-left px-4 py-2 text-sm ${selectedFilter === "mostAnswers" ? "bg-blue-50 text-blue-600" : "hover:bg-gray-50"}`}
                >
                  Most Answers
                </button>
                <button
                  onClick={() => {
                    setSelectedFilter("mostViews");
                    setFilterActive(false);
                  }}
                  className={`block w-full text-left px-4 py-2 text-sm ${selectedFilter === "mostViews" ? "bg-blue-50 text-blue-600" : "hover:bg-gray-50"}`}
                >
                  Most Views
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Question List */}
        <div className="space-y-4">
          {filteredQuestions.length > 0 ? (
            filteredQuestions.map((q) => (
              <div
                key={q.id}
                className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-all border border-gray-100"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-grow">
                    <h2 className="text-xl font-semibold text-gray-800 hover:text-blue-600 cursor-pointer mb-2">
                      {q.question}
                    </h2>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {q.tags.map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center text-sm text-gray-500 gap-4">
                      <span>Asked by {q.author}</span>
                      <span>{q.date}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end text-sm">
                    <div className="flex items-center gap-1 text-green-600">
                      <FaThumbsUp />
                      <span>{q.votes}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1 text-gray-600">
                      <FaComment />
                      <span>{q.answers} {q.answers === 1 ? "answer" : "answers"}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600">
                      <FaEye />
                      <span>{q.views} views</span>
                    </div>
                  </div>
                  <button className="px-3 py-1 text-sm text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors">
                    View
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <div className="text-gray-400 text-5xl mb-4">🔍</div>
              <h3 className="text-xl font-medium text-gray-700 mb-2">No questions found</h3>
              <p className="text-gray-500">Try adjusting your search or ask a new question</p>
              <button 
                onClick={() => {
                  setSearchQuery("");
                  setAskingQuestion(true);
                }}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Ask a Question
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}