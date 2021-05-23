import React, { useContext, useEffect, useState } from "react";

import { Switch, Route, useHistory, useParams, useRouteMatch } from "react-router-dom";
import axios from "axios";
import Grid from "@material-ui/core/Grid";

import { makeStyles } from "@material-ui/core/styles";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Facebook, LinkedIn, Mail, Telegram, Twitter, WhatsApp, YouTube } from "@material-ui/icons";
import { Button } from "@material-ui/core";

import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Menu from "@material-ui/icons/Menu";
import { ListItem, ListItemIcon } from "@material-ui/core";
import { List, Menu as Dropdown, MenuItem } from "@material-ui/core";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
 root: {
  flexGrow: 1,
 },
 root2: {
  width: "100%",
  zIndex: 3,
 },
 heading: {
  fontSize: theme.typography.pxToRem(15),
  flexBasis: "33.33%",
  flexShrink: 0,
 },
 secondaryHeading: {
  fontSize: theme.typography.pxToRem(15),
  color: theme.palette.text.secondary,
 },
}));

const breakPoints = [
 { width: 1, itemsToShow: 1 },
 { width: 550, itemsToShow: 2, itemsToScroll: 2 },
 { width: 768, itemsToShow: 3 },
 { width: 1200, itemsToShow: 4 },
];

function Form(props) {
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
 const [deviceType, setDeviceType] = useState("mobile");
 const [part, setPart] = useState({ email: "", gender: "", role: "", dob: "" });
 const [menu, setMenu] = useState(false);
 const [keyboard, setKeyboard] = useState(false);

 const [anchorEl, setAnchorEl] = useState(null);

 const responsive = {
  desktop: {
   breakpoint: { max: 3000, min: 1024 },
   items: 5,
   slidesToSlide: 4, // optional, default to 1.
   partialVisibilityGutter: 40,
  },
  tablet: {
   breakpoint: { max: 1024, min: 600 },
   items: 2,
   slidesToSlide: 2, // optional, default to 1.
   partialVisibilityGutter: 30,
  },
  mobile: {
   breakpoint: { max: 600, min: 0 },
   items: 1,
   slidesToSlide: 1, // optional, default to 1.
   partialVisibilityGutter: 30,
  },
 };

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

  if (window.screen.width >= 1024) {
   setDeviceType("desktop");
  } else if (window.screen.width >= 600) {
   setDeviceType("tablet");
  }
 }, []);

 useEffect(() => {
  if (done) {
   var vid = document.getElementById("myVideo");
   if (vid) {
    vid.autoplay = true;
    vid.load();
   }
  }
 }, [done]);

 return (
  <Switch>
   <Route exact path={path}>
    {!done ? (
     <Grid container>
      <Grid item style={{ textAlign: "center", margin: "auto", padding: "0" }} item xs={12} xl={6} lg={6} md={6} sm={12}>
       <img className="poster" src={`https://res.cloudinary.com/arjunadb/image/upload/webinar_posters/${webinarId}`} />
      </Grid>

      <Grid item xs={12} xl={6} lg={6} md={6} sm={12} style={{ margin: "0", padding: "0" }}>
       <div className="page3">
        <div className="form-head">
         <p style={{ position: "absolute", top: "50%", left: "50%", transform: "translateX(-50%) translateY(-50%)" }}>Registration</p>
        </div>

        {!newStudent ? (
         <form
          noValidate
          className="needs-validation 1"
          onSubmit={(e) => {
           e.preventDefault();

           axios
            .post("https://arjunadb.herokuapp.com/user/find", { number: Number(number) })
            .then((res) => {
             if (res.data) {
              axios
               .post("https://arjunadb.herokuapp.com/user/webinaradd", {
                id: res.data._id,
                webinarid: webinar._id,
               })
               .then((res) => {
                if (!res.data) alert("You have already registered for this webinar");
                if (res.data.email === "" || res.data.dob === "" || res.data.role === "" || res.data.gender === "") {
                 setId(res.data._id);
                 setEmail(res.data.email);
                 setDob(res.data.dob);
                 setGender(res.data.gender);
                 setRole(res.data.role);
                 part.email = res.data.email;
                 part.gender = res.data.gender;
                 part.role = res.data.role;
                 part.dob = res.data.dob;
                 setNewStudent("part");
                } else {
                 setDone(true);
                }
               })
               .catch((err) => console.log(err));
             } else setNewStudent("new");
            })
            .catch((err) => console.log(err));
          }}
         >
          <div className="div-signin">
           <p>Thank you for your interest!</p>
           {!keyboard ? <p>Kindly fill out this short registration form to be updated about our events.</p> : null}
          </div>
          <main className="form-signin">
           <input
            type="text"
            className="form-control name"
            placeholder="Name"
            value={name}
            required
            id="defaultFormRegisterNameEx"
            onChange={(e) => setName(e.target.value)}
            onFocus={() => setKeyboard(true)}
            onBlur={() => setKeyboard(false)}
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
            onFocus={() => setKeyboard(true)}
            onBlur={() => setKeyboard(false)}
           />
           <div class="invalid-feedback">Mobile Number is not valid!</div>
          </main>

          <button className="btn-form" submit autoFocus>
           Submit
          </button>
         </form>
        ) : (
         <form
          noValidate
          className="needs-validation 2"
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
              role: role,
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
              gender: gender,
              role: role,
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
          <div className="div-signin">
           {newStudent === "new" ? <p>Looks like this is your first ARJUNA webinar!</p> : <p>Looks like some of your details are missing</p>}
           {!keyboard ? <p>By filling out the below details, you can receive updates about our events</p> : null}
          </div>
          <main className="form-signin">
           {newStudent === "new" || (newStudent === "part" && part.email === "") ? (
            <>
             {" "}
             <input
              type="email"
              className="form-control name"
              placeholder="E-mail"
              id="defaultFormRegisterEmailEx"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setKeyboard(true)}
              onBlur={() => setKeyboard(false)}
             />
             <div class="invalid-feedback">Email is not valid!</div>
             <br />
            </>
           ) : null}

           {newStudent === "new" || (newStudent === "part" && part.gender === "") ? (
            <>
             <select
              className="form-select"
              id="inputGroupSelect01"
              onChange={(e) => {
               setGender(e.target.value);
              }}
             >
              <option value="" disabled selected hidden>
               Gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
             </select>
             <br />
            </>
           ) : null}

           {newStudent === "new" || (newStudent === "part" && part.role === "") ? (
            <>
             <select
              className="form-select"
              id="inputGroupSelect01"
              onChange={(e) => {
               setRole(e.target.value);
              }}
             >
              <option value="" disabled selected hidden>
               Role
              </option>
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="parent">Parent</option>
              <option value="working professional">Working Professional</option>
             </select>
             <br />
            </>
           ) : null}

           {newStudent === "new" || (newStudent === "part" && part.dob === "") ? (
            <>
             <input
              type="text"
              className="form-control name"
              placeholder="Date of Birth: dd/mm/yyyy"
              value={dob}
              id="defaultFormRegisterdobEx"
              pattern="^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$"
              onChange={(e) => setDob(e.target.value)}
              onFocus={() => setKeyboard(true)}
              onBlur={() => setKeyboard(false)}
             />
             <div class="invalid-feedback">Valid format for Date of Birth: dd/mm/yyyy</div>
            </>
           ) : null}
          </main>
          <button className="btn-form" submit autoFocus>
           Submit
          </button>
         </form>
        )}
       </div>
      </Grid>
     </Grid>
    ) : (
     <>
      <div class="video-container">
       <div className="nav-bar">
        <Accordion
         expanded={menu}
         onChange={() => {
          setMenu(!menu);
         }}
         style={{ zIndex: "4", backgroundColor: "#1F1B24" }}
        >
         <AccordionSummary expandIcon={<Menu style={{ color: "pink" }} />} aria-controls="panel1bh-content" id="panel1bh-header">
          <Typography style={{ color: "pink" }}>ARJUNA GROUP</Typography>
         </AccordionSummary>
         <AccordionDetails>
          <List style={{ textAlign: "center", width: "100%" }} component="nav">
           <ListItem button>
            <ListItemText style={{ textAlign: "center", color: "pink" }} primary="WEBINARS" />
           </ListItem>
           <ListItem button>
            <ListItemText style={{ textAlign: "center", color: "pink" }} primary="COURSES" />
           </ListItem>

           <ListItem button>
            <ListItemText style={{ textAlign: "center", color: "pink" }} primary="ABOUT" />
           </ListItem>
           <Divider style={{ color: "pink" }} />
           <ListItem>
            <div style={{ textAlign: "center", width: "100%" }}>
             <ListItemIcon button>
              <Mail style={{ fontSize: "40px", color: "pink", margin: "10px" }} />
             </ListItemIcon>
             <ListItemIcon>
              <Facebook style={{ fontSize: "40px", color: "pink", margin: "10px" }} />
             </ListItemIcon>
             <ListItemIcon>
              <WhatsApp style={{ fontSize: "40px", color: "pink", margin: "10px" }} />
             </ListItemIcon>
             <ListItemIcon>
              <YouTube style={{ fontSize: "40px", color: "pink", margin: "10px" }} />
             </ListItemIcon>
            </div>
           </ListItem>
          </List>
         </AccordionDetails>
        </Accordion>
       </div>

       <div className="video-overlay"></div>

       <div className="icons-overlay">
        <Button style={{ fontSize: "20px", color: "white", margin: "10px" }}>WEBINARS</Button>
        <Button style={{ fontSize: "20px", color: "white", margin: "10px" }}>COURSES</Button>
        <Button style={{ fontSize: "20px", color: "white", margin: "10px" }}>ABOUT</Button>

        <Mail style={{ fontSize: "40px", color: "pink", margin: "10px" }} />
        <Facebook style={{ fontSize: "40px", color: "pink", margin: "10px" }} />
        <WhatsApp style={{ fontSize: "40px", color: "pink", margin: "10px" }} />
        {/* <LinkedIn style={{ fontSize: "80px", color: "pink" }} />
        <Twitter style={{ fontSize: "80px", color: "pink" }} />
        <Telegram style={{ fontSize: "80px", color: "pink" }} /> */}
        <YouTube style={{ fontSize: "40px", color: "pink", margin: "10px" }} />
       </div>

       <div className="text-overlay">
        <h1>Thank You</h1>
        <p>We hope that you will take maximum benifit from our webinars and fly with colours in every aspect of our life</p>
        <a href="https://www.studentthinkbox.com/" class="btn-sample-pink">
         Visit our website
        </a>
        <button
         className="btn-sample-blue"
         onClick={(e) => {
          setAnchorEl(e.currentTarget);
         }}
        >
         Add to calendar
        </button>

        <Dropdown
         id="simple-menu"
         anchorEl={anchorEl}
         keepMounted
         open={Boolean(anchorEl)}
         onClose={() => {
          setAnchorEl(null);
         }}
        >
         <MenuItem
          onClick={() => {
           setAnchorEl(null);
          }}
         >
          <a
           href={`https://calendar.google.com/calendar/r/eventedit?text=testing+event&dates=20211208T170000/20211208T200000&details=chant+and+be+happy&location=Zoom`}
          >
           Google Calendar
          </a>
         </MenuItem>

         <MenuItem
          onClick={() => {
           setAnchorEl(null);
          }}
         >
          <a href={`https://arjunadb.herokuapp.com/webinar/ical`}>Other Calendars (.ics)</a>
         </MenuItem>
        </Dropdown>
       </div>
       <video
        preload
        autoplay
        muted
        loop
        id="myVideo"
        src="https://res.cloudinary.com/arjunadb/video/upload/v1621491362/Real_Self_Confidence___Discover_the_Power_of_a_Selfless_Purpose___Amal_M_Das_pj8iww.mp4"
       ></video>
      </div>
      <div className="carousel-wrapper">
       <Carousel
        className="carousel"
        showDots={true}
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={2000}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={100}
        deviceType={deviceType}
       >
        <div className="crop">
         <a href="https://www.youtube.com/watch?v=1vWZGzKlt8M">
          <img src="https://img.youtube.com/vi/1vWZGzKlt8M/0.jpg" />
         </a>
        </div>

        <div className="crop">
         <a href="https://www.youtube.com/watch?v=OKUYNoex6Ag">
          <img src="https://img.youtube.com/vi/OKUYNoex6Ag/0.jpg" />
         </a>
        </div>
        <div className="crop">
         <a href="https://www.youtube.com/watch?v=QHfD72Z9-uA">
          <img src="https://img.youtube.com/vi/QHfD72Z9-uA/0.jpg" />
         </a>
        </div>
        <div className="crop">
         <a href="https://www.youtube.com/watch?v=V7Ftxz-ytcE">
          <img src="https://img.youtube.com/vi/V7Ftxz-ytcE/0.jpg" />
         </a>
        </div>
        <div className="crop">
         <a href="https://www.youtube.com/watch?v=c_1lo50AVVU">
          <img src="https://img.youtube.com/vi/c_1lo50AVVU/0.jpg" />
         </a>
        </div>
        <div className="crop">
         <a href="https://www.youtube.com/watch?v=wcmiFAvITtU">
          <img src="https://img.youtube.com/vi/wcmiFAvITtU/0.jpg" />
         </a>
        </div>

        <div className="crop">
         <a href="https://www.youtube.com/watch?v=EvLTYvj0Vto">
          <img src="https://img.youtube.com/vi/EvLTYvj0Vto/0.jpg" />
         </a>
        </div>
        <div className="crop">
         <a href="https://www.youtube.com/watch?v=nNnFg92mmGo">
          <img src="https://img.youtube.com/vi/nNnFg92mmGo/0.jpg" />
         </a>
        </div>
        <div className="crop">
         <a href="https://www.youtube.com/watch?v=jQidcUBKGBI">
          <img src="https://img.youtube.com/vi/jQidcUBKGBI/0.jpg" />
         </a>
        </div>
        <div className="crop">
         <a href="https://www.youtube.com/watch?v=1SKWtBH7s8M">
          <img src="https://img.youtube.com/vi/1SKWtBH7s8M/0.jpg" />
         </a>
        </div>
        <div className="crop">
         <a href="https://www.youtube.com/watch?v=Ghkx3ZP07Uc">
          <img src="https://img.youtube.com/vi/Ghkx3ZP07Uc/0.jpg" />
         </a>
        </div>
        <div className="crop">
         <a href="https://www.youtube.com/watch?v=6qBa_0SSdN4">
          <img src="https://img.youtube.com/vi/6qBa_0SSdN4/0.jpg" />
         </a>
        </div>
       </Carousel>
      </div>
     </>
    )}
   </Route>
  </Switch>
 );
}

export default Form;
