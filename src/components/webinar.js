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
import FileCopyIcon from "@material-ui/icons/FileCopy";
import MailIcon from "@material-ui/icons/Mail";
import {
 EmailShareButton,
 FacebookShareButton,
 LinkedinShareButton,
 TelegramShareButton,
 TwitterShareButton,
 WhatsappShareButton,
 EmailIcon,
 FacebookIcon,
 LinkedinIcon,
 TelegramIcon,
 TwitterIcon,
 WhatsappIcon,
} from "react-share";

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

function Webinar(props) {
 const classes = useStyles();
 let history = useHistory();
 let { path, url } = useRouteMatch();
 const theme = useTheme();
 const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

 const [webinarList, setWebinarList] = useContext(WebinarList);
 const [access, setAccess] = useState("");
 const [pwebinarList, setPwebinarList] = useState([]);
 const [instituteList, setInstituteList] = useState([]);
 const [userList, setUserList] = useContext(UserList);
 const [userList2, setUserList2] = useState([]);
 const [currentWebinar, setCurrentWebinar] = useState([]);
 const [currentWebinarNo, setCurrentWebinarNo] = useState([]);
 const [webinarName, setWebinarName] = useState("");
 const [webinarId, setWebinarId] = useState("");
 const [webinarPname, setWebinarPname] = useState("");
 const [webinarDescription, setWebinarDescription] = useState("");
 const [webinarLevel, setWebinarLevel] = useState("");
 const [speakerName, setSpeakerName] = useState("");
 const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
 const [guest, setGuest] = useState("");
 const [instituteId, setInstituteId] = useState("");
 const [start, setStart] = useState(0);
 const [open, setOpen] = useState(false);
 const [open1, setOpen1] = useState(false);
 const [open2, setOpen2] = useState(false);
 const [open3, setOpen3] = useState(false);
 const [open4, setOpen4] = useState(false);
 const [open5, setOpen5] = useState(false);
 const [open6, setOpen6] = useState(false);
 const [open7, setOpen7] = useState(false);
 const [backdrop, setBackdrop] = useState(false);
 const [search, setSearch] = useState([{ property: "name", operator: "=", value: "" }]);
 const [search2, setSearch2] = useState([{ property: "name", operator: "=", value: "" }]);
 const [instituteFields, setInstituteFields] = useState({ name: "", campus: "", location: "", inumber: "", imail: "", pnumber: "", pmail: "", poc: "" });

 useEffect(() => {
  if (webinarList.length === 0) {
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

       axios
        .get("https://arjunadb.herokuapp.com/pwebinar/institutes")
        .then((res3) => {
         for (let i = 0; i < res.data.length; i++) {
          for (let j = 0; j < res3.data.length; j++) {
           if (res3.data[j]._id === res.data[i].institute) {
            res.data[i].pinstitute = res3.data[j];
            break;
           }
          }
         }
         setWebinarList(res.data);
         setBackdrop(false);
        })
        .catch((err) => {
         console.log(err);
        });
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
        setUserList2(userlist);
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
            axios
             .get("https://arjunadb.herokuapp.com/pwebinar/institutes")
             .then((resp) => {
              setInstituteList(resp.data);
              setInstituteId("");
              setBackdrop(false);
              setOpen(true);
             })
             .catch((err) => {
              console.log(err);
             });
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
         <th scope="col">Guest</th>
         <th scope="col">Institute</th>
         <th scope="col">Students</th>
         <th scope="col">Actions</th>
        </tr>
       </thead>
       <tbody>
        {webinarList.map((val, i) => {
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
             {val.date}
            </td>
            <td
             onClick={() => {
              popup(val);
             }}
            >
             {val.pwebinar.name.length <= 80 ? val.pwebinar.name : val.pwebinar.name.slice(0, 40) + "..."}
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
             {val.guest}
            </td>
            <td
             onClick={() => {
              popup(val);
             }}
            >
             {val.pinstitute ? (val.pinstitute.name.length <= 20 ? val.pinstitute.name : val.pinstitute.name.slice(0, 19) + "...") : "Public Webinar"}
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
               var tempInput = document.createElement("input");
               tempInput.style = "position: absolute; left: -1000px; top: -1000px";
               tempInput.value = encodeURI(`https://arjunafe.herokuapp.com/form/${val._id}`);
               document.body.appendChild(tempInput);
               tempInput.select();
               document.execCommand("copy");
               document.body.removeChild(tempInput);

               setOpen7(true);
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
              style={{ color: "blue" }}
              onClick={() => {
               setCurrentWebinar(val);
               setCurrentWebinarNo(i);
               setOpen6(true);
              }}
             >
              <svg
               xmlns="http://www.w3.org/2000/svg"
               width="30"
               height="30"
               fill="currentColor"
               class="bi bi-file-earmark-spreadsheet-fill"
               viewBox="0 0 16 16"
              >
               <path d="M6 12v-2h3v2H6z" />
               <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM3 9h10v1h-3v2h3v1h-3v2H9v-2H6v2H5v-2H3v-1h2v-2H3V9z" />
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

            axios
             .get("https://arjunadb.herokuapp.com/pwebinar/institutes")
             .then((res3) => {
              for (let i = 0; i < res.data.length; i++) {
               for (let j = 0; j < res3.data.length; j++) {
                if (res3.data[j]._id === res.data[i].institute) {
                 res.data[i].pinstitute = res3.data[j];
                 break;
                }
               }
              }
              setWebinarList(res.data);
              setBackdrop(false);
             })
             .catch((err) => {
              console.log(err);
             });
           })
           .catch((err) => alert(err));
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
         setStart(webinarList.length - (webinarList.length % 10));
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
      Displaying {start + 1} - {start + 10 > webinarList.length ? webinarList.length : start + 10} of {webinarList.length}{" "}
      <button
       className="btn"
       style={{ color: "blue" }}
       onClick={() => {
        if (start + 10 > webinarList.length) {
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

            axios
             .get("https://arjunadb.herokuapp.com/pwebinar/institutes")
             .then((res3) => {
              for (let i = 0; i < res.data.length; i++) {
               for (let j = 0; j < res3.data.length; j++) {
                if (res3.data[j]._id === res.data[i].institute) {
                 res.data[i].pinstitute = res3.data[j];
                 break;
                }
               }
              }
              setWebinarList(res.data);
              setBackdrop(false);
             })
             .catch((err) => {
              console.log(err);
             });
           })
           .catch((err) => alert(err));
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
      <FormControl className={classes.formControl}>
       <Select
        native
        value={instituteId}
        onChange={(e) => {
         if (e.target.value !== "new") {
          setInstituteId(e.target.value);
         } else {
          setOpen5(true);
         }
        }}
       >
        <option value={""}>Public Webinar</option>
        {instituteList.map((val, i) => {
         return <option value={val._id}>{val.name + " " + val.campus + " " + val.location}</option>;
        })}
        <option value={"new"}>New Institute</option>
       </Select>
      </FormControl>

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
          institute: instituteId,
         })
         .then((res) => {
          axios.post("https://arjunadb.herokuapp.com/pwebinar/find", { webinarid: webinarId }).then((res2) => {
           axios.post("https://arjunadb.herokuapp.com/pwebinar/findinstitute", { instituteid: instituteId }).then((res3) => {
            res.data.pwebinar = res2.data;
            if (instituteId !== "") {
             res.data.pinstitute = res3.data;
            }
            setWebinarList((prev) => {
             let dummy = [...prev];
             dummy.push(res.data);
             return dummy;
            });
            setSpeakerName("");
            setGuest("");
            setBackdrop(false);
            setOpen(false);
           });
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
         {userList2.map((val, i) => {
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
                 setUserList2((prev) => {
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
        setUserList(userList2);
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
           let dum = [...prev];
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

    <Dialog fullScreen={fullScreen} open={open5} onClose={() => {}} aria-labelledby="responsive-dialog-title">
     <DialogTitle id="responsive-dialog-title">{"New Institute"}</DialogTitle>
     <DialogContent>
      <TextField
       autoFocus
       margin="dense"
       label="Institute Name"
       type="text"
       value={instituteFields.name}
       onChange={(e) => {
        setInstituteFields((prev) => {
         let dum = { ...prev };
         dum.name = e.target.value;
         return dum;
        });
       }}
       fullWidth
      />
      <TextField
       margin="dense"
       label="Campus"
       type="text"
       value={instituteFields.campus}
       onChange={(e) => {
        setInstituteFields((prev) => {
         let dum = { ...prev };
         dum.campus = e.target.value;
         return dum;
        });
       }}
       fullWidth
      />
      <TextField
       margin="dense"
       label="Location"
       type="text"
       value={instituteFields.location}
       onChange={(e) => {
        setInstituteFields((prev) => {
         let dum = { ...prev };
         dum.location = e.target.value;
         return dum;
        });
       }}
       fullWidth
      />
      <TextField
       margin="dense"
       label="Institute Ph. no."
       type="text"
       value={instituteFields.inumber}
       onChange={(e) => {
        setInstituteFields((prev) => {
         let dum = { ...prev };
         dum.inumber = e.target.value;
         return dum;
        });
       }}
       fullWidth
      />
      <TextField
       margin="dense"
       label="Institute Email"
       type="text"
       value={instituteFields.imail}
       onChange={(e) => {
        setInstituteFields((prev) => {
         let dum = { ...prev };
         dum.imail = e.target.value;
         return dum;
        });
       }}
       fullWidth
      />
      <TextField
       margin="dense"
       label="Personal Ph. no."
       type="text"
       value={instituteFields.pnumber}
       onChange={(e) => {
        setInstituteFields((prev) => {
         let dum = { ...prev };
         dum.pnumber = e.target.value;
         return dum;
        });
       }}
       fullWidth
      />
      <TextField
       margin="dense"
       label="Personal Email"
       type="text"
       value={instituteFields.pmail}
       onChange={(e) => {
        setInstituteFields((prev) => {
         let dum = { ...prev };
         dum.pmail = e.target.value;
         return dum;
        });
       }}
       fullWidth
      />
      <TextField
       margin="dense"
       label="Arjuna POC"
       type="text"
       value={instituteFields.poc}
       onChange={(e) => {
        setInstituteFields((prev) => {
         let dum = { ...prev };
         dum.poc = e.target.value;
         return dum;
        });
       }}
       fullWidth
      />
     </DialogContent>
     <DialogActions>
      <Button
       onClick={() => {
        setOpen5(false);
       }}
       color="primary"
      >
       Cancel
      </Button>
      <Button
       onClick={() => {
        setBackdrop(true);
        axios
         .post("https://arjunadb.herokuapp.com/pwebinar/addinstitute", {
          name: instituteFields.name,
          campus: instituteFields.campus,
          location: instituteFields.location,
          inumber: instituteFields.inumber,
          imail: instituteFields.imail,
          pnumber: instituteFields.pnumber,
          pmail: instituteFields.pmail,
          poc: instituteFields.poc,
         })
         .then((res) => {
          setInstituteList((prev) => {
           let dum = [...prev];
           dum.push(res.data);
           return dum;
          });
          setInstituteFields({ name: "", campus: "", location: "", inumber: "", imail: "", pnumber: "", pmail: "", poc: "" });
          setBackdrop(false);
          setOpen5(false);
         })
         .catch((err) => console.log(err));
       }}
       color="primary"
      >
       Next
      </Button>
     </DialogActions>
    </Dialog>

    <Dialog fullScreen={fullScreen} open={open6} onClose={() => {}} aria-labelledby="responsive-dialog-title">
     <DialogTitle id="responsive-dialog-title">{"Import Excel Data"}</DialogTitle>
     <DialogContent>
      <input
       type="file"
       onChange={(e) => {
        setBackdrop(true);
        var files = e.target.files,
         f = files[0];
        var reader = new FileReader();
        reader.onload = function (e) {
         var data = e.target.result;
         let readedData = XLSX.read(data, { type: "binary" });
         const wsname = readedData.SheetNames[0];
         const ws = readedData.Sheets[wsname];

         /* Convert array to json*/
         const students = XLSX.utils.sheet_to_json(ws, { header: 1 });
         students.shift();

         students.map((val, i) => {
          if (!val[2]) {
           val[2] = "";
          }
          if (!val[3]) {
           val[3] = "";
          }
         });
         console.log(students);
         console.log(currentWebinar._id, currentWebinar.webinarid);

         axios
          .post("https://arjunadb.herokuapp.com/webinar/addusers", {
           id: currentWebinar._id,
           wid: currentWebinar.webinarid,
           eid: currentWebinar.institute,
           details: students,
          })
          .then(() => {
           axios
            .post("https://arjunadb.herokuapp.com/webinar/find", { webinarid: currentWebinar._id })
            .then((res) => {
             let webinarlist = webinarList;
             webinarlist[currentWebinarNo].users = res.data.users;
             webinarlist[currentWebinarNo].userscount = res.data.userscount;
             setWebinarList(webinarlist);
             setBackdrop(false);
             alert("sucessfully imported the student list");
             setOpen6(false);
            })
            .catch((err) => {
             console.log(err);
            });
          })
          .catch((err) => {
           console.log(err);
          });
        };
        reader.readAsBinaryString(f);
       }}
      />
     </DialogContent>
     <DialogActions>
      <Button
       onClick={() => {
        setOpen6(false);
       }}
       color="primary"
      >
       Cancel
      </Button>
     </DialogActions>
    </Dialog>

    <Dialog fullScreen={fullScreen} open={open7} onClose={() => {}} aria-labelledby="responsive-dialog-title">
     <DialogTitle id="responsive-dialog-title">{"Share"}</DialogTitle>
     <DialogContent>
      <EmailShareButton url={`https://arjunafe.herokuapp.com/form/${currentWebinar._id}`}>
       <EmailIcon />
      </EmailShareButton>
      <FacebookShareButton url={`https://arjunafe.herokuapp.com/form/${currentWebinar._id}`}>
       <FacebookIcon />
      </FacebookShareButton>
      <TwitterShareButton url={`https://arjunafe.herokuapp.com/form/${currentWebinar._id}`}>
       <TwitterIcon />
      </TwitterShareButton>
      <WhatsappShareButton url={`https://arjunafe.herokuapp.com/form/${currentWebinar._id}`}>
       <WhatsappIcon />
      </WhatsappShareButton>
      <TelegramShareButton url={`https://arjunafe.herokuapp.com/form/${currentWebinar._id}`}>
       <TelegramIcon />
      </TelegramShareButton>
     </DialogContent>
     <DialogActions>
      <Button
       onClick={() => {
        setOpen7(false);
       }}
       color="primary"
      >
       Cancel
      </Button>
     </DialogActions>
    </Dialog>
   </div>
  </>
 );
}

export default Webinar;
