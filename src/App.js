import React, { useContext, useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { useHistory } from "react-router-dom";
import "./App.css";
import Webinar from "./components/webinar";
import User from "./components/user";
import logo from "./logo.jpg";
import axios from "axios";

function App() {
 let history = useHistory();

 const [webinarList, setWebinarList] = useState([]);
 const [userList, setUserList] = useState([]);

 return (
  <Switch>
   <Route exact path="/">
    <div className="text-center page">
     <main className="form-signin">
      <img className="mb-4" src={logo} alt="" />
      <button
       className="w-100 btn btn-lg btn-primary"
       onClick={() => {
        axios
         .get("https://arjunadb.herokuapp.com/webinar")
         .then((res) => {
          console.log("kjmb", res.data);
          setWebinarList(res.data);
          history.push("/webinar");
         })
         .catch((err) => alert(err));
       }}
      >
       Webinars
      </button>
      <button
       className="w-100 btn btn-lg btn-primary"
       onClick={() => {
        axios
         .get("https://arjunadb.herokuapp.com/user")
         .then((res) => {
          console.log("kjmb", res.data);
          setUserList(res.data);
          history.push("/user");
         })
         .catch((err) => alert(err));
       }}
      >
       Users
      </button>
     </main>
    </div>
   </Route>

   <Route path="/webinar">
    <Webinar webinarList={[webinarList, setWebinarList]} />
   </Route>

   <Route path="/user">
    <User userList={[userList, setUserList]} />
   </Route>
  </Switch>
 );
}

export default App;
