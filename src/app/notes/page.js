"use client";
import { useState, useEffect } from "react";

export default function NotesPage() {
  const [categories, setCategories] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [notes, setNotes] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);


  useEffect(() => {
    fetch('http://localhost/NEB%20Resource%20website/neb-resource/Backend/getnotes.php')
      .then((response) => response.json())
      .then((data) => setCategories(data));
  }, []);
  useEffect(() => {
    if (selectedCategory) {
      fetch(`http://localhost/NEB%20Resource%20website/neb-resource/Backend/getnotes.php?category=${selectedCategory}`)
        .then((response) => response.json())
        .then((data) => setSubjects(data));
    }
  }, [selectedCategory]);
  useEffect(() => {
    if (selectedSubject) {
      fetch(`http://localhost/NEB%20Resource%20website/neb-resource/Backend/getnotes.php?subject=${selectedSubject}`)
        .then((response) => response.json())
        .then((data) => setNotes(data));
    }
  }, [selectedSubject]);
  useEffect(() => {
    if (selectedNote) {
      fetch(`http://localhost/NEB%20Resource%20website/neb-resource/Backend/getnotes.php?note=${selectedNote}`)
        .then((response) => response.json())
        .then((data) => {
          if (!data || data.length === 0) {
            setChapters([
              {
                id: 1,
                name: "Sample Chapter",
                pdfUrl: "https://drive.google.com/file/d/1AhovWghu8a83st0jgm2_jWeCkocqrlt5/view?usp=drive_link", // Replace with your actual PDF URL
                content: "These are the sample text-based notes for the PDF chapter."
              }
            ]);
          } else {
            setChapters(data);
          }
        });
    }
  }, [selectedNote]);
  const getEmbedPdfUrl = (url) => {
    if (url.includes("drive.google.com")) {
      return url.replace("/view?usp=drive_link", "/preview");
    }
    return url;
  };

  return (
    <div className="container mx-auto p-6 min-h-screen">
      <h1 className="text-2xl sm:text-4xl font-bold text-center text-gray-800 mb-6">
        {!selectedCategory
          ? "Select Faculty/Class/Semester"
          : !selectedSubject
          ? "Select a Subject"
          : !selectedNote
          ? "Select a Note"
          : !selectedChapter
          ? "Select a Chapter"
          : `${selectedChapter.name} Details`}
      </h1>
      {!selectedCategory && (
        <div className="flex flex-wrap gap-4 justify-center">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className="w-full sm:w-auto bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 transition"
            >
              {category.name}
            </button>
          ))}
        </div>
      )}
      {selectedCategory && !selectedSubject && (
        <div className="flex flex-wrap gap-4 justify-center">
          {subjects.length ? (
            subjects.map((subject) => (
              <button
                key={subject.id}
                onClick={() => setSelectedSubject(subject.id)}
                className="w-full sm:w-auto bg-green-600 text-white p-4 rounded-lg hover:bg-green-700 transition"
              >
                {subject.name}
              </button>
            ))
          ) : (
            <p className="text-gray-600">No subjects available for this category.</p>
          )}
        </div>
      )}
   
      {selectedSubject && !selectedNote && (
        <div className="mt-6">
          <button
            onClick={() => {
              setSelectedSubject(null);
              setNotes([]);
            }}
            className="bg-gray-500 text-white px-4 py-2 rounded-md mb-4"
          >
            ← Back to Subjects
          </button>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.length ? (
              notes.map((note) => (
                <div
                  key={note.id}
                  className="bg-white shadow-lg rounded-lg p-5 hover:shadow-xl transition"
                >
                  <h2 className="text-xl font-semibold text-gray-800">{note.title}</h2>
                  <p className="text-gray-600 mt-2">{note.description}</p>
                  <button
                    onClick={() => setSelectedNote(note.id)}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    View Note Chapters
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No notes available for this subject.</p>
            )}
          </div>
        </div>
      )}
      {selectedNote && !selectedChapter && (
        <div className="mt-6">
          <button
            onClick={() => {
              setSelectedNote(null);
              setChapters([]);
            }}
            className="bg-gray-500 text-white px-4 py-2 rounded-md mb-4"
          >
            ← Back to Notes
          </button>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {chapters.length ? (
              chapters.map((chapter) => (
                <div
                  key={chapter.id}
                  className="bg-white shadow-lg rounded-lg p-5 hover:shadow-xl transition"
                >
                  <h2 className="text-xl font-semibold text-gray-800">{chapter.name}</h2>
                  <p className="text-gray-600 mt-2">Click to explore {chapter.name}.</p>
                  <button
                    onClick={() => setSelectedChapter(chapter)}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    View {chapter.name}
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No chapters available for this note.</p>
            )}
          </div>
        </div>
      )}
      {selectedChapter && (
        <div className="mt-6">
          <button
            onClick={() => setSelectedChapter(null)}
            className="bg-gray-500 text-white px-4 py-2 rounded-md mb-4"
          >
            ← Back to Chapters
          </button>
          <div className="bg-white shadow-lg rounded-lg p-5">
            <h2 className="text-xl font-semibold text-gray-800">{selectedChapter.name}</h2>
            {selectedChapter.pdfUrl && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold">PDF Notes:</h3>
                <iframe
                  src={getEmbedPdfUrl(selectedChapter.pdfUrl)}
                  width="100%"
                  height="500px"
                  title={selectedChapter.name}
                  className="border mt-2"
                ></iframe>
              </div>
            )}
            {selectedChapter.content && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold">Text Notes:</h3>
                <p className="mt-2 text-gray-700">{selectedChapter.content}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
