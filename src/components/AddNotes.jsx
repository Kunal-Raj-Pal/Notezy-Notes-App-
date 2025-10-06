import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  FileX,
  HomeIcon,
  LucideBookPlus,
  Save,
} from "lucide-react";

function AddNotes({ prop }) {
  const [form, setForm] = useState({ title: "", note: "", color:"" });
  const [resp, setResp] = useState("");


  const navigate = useNavigate();
  const { id } = useParams();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      //Update Request -------------------------------------------------
      await axios.patch(`https://notezy-backend-mvrs.onrender.com/api/notes/edit/${id}`, form);
      navigate("/");
    } else {
      //Create Request --------------------------------------------------------
      const res = await axios.post("https://notezy-backend-mvrs.onrender.com/api/notes/add", form);
      const msg = () => {
        setResp(res.data.msg);
        navigate("/");
        setTimeout(() => {
          setResp();
        }, 3000);
      };
      msg();
    }
  };


  useEffect(() => {
    async function fetchData() {
      if (id) {
        const res = await axios.get(
          `https://notezy-backend-mvrs.onrender.com/api/notes/edit/${id}`
        );
        setForm({
          title: res.data.title,
          note: res.data.note,
          color: res.data.color,
        });
      }
    }
    fetchData();
  }, [id]);


 
    const handleDelete = async (e) =>{
      e.preventDefault();
      alert("Are you sure?? Delete this note")
    const res = await axios.delete(`https://notezy-backend-mvrs.onrender.com/api/notes/delete/${id}`)
    const msg = () => {
        setResp(res.data.msg);
        navigate("/");
        setTimeout(() => {
          setResp();
        }, 3000);
      };
      msg();
}


    const colors = [
  { name: "red", class: "bg-red-300" },
  { name: "blue", class: "bg-blue-300" },
  { name: "green", class: "bg-green-300" },
  { name: "orange", class: "bg-orange-300" },
  { name: "indigo", class: "bg-indigo-300" },
  { name: "pink", class: "bg-pink-300" },
];

  return (
    <>
      <div className="max-w-7xl mx-auto text-center">
        <p className="my-3 text-green-300">{resp}</p>
        <form className="bg-orange-200 sm:max-w-4xl sm:mx-auto h-150 flex flex-col p-2 rounded-lg m-2">

                  {/* Modern Color Selector */}
          <div className="flex gap-3 justify-center my-4">
            {colors.map((c) => (
              <button
                key={c.name}
                type="button"
                onClick={() => setForm({ ...form, color: c.name })}
                className={`h-8 w-8 rounded-full ${c.class} 
                  ${form.color === c.name ? "ring-3 ring-black/20" : ""}`}
              ></button>
            ))}
          </div>

          <div className="flex items-center my-2">

            <input
              className="bg-black/10 p-2 outline-none rounded-md font-bold w-4/1 sm:w-full"
              type="text"
              name="title"
              value={form.title}
              placeholder="Add title..."
              onChange={handleChange}
            />

            <div className="flex ml-2">
              <button
                className="bg-orange-300 p-2 rounded-lg mx-auto cursor-pointer"
                onClick={handleSubmit}
              >
                {id ? <Save /> : <LucideBookPlus />}
              </button>

            
                {id ? <button onClick={handleDelete} className="bg-orange-300 p-2 rounded-lg mx-auto cursor-pointer ml-2">
                <FileX/>
              </button> : <button className="hidden">Delete</button>}
             

              <Link
                to="/"
                className="bg-red-400 p-2 rounded-lg mx-auto ml-2 cursor-pointer"
              >
                <HomeIcon />
              </Link>
            </div>
          </div>

          <textarea
            className="bg-black/10 p-2 outline-none rounded-md font-semibold"
            name="note"
            cols="30"
            rows="25"
            placeholder="Write your note..."
            value={form.note}
            onChange={handleChange}
          />
        </form>
      </div>
    </>
  );
}

export default AddNotes;
