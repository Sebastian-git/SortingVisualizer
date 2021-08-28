import React, { Component } from "react"
import "./Navigation.css"

class Navigation extends Component {

  state = {
    selected : ""
  }

  setCurrentAlgorithm = async (alg) => {
    this.props.setCurrentAlgorithm(alg)
    await this.setState({
      selected : alg.toLowerCase()
    })
  }

  render() {
    let names = ["Quick", "Selection", "Bubble", "Insertion", "Merge"]
    let buttons = []

    for (let i = 0; i < names.length; i++) {
      buttons.push(
        <div className="navbarComponentWrapper">
          <label className="navbarComponent" onClick={() => this.setCurrentAlgorithm(names[i].toLowerCase())}>{names[i]}</label>
          <div className={this.state.selected === names[i].toLowerCase() ? "glowbarOn" : "glowbarOff"}/>
        </div>
      )
    }

    return (

    <React.Fragment>

      <div id="navbar">
        {buttons}
      </div>

    </React.Fragment>
    )
  }
}

export default Navigation;