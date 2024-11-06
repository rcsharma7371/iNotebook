// import NoteContex from "./NoteContex.js"
// const NoteState = (props)=>{
//     const obj = {
//         "name":"Ranjeet",
//         "class":"Graduate"
//     };
//     // console.log(NoteContex)
//     return (
//         <NoteContex.Provider value={obj}>
//             {props.children}
//         </NoteContex.Provider>
//     );
// }

// export default NoteState;

import { useState } from "react";
import NoteContex from "./NoteContex";
const NoteState = (prop) =>{
    const initalNotes = [
        {
          "_id": "66fe4370595de1746df03ed5",
          "user": "66fe4354595de1746df03ed3",
          "title": "Item 1",
          "description": "Rice : 10 kg, Onion : 10 kg, Tomato : 500g",
          "tag": "Mess 1",
          "date": "2024-10-03T07:10:40.497Z",
          "__v": 0
        },
        {
          "_id": "66fe4400595de1746df03ed7",
          "user": "66fe4354595de1746df03ed3",
          "title": "Item 2",
          "description": "Rice:5kg, Namak : 1kg, Termeric : 100g",
          "tag": "Mess 1",
          "date": "2024-10-03T07:13:04.289Z",
          "__v": 0
        },
        {
          "_id": "66fe4401595de1746df03ed9",
          "user": "66fe4354595de1746df03ed3",
          "title": "Item 2",
          "description": "Rice:5kg, Namak : 1kg, Termeric : 100g",
          "tag": "Mess 1",
          "date": "2024-10-03T07:13:05.679Z",
          "__v": 0
        },
        {
          "_id": "66fe4401595de1746df03edb",
          "user": "66fe4354595de1746df03ed3",
          "title": "Item 2",
          "description": "Rice:5kg, Namak : 1kg, Termeric : 100g",
          "tag": "Mess 1",
          "date": "2024-10-03T07:13:05.856Z",
          "__v": 0
        }
      ];

      const [notes,setNotes] = useState(initalNotes)

    return (
        <NoteContex.Provider value={{notes,setNotes}}>
            {prop.children}
        </NoteContex.Provider>
    )
}
export default NoteState;