import React, { useContext, useEffect, useState } from "react";
import { Switch, Route, useHistory, useParams, useRouteMatch } from "react-router-dom";
import axios from "axios";

function User(props) {
 let history = useHistory();
 let { path, url } = useRouteMatch();
 const [userList, setUserList] = props.userList;
 const [query, setQuery] = useState("");
 const [search, setSearch] = useState([{ property: "name", operator: "=", value: "" }]);
 const [search2, setSearch2] = useState([{ property: "name", operator: "=", value: "" }]);
 const [update, setUpdate] = useState([{ property: "name", value: "" }]);
 return (
  <div className="row">
   <div className="col-4">
    <div className="list-group" id="list-tab" role="tablist">
     <a className="list-group-item list-group-item-action active" data-bs-toggle="list" href="#search-operations" role="tab">
      Search Operations
     </a>
     <a className="list-group-item list-group-item-action" data-bs-toggle="list" href="#update-operations" role="tab">
      Update Operations
     </a>
     {userList.map((val, i) => {
      return (
       <a
        className="list-group-item list-group-item-action "
        data-bs-toggle="list"
        href={`#a${val._id}`}
        role="tab"
        onClick={() => {
         window.scrollTo(0, 0);
        }}
       >
        {val.name}
       </a>
      );
     })}
    </div>
   </div>

   <div className="col-8">
    <div className="tab-content" id="nav-tabContent">
     <div className="tab-pane fade show active page" id="search-operations" role="tabpanel">
      <h2>No of Students: {userList.length}</h2>
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
           console.log(res.data);
           if (res.data.length === 0) alert("No users found");
           else
            setUserList((prev) => {
             return [...res.data];
            });
          })
          .catch((err) => console.log(err));

         console.log(JSON.parse(query));
        }}
       >
        {search.map((item, i) => {
         return (
          <div className="input-group mb-3">
           <label className="input-group-text" for="inputGroupSelect01">
            Property
           </label>
           <select
            className="form-select"
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
            <option value="number">Phone No</option>
            <option value="email">Email</option>
            <option value="gender">Gender</option>
            <option value="dob">DOB</option>
            <option value="beyr10">10BEYr</option>
            <option value="beyr12">12BEYr</option>
            <option value="eeyr">EEYr</option>
            <option value="educationid">EducationId</option>
            <option value="volunteerwork">VolunteerWork</option>
            <option value="arjunapoc">ArjunaPOC</option>
            <option value="communicationmethod">CommunicationMethod</option>
            <option value="subscriptionstatus">SubscriptionStatus</option>
            <option value="lastcontact">LastContact</option>
            <option value="webinarscount">WebinarsCount</option>
            <option value="coursescount">CoursesCount</option>
           </select>
           <label className="input-group-text" for="inputGroupSelect01">
            Opearator
           </label>
           <select
            className="form-select"
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
           <label className="input-group-text" for="inputGroupSelect01">
            Value
           </label>

           {i === 0 ? (
            <input
             type="text"
             className="form-control"
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
             className="form-control"
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
        <button className="btn btn-lg btn-primary">Search Queries</button>
       </form>
      </main>
     </div>
     <div className="tab-pane fade page" id="update-operations" role="tabpanel">
      <main className="form-signin query">
       <form
        onSubmit={(e) => {
         e.preventDefault();
         let query = "{";
         search2.map((item, i) => {
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

         let uquery = "{";
         update.map((item, i) => {
          if (item.value) {
           if (i) uquery += ",";
           uquery += JSON.stringify(item.property);
           if (isNaN(Number(item.value))) uquery += ":" + JSON.stringify(item.value);
           if (!isNaN(Number(item.value))) uquery += ":" + item.value;
          }
         });

         uquery += "}";

         axios
          .post("https://arjunadb.herokuapp.com/user/update", { query: JSON.parse(query), update: JSON.parse(uquery) })
          .then((res) => {
           console.log(res.data);
           if (res.data.length === 0) alert("No users found to update");
           else {
            // setUserList((prev) => {
            //  return [...res.data];
            // });
            alert("Sucessfully updated");
           }
          })
          .catch((err) => console.log(err));

         console.log(JSON.parse(query), JSON.parse(uquery));
        }}
       >
        {search2.map((item, i) => {
         return (
          <div className="input-group mb-3">
           <label className="input-group-text" for="inputGroupSelect01">
            Property
           </label>
           <select
            className="form-select"
            id="inputGroupSelect01"
            onChange={(e) => {
             setSearch2((prev) => {
              let dummy = [...prev];
              dummy[i].property = e.target.value;
              return dummy;
             });
            }}
           >
            <option value="name">Name</option>
            <option value="number">Phone No</option>
            <option value="email">Email</option>
            <option value="gender">Gender</option>
            <option value="dob">DOB</option>
            <option value="beyr10">10BEYr</option>
            <option value="beyr12">12BEYr</option>
            <option value="eeyr">EEYr</option>
            <option value="educationid">EducationId</option>
            <option value="volunteerwork">VolunteerWork</option>
            <option value="arjunapoc">ArjunaPOC</option>
            <option value="communicationmethod">CommunicationMethod</option>
            <option value="subscriptionstatus">SubscriptionStatus</option>
            <option value="lastcontact">LastContact</option>
            <option value="webinarscount">WebinarsCount</option>
            <option value="coursescount">CoursesCount</option>
           </select>
           <label className="input-group-text" for="inputGroupSelect01">
            Opearator
           </label>
           <select
            className="form-select"
            id="inputGroupSelect01"
            onChange={(e) => {
             setSearch2((prev) => {
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
           <label className="input-group-text" for="inputGroupSelect01">
            Value
           </label>

           {i === 0 ? (
            <input
             type="text"
             className="form-control"
             value={search2.value}
             required
             onChange={(e) => {
              setSearch2((prev) => {
               let dummy = [...prev];
               dummy[i].value = e.target.value;
               return dummy;
              });
             }}
            />
           ) : (
            <input
             type="text"
             className="form-control"
             value={search2.value}
             onChange={(e) => {
              setSearch2((prev) => {
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
          setSearch2((prev) => {
           let dummy = [...prev];
           dummy.push({ property: "name", operator: "=", value: "" });
           return dummy;
          });
         }}
        >
         Add Query
        </button>
        <br />
        <br />
        {update.map((item, i) => {
         return (
          <div className="input-group mb-3">
           <label className="input-group-text" for="inputGroupSelect01">
            Property
           </label>
           <select
            className="form-select"
            id="inputGroupSelect01"
            onChange={(e) => {
             setUpdate((prev) => {
              let dummy = [...prev];
              dummy[i].property = e.target.value;
              return dummy;
             });
            }}
           >
            <option value="name">Name</option>
            <option value="number">Phone No</option>
            <option value="email">Email</option>
            <option value="gender">Gender</option>
            <option value="dob">DOB</option>
            <option value="beyr10">10BEYr</option>
            <option value="beyr12">12BEYr</option>
            <option value="eeyr">EEYr</option>
            <option value="educationid">EducationId</option>
            <option value="volunteerwork">VolunteerWork</option>
            <option value="arjunapoc">ArjunaPOC</option>
            <option value="communicationmethod">CommunicationMethod</option>
            <option value="subscriptionstatus">SubscriptionStatus</option>
            <option value="lastcontact">LastContact</option>
           </select>
           <label className="input-group-text" for="inputGroupSelect01">
            Equal to
           </label>

           {i === 0 ? (
            <input
             type="text"
             className="form-control"
             required
             value={update.value}
             required
             onChange={(e) => {
              setUpdate((prev) => {
               let dummy = [...prev];
               dummy[i].value = e.target.value;
               return dummy;
              });
             }}
            />
           ) : (
            <input
             type="text"
             className="form-control"
             value={update.value}
             onChange={(e) => {
              setUpdate((prev) => {
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
          setUpdate((prev) => {
           let dummy = [...prev];
           dummy.push({ property: "name", value: "" });
           return dummy;
          });
         }}
        >
         Add another Property
        </button>
        <button className="btn btn-lg btn-primary">Update Properties</button>
       </form>
      </main>
     </div>
     {userList.map((val, i) => {
      return (
       <div className="tab-pane fade" id={`a${val._id}`} role="tabpanel">
        <div className="card">
         <h5 className="card-header">
          User Details
          <button
           type="button"
           className="btn btn-outline-danger"
           onClick={() => {
            axios
             .post("https://arjunadb.herokuapp.com/user/delete", { id: val._id })
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
          <p className="card-title">{val.number}</p>
          <p className="card-text">Email: {val.email}</p>
          <p className="card-text">Gender: {val.gender}</p>
          <p className="card-text">DOB: {val.dob}</p>
          <p className="card-text">10BEYr: {val.beyr10}</p>
          <p className="card-text">12BEYr: {val.beyr12}</p>
          <p className="card-text">EEYr: {val.eeyr}</p>
          <p className="card-text">Education Id: {val.educationid}</p>
          <p className="card-text">Volunteer Work: {val.volunteerwork}</p>
          <p className="card-text">ARJUNA POC: {val.arjunapoc}</p>
          <p className="card-text">Communication Method : {val.communicationmethod}</p>
          <p className="card-text">Subscription Status : {val.subscriptionstatus}</p>
          <p className="card-text">Last Contact: {val.lastcontact}</p>
          <br />
          {val.webinars.length > 0 ? (
           <>
            <a
             className="btn btn-primary"
             data-bs-toggle="collapse"
             href="#collapseExample"
             role="button"
             aria-expanded="false"
             aria-controls="collapseExample"
            >
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
                  data-bs-target={`#a${webinar.id}`}
                  onClick={() => {
                   if (!webinar.data) {
                    console.log("vhbj");
                    axios
                     .post("https://arjunadb.herokuapp.com/webinar/find", { webinarid: webinar.id })
                     .then((res) => {
                      console.log(res.data);
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
                 <div className="collapse" id={`a${webinar.id}`}>
                  <div className="card card-body">
                   {webinar.data ? (
                    <div>
                     <p>Speaker: {webinar.data.speaker}</p>
                     <p>Date: {webinar.data.date}</p>
                     <p>Cheif Guest: {webinar.data.guest}</p>
                     <p>Description: {webinar.data.description}</p>
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
            </div>{" "}
           </>
          ) : (
           "No Webinars Registered"
          )}
          {/* <br />
          {val.webinars.length > 0 ? (
           <>
            <a
             className="btn btn-primary"
             data-bs-toggle="collapse"
             href="#collapseExample"
             role="button"
             aria-expanded="false"
             aria-controls="collapseExample"
            >
             Courses Registered
            </a>
            <div className="collapse" id="collapseExample">
             <div className="card card-body">
              {val.webinars.map((webinar, j) => {
               return (
                <>
                 <button
                  className="btn"
                  data-bs-toggle="collapse"
                  data-bs-target={`#${webinar.name.split(" ").join("")}_${webinar.speaker.split(" ").join("").split(".").join("")}`}
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
                 <div className="collapse" id={`${webinar.name.split(" ").join("")}_${webinar.speaker.split(" ").join("").split(".").join("")}`}>
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
            </div>{" "}
           </>
          ) : (
           "No Course Registered"
          )} */}
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
