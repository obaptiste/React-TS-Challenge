import React, { Component} from "react";
import {useState, useEffect} from "react";
import { BrowserRouter, Routes, Route, Link} from "react-router-dom";
import * as AuthService from "./services/auth.service";
import IUser from "./types/user.type";
import Header from "./components/Header";
import Profile from "./pages/Profile";
import BoardUser from "./pages/BoardUser";
import EventBus from "./common/EventBus";
import Home from "./pages/Home";
import "./global.css"
import { boolean } from "yup";
import Register from "./pages/Register";
import { parseConfigFileTextToJson } from "typescript";

/**
 * The starting page for your App
 */

const App:React.FC = () => {
const [showModeratorBoard, setShowModeratorBoard] = useState<boolean>(false);
const [showAdminBoard, setShowAdminBoard] = useState<boolean>(false);
const [currentUser, setCurrentUser] = useState<IUser | undefined >(undefined);

useEffect(() => {
  const user = AuthService.getCurrentUser();

  if(user) {
    setCurrentUser(user);
    setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
    setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
  }
  EventBus.on("logout", logOut);
  
  return () => {
    EventBus.remove("logout", logOut);
  };
}, []);

const logOut = () => {
  AuthService.logout();
  setCurrentUser(undefined);
  setShowModeratorBoard(false);
  setShowAdminBoard(false);
};

return (
      <>
      <div>
        <nav>
          <Link to={"/"}>OJB</Link>
          <div className="navbar-nav">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>

            {currentUser && ( 
              <li className="nav-item">
                <Link to={"/User"} className="nav-link">
                  User
                </Link>
              </li>
            )}
            </div>
            {currentUser ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
                </li>
                <li className="nav-item">
                  <a href="/login" className="nav-link" onClick={logOut}>
                    LogOut
                  </a>
                </li>
          </div>
            ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/register"} className="nav-link">
                    Sign Up
                  </Link>
                </li>
              </div>
            )}
        </nav>
      </div>
        <BrowserRouter>
          <Header />
          <main>
            <section>
                <Routes>
                  <Route exact path={["/", "/home"]} component={Home} />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/profile" component={Profile} />
                  <Route path="/user" component={BoardUser} />
                  <Route path="/mod" component={BoardModerator} />
                  <Route path="/admin" component={BoardAdmin} />
                </Routes>
            </section>
          </main>
        </BrowserRouter>
      </>
    );
  }

export default App;