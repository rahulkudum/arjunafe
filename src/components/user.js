import React, { useContext, useEffect, useState } from "react";
import { Switch, Route, useHistory, useParams, useRouteMatch } from "react-router-dom";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

import ResponsiveDrawer from "./ui/drawer";
import { UserList, WebinarList } from "./context/storage";

const useStyles = makeStyles((theme) => ({
 root: {
  display: "flex",
 },
 root2: {
  flexGrow: 1,
 },

 content: {
  flexGrow: 1,
  padding: theme.spacing(3),
 },
 toolbar: theme.mixins.toolbar,
 formControl: {
  margin: theme.spacing(1),
  minWidth: 120,
 },
 backdrop: {
  zIndex: theme.zIndex.drawer + 1,
  color: "#fff",
 },
}));

function User(props) {
 const classes = useStyles();
 let history = useHistory();
 let { path, url } = useRouteMatch();
 const theme = useTheme();
 const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

 const [userList, setUserList] = useContext(UserList);
 const [webinarList, setWebinarList] = useContext(WebinarList);
 const [webinarList2, setWebinarList2] = useState([]);
 const [query, setQuery] = useState("");
 const [search, setSearch] = useState([{ property: "name", operator: "=", value: "" }]);
 const [search2, setSearch2] = useState([{ property: "name", operator: "=", value: "" }]);
 const [update, setUpdate] = useState([{ property: "name", value: "" }]);
 const [backdrop, setBackdrop] = useState(false);
 const [open, setOpen] = useState(false);
 const [open1, setOpen1] = useState(false);
 const [open2, setOpen2] = useState(false);
 const [open3, setOpen3] = useState(false);
 const [start, setStart] = useState(0);
 const [name, setName] = useState("");
 const [number, setNumber] = useState();
 const [dob, setDob] = useState("");
 const [email, setEmail] = useState("");
 const [gender, setGender] = useState("");
 const [role, setRole] = useState("");
 const [currentUser, setCurrentUser] = useState();

 useEffect(() => {
  if (userList.length === 0) {
   setBackdrop(true);
   axios
    .get("https://arjunadb.herokuapp.com/user")
    .then((res) => {
     setUserList(res.data);
     setBackdrop(false);
    })
    .catch((err) => alert(err));
  }
 }, []);

 function popup(val) {
  if (val.webinars.length !== 0) {
   let webinarlist = [];
   let c = 0;
   setBackdrop(true);
   val.webinars.map((val2, j) => {
    axios
     .post("https://arjunadb.herokuapp.com/webinar/find", { webinarid: val2 })
     .then((res) => {
      if (res.data !== null) {
       axios
        .post("https://arjunadb.herokuapp.com/pwebinar/find", { webinarid: res.data.webinarid })
        .then((res2) => {
         res.data.pwebinar = res2.data;
         axios
          .post("https://arjunadb.herokuapp.com/pwebinar/findinstitute", { instituteid: res.data.institute })
          .then((res3) => {
           res.data.pinstitute = res3.data;
          })
          .catch((err) => {
           console.log(err);
          });
         webinarlist.push(res.data);
         c = c + 1;
         if (c === val.webinars.length) {
          setWebinarList2(webinarlist);
          setBackdrop(false);
          setOpen3(true);
         }
        })
        .catch((err) => {
         console.log(err);
        });
      } else {
       c = c + 1;
       if (c === val.webinars.length) {
        if (webinarlist.length !== 0) {
         setWebinarList2(webinarlist);
         setOpen3(true);
        }
        setBackdrop(false);
       }
      }
     })
     .catch((err) => {
      console.error(err);
     });
   });
  }
 }

 return (
  <>
   <Backdrop className={classes.backdrop} open={backdrop}>
    <CircularProgress color="inherit" />
   </Backdrop>
   <div className={classes.root}>
    <ResponsiveDrawer />

    <main className={classes.content}>
     <div className={classes.toolbar} />
     <div className={classes.root2}>
      <Grid container spacing={3}>
       <Grid item xs={4}>
        <button
         className="w-100 btn btn-lg btn-success"
         onClick={() => {
          setOpen(true);
         }}
        >
         Add Student
        </button>
       </Grid>
       <Grid item xs={4}>
        <button
         className="w-100 btn btn-lg btn-success"
         onClick={() => {
          setOpen2(true);
         }}
        >
         Update Student
        </button>
       </Grid>
       <Grid item xs={4}>
        <button
         className="w-100 btn btn-lg btn-success"
         onClick={() => {
          setOpen1(true);
         }}
        >
         Search Student
        </button>
       </Grid>
      </Grid>
     </div>
     <br />
     <br />
     <div class="table-responsive">
      <table class="table table-striped table-hover table-bordered">
       <thead class="table-success">
        <tr>
         <th scope="col">#</th>
         <th scope="col">Name</th>
         <th scope="col">Number</th>
         <th scope="col">Email Id</th>
         <th scope="col">Webinars</th>
         <th scope="col">Courses</th>
         <th scope="col">Services</th>
         <th scope="col">Role</th>
         <th scope="col">Delete</th>
        </tr>
       </thead>
       <tbody>
        {userList.map((val, i) => {
         if (i >= start && i <= start + 9) {
          return (
           <tr>
            <th
             onClick={() => {
              popup(val);
             }}
             scope="row"
            >
             {i + 1}
            </th>
            <td
             onClick={() => {
              popup(val);
             }}
            >
             {val.name}
            </td>
            <td
             onClick={() => {
              popup(val);
             }}
            >
             {val.number}
            </td>
            <td
             onClick={() => {
              popup(val);
             }}
            >
             {val.email}
            </td>
            <td
             onClick={() => {
              popup(val);
             }}
            >
             {val.webinarscount}
            </td>
            <td
             onClick={() => {
              popup(val);
             }}
            >
             {val.coursescount}
            </td>
            <td
             onClick={() => {
              popup(val);
             }}
            >
             {val.volunteerwork.length}
            </td>
            <td
             onClick={() => {
              popup(val);
             }}
            >
             {val.role}
            </td>
            <td>
             <button
              type="button"
              class="btn"
              style={{ color: "red" }}
              onClick={() => {
               setBackdrop(true);
               axios
                .post("https://arjunadb.herokuapp.com/user/delete", { id: val._id })
                .then((res) => {
                 console.log(res);
                 setUserList((prev) => {
                  return prev.filter((item, k) => k !== i);
                 });
                 setBackdrop(false);
                })
                .catch((err) => console.log(err));
              }}
             >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
               <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
               <path
                fill-rule="evenodd"
                d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
               />
              </svg>
             </button>
            </td>
           </tr>
          );
         } else {
          return null;
         }
        })}
       </tbody>
      </table>
     </div>

     <p style={{ textAlign: "center" }}>
      <button
       className="btn"
       style={{ color: "green" }}
       onClick={() => {
        setBackdrop(true);
        axios
         .get("https://arjunadb.herokuapp.com/user")
         .then((res) => {
          setUserList(res.data);
          setBackdrop(false);
         })
         .catch((err) => alert(err));
       }}
      >
       <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-arrow-counterclockwise" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z" />
        <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z" />
       </svg>
      </button>
      <button
       className="btn"
       style={{ color: "blue" }}
       onClick={() => {
        if (start === 0) {
         setStart(userList.length - (userList.length % 10));
        } else {
         setStart(start - 10);
        }
       }}
      >
       <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-arrow-left-square" viewBox="0 0 16 16">
        <path
         fill-rule="evenodd"
         d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm11.5 5.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"
        />
       </svg>
      </button>
      Displaying {start + 1} - {start + 10 > userList.length ? userList.length : start + 10} of {userList.length}{" "}
      <button
       className="btn"
       style={{ color: "blue" }}
       onClick={() => {
        if (start + 10 > userList.length) {
         setStart(0);
        } else {
         setStart(start + 10);
        }
       }}
      >
       <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-arrow-right-square" viewBox="0 0 16 16">
        <path
         fill-rule="evenodd"
         d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
        />
       </svg>
      </button>
      <button
       className="btn"
       style={{ color: "green" }}
       onClick={() => {
        setBackdrop(true);
        axios
         .get("https://arjunadb.herokuapp.com/user")
         .then((res) => {
          setUserList(res.data);
          setBackdrop(false);
         })
         .catch((err) => alert(err));
       }}
      >
       <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z" />
        <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
       </svg>
      </button>
     </p>
    </main>
    <Dialog fullScreen={fullScreen} open={open} onClose={() => {}} aria-labelledby="responsive-dialog-title">
     <DialogTitle id="responsive-dialog-title">{"New Student"}</DialogTitle>
     <DialogContent>
      <TextField
       autoFocus
       margin="dense"
       label="Name"
       type="text"
       value={name}
       onChange={(e) => {
        setName(e.target.value);
       }}
       fullWidth
      />
      <TextField
       margin="dense"
       label="Ph no"
       type="text"
       value={number}
       onChange={(e) => {
        setNumber(e.target.value);
       }}
       fullWidth
      />
      <TextField
       margin="dense"
       label="Email"
       type="text"
       value={email}
       onChange={(e) => {
        setEmail(e.target.value);
       }}
       fullWidth
      />
      <TextField
       margin="dense"
       label="DOB"
       type="text"
       value={dob}
       onChange={(e) => {
        setDob(e.target.value);
       }}
       fullWidth
      />
      <TextField
       margin="dense"
       label="Gender"
       type="text"
       value={gender}
       onChange={(e) => {
        setGender(e.target.value);
       }}
       fullWidth
      />
      <TextField
       margin="dense"
       label="Role"
       type="text"
       value={role}
       onChange={(e) => {
        setRole(e.target.value);
       }}
       fullWidth
      />
     </DialogContent>
     <DialogActions>
      <Button
       onClick={() => {
        setOpen(false);
       }}
       color="primary"
      >
       Cancel
      </Button>
      <Button
       onClick={() => {
        setBackdrop(true);
        axios
         .post("https://arjunadb.herokuapp.com/user/find", { number: Number(number) })
         .then((res) => {
          if (res.data) {
           alert("This user already exists with the name " + res.data.name);
           setBackdrop(false);
          } else {
           axios
            .post("https://arjunadb.herokuapp.com/user/addadmin", {
             name: name,
             number: number,
             email: email,
             dob: dob,
             gender: gender,
             role: role,
            })
            .then((res) => {
             console.log(res);
             setUserList((prev) => {
              let dummy = [...prev];
              dummy.push(res);
              return dummy;
             });
             setName("");
             setNumber("");
             setEmail("");
             setDob("");
             setGender("");
             setRole("");
             alert("Successfully created the user");
             setBackdrop(false);
             setOpen(false);
            })
            .catch((err) => console.log(err));
          }
         })
         .catch((err) => console.log(err));
       }}
       color="primary"
      >
       Create
      </Button>
     </DialogActions>
    </Dialog>
    <Dialog fullScreen={fullScreen} fullWidth={true} maxWidth={"xl"} open={open1} onClose={() => {}} aria-labelledby="responsive-dialog-title">
     <DialogTitle id="responsive-dialog-title">Search Students</DialogTitle>
     <DialogContent>
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
         <br />
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
         <br />
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
     </DialogContent>
     <DialogActions>
      <Button
       onClick={() => {
        setOpen1(false);
       }}
       color="primary"
      >
       Cancel
      </Button>
      <Button
       onClick={() => {
        setSearch((prev) => {
         let dummy = [...prev];
         dummy.push({ property: "name", operator: "=", value: "" });
         return dummy;
        });
       }}
       color="primary"
      >
       Add Query
      </Button>

      <Button
       onClick={() => {
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
        setBackdrop(true);
        axios
         .post("https://arjunadb.herokuapp.com/user/search", { query: JSON.parse(query) })
         .then((res) => {
          console.log(res.data);
          if (res.data.length === 0) alert("No users found");
          else setUserList(res.data);
          setBackdrop(false);
         })
         .catch((err) => console.log(err));

        console.log(JSON.parse(query));
        setOpen1(false);
       }}
       color="primary"
      >
       Search
      </Button>
     </DialogActions>
    </Dialog>

    <Dialog fullScreen={fullScreen} fullWidth={true} maxWidth={"xl"} open={open2} onClose={() => {}} aria-labelledby="responsive-dialog-title">
     <DialogTitle id="responsive-dialog-title">{"Update Students"}</DialogTitle>
     <DialogContent>
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
     </DialogContent>
     <DialogActions>
      <Button
       onClick={() => {
        setOpen2(false);
       }}
       color="primary"
      >
       Cancel
      </Button>
      <Button
       onClick={() => {
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
        setBackdrop(true);
        axios
         .post("https://arjunadb.herokuapp.com/user/update", { query: JSON.parse(query), update: JSON.parse(uquery) })
         .then((res) => {
          console.log(res.data);
          if (res.data.n === 0) alert("No users found to update");
          else {
           alert("Sucessfully updated (" + res.data.n + ") students");
           setBackdrop(false);
           setOpen2(false);
          }
         })
         .catch((err) => console.log(err));

        console.log(JSON.parse(query), JSON.parse(uquery));
       }}
       color="primary"
      >
       Update
      </Button>
     </DialogActions>
    </Dialog>
    <Dialog fullScreen={fullScreen} open={open3} onClose={() => {}} aria-labelledby="responsive-dialog-title">
     <DialogTitle id="responsive-dialog-title">{"Webinars Registered"}</DialogTitle>
     <DialogContent>
      <div class="table-responsive">
       <table class="table table-striped table-hover table-bordered">
        <thead class="table-success">
         <tr>
          <th scope="col">#</th>
          <th scope="col">Date</th>
          <th scope="col">Name</th>
          <th scope="col">Speaker</th>
          <th scope="col">Guest</th>
         </tr>
        </thead>
        <tbody>
         {webinarList2.map((val, i) => {
          return (
           <tr>
            <th scope="row">{i + 1}</th>
            <td>{val.date}</td>
            <td>{val.pwebinar.name}</td>
            <td>{val.speaker}</td>
            <td>{val.guest}</td>
           </tr>
          );
         })}
        </tbody>
       </table>
      </div>
     </DialogContent>
     <DialogActions>
      <Button
       onClick={() => {
        setOpen3(false);
       }}
       color="primary"
      >
       Cancel
      </Button>
      <Button
       onClick={() => {
        setOpen3(false);
        setWebinarList(webinarList2);
        history.push("/webinar");
       }}
       color="primary"
      >
       More Details
      </Button>
     </DialogActions>
    </Dialog>
   </div>
  </>
 );
}

export default User;
