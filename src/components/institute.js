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
import { UserList, WebinarList, Filter } from "./context/storage";
import ScriptTag from "react-script-tag";
import { Cloudinary } from "cloudinary-core";

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

function Institute() {
 const classes = useStyles();

 const [instituteList, setInstituteList] = useState([]);
 const [start, setStart] = useState(0);
 const [backdrop, setBackdrop] = useState(false);

 useEffect(() => {
  setBackdrop(true);
  axios
   .get("https://arjunadb.herokuapp.com/pwebinar/institutes")
   .then((res) => {
    console.log(res.data);
    setInstituteList(res.data);
    setBackdrop(false);
   })
   .catch((err) => {
    console.log(err);
   });
 }, []);

 useEffect(() => {
  console.log("changed");
  if (window.action === "closed") {
   console.log("working");
  }
 }, [window.action]);

 function popup(val) {
  console.log(val);
 }

 return (
  <>
   {/* <ScriptTag type="text/javascript" src="https://upload-widget.cloudinary.com/global/all.js" />
   <ScriptTag type="text/javascript">
      var myWidget = cloudinary.createUploadWidget(
    {
     cloudName: "my_cloud_name",
     uploadPreset: "my_preset",
    },
    (error, result) => {
     if (!error && result && result.event === "success") {
      console.log("Done! Here is the image info: ", result.info);
     }
    }
   );

   document.getElementById("upload_widget").addEventListener(
    "click",
    function () {
     myWidget.open();
    },
    false
   );
   </ScriptTag> */}

   <Backdrop className={classes.backdrop} open={backdrop}>
    <CircularProgress color="inherit" />
   </Backdrop>
   <div className={classes.root}>
    <ResponsiveDrawer />

    <main className={classes.content}>
     <div className={classes.toolbar} />

     <div class="table-responsive">
      <table class="table table-striped table-hover table-bordered">
       <thead class="table-success">
        <tr>
         <th scope="col">#</th>
         <th scope="col">Name</th>
         <th scope="col">Campus</th>
         <th scope="col">Location</th>
         <th scope="col">Institute Ph.no.</th>
         <th scope="col">Institute Email</th>
         <th scope="col">Personal Ph. no.</th>
         <th scope="col">Personal Email</th>
         <th scope="col">Arjuna POC</th>
        </tr>
       </thead>
       <tbody>
        {instituteList.map((val, i) => {
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
             {val.campus}
            </td>
            <td
             onClick={() => {
              popup(val);
             }}
            >
             {val.location}
            </td>
            <td
             onClick={() => {
              popup(val);
             }}
            >
             {val.inumber}
            </td>
            <td
             onClick={() => {
              popup(val);
             }}
            >
             {val.imail}
            </td>
            <td
             onClick={() => {
              popup(val);
             }}
            >
             {val.pnumber}
            </td>
            <td
             onClick={() => {
              popup(val);
             }}
            >
             {val.pmail}
            </td>
            <td
             onClick={() => {
              popup(val);
             }}
            >
             {val.poc}
            </td>
           </tr>
          );
         }
        })}
       </tbody>
      </table>
     </div>
     <p style={{ textAlign: "center" }}>
      <button
       className="btn"
       style={{ color: "blue" }}
       onClick={() => {
        if (start === 0) {
         setStart(instituteList.length - (instituteList.length % 10));
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
      Displaying {start + 1} - {start + 10 > instituteList.length ? instituteList.length : start + 10} of {instituteList.length}{" "}
      <button
       className="btn"
       style={{ color: "blue" }}
       onClick={() => {
        if (start + 10 > instituteList.length) {
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
     </p>
    </main>
   </div>
  </>
 );
}

export default Institute;
