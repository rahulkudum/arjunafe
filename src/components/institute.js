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

 function popup(val) {
  console.log(val);
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
        })}
       </tbody>
      </table>
     </div>
    </main>
   </div>
  </>
 );
}

export default Institute;
