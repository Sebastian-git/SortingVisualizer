import React, { Component } from "react"
import Nav from "../Components/Navigation"
import "./Home.css"

import animation from "../animation"

class Home extends Component {

  setRenderer = (renderer) => {
    document.getElementById("chart").appendChild( renderer.domElement )
  }

  render() {
    return (
      <React.Fragment>
        <div id="header">
          <h1 id="title">Sorting Visualizer</h1>
          <Nav/>
        </div>
   
        <div id="content">
          <div id="animation">
            {animation()}
          </div>
          <div id="taskbar">
            <p class="taskbarChild">volume play reset</p>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
