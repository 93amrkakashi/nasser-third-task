import React from "react";
import BooksPage from "../components/BooksPage";
import { Helmet } from "react-helmet-async";

const AdminDashboard = () => {

  return (
    <>
      <Helmet>
        <title>لوحة التحكم</title>
      </Helmet>
      <BooksPage />
    </>
  );
};

export default AdminDashboard;
