    import { useContext, useState } from "react";
    import contexValue from "../contex/notes/NoteContex";
    import AllNotes from "./AllNotes";
    import Temp from "./Temp";
import UpdateNotes from "./UpdateNotes";

    export default function Home() {
    const contex = useContext(contexValue);
    const { notes, setNotes } = contex;
    const [activeTab,setActiveTab] = useState(0);


    //Handle tab click and set index 
    const handleTabClick = (index)=>{
        setActiveTab(index);
    }
    // console.log(notes)
    return (
        <>
        <div className=" m-3 ">
            <div className="d-flex align-items-start w-100">
            <div className="notes w-25">
                {notes?.map((note, index) => (
                <div
                    className="nav flex-column nav-pills me-3 m-2"
                    id="v-pills-tab"
                    role="tablist"
                    aria-orientation="vertical"
                >
                    <button
                    key={index}
                    className={`nav-link ${activeTab==index ? 'active' : ''}`}
                    id={`v-pills-${index}-tab`}
                    data-bs-toggle="pill"
                    data-bs-target={`#v-pills-${index}`}
                    type="button"
                    role="tab"
                    aria-controls={`v-pills-${index}`}
                    aria-selected={`${activeTab===index?'true':'false'}`}
                    onClick={()=>{handleTabClick(index)}}
                    style={{padding:'0.5px'}}
                    >
                    <AllNotes
                        title={note.title}
                        body={note.description}
                    />
                    </button>
                </div>
                ))}
            </div>
            <div className="description w-75">
                {notes?.map((note, index) => (
                <div className="tab-content h-100vh" id="v-pills-tabContent">
                    <div
                    key={index}
                    className={`tab-pane fade ${activeTab==index?'show active':''}`}
                    id={`v-pills-${index}`}
                    role="tabpanel"
                    aria-labelledby={`v-pills-${index}-tab`}
                    >
                        <UpdateNotes note={note}/>
                    {/* {note.description} */}
                    </div>
                </div>
                ))}
            </div>
            </div>
        </div>
        
        </>
    );
    }
