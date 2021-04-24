import React, { useContext, useEffect, useState } from "react";
import { Switch, Route, useHistory, useParams, useRouteMatch } from "react-router-dom";
import axios from "axios";

function Pwebinar(props) {
 let history = useHistory();
 let { path, url } = useRouteMatch();
 const [webinarList, setWebinarList] = props.pwebinarList;
 const [webinarName, setWebinarName] = useState("");
 const [level, setLevel] = useState("");
 const [description, setDescription] = useState("");

 return (
  <div>
   <div className="row">
    <div className="col-4">
     <div className="list-group" id="list-tab" role="tablist">
      <a className="list-group-item list-group-item-action " data-bs-toggle="list" href="#create-new-webinar" role="tab">
       Create New Webinar
      </a>
      {webinarList
       .slice(0)
       .reverse()
       .map((val, i) => {
        return (
         <a className="list-group-item list-group-item-action " data-bs-toggle="list" href={`#a${val._id}`} role="tab">
          {val.name}
         </a>
        );
       })}
     </div>
    </div>
    <div className="col-8">
     <div className="tab-content" id="nav-tabContent">
      <div className="tab-pane fade page" id="create-new-webinar" role="tabpanel">
       <main className="form-signin">
        <h1 className="h3 mb-3 fw-normal">New Webinar</h1>
        <form
         onSubmit={(e) => {
          e.preventDefault();

          axios
           .post("http://localhost:5000/pwebinar/add", { name: webinarName, description: description, level: level })
           .then((res) => {
            setWebinarList((prev) => {
             let dummy = [...prev];
             dummy.push({ name: webinarName, description: description, level: level, webinarinstances: [] });
             return dummy;
            });
            setWebinarName("");
            setDescription("");
            setLevel("");
           })
           .catch((err) => console.log(err));
         }}
        >
         <input
          type="text"
          className="form-control name"
          placeholder="Webinar Name"
          required
          autoFocus
          value={webinarName}
          onChange={(e) => {
           setWebinarName(e.target.value);
          }}
         />

         <input
          type="text"
          className="form-control name"
          placeholder="Description"
          required
          value={description}
          onChange={(e) => {
           setDescription(e.target.value);
          }}
         />

         <input
          type="text"
          className="form-control name"
          placeholder="Level"
          required
          value={level}
          onChange={(e) => {
           setLevel(e.target.value);
          }}
         />
         <button className="w-100 btn btn-lg btn-primary" submit>
          Create
         </button>
        </form>
       </main>
      </div>

      {webinarList.map((val, i) => {
       return (
        <div className="tab-pane fade" id={`a${val._id}`} role="tabpanel">
         <div class="card">
          <h5 class="card-header">
           Webinar Details
           <button
            type="button"
            class="btn"
            style={{ color: "red" }}
            onClick={() => {
             axios
              .post("http://localhost:5000/pwebinar/delete", { id: val._id })
              .then((res) => {
               setWebinarList((prev) => {
                return prev.filter((item, k) => k !== i);
               });
              })
              .catch((err) => console.log(err));
            }}
           >
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
             <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
             <path
              fill-rule="evenodd"
              d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
             />
            </svg>
           </button>
          </h5>
          <div class="card-body">
           <h5 class="card-title">{val.name}</h5>
           <p class="card-text">Description: {val.description}</p>
           <p class="card-text">Level: {val.level}</p>
          </div>
         </div>
        </div>
       );
      })}
     </div>
    </div>
   </div>
  </div>
 );
}

export default Pwebinar;
