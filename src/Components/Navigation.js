import React, { Component } from "react"
import "./Navigation.css"

class Navigation extends Component {

  render() {

    return (

    <React.Fragment>

      <div id="navbar">
        <button class="navbarComponent" onClick={() => this.props.setCurrentAlgorithm("quick")}>Quick</button>
        <button class="navbarComponent" onClick={() => this.props.setCurrentAlgorithm("selection")}>Selection</button>
        <button class="navbarComponent" onClick={() => this.props.setCurrentAlgorithm("bubble")}>Bubble</button>
        <button class="navbarComponent" onClick={() => this.props.setCurrentAlgorithm("insertion")}>Insertion</button>
        <button class="navbarComponent" onClick={() => this.props.setCurrentAlgorithm("merge")}>Merge</button>
      </div>

    </React.Fragment>
    )
  }
}

export default Navigation;