import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Switch, Route, useHistory, useParams, useRouteMatch } from "react-router-dom";
import logo from "../logo.jpg";

function Newform(props) {
 let history = useHistory();
 const [name, setName] = props.name;
 const [number, setNumber] = props.number;
 const [webinar, setWebinar] = props.webinar;
 const [dob, setDob] = useState("");
 const [email, setEmail] = useState("");
 const [gender, setGender] = useState("");

 return (
  <div className="text-center page">
   <main className="form-signin">
    <form
     onSubmit={(e) => {
      e.preventDefault();
      console.log(number);
      console.log({
       name: name,
       number: number,
       email: email,
       dob: dob,
       gender: gender,
       webinarname: webinar.name,
       webinarid: webinar._id,
      });
      axios
       .post("https://arjunadb.herokuapp.com/user/add", {
        name: name,
        number: number,
        email: email,
        dob: dob,
        gender: gender,
        webinarname: webinar.name,
        webinarid: webinar._id,
       })
       .then((res) => {
        console.log(res.data);
        history.push("/webinar/firsttime/thankyou");
       })

       .catch((err) => console.log(err));
     }}
    >
     <img className="mb-4" src={logo} alt="" />

     <input type="text" className="form-control name" placeholder="Full Name" value={name} required />

     <input type="text" className="form-control name" placeholder="WhatsApp No" value={number} required />

     <input type="text" className="form-control no" placeholder="Email" value={email} required autoFocus onChange={(e) => setEmail(e.target.value)} />
     <input type="text" className="form-control no" placeholder="Gender" value={gender} required onChange={(e) => setGender(e.target.value)} />
     <input type="text" className="form-control no" placeholder="Date of Birth" value={dob} required onChange={(e) => setDob(e.target.value)} />

     <button className="w-100 btn btn-lg btn-primary" submit>
      Submit
     </button>
    </form>
   </main>
  </div>
 );
}

export default Newform;
