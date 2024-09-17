import React, { useEffect, useRef, useState } from "react";
import TodooCards from "./TodooCards";
import toast, { Toaster } from "react-hot-toast";
import UpdateTodo from "./UpdateTodo";
import "./Todo.css";
import axios from "axios";

function Todo() {
  // const [items, setItems] = useState([]);
  const[actualdata,setActualdata]=useState();
  const userTitle = useRef();
  const userDes = useRef();
  const [editopen, setEditopen] = useState(false);
  const [editdata, setEditdata] = useState({});
  const [Id, setId] = useState("");

  let id = sessionStorage.getItem("id");

 
  const addsubmit = async () => {
    const uTitle = userTitle.current.value;
    const uDes = userDes.current.value;

    if (uTitle && uDes) {
      if (id) {
        await axios
          .post(`${window.location.origin}/addtask`, {
            title: uTitle,
            body: uDes,
            id: id,
          })
          .then((Response) => {
            console.log(Response);
          });
      }
      toast.success("Successfully toasted!");
      userTitle.current.value = "";
    userDes.current.value = "";
    }
    
  };


  useEffect(() => {
    const fetch = async () => {
      await axios.get(`${window.location.origin}/gettask/${id}`).then((Response)=>{
        setActualdata(Response.data.list)
      })
    }
    fetch();
  }, [addsubmit]);


  const del = async (id) => {
    try {
      const response = await axios.delete(`${window.location.origin}/deletetask/${id}`);
      console.log(response.data); // Log the response data
      // Optionally, you can handle the response here, e.g., updating UI state
    } catch (error) {
      console.error('Error deleting task:', error); // Log any errors that occur
    }
  };
  const editclickHndel = () => {
    setEditopen(!editopen);
  };
  const closeEditBoxpop = () => {
    setEditopen(!editopen);
  };
const edit=async(editid)=>{
  const response = await axios.get(`${window.location.origin}/edittask/${editid}`);
setEditdata(response.data)
setId(editid)
}

  return (
    <>
      <Toaster />
      <div className="container todo">
        <h1>Make Your Day Awesome</h1>
        <div className="inputField">
          <label htmlFor="uTitle">Title</label>
          <input type="text" id="uTitle" name="uTitle" ref={userTitle} />
          <br />
        </div>
        <div className="inputField">
          <label htmlFor="uBody">Description</label>
          <input type="text" id="uBody" name="uBody" ref={userDes} />
          <br />
        </div>
        <button onClick={addsubmit}>Submit</button>

        <div className="row">
          {actualdata &&
            actualdata.map((item, index) => (
              <div className="col-lg-3 mx-5 my-2">
                <TodooCards
                  key={index}
                  id={item._id}
                  title={item.title}
                  description={item.body}
                  delid={del}
                  editid={edit}
                  editclick={editclickHndel}
                />
              </div>
            ))}
        </div>
        <div className={`todo-update bg-success ${editopen ? "show" : "hide"}`}>
          <UpdateTodo closeEditBox={closeEditBoxpop} editdata={editdata} Id={Id}/>
        </div>
      </div>
    </>
  );
}

export default Todo;
