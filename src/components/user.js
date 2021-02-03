import React, { useContext, useEffect, useState } from "react";
import { Switch, Route, useHistory, useParams, useRouteMatch } from "react-router-dom";
import axios from "axios";

function User(props) {
 let history = useHistory();
 let { path, url } = useRouteMatch();
 const [userList, setUserList] = props.userList;
 const [query, setQuery] = useState("");
 const [search, setSearch] = useState([{ property: "name", operator: "=", value: "" }]);
 return (
  <div className="row">
   <div className="col-4">
    <div className="list-group" id="list-tab" role="tablist">
     <a className="list-group-item list-group-item-action " data-bs-toggle="list" href="#search-operations" role="tab">
      Search Operations
     </a>
     {userList.map((val, i) => {
      return (
       <a className="list-group-item list-group-item-action " data-bs-toggle="list" href={`#${val.name.split(" ").join("")}_${val.number}`} role="tab">
        {val.name}
       </a>
      );
     })}
    </div>
   </div>

   <div className="col-8">
    <div className="tab-content" id="nav-tabContent">
     <div className="tab-pane fade page" id="search-operations" role="tabpanel">
      <main className="form-signin query">
       <form
        onSubmit={(e) => {
         e.preventDefault();
         let query = "{";
         search.map((item, i) => {
          if (item.value) {
           if (i) query += ",";
           query += JSON.stringify(item.property) + ":{";
           if (item.operator === "=") query += JSON.stringify("$eq");
           if (item.operator === ">") query += JSON.stringify("$gt");
           if (item.operator === "<") query += JSON.stringify("$lt");
           if (item.operator === ">=") query += JSON.stringify("$gte");
           if (item.operator === "<=") query += JSON.stringify("$lte");
           if (item.operator === "!") query += JSON.stringify("$ne");
           if (isNaN(Number(item.value))) query += ":" + JSON.stringify(item.value) + "}";
           if (!isNaN(Number(item.value))) query += ":" + item.value + "}";
          }
         });

         query += "}";

         axios
          .post("https://arjunadb.herokuapp.com/user/search", { query: JSON.parse(query) })
          .then((res) => {
           if (res.data.length === 0) alert("No users found");
           else setUserList(res.data);
          })
          .catch((err) => console.log(err));

         console.log(JSON.parse(query));
        }}
       >
        {search.map((item, i) => {
         return (
          <div class="input-group mb-3">
           <label class="input-group-text" for="inputGroupSelect01">
            Property
           </label>
           <select
            class="form-select"
            id="inputGroupSelect01"
            onChange={(e) => {
             setSearch((prev) => {
              let dummy = [...prev];
              dummy[i].property = e.target.value;
              return dummy;
             });
            }}
           >
            <option value="name">Name</option>
            <option value="number">WhatsApp No</option>
            <option value="school">School</option>
            <option value="webinarscount">Webinars count</option>
           </select>
           <label class="input-group-text" for="inputGroupSelect01">
            Opearator
           </label>
           <select
            class="form-select"
            id="inputGroupSelect01"
            onChange={(e) => {
             setSearch((prev) => {
              let dummy = [...prev];
              dummy[i].operator = e.target.value;
              return dummy;
             });
            }}
           >
            <option value="=">equal to</option>
            <option value=">">greater than</option>
            <option value="<">less than</option>
            <option value=">=">greater than or equal to</option>
            <option value="<=">less than or equal to</option>
            <option value="!">not equal to</option>
           </select>
           <label class="input-group-text" for="inputGroupSelect01">
            Value
           </label>

           {i === 0 ? (
            <input
             type="text"
             className="form-control name"
             required
             value={search.value}
             required
             onChange={(e) => {
              setSearch((prev) => {
               let dummy = [...prev];
               dummy[i].value = e.target.value;
               return dummy;
              });
             }}
            />
           ) : (
            <input
             type="text"
             className="form-control name"
             value={search.value}
             onChange={(e) => {
              setSearch((prev) => {
               let dummy = [...prev];
               dummy[i].value = e.target.value;
               return dummy;
              });
             }}
            />
           )}
          </div>
         );
        })}

        <button
         type="button"
         className="btn btn-lg btn-primary"
         onClick={() => {
          setSearch((prev) => {
           let dummy = [...prev];
           dummy.push({ property: "name", operator: "=", value: "" });
           return dummy;
          });
         }}
        >
         Add Query
        </button>
        <button className="btn btn-lg btn-primary" typr>
         Search Queries
        </button>
       </form>
      </main>
     </div>
     {userList.map((val, i) => {
      return (
       <div className="tab-pane fade" id={`${val.name.split(" ").join("")}_${val.number}`} role="tabpanel">
        <div className="card">
         <h5 className="card-header">
          User Details
          <button
           type="button"
           className="btn btn-outline-danger"
           onClick={() => {
            axios
             .post("https://arjunadb.herokuapp.com/user/delete", { number: val.number })
             .then((res) => {
              setUserList((prev) => {
               return prev.filter((item, k) => k !== i);
              });
             })
             .catch((err) => console.log(err));
           }}
          >
           <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash" viewBox="0 0 20 20">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
            <path
             fill-rule="evenodd"
             d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
            />
           </svg>
           Delete
          </button>
         </h5>
         <div className="card-body">
          <h5 className="card-title">{val.name}</h5>
          <p className="card-text">{val.number}</p>
          <p className="card-text">{val.school}</p>
          <a className="btn btn-primary" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
           Webinars Registered
          </a>
          <div className="collapse" id="collapseExample">
           <div className="card card-body">
            {val.webinars.map((webinar, j) => {
             return (
              <>
               <button
                className="btn"
                data-bs-toggle="collapse"
                data-bs-target={`#${webinar.name.split(" ").join("")}_${webinar.speaker.split(" ").join("")}`}
                onClick={() => {
                 if (!webinar.data) {
                  axios
                   .post("https://arjunadb.herokuapp.com/webinar/find", { name: webinar.name, speaker: webinar.speaker })
                   .then((res) => {
                    setUserList((prev) => {
                     let dummy = [...prev];
                     dummy[i].webinars[j].data = res.data;
                     return dummy;
                    });
                   })
                   .catch((err) => console.log(err));
                 }
                }}
               >
                {webinar.name}
               </button>
               <div className="collapse" id={`${webinar.name.split(" ").join("")}_${webinar.speaker.split(" ").join("")}`}>
                <div className="card card-body">
                 {webinar.data ? (
                  <div>
                   <p>{webinar.speaker}</p>
                   <p style={{ fontWeight: "bold" }}>Students Registered</p>
                   {webinar.data.users.map((item, i) => {
                    return <p>{item.name}</p>;
                   })}
                  </div>
                 ) : null}
                </div>
               </div>
              </>
             );
            })}
           </div>
          </div>
         </div>
        </div>
       </div>
      );
     })}
    </div>
   </div>
  </div>
 );
}

export default User;
