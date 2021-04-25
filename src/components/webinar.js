import React, { useContext, useEffect, useState } from "react";
import { Switch, Route, useHistory, useParams, useRouteMatch } from "react-router-dom";
import axios from "axios";
import XLSX from "xlsx";
import { saveAs } from "file-saver";
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
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from "@material-ui/pickers";

import ResponsiveDrawer from "./ui/drawer";
import { UserList, WebinarList, Filter } from "./context/storage";

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

function Webinar(props) {
 const classes = useStyles();
 let history = useHistory();
 let { path, url } = useRouteMatch();
 const theme = useTheme();
 const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

 const [webinarList, setWebinarList] = useContext(WebinarList);
 const [access, setAccess] = useState("");
 const [pwebinarList, setPwebinarList] = useState([]);
 const [userList, setUserList] = useContext(UserList);
 const [filter, setFilter] = useContext(Filter);
 const [currentWebinar, setCurrentWebinar] = useState([]);
 const [webinarName, setWebinarName] = useState("");
 const [webinarId, setWebinarId] = useState("");
 const [webinarPname, setWebinarPname] = useState("");
 const [webinarDescription, setWebinarDescription] = useState("");
 const [webinarLevel, setWebinarLevel] = useState("");
 const [speakerName, setSpeakerName] = useState("");
 const [date, setDate] = useState("");
 const [guest, setGuest] = useState("");
 const [institute, setInstitute] = useState("");
 const [open, setOpen] = useState(false);
 const [open1, setOpen1] = useState(false);
 const [open2, setOpen2] = useState(false);
 const [open3, setOpen3] = useState(false);
 const [open4, setOpen4] = useState(false);
 const [backdrop, setBackdrop] = useState(false);
 const [search, setSearch] = useState([{ property: "name", operator: "=", value: "" }]);
 const [search2, setSearch2] = useState([{ property: "name", operator: "=", value: "" }]);
 const [selectedDate, setSelectedDate] = useState(new Date());

 useEffect(() => {
  if (!filter) {
   setBackdrop(true);
   axios
    .get("https://arjunadb.herokuapp.com/webinar")
    .then((res) => {
     axios
      .get("https://arjunadb.herokuapp.com/pwebinar")
      .then((res2) => {
       for (let i = 0; i < res.data.length; i++) {
        for (let j = 0; j < res2.data.length; j++) {
         if (res2.data[j]._id === res.data[i].webinarid) {
          res.data[i].pwebinar = res2.data[j];
          break;
         }
        }
       }
       setWebinarList(res.data);
       setFilter(false);
       setBackdrop(false);
      })
      .catch((err) => alert(err));
    })
    .catch((err) => alert(err));
  }
 }, []);

 function popup(val) {
  if (val.users.length !== 0) {
   setCurrentWebinar(val);
   let userlist = [];
   let c = 0;
   setBackdrop(true);
   val.users.map((val2, j) => {
    axios
     .post("https://arjunadb.herokuapp.com/user/findbyid", { id: val2 })
     .then((res) => {
      if (res.data !== null) {
       userlist.push(res.data);
      }
      c = c + 1;
      if (c === val.users.length) {
       if (userlist.length !== 0) {
        setUserList(userlist);
        setOpen3(true);
       }
       setBackdrop(false);
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
          setBackdrop(true);
          axios
           .get("https://arjunadb.herokuapp.com/pwebinar")
           .then((res) => {
            setPwebinarList(res.data);
            setWebinarId(res.data[0]._id);
            setBackdrop(false);
            setOpen(true);
           })
           .catch((err) => alert(err));
         }}
        >
         Add Webinar
        </button>
       </Grid>
       <Grid item xs={4}>
        <button
         onClick={() => {
          // setOpen2(true);
         }}
         className="w-100 btn btn-lg btn-success"
        >
         Update Webinar
        </button>
       </Grid>
       <Grid item xs={4}>
        <button
         onClick={() => {
          // setOpen1(true);
         }}
         className="w-100 btn btn-lg btn-success"
        >
         Search Webinar
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
         <th scope="col">Date</th>
         <th scope="col">Name</th>
         <th scope="col">Speaker</th>
         <th scope="col">Institute</th>
         <th scope="col">Guest</th>
         <th scope="col">Students</th>
         <th scope="col">Actions</th>
        </tr>
       </thead>
       <tbody>
        {webinarList.map((val, i) => {
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
            {val.date}
           </td>
           <td
            onClick={() => {
             popup(val);
            }}
           >
            {val.pwebinar.name}
           </td>
           <td
            onClick={() => {
             popup(val);
            }}
           >
            {val.speaker}
           </td>
           <td
            onClick={() => {
             popup(val);
            }}
           >
            {val.institute}
           </td>
           <td
            onClick={() => {
             popup(val);
            }}
           >
            {val.guest}
           </td>
           <td
            onClick={() => {
             popup(val);
            }}
           >
            {val.userscount}
           </td>
           <td>
            <button
             className="btn"
             style={{ color: "blue" }}
             onClick={() => {
              setCurrentWebinar(val);
              history.push(`/form/${val._id}`);
             }}
            >
             <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-share" viewBox="0 0 16 16">
              <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5zm-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" />
             </svg>
            </button>
            <button
             className="btn"
             style={{ color: "green" }}
             onClick={() => {
              const apiResources = val.users.map((user, j) => {
               return { id: user };
              });

              async function getAllUrls(urls) {
               try {
                var datas = await Promise.all(urls.map((url) => axios.post("https://arjunadb.herokuapp.com/user/findbyid", url).then((res) => res.data)));
                const excelArray = datas
                 .filter((data) => data)
                 .map((data, i) => {
                  return [
                   data.name,
                   data.number,
                   data.email,
                   data.gender,
                   data.dob,
                   data.beyr10,
                   data.beyr12,
                   data.eeyr,
                   data.educationid,
                   data.volunteerwork,
                   data.arjunapoc,
                   data.communicationmethod,
                   data.subscriptionstatus,
                   data.lastcontact,
                   data.webinarscount,
                   data.coursescount,
                  ];
                 });

                var wb = XLSX.utils.book_new();
                wb.Props = {
                 Title: "Registered Students",
                 Subject: "Registered Students",
                 Author: "Arjuna",
                 CreatedDate: new Date(),
                };

                wb.SheetNames.push("Registered Students");

                var ws = XLSX.utils.aoa_to_sheet([
                 [
                  "Name",
                  "Phone name",
                  "Email",
                  "Gender",
                  "DOB",
                  "10BEYr",
                  "12BEYr",
                  "EEYr",
                  "EducationId",
                  "VolunteerWork",
                  "ArjunaPOC",
                  "CommunicationMethod",
                  "SubscriptionStatus",
                  "LastContact",
                  "WebinarsCount",
                  "CoursesCount",
                 ],
                 ...excelArray,
                ]);
                wb.Sheets["Registered Students"] = ws;
                var wbout = XLSX.write(wb, { bookType: "xlsx", type: "binary" });
                function s2ab(s) {
                 var buf = new ArrayBuffer(s.length);
                 var view = new Uint8Array(buf);
                 for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
                 return buf;
                }

                saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), val.pwebinar.name + " (" + val.date + ")" + ".xlsx");
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
              setBackdrop(true);
              axios
               .post("https://arjunadb.herokuapp.com/webinar/delete", { id: val._id })
               .then((res) => {
                console.log(res);
                setWebinarList((prev) => {
                 return prev.filter((item, k) => k !== i);
                });
                setBackdrop(false);
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
           </td>
          </tr>
         );
        })}
       </tbody>
      </table>
     </div>
    </main>

    <Dialog fullScreen={fullScreen} open={open} onClose={() => {}} aria-labelledby="responsive-dialog-title">
     <DialogTitle id="responsive-dialog-title">{"New Webinar"}</DialogTitle>
     <DialogContent>
      <FormControl className={classes.formControl}>
       <InputLabel>Webinar Name</InputLabel>
       <Select
        native
        value={webinarId}
        onChange={(e) => {
         if (e.target.value !== "new") {
          setWebinarId(e.target.value);
         } else {
          setOpen4(true);
         }
        }}
       >
        {pwebinarList.map((val, i) => {
         return <option value={val._id}>{val.name}</option>;
        })}
        <option value={"new"}>New Webinar</option>
       </Select>
      </FormControl>

      <TextField
       margin="dense"
       label="Speaker"
       type="text"
       value={speakerName}
       onChange={(e) => {
        setSpeakerName(e.target.value);
       }}
       fullWidth
      />

      <TextField
       margin="dense"
       label="Cheif Guest"
       type="text"
       value={guest}
       onChange={(e) => {
        setGuest(e.target.value);
       }}
       fullWidth
      />
      <TextField
       margin="dense"
       label="Institute"
       type="text"
       value={institute}
       onChange={(e) => {
        setInstitute(e.target.value);
       }}
       fullWidth
      />
      <form className={classes.container} noValidate>
       <TextField
        id="date"
        label="Date"
        type="date"
        defaultValue={new Date().toISOString().slice(0, 10)}
        className={classes.textField}
        InputLabelProps={{
         shrink: true,
        }}
        onChange={(e) => {
         console.log(e.target.value);
         setDate(e.target.value);
        }}
       />
      </form>
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
         .post("https://arjunadb.herokuapp.com/webinar/add", {
          webinarid: webinarId,
          speaker: speakerName,
          date: date,
          guest: guest,
          institute: institute,
         })
         .then(() => {
          axios.post("https://arjunadb.herokuapp.com/pwebinar/find", { webinarid: webinarId }).then((res) => {
           setWebinarList((prev) => {
            let dummy = [...prev];
            dummy.push({ webinarid: webinarId, speaker: speakerName, date: date, guest: guest, institute: institute, users: [], pwebinar: res.data });
            return dummy;
           });
           setSpeakerName("");
           setGuest("");
           setInstitute("");
           setBackdrop(false);
           setOpen(false);
          });
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
     <DialogTitle id="responsive-dialog-title">Search Webinars</DialogTitle>
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

        axios
         .post("https://arjunadb.herokuapp.com/user/search", { query: JSON.parse(query) })
         .then((res) => {
          console.log(res.data);
          if (res.data.length === 0) alert("No users found");
          else setUserList(res.data);
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
    <Dialog fullScreen={fullScreen} open={open3} onClose={() => {}} aria-labelledby="responsive-dialog-title">
     <DialogTitle id="responsive-dialog-title">{"Students Registered"}</DialogTitle>
     <DialogContent>
      <div class="table-responsive">
       <table class="table table-striped table-hover table-bordered">
        <thead class="table-success">
         <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Number</th>
          <th scope="col">Email Id</th>
          <th scope="col">Webinars</th>
          <th scope="col">Delete</th>
         </tr>
        </thead>
        <tbody>
         {userList.map((val, i) => {
          return (
           <tr>
            <th scope="row">{i + 1}</th>
            <td>{val.name}</td>
            <td>{val.number}</td>
            <td>{val.email}</td>
            <td>{val.webinarscount}</td>
            <td>
             <button
              type="button"
              class="btn"
              style={{ color: "red" }}
              onClick={() => {
               setBackdrop(true);
               axios
                .post("https://arjunadb.herokuapp.com/webinar/userdelete", { id: val._id, webinarid: currentWebinar._id })
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
        setFilter(true);
        history.push("/student");
       }}
       color="primary"
      >
       More Details
      </Button>
     </DialogActions>
    </Dialog>

    <Dialog fullScreen={fullScreen} open={open4} onClose={() => {}} aria-labelledby="responsive-dialog-title">
     <DialogTitle id="responsive-dialog-title">{"New Parent Webinar"}</DialogTitle>
     <DialogContent>
      <TextField
       autoFocus
       margin="dense"
       label="Webinar Name"
       type="text"
       value={webinarPname}
       onChange={(e) => {
        setWebinarPname(e.target.value);
       }}
       fullWidth
      />
      <TextField
       margin="dense"
       label="Descrption"
       type="text"
       value={webinarDescription}
       onChange={(e) => {
        setWebinarDescription(e.target.value);
       }}
       fullWidth
      />
      <TextField
       margin="dense"
       label="Level"
       type="text"
       value={webinarLevel}
       onChange={(e) => {
        setWebinarLevel(e.target.value);
       }}
       fullWidth
      />
     </DialogContent>
     <DialogActions>
      <Button
       onClick={() => {
        setOpen4(false);
       }}
       color="primary"
      >
       Cancel
      </Button>
      <Button
       onClick={() => {
        setBackdrop(true);
        axios
         .post("https://arjunadb.herokuapp.com/pwebinar/add", {
          name: webinarPname,
          description: webinarDescription,
          level: webinarLevel,
         })
         .then((res) => {
          setPwebinarList((prev) => {
           let dum = [...pwebinarList];
           dum.push(res.data);
           return dum;
          });
          setBackdrop(false);
          setOpen4(false);
         })
         .catch((err) => console.log(err));
       }}
       color="primary"
      >
       Next
      </Button>
     </DialogActions>
    </Dialog>
   </div>
  </>
 );
}

export default Webinar;
