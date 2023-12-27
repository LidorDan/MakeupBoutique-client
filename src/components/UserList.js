import React from "react";
import User from "./User";
import { useState } from "react";


const UserList = ({ users }) => {

  return (
    <div className="user_page_list-wrap">
      
        {users.map((item) => (
          <User
           id={item._id}
           first_name={item.first_name}
           last_name={item.last_name}
           email={item.email}
          ></User>
        ))}

    </div>     

  );
};


export default UserList;
