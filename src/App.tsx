import React, { Component} from "react";
import {useState, useEffect} from "react";
import { BrowserRouter, Routes, Route, Link} from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import "./global.css"

/**
 * The starting page for your App
 */

class App extends Component{
  render(){
    return(
      <>
        <BrowserRouter>
          <Header />
          <main>
            <section>
                <Routes>
                  <Route path={"/"} element={<Home />} />
                </Routes>
            </section>
          </main>
        </BrowserRouter>
      </>
    );
  }
}

export default App;