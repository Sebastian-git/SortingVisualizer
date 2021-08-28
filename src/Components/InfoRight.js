import React, { Component } from "react"
import "./Information.css"

class InfoRight extends Component {

  render() {

    return (

      <React.Fragment>
        <div class="info">
          <div class="infoCategory">
            <p class="infoTitle">COMPLEXITY</p>
            <div class="infoStatWrapper">
              <p class="infoDesc">Best time: </p>
              <p class="infoDesc">O(nlog(n))</p>
            </div>
            <div class="infoStatWrapper">
              <p class="infoDesc">Average time: </p>
              <p class="infoDesc">O(nlog(n))</p>
            </div>
            <div class="infoStatWrapper">
              <p class="infoDesc">Worse time: </p>
              <p class="infoDesc">O(nlog(n))</p>
            </div>
            <div class="infoStatWrapper">
              <p class="infoDesc">Space: </p>
              <p class="infoDesc">O(nlog(n))</p>
            </div>
          </div>
          <div class="infoCategory">
            <p class="infoTitle">LIVE STATS</p>
            <div class="infoStatWrapper">
              <p class="infoDesc">Time Elapsed:</p>
              <p class="infoDesc">0</p>
            </div>
            <div class="infoStatWrapper">
              <p class="infoDesc">Comparisons:</p>
              <p class="infoDesc">0</p>
            </div>
          </div>
          <div class="infoCategory">
            <p class="infoTitle">SPEED</p>
          </div>
          <div class="infoCategory">
            <p class="infoTitle">TUNE</p>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default InfoRight;