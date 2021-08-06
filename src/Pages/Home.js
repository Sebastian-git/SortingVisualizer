import React, { Component } from "react"
import * as Tone from 'tone'

import {animate} from "../Components/Animation"
import Navbar from "../Components/Navigation"
import Taskbar from "../Components/Taskbar"

import "./Home.css"

class Home extends Component {

  state = {
    currentAlgorithm : "",
    isPlaying : false,
    isSorted : false,
    colors : [],
    maxBars : 20,
    maxHeight : 30,
    heights : [],
    barUpdateDelay : 100, // 100
    soundDelay: 500, // 500
    audioControlToggle : false,
    audioNotes : ["C", "D", "E", "F", "G", "A", "B"],
    audioNoteCombinations : [],
    audioNoteCombinationStart : 0,
    fmSynth : new Tone.AMSynth().toDestination()
  }

  componentDidMount() {
    this.getRandomHeights()
    this.setCurrentAlgorithm("quick")
    this.fillAudioNotes()
    this.fillColors()
   // this.handleImageHover()
  }

  fillColors = () => {
    let localColors = []
    for (let i = 0; i <= this.state.maxBars*2; i++) {
      localColors.push("#CC20A5")
    }
    this.setState({
      colors : localColors,
      tempColors : localColors
    })
  }

  fillAudioNotes = () => {
    let notes = []
    let total = 0

    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 7; j++) {
        notes.push(this.state.audioNotes[j] + i.toString())
        total ++
      }
    }
    
    this.setState({
      audioNoteCombinations : notes,
      audioNoteCombinationStart : (total / 2) + this.state.maxBars
    })
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

  setCurrentAlgorithm = async (name) => {
    this.setState({
      currentAlgorithm : name
    })
    this.restartClick()
  }

  playAllBars = async () => {
    let delay = 2000
    for (let i = 0; i < this.state.heights.length; i++) {
      await this.playSound(i, delay)
      await this.updateColors(i, "#FFFFFF", delay)
    }
    this.state.fmSynth.triggerRelease()
  }

  playClick = async () => {
    let temp = this.state.isPlaying
    await this.setState({
      isPlaying : !temp
    })

    if (!temp && !this.state.isSorted) {
      let tempHeights = this.state.heights

      if (this.state.currentAlgorithm === "quick") {
        await this.quicksort(tempHeights, 0, tempHeights.length - 1)
      }
      else if (this.state.currentAlgorithm === "selection") {
        await this.selectionsort(tempHeights)
      }
      
      if (this.state.isPlaying === true) this.playAllBars()
      
      this.setState({
        isPlaying : false,
        isSorted : true
      })
    } else {
      this.state.fmSynth.triggerRelease()
    }
    
  }

  restartClick = async () => {
    this.setState({
      isPlaying : false,
      isSorted : false
    })
    this.getRandomHeights()
  }

  volumeHover = async () => {
    let elem = document.getElementById("volume")
    let toggle = this.state.audioControlToggle
    elem.style.opacity = 100
    
    this.setState({
      audioControlToggle : !toggle
    })
  }

  volumeNotHover = async () => {
    let elem = document.getElementById("volume")
    let toggle = this.state.audioControlToggle
    elem.style.opacity = 0
    
    this.setState({
      audioControlToggle : !toggle
    })
  }

  updateVolume = async () => {
    this.state.fmSynth.triggerRelease()
    let temp = new Tone.AMSynth().toDestination()
    let volumeLevel = document.getElementById("volume").value

    if (volumeLevel === '0') {
      temp.volume.value = -1000
    } else {
      temp.volume.value = volumeLevel - 20
    }
    
    this.setState({
      fmSynth : temp,
    })
  }

  playSound = async (distance, delay) => {
    this.state.fmSynth.triggerRelease()
    if (!delay) delay = 0
    let note = this.state.audioNoteCombinations[this.state.audioNoteCombinationStart - distance]
    
    await new Promise(r => setTimeout(r, 10));
    this.state.fmSynth.triggerAttackRelease(note, 30);
  }

  updateColors = async (index, newColor, delay) => {
    if (!delay) delay = 0
    let tempColors = this.state.colors
    tempColors[index] = newColor
    this.setState({
      colors : tempColors
    })
    
    await new Promise(r => setTimeout(r, 30));
    
    tempColors[index] = "#CC20A5"
    this.setState({
      colors : tempColors
    })
  }

  updateHeight = async (data) => {
    this.setState({
      heights : data
    })
    //await new Promise(r => setTimeout(r, this.state.barUpdateDelay));
    await new Promise(r => setTimeout(r, 30));
  }

  // ALGORITHMS HERE, WILL BE MIGRATED TO INDIVIDUAL COMPONENTS SOON
  
  swap = async (data, indexOne, indexTwo) => {
    if (!this.state.isPlaying) return
    let temp = data[indexOne]
    data[indexOne] = data[indexTwo]
    data[indexTwo] = temp

    await this.playSound(indexOne)
    await this.playSound(indexTwo)
  }

  quicksort = async (data, left, right) => {
    if (!this.state.isPlaying) return
    if (left < right) {
      let index = await this.partition(data, left, right)
      await this.quicksort(data, left, index - 1)
      await this.quicksort(data, index + 1, right)
    }
  }

  partition = async (data, left, right) => {
    let pivot = data[right]
    let i = left - 1

    for (let j = left; j < right; j++) {
      if (!this.state.isPlaying) return
      this.updateColors(j, "#FFFFFF")
      if (data[j] < pivot) {
        i++
        await this.updateColors(i, "#00FF00")
        await this.updateColors(j, "#FF0000")
        this.swap(data, j, i)
        await this.updateHeight(data)
        
      }
    }
    this.swap(data, i+1, right)
    await this.updateHeight(data)

    return i + 1
  }

  selectionsort = async (data) => {
    let sorted = []
    let unsorted = data
    let minIndex = 0
    
    while (unsorted.length > 0) {
      minIndex = 0
      for (let i = 0; i < unsorted.length; i++) {
        if (!this.state.isPlaying) return
        await this.updateColors(i, "#FFFFFF")
        await this.playSound(data[i])
        if (unsorted[i] <= unsorted[minIndex]) {
          minIndex = i
        }
      }

      await this.updateColors(sorted.length + minIndex, "#FF0000")
      
      sorted.push(unsorted.splice(minIndex, 1))
      data = sorted.concat(unsorted)

      await this.updateHeight(data)
      await this.updateColors(sorted.length - 1, "#00FF00")

    }
  }

  render() {
    return (
      <React.Fragment>

        <div id="header">
          <h1 id="title">Sorting Visualizer</h1>
          <Navbar setCurrentAlgorithm={this.setCurrentAlgorithm} />
        </div>
   
        <div id="content">
          <div id="animation">
            {animate(this.state.maxBars, this.state.heights, this.state.colors)}
          </div>
          
          <Taskbar restartClick={this.restartClick} playClick={this.playClick} volumeHover={this.volumeHover} volumeNotHover={this.volumeNotHover} updateVolume={this.updateVolume} />
        </div>
      </React.Fragment>
    );
  }
}

export default Home;