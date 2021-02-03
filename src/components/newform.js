import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Switch, Route, useHistory, useParams, useRouteMatch } from "react-router-dom";
import logo from "../logo.jpg";

function Newform(props) {
 let history = useHistory();
 const [name, setName] = props.name;
 const [number, setNumber] = props.number;
 const [school, setSchool] = useState("");
 const [webinar, setWebinar] = props.webinar;

 return (
  <div className="text-center page">
   <main className="form-signin">
    <form
     onSubmit={(e) => {
      e.preventDefault();
      console.log(number);

      axios
       .post("https://arjunadb.herokuapp.com/user/add", {
        name: name,
        number: number,
        school: school,
        webinarname: webinar.name,
        webinarspeaker: webinar.speaker,
       })
       .then((res) => {
        console.log(res);
        history.push("/webinar/firsttime/thankyou");
       })

       .catch((err) => console.log(err));
     }}
    >
     <img className="mb-4" src={logo} alt="" />

     <input type="text" className="form-control name" placeholder="Full Name" value={name} required />

     <input type="text" className="form-control name" placeholder="WhatsApp No" value={number} required />

     <input type="text" className="form-control no" placeholder="School" value={school} required autoFocus onChange={(e) => setSchool(e.target.value)} />

     <button className="w-100 btn btn-lg btn-primary" submit>
      Submit
     </button>
    </form>
   </main>
  </div>
 );
}

export default Newform;
