import React, { Component } from "react"
import "./Navigation.css"

class Navigation extends Component {

  render() {

    return (

    <React.Fragment>

      <div id="navbarWrapper4">
      <div id="navbarWrapper3">
      <div id="navbarWrapper2"> 
      <div id="navbarWrapper1">  
        <div id="navbar">
            <button class="navbarComponent" onClick={() => this.props.setCurrentAlgorithm("quick")}>Quick</button>
            <button class="navbarComponent" onClick={() => this.props.setCurrentAlgorithm("selection")}>Selection</button>
            <button class="navbarComponent" onClick={() => this.props.setCurrentAlgorithm("bubble")}>Bubble</button>
            <button class="navbarComponent" onClick={() => this.props.setCurrentAlgorithm("insertion")}>Insertion</button>
            <button class="navbarComponent" onClick={() => this.props.setCurrentAlgorithm("merge")}>Merge</button>
        </div>
      </div>
      </div>
      </div>
      </div>

    </React.Fragment>
    )
  }
}

export default Navigation;