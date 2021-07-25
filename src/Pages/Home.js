import React from "react"
import Nav from "../Components/Navigation"
import "./Home.css"

function Home() {
  return (
    <React.Fragment>
      <div id="header">
        <h1 id="title">Sorting Visualizer</h1>
        <Nav/>
      </div>
      
      <div id="content">
        <div id="chart">

        </div>
      </div>
    </React.Fragment>
  );
}

export default Home;
