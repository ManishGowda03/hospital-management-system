// components/common_components/MainLayout.jsx
import React from "react";
import Header from "../header_components/Header";
import Footer from "../footer_components/Footer";
import { Routes, Route } from "react-router-dom";
import { PrivateRoute, PublicRoute } from "../auth_components/AuthManager";
import PageTitle from "./PageTitle";

import Homepage from "../../pages/common_pages/Homepage";
import PageNotFound from "../../pages/common_pages/PageNotFound";
import AboutUs from "../../pages/common_pages/AboutUs";
import AddBlog from "../../pages/blog_pages/AddBlog";
import AllBlogs from "../../pages/blog_pages/AllBlogs";
import SingleBlog from "../../pages/blog_pages/SingleBlog";



const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen text-gray-900">
      <Header />
      <main className="flex-grow containerWidth py-6">
        <Routes>
          <Route path="/" element={ <PrivateRoute> <PageTitle title="Home"> <Homepage /> </PageTitle> </PrivateRoute> } />
          <Route path="/home" element={ <PrivateRoute> <PageTitle title="Home"> <Homepage /> </PageTitle> </PrivateRoute> } />
          <Route path="/homepage" element={ <PrivateRoute> <PageTitle title="Home"> <Homepage /> </PageTitle> </PrivateRoute> }/>
          <Route path="/about-us" element={ <PrivateRoute> <PageTitle title="About Us"> <AboutUs />
                        </PageTitle> </PrivateRoute> }/>
          {/* blog routes..  */}
          <Route path="/add-blog" element={ <PrivateRoute allowedRoles={["superadmin", "admin"]}> 
                        <PageTitle title="Add Blog"> <AddBlog /> </PageTitle> </PrivateRoute> }/>
          <Route path="/all-blogs" element={ <PageTitle title="All Blogs"> <AllBlogs /> </PageTitle> }/>
          <Route path="/single-blog/:id" element={ <PageTitle title="Single Blog"> <SingleBlog /> </PageTitle> }/>


          <Route path="/page-not-found" element={ <PageTitle title="404 Not Found"> <PageNotFound /> </PageTitle> }/>
          <Route path="/*" element={ <PageTitle title="404 Not Found"> <PageNotFound /> </PageTitle> }/>
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;