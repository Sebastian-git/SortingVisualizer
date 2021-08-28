import React, { Component } from "react"
import "./Information.css"

class InfoLeft extends Component {

  render() {

    return (
    <React.Fragment>
        <div class="info">
          <div id="desc" class="infoCategory">
            <p class="infoTitle">DESCRIPTION</p>
            <p class="infoDesc">Description information goes here</p>
          </div>
          <div class="infoCategory">
            <p class="infoTitle">HISTORY</p>
            <p class="infoDesc">History information goes here</p>
          </div>
        </div>
    </React.Fragment>
    )
  }
}

export default InfoLeft;