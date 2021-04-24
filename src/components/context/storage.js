import React, { createContext, useState } from "react";
import { useLocal } from "./hooks";

export const AdminName = createContext();
export const AdminPhoto = createContext();
export const UserList = createContext();
export const WebinarList = createContext();
export const Filter = createContext();

export function TotalStorage({ children }) {
 const [adminName, setAdminName] = useLocal("adminname", "");
 const [adminPhoto, setAdminPhoto] = useLocal("adminphoto", "");
 const [userList, setUserList] = useState([]);
 const [webinarList, setWebinarList] = useState([]);
 const [filter, setFilter] = useState(false);

 return (
  <AdminName.Provider value={[adminName, setAdminName]}>
   <AdminPhoto.Provider value={[adminPhoto, setAdminPhoto]}>
    <UserList.Provider value={[userList, setUserList]}>
     <WebinarList.Provider value={[webinarList, setWebinarList]}>
      <Filter.Provider value={[filter, setFilter]}>{children}</Filter.Provider>
     </WebinarList.Provider>
    </UserList.Provider>
   </AdminPhoto.Provider>
  </AdminName.Provider>
 );
}
