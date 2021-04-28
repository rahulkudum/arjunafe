import React, { createContext, useState } from "react";
import { useLocal } from "./hooks";

export const AdminName = createContext();
export const AdminPhoto = createContext();
export const UserList = createContext();
export const WebinarList = createContext();

export function TotalStorage({ children }) {
 const [adminName, setAdminName] = useLocal("adminname", "");
 const [adminPhoto, setAdminPhoto] = useLocal("adminphoto", "");
 const [userList, setUserList] = useState([]);
 const [webinarList, setWebinarList] = useState([]);

 return (
  <AdminName.Provider value={[adminName, setAdminName]}>
   <AdminPhoto.Provider value={[adminPhoto, setAdminPhoto]}>
    <UserList.Provider value={[userList, setUserList]}>
     <WebinarList.Provider value={[webinarList, setWebinarList]}>{children}</WebinarList.Provider>
    </UserList.Provider>
   </AdminPhoto.Provider>
  </AdminName.Provider>
 );
}
