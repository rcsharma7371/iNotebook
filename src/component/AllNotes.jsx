import React from "react";

export default function AllNotes({ title, body,key}) {
  return (
    <>
      <div style={{background:"transparent"}} className="all-notes d-flex justify-center">
        <div  className="card w-100 p-0">
          <a href={key} className="text-decoration-none text-reset">
            <div className="card-body">
              <h5 className="card-title">{title}</h5>
              <p className="card-text">{body}</p>
            </div>
          </a>
        </div>
      </div>
    </>
  );
}
