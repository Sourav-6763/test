import axios from "axios";
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";

function UpdateTodo({ closeEditBox,editdata,Id }) {
  let[data,setdata]=useState({});
  const userTitle = useRef();
  const userBody = useRef();

  const clickupdate= async()=>{
    const Utitle = userTitle.current.value;
    const Ubody = userBody.current.value;
    setdata({title:Utitle,body:Ubody});
    
    await axios.put(`${window.location.origin}/updatetask/${Id}`,{
      title: Utitle,
      body: Ubody
    }).then((response) => {
      toast.success(response.data.message);
    });

  }
  return (
    <>
      <div className="inputField">
        <label htmlFor="uTitle">Title</label>
        <input type="text" id="uTitle" name="uTitle" defaultValue={editdata.title} ref={userTitle}/>
        <br />
      </div>
      <div className="inputField">
        <label htmlFor="uBody">Description</label>
        <input type="text" id="uBody" name="uBody" defaultValue={editdata.body} ref={userBody}/>
        <br />
      </div>
      <button onClick={clickupdate}>Update</button>
      <button onClick={closeEditBox}>Close</button>
    </>
  );
}

export default UpdateTodo;
