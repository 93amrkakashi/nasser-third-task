import React from "react";
import BooksPage from "../components/BooksPage";
import { Helmet } from "react-helmet-async";
const Home = () => {
  return (
    <>
      <Helmet>
        <title>الصفحة الرئيسية</title>
      </Helmet>
      <BooksPage />
    </>
  );
};

export default Home;
