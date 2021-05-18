import React, { useContext, useEffect, useState } from "react";

import { Switch, Route, useHistory, useParams, useRouteMatch } from "react-router-dom";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import logo from "../logo.png";
import { makeStyles } from "@material-ui/core/styles";
import { Image } from "cloudinary-react";

const useStyles = makeStyles((theme) => ({
 root: {
  flexGrow: 1,
 },
}));

function Form() {
 const classes = useStyles();
 let history = useHistory();
 let { path, url } = useRouteMatch();
 let { webinarId } = useParams();

 const [webinar, setWebinar] = useState({});
 const [name, setName] = useState("");
 const [number, setNumber] = useState();
 const [dob, setDob] = useState("");
 const [email, setEmail] = useState("");
 const [gender, setGender] = useState("");
 const [role, setRole] = useState("");
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
  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms).forEach(function (form) {
   form.addEventListener(
    "submit",
    function (event) {
     if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
     }

     form.classList.add("was-validated");
    },
    false
   );
  });
 }, []);
 return (
  <Switch>
   <Route exact path={path}>
    {!done ? (
     <Grid container>
      {webinar.image ? (
       <Grid item style={{ textAlign: "center", margin: "auto", padding: "0" }} item xs={12} xl={6} lg={6} md={6} sm={12}>
        <img style={{ width: "100%", height: "100vh" }} src={`https://res.cloudinary.com/arjunadb/image/upload/${webinar.image}`} />
       </Grid>
      ) : (
       <Grid item style={{ textAlign: "center", margin: "auto", padding: "0" }} item xs={12} xl={6} lg={6} md={6} sm={12}>
        <Image style={{ width: "100%", height: "100vh" }} cloudName="arjunadb" publicId={`webinar_posters/${webinarId}`} />
        {/* <img src="https://www.dropbox.com/recents?_tk=web_left_nav_bar&preview=WhatsApp+Image+2021-05-16+at+20.37.49.jpeg" /> */}
        {/* <iframe src="https://drive.google.com/file/d/10FmBmjJnxQIPZEgi-L96RqY2_Yq0rVFR/preview" width="640" height="480"></iframe> */}
       </Grid>
      )}
      <Grid item xs={12} xl={6} lg={6} md={6} sm={12} style={{ margin: "0", padding: "0" }}>
       <div className="page3">
        <div
         style={{
          width: "100%",
          height: "150px",
          backgroundColor: "#343f56",
          color: "white",
          fontSize: "50px",
          position: "relative",
         }}
        >
         <p style={{ position: "absolute", top: "50%", left: "50%", transform: "translateX(-50%) translateY(-50%)" }}>Registration</p>
        </div>

        {!newStudent ? (
         <form
          noValidate
          className="needs-validation 1"
          onSubmit={(e) => {
           e.preventDefault();

           //  axios
           //   .post("https://arjunadb.herokuapp.com/user/find", { number: Number(number) })
           //   .then((res) => {
           //    if (res.data) {
           //     if (res.data.email === "" || res.data.dob === "") {
           //      setId(res.data._id);
           //      setNewStudent("part");
           //     } else {
           //      axios
           //       .post("https://arjunadb.herokuapp.com/user/webinaradd", {
           //        id: res.data._id,
           //        webinarid: webinar._id,
           //       })
           //       .then((res) => {
           //        if (!res.data) alert("You have already registered for this webinar");
           //        setDone(true);
           //       })
           //       .catch((err) => console.log(err));
           //     }
           //    } else setNewStudent("new");
           //   })
           //   .catch((err) => console.log(err));
           setNewStudent("new");
          }}
         >
          <div className="div-signin">
           <p>Thank you for your interest!</p>
           <p>Kindly fill out this short registration form to be updated about our events.</p>
          </div>
          <main className="form-signin">
           <input
            type="text"
            className="form-control name"
            placeholder="Name"
            value={name}
            required
            autoFocus
            id="defaultFormRegisterNameEx"
            onChange={(e) => setName(e.target.value)}
           />
           <div class="invalid-feedback">Name should not be empty</div>
           <br />

           <input
            type="text"
            className="form-control name"
            placeholder="Mobile Number"
            value={number}
            pattern="^[0-9]{10}$"
            required
            id="defaultFormRegisterNumberEx"
            onChange={(e) => setNumber(e.target.value)}
           />
           <div class="invalid-feedback">Mobile Number is not valid!</div>
          </main>

          <button className="btn-form" submit>
           Submit
          </button>
         </form>
        ) : (
         <form
          noValidate
          className="needs-validation 2"
          onSubmit={(e) => {
           e.preventDefault();

           //  if (newStudent === "new") {
           //   axios
           //    .post("https://arjunadb.herokuapp.com/user/add", {
           //     name: name,
           //     number: number,
           //     email: email,
           //     dob: dob,
           //     gender: gender,
           //     role:role,
           //     webinarid: webinar._id,
           //    })
           //    .then((res) => {
           //     console.log(res.data);
           //     setDone(true);
           //    })

           //    .catch((err) => console.log(err));
           //  } else if (newStudent === "part") {
           //   axios
           //    .post("https://arjunadb.herokuapp.com/user/updateadd", {
           //     id: id,
           //     email: email,
           //     dob: dob,
           //     webinarid: webinar._id,
           //    })
           //    .then((res) => {
           //     console.log(res.data);
           //     setDone(true);
           //    })

           //    .catch((err) => console.log(err));
           //  }

           setDone(true);
          }}
         >
          <div className="div-signin">
           <p>Looks like this is your first ARJUNA webinar!</p>
           <p>By filling out the below details, you can receive updates about our events</p>
          </div>
          <main className="form-signin">
           <input
            type="email"
            className="form-control name"
            placeholder="E-mail"
            id="defaultFormRegisterEmailEx"
            value={email}
            required
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
           />
           <div class="invalid-feedback">Email is not valid!</div>

           <br />

           {newStudent === "new" ? (
            <>
             <input
              type="text"
              className="form-control name"
              placeholder="Gender"
              value={gender}
              id="defaultFormRegisterGenderEx"
              required
              onChange={(e) => setGender(e.target.value)}
             />
             <div class="invalid-feedback">Gender should be either Male or Female</div>
             <br />
             <input
              type="text"
              className="form-control name"
              placeholder="Role"
              id="defaultFormRegisterRoleEx"
              value={role}
              required
              onChange={(e) => setRole(e.target.value)}
             />
             <div class="invalid-feedback">Role should not be empty</div>

             <br />
            </>
           ) : null}
           <input
            type="text"
            className="form-control name"
            placeholder="Date of Birth: dd/mm/yyyy"
            value={dob}
            id="defaultFormRegisterdobEx"
            required
            pattern="^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$"
            onChange={(e) => setDob(e.target.value)}
           />
           <div class="invalid-feedback">Valid format for Date of Birth: dd/mm/yyyy</div>
          </main>
          <button className="btn-form" submit>
           Submit
          </button>
         </form>
        )}
       </div>
      </Grid>
     </Grid>
    ) : (
     <div class="jumbotron text-center thankyou">
      <h1 class="display-3">Thank You!</h1>

      <hr />
     </div>
    )}
   </Route>
  </Switch>
 );
}

export default Form;
