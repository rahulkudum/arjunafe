import React, { useContext, useEffect, useState } from "react";
import logo from "../logo.jpg";
import { Switch, Route, useHistory, useParams, useRouteMatch } from "react-router-dom";
import axios from "axios";

import Newform from "./newform";

function Mainform(props) {
 let history = useHistory();
 let { path, url } = useRouteMatch();
 let { webinardetails } = useParams();
 let webinarName = webinardetails.slice(0, webinardetails.indexOf("^"));
 let webinarSpeaker = webinardetails.slice(webinardetails.indexOf("^") + 1);

 const [webinar, setWebinar] = useState([]);
 const [name, setName] = useState("");
 const [number, setNumber] = useState();

 useEffect(() => {
  axios
   .post("https://arjunadb.herokuapp.com/webinar/find", { name: webinarName, speaker: webinarSpeaker })
   .then((res) => setWebinar(res.data))
   .catch((err) => console.log(err));
 }, []);
 return (
  <Switch>
   <Route exact path={path}>
    <div className="text-center page">
     <main className="form-signin">
      <form
       onSubmit={(e) => {
        e.preventDefault();
        axios
         .post("https://arjunadb.herokuapp.com/user/find", { number: Number(number) })
         .then((res) => {
          if (res.data) {
           res.data.webinars.push({ name: webinar.name, speaker: webinar.speaker });
           let users = [...webinar.users];
           users.push({ name: name, number: number });

           axios
            .post("https://arjunadb.herokuapp.com/user/webinaradd", {
             name: name,
             number: number,
             webinarname: webinar.name,
             webinarspeaker: webinar.speaker,
            })
            .then((res) => {
             if (!res.data) alert("You have already registered for this webinar");
             history.push(`${url}/thankyou`);
            })
            .catch((err) => console.log(err));
          } else history.push(`${url}/newform`);
         })
         .catch((err) => console.log(err));
       }}
      >
       <img className="mb-4" src={logo} alt="" />
       <h1 className="h3 mb-3 fw-normal">{webinar.name}</h1>

       <input type="text" className="form-control name" placeholder="Full Name" value={name} required autoFocus onChange={(e) => setName(e.target.value)} />

       <input type="text" className="form-control no" placeholder="WhatsApp No" value={number} required onChange={(e) => setNumber(e.target.value)} />

       <button className="w-100 btn btn-lg btn-primary" submit>
        Submit
       </button>
      </form>
     </main>
    </div>
   </Route>

   <Route path={`${path}/thankyou`}>
    <div class="jumbotron text-center thankyou">
     <h1 class="display-3">Thank You!</h1>

     <hr />
     <p>
      Having trouble? <a href="">Contact us</a>
     </p>
    </div>
   </Route>

   <Route path={`${path}/newform`}>
    <Newform name={[name, setName]} number={[number, setNumber]} webinar={[webinar, setWebinar]} />
   </Route>
  </Switch>
 );
}

export default Mainform;
