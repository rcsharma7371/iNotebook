import React, { useState } from "react";
import './UpdateNotes.css'

export default function UpdateNotes({note}) {
    // console.log(note);
    const [formData,setFormData] = useState({
        category:note.tag,
        heading:note.title,
        description:note.description,
    })

    const handleFormInput = (event)=>{
        setFormData((currData)=>{
            return {...currData,[event.target.name]:event.target.value}
        })
    }
  return (
    <>
      <form action="#" className="row g-3 form  needs-validation">
        <div className="col-10">
          <input
            type="text"
            className="form-control reset"
            id="inputAddress"
            placeholder="Category (Optional)"
            aria-describedby="inputGroup-sizing-sm"
            name="category"
           value={formData.category} 
           onChange={handleFormInput}
          />
          <input
            type="text"
            className="form-control reset "
            id="inputAddress"
            placeholder="Heading (Optional)"
            aria-describedby="inputGroup-sizing-sm"
            name="heading"
            value={formData.heading}
            onChange={handleFormInput}
          />
          <textarea
            type="text"
            className="form-control reset"
            id="inputAddress"
            placeholder="Write to save for future"
            name="description"
            style={{height:"80vh"}}
            required
            autoFocus
            value={formData.description}
            onChange={handleFormInput}
          />
        </div>
      </form>
    </>
  );
}
