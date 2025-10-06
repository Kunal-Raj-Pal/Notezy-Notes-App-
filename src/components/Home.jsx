import React, { use, useEffect, useState } from "react";
import axios from "axios";
import { Link,useNavigate, useParams } from "react-router-dom";
import { BookPlusIcon } from "lucide-react";
import { Pin } from "lucide-react";

function Home() {

  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();
  const {id} = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://127.0.0.1:8000/api/notes");
      const note = res.data
      
      setNotes(note);
    };
    fetchData();
  }, []);

  const pinnedNote = notes.filter((n)=>n.pinned)
  const allNote = notes.filter((n)=>n)

const handlePinToggle = async (noteId, currentPinned) => {
  try {
    await axios.patch(`http://127.0.0.1:8000/api/notes/edit/${noteId}`, {
      pinned: !currentPinned,   // toggle true/false
    });
    // fetch updated notes again
    const res = await axios.get("http://127.0.0.1:8000/api/notes");
    setNotes(res.data);
  } catch (error) {
    console.error(error);
  }
};


  const colorMap = {
  red: "bg-red-300",
  blue: "bg-blue-300",
  green: "bg-green-300",
  yellow: "bg-yellow-300",
  indigo: "bg-indigo-300",
  pink: "bg-pink-300",
  orange: "bg-orange-300",
};

  return (
    <>
      <div className="max-w-7xl mx-auto">
        <div className="max-w-6xl min-w-1xl mx-auto p-3 sm:p-1">
          <p className="font-semibold mb-2">Pinned📌{id}</p>
          <div className="cards grid md:grid-cols-4 grid-cols-2 gap-5 sm:gap-10">
            {pinnedNote.map((note, idx) => (
              
              <button key={idx} onClick={() => navigate(`edit/${note.id}`)}>
                <div    className={`cursor-pointer rounded-2xl shadow-md p-4 h-40 flex flex-col justify-between 
                  ${colorMap[note.color] || "bg-gray-200"} 
                  hover:scale-105 transition`}
                  >
                  {note.id}. {note.title}
                </div>
              </button>
            ))}
          </div>
          <h1 className="font-semibold mt-6 mb-2">All Notes</h1>
          <div className="notes grid sm:grid-cols-3 gap-5 p-1">
            {allNote.map((note, id) => (
              <div
                key={id}
                className="note-card bg-white shadow-md p-4 rounded-xl flex items-center w-75 "
              >
               <div className="content overflow-hidden">
                 <Link to={`edit/${note.id}`} className="content cursor-pointer">
                    <h1 className="font-semibold">{note.title}</h1>
                    <p className="text-gray-800">{note.note}</p>
                </Link>
               </div>


                 <div className="btn ml-auto">
                   <button
      onClick={() => handlePinToggle(note.id, note.pinned)}
      className={`ml-2 p-2 rounded-full transition cursor-pointer ${
        note.pinned ? "bg-orange-300" : "bg-gray-200"
      }`}
    >
      <Pin
        className={`h-5 w-5 ${note.pinned ? "text-yellow-800" : "text-gray-600"}`}
      />
    </button>
                 </div>

              </div>
            ))}
          </div>
          <Link
            to={"add_note"}
            className="bg-indigo-600 p-4 rounded-full fixed right-5 sm:right-45 bottom-8 sm:bottom-20"
          >
            <BookPlusIcon />
          </Link>
        </div>
      </div>
    </>
  );
}

export default Home;
