import React, { useContext, useEffect, useState } from "react";
import logo from "../logo.png";
import { Switch, Route, useHistory, useParams, useRouteMatch } from "react-router-dom";
import axios from "axios";

function Form() {
 let history = useHistory();
 let { path, url } = useRouteMatch();
 let { webinarId } = useParams();

 const [webinar, setWebinar] = useState({});
 const [name, setName] = useState("");
 const [number, setNumber] = useState();
 const [dob, setDob] = useState("");
 const [email, setEmail] = useState("");
 const [gender, setGender] = useState("");
 const [newStudent, setNewStudent] = useState("");
 const [done, setDone] = useState(false);
 const [id, setId] = useState("");

 useEffect(() => {
  axios
   .post("https://arjunadb.herokuapp.com/webinar/find", { webinarid: webinarId })
   .then((res) => {
    console.log(res.data, webinarId);
    setWebinar(res.data);
   })
   .catch((err) => console.log(err));
 }, []);
 return (
  <div className="backgroud">
   <Switch>
    <Route exact path={path}>
     {!done ? (
      <>
       {!newStudent ? (
        <div className="text-center page">
         <main className="form-signin">
          <form
           onSubmit={(e) => {
            e.preventDefault();
            axios
             .post("https://arjunadb.herokuapp.com/user/find", { number: Number(number) })
             .then((res) => {
              if (res.data) {
               if (res.data.email === "" || res.data.dob === "") {
                setId(res.data._id);
                setNewStudent("part");
               } else {
                axios
                 .post("https://arjunadb.herokuapp.com/user/webinaradd", {
                  id: res.data._id,
                  webinarid: webinar._id,
                 })
                 .then((res) => {
                  if (!res.data) alert("You have already registered for this webinar");
                  setDone(true);
                 })
                 .catch((err) => console.log(err));
               }
              } else setNewStudent("new");
             })
             .catch((err) => console.log(err));
           }}
          >
           <img className="mb-4" src={logo} alt="" />

           <input type="text" className="form-control name" placeholder="Full Name" value={name} required autoFocus onChange={(e) => setName(e.target.value)} />

           <input type="text" className="form-control name" placeholder="WhatsApp No" value={number} required onChange={(e) => setNumber(e.target.value)} />

           <button className="w-100 btn btn-lg btn-primary" submit>
            Submit
           </button>
          </form>
         </main>
        </div>
       ) : (
        <div className="text-center page">
         <main className="form-signin">
          <form
           onSubmit={(e) => {
            e.preventDefault();
            if (newStudent === "new") {
             axios
              .post("https://arjunadb.herokuapp.com/user/add", {
               name: name,
               number: number,
               email: email,
               dob: dob,
               gender: gender,
               webinarid: webinar._id,
              })
              .then((res) => {
               console.log(res.data);
               setDone(true);
              })

              .catch((err) => console.log(err));
            } else if (newStudent === "part") {
             axios
              .post("https://arjunadb.herokuapp.com/user/updateadd", {
               id: id,
               email: email,
               dob: dob,
               webinarid: webinar._id,
              })
              .then((res) => {
               console.log(res.data);
               setDone(true);
              })

              .catch((err) => console.log(err));
            }
           }}
          >
           <img className="mb-4" src={logo} alt="" />

           <input type="text" className="form-control name" placeholder="Full Name" value={name} required />

           <input type="text" className="form-control name" placeholder="WhatsApp No" value={number} required />

           <input type="text" className="form-control name" placeholder="Email" value={email} required autoFocus onChange={(e) => setEmail(e.target.value)} />
           {newStudent === "new" ? (
            <input type="text" className="form-control name" placeholder="Gender" value={gender} required onChange={(e) => setGender(e.target.value)} />
           ) : null}
           <input type="text" className="form-control name" placeholder="Date of Birth" value={dob} required onChange={(e) => setDob(e.target.value)} />

           <button className="w-100 btn btn-lg btn-primary" submit>
            Submit
           </button>
          </form>
         </main>
        </div>
       )}{" "}
      </>
     ) : (
      <div class="jumbotron text-center thankyou">
       <h1 class="display-3">Thank You!</h1>

       <hr />
      </div>
     )}
    </Route>
   </Switch>
  </div>
 );
}

export default Form;
