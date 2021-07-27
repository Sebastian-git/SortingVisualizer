import React, { Component } from "react"

import animate from "../Components/Animation"
import Nav from "../Components/Navigation"

import playImage from '../imgs/playImage.png';
import restart from '../imgs/restartImage.png';
import volumeImage from '../imgs/volumeImage.png';
import "./Home.css"

class Home extends Component {

  state = {
    currentAlgorithm : "",
    isPlaying : false,
    maxBars : 30,
    maxHeight : 30,
    heights : []
  }

  componentDidMount() {
    this.getRandomHeights()
    this.setCurrentAlgorithm("quick")
  }

  getRandomHeights = () => {
    let tempHeights = []
    for (let i = 0; i <= this.state.maxBars*2; i ++) {
      tempHeights.push(parseInt((Math.random() * this.state.maxHeight) + 1))
    }
    this.setState({
      heights : tempHeights
    })
  }
  
  swap = (data, indexOne, indexTwo) => {
    let temp = data[indexOne]
    data[indexOne] = data[indexTwo]
    data[indexTwo] = temp
  }

  quicksort = async (data, left, right) => {
    if (left < right) {
      let index = await this.partition(data, left, right)
      await this.quicksort(data, left, index - 1)
      await this.quicksort(data, index + 1, right)
    }
  }

  partition = async (data, left, right) => {
    let pivot = data[right]
    let i = left - 1

    for (let j = left; j < right - 1; j++) {
      if (data[j] < pivot) {
        i++
        this.swap(data, j, i)
    
        await new Promise(r => setTimeout(r, 100));
        animate(this.state.maxBars, data)
        console.log("called")
      }
    }
    this.swap(data, i+1, right)
    
    await new Promise(r => setTimeout(r, 100));
    animate(this.state.maxBars, data)
    console.log("called")

    return i + 1
  }

  setCurrentAlgorithm = async (name) => {
    this.setState({
      currentAlgorithm : name
    })
    if (name == "quick") {
      await this.quicksort(this.state.heights, 0, this.state.heights.length - 1)
    }
  }

  playClick = () => {
    let prevState = this.state.isPlaying
    this.setState({
      isPlaying : !prevState
    })
    console.log(this.state.currentAlgorithm)
  }

  restartClick = () => {
    this.getRandomHeights()

    animate(this.state.maxBars, this.state.heights)
  }

  render() {
    return (
      <React.Fragment>
        <div id="header">
          <h1 id="title">Sorting Visualizer</h1>
          <Nav setCurrentAlgorithm={this.setCurrentAlgorithm} />
        </div>
   
        <div id="content">
          <div id="animation">
            {animate(this.state.maxBars, this.state.heights)}
          </div>
          <div id="taskbar">
            <img class="taskbarChild" src={restart} alt="Restart" onClick={() => this.restartClick()} />
            <img class="taskbarChild" src={playImage} alt="Play" onClick={() => this.playClick()} />
            <img class="taskbarChild" src={volumeImage} alt="Volume" />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
