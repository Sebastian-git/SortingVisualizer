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
            <label class="navbarComponent" onClick={() => this.props.setCurrentAlgorithm("quick")}>Quick</label>
            <label class="navbarComponent" onClick={() => this.props.setCurrentAlgorithm("selection")}>Selection</label>
            <label class="navbarComponent" onClick={() => this.props.setCurrentAlgorithm("bubble")}>Bubble</label>
            <label class="navbarComponent" onClick={() => this.props.setCurrentAlgorithm("insertion")}>Insertion</label>
            <label class="navbarComponent" onClick={() => this.props.setCurrentAlgorithm("merge")}>Merge</label>
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