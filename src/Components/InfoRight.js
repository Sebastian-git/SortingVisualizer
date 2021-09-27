import React, { Component } from "react"
import "./Information.css"

import arrowLeft from '../imgs/arrowLeft.png'
import arrowRight from '../imgs/arrowRight.png'

class InfoRight extends Component {

  constructor() {
    super()

    /*
    Helpful info: https://www.bigocheatsheet.com/
    Potential extra algorithms: Bucket Sort, Heap Sort, Radix Sort
    */

    this.bestTime = {
      "quick" : "O(nlog(n))",
      "selection" : "O(n^2)",
      "bubble" : "O(n)",
      "insertion" : "O(n)",
      "merge" : "O(nlog(n))"
    }
    this.avgTime = {
      "quick" : "O(nlog(n))",
      "selection" : "O(n^2)",
      "bubble" : "O(n^2)",
      "insertion" : "O(n^2)",
      "merge" : "O(nlog(n))"
    }
    this.worseTime = {
      "quick" : "O(n^2)",
      "selection" : "O(n^2)",
      "bubble" : "O(n^2)",
      "insertion" : "O(n^2)",
      "merge" : "O(nlog(n))"
    }
    this.space = {
      "quick" : "O(log(n))",
      "selection" : "O(1)",
      "bubble" : "O(1)",
      "insertion" : "O(1)",
      "merge" : "O(n)"
    }
    this.start = Date.now()
    this.timeElapsed = this.start - Date.now()
  }

  render() {

    return (

      <React.Fragment>
        <div class="info">
          <div id="infoRight">
            <div class="infoCategory">
              <div id="complexityWrapper">
                <p class="infoTitle">COMPLEXITY</p>
                <div class="infoStatWrapper">
                  <p class="infoDesc">Best time: </p>
                  <p class="infoDesc">{this.bestTime[this.props.alg]}</p>
                </div>
                <div class="infoStatWrapper">
                  <p class="infoDesc">Average time: </p>
                  <p class="infoDesc">{this.avgTime[this.props.alg]}</p>
                </div>
                <div class="infoStatWrapper">
                  <p class="infoDesc">Worse time: </p>
                  <p class="infoDesc">{this.worseTime[this.props.alg]}</p>
                </div>
                <div class="infoStatWrapper">
                  <p class="infoDesc">Space: </p>
                  <p class="infoDesc">{this.space[this.props.alg]}</p>
                </div>
              </div>
            </div>
            <div className="infoCategory">
              <div id="liveStatsWrapper">
                <p className="infoTitle">LIVE STATS</p>
                <div className="infoStatWrapper">
                  <p className="infoDesc">Time Elapsed:</p>
                  <p className="infoDesc">{this.props.timeElapsed}</p>
                </div>
                <div className="infoStatWrapper">
                  <p className="infoDesc">Comparisons:</p>
                  <p className="infoDesc">{this.props.comparisons}</p>
                </div>
              </div>
            </div>
            <div id="speedWrapper">
              <div className="infoCategory">
                <p className="infoTitle">SPEED</p>
                <div id="speedTuneContent">
                  <img className="infoArrows" src={arrowLeft} alt="Arrow left" onClick={() => this.props.decrementSpeed()} />
                  <p className="liveInfoChild">{this.props.currentSpeed}</p>
                  <img className="infoArrows" src={arrowRight} alt="Arrow right" onClick={() => this.props.incrementSpeed()} />
                </div>
              </div>
            </div>
            <div className="infoCategory">
              <div id="tuneWrapper">
                <p className="infoTitle">TUNE</p>
                <div id="speedTuneContent">
                  <img className="infoArrows" src={arrowLeft} alt="Arrow left" onClick={() => this.props.decrementTune()} />
                  <p className="liveInfoChild">{this.props.currentTune}</p>
                  <img className="infoArrows" src={arrowRight} alt="Arrow right" onClick={() => this.props.incrementTune()} />
                </div>
              </div>
            </div>
            <div className="infoCategory">
              <p className="infoTitle">BARS</p>
              <div id="speedTuneContent">
                <img className="infoArrows" src={arrowLeft} alt="Arrow left" onClick={() => this.props.updateBars(-2)} />
                <p className="liveInfoChild">{this.props.maxBars}</p>
                <img className="infoArrows" src={arrowRight} alt="Arrow right" onClick={() => this.props.updateBars(2)} />
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default InfoRight;