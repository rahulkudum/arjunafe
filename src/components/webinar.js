import React, { useContext, useEffect, useState } from "react";
import { Switch, Route, useHistory, useParams, useRouteMatch } from "react-router-dom";
import axios from "axios";
import XLSX from "xlsx";
import { saveAs } from "file-saver";

import Mainform from "./mainform";

function Webinar(props) {
 let history = useHistory();
 let { path, url } = useRouteMatch();
 const [webinarList, setWebinarList] = props.webinarList;
 const [currentWebinar, setCurrentWebinar] = useState([]);
 const [webinarName, setWebinarName] = useState("");
 const [speakerName, setSpeakerName] = useState("");

 return (
  <Switch>
   <Route exact path={path}>
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
          <a
           className="list-group-item list-group-item-action "
           data-bs-toggle="list"
           href={`#${val.name.split(" ").join("")}_${val.speaker.split(" ").join("")}`}
           role="tab"
          >
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
            .post("https://arjunadb.herokuapp.com/webinar/find", { name: webinarName, speaker: speakerName })
            .then((res) => {
             if (!res.data) {
              axios
               .post("https://arjunadb.herokuapp.com/webinar/add", { name: webinarName, speaker: speakerName })
               .then((res) => {
                setWebinarList((prev) => {
                 let dummy = [...prev];
                 dummy.push({ name: webinarName, speaker: speakerName, users: [] });
                 return dummy;
                });
                setWebinarName("");
                setSpeakerName("");
               })
               .catch((err) => console.log(err));
             } else alert("This webinar already exists!");
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
           className="form-control no"
           placeholder="Speaker Name"
           required
           value={speakerName}
           onChange={(e) => {
            setSpeakerName(e.target.value);
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
         <div className="tab-pane fade" id={`${val.name.split(" ").join("")}_${val.speaker.split(" ").join("")}`} role="tabpanel">
          <div class="card">
           <h5 class="card-header">
            Webinar Details
            <button
             className="btn"
             style={{ color: "green" }}
             onClick={() => {
              const apiResources = val.users.map((user, j) => {
               return { number: user.number };
              });

              async function getAllUrls(urls) {
               try {
                var datas = await Promise.all(urls.map((url) => axios.post("https://arjunadb.herokuapp.com/user/find", url).then((res) => res.data)));
                const excelArray = datas
                 .filter((data) => data)
                 .map((data, i) => {
                  return [data.name, data.number, data.school];
                 });

                var wb = XLSX.utils.book_new();
                wb.Props = {
                 Title: "Registered Students",
                 Subject: "Registered Students",
                 Author: "Arjuna",
                 CreatedDate: new Date(),
                };

                wb.SheetNames.push("Registered Students");

                var ws = XLSX.utils.aoa_to_sheet([["Name", "WhatsApp No", "School"], ...excelArray]);
                wb.Sheets["Registered Students"] = ws;
                var wbout = XLSX.write(wb, { bookType: "xlsx", type: "binary" });
                function s2ab(s) {
                 var buf = new ArrayBuffer(s.length);
                 var view = new Uint8Array(buf);
                 for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
                 return buf;
                }

                saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), val.name + "_" + val.speaker + ".xlsx");
               } catch (error) {
                console.log(error);
               }
              }

              getAllUrls(apiResources);
             }}
            >
             <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-file-earmark-spreadsheet" viewBox="0 0 16 16">
              <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V9H3V2a1 1 0 0 1 1-1h5.5v2zM3 12v-2h2v2H3zm0 1h2v2H4a1 1 0 0 1-1-1v-1zm3 2v-2h3v2H6zm4 0v-2h3v1a1 1 0 0 1-1 1h-2zm3-3h-3v-2h3v2zm-7 0v-2h3v2H6z" />
             </svg>
            </button>
            <button
             type="button"
             class="btn"
             style={{ color: "red" }}
             onClick={() => {
              axios
               .post("https://arjunadb.herokuapp.com/webinar/delete", { name: val.name, speaker: val.speaker })
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
            <p class="card-text">{val.speaker}</p>
            <a
             className="btn btn-primary"
             onClick={() => {
              setCurrentWebinar(val);
              history.push(`${url}/${val.name}^${val.speaker}`);
             }}
            >
             Link
            </a>

            <a class="btn btn-primary" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
             Students Registered
            </a>
            <div class="collapse" id="collapseExample">
             <div class="card card-body">
              {val.users.map((user, j) => {
               return (
                <>
                 <button
                  className="btn"
                  data-bs-toggle="collapse"
                  data-bs-target={`#${user.name.split(" ").join("")}_${user.number}`}
                  onClick={() => {
                   if (!user.data) {
                    axios
                     .post("https://arjunadb.herokuapp.com/user/find", { number: user.number })
                     .then((res) => {
                      console.log(res.data);
                      setWebinarList((prev) => {
                       let dummy = [...prev];
                       dummy[i].users[j].data = res.data;
                       return dummy;
                      });
                     })
                     .catch((err) => console.log(err));
                   }
                  }}
                 >
                  {user.name}
                 </button>
                 <div class="collapse" id={`${user.name.split(" ").join("")}_${user.number}`}>
                  <div class="card card-body">
                   {user.data ? (
                    <div>
                     <p>{user.data.number}</p>
                     <p>{user.data.school}</p>
                     <p style={{ fontWeight: "bold" }}>Webinars attended</p>
                     {user.data.webinars.map((item, i) => {
                      return (
                       <p>
                        {item.name} {item.speaker}
                       </p>
                      );
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
   </Route>
   <Route path={`${path}/:webinardetails`}>
    <Mainform webinar={[currentWebinar, setCurrentWebinar]} />
   </Route>
  </Switch>
 );
}

export default Webinar;
