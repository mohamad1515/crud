import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import UsersList from "./components/users";
import UserItem from "./components/userItem";
import AddUser from "./components/addUser";
import UserEdit from "./components/editUser";
import Header from "./components/header";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route index element={<UsersList />} />
        <Route path="/:id" element={<UserItem />} />
        <Route path="/add" element={<AddUser />} />
        <Route path="/edit/:id" element={<UserEdit />} />
        <Route path="*" element={<h2>404 Not Found</h2>} />
      </Routes>
    </>
  );
}

export default App;
