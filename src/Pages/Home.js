import React, { Component } from "react"
import * as Tone from 'tone'

import { animate } from "../Components/Animation"
import Navbar from "../Components/Navigation"
import Taskbar from "../Components/Taskbar"
import InfoLeft from "../Components/InfoLeft"
import InfoRight from "../Components/InfoRight"

import "./Home.css"

class Home extends Component {

  state = {
    currentAlgorithm : "",
    isPlaying : false,
    isSorted : false,
    
    transitionDelay : 50,
    
    colors : [],

    maxBars : 10,
    barThickness : 3,
    heights : [],

    soundEffectDelay : 10,
    audioControlToggle : false,
    audioNotes : ["C", "D", "E", "F", "G", "A", "B"],
    audioNoteCombinations : [],
    audioNoteCombinationStart : 0,
    volume : 20,
    
    currentTune : "AMSynth",
    tune : new Tone.AMSynth().toDestination(),
    
    currentSpeed : "Medium",
    speedCounter : 1,
    tuneCounter : 0,
    transitionCounter : 1,
  }

  constructor(props) {
    super(props)
    this.keypressListener = this.keypressListener.bind(this)
    
    this.comparisons = 0
    this.startTime = Date.now()
    this.pastTime = 0
    
    this.maxHeight = 30

    this.speedOptions = ["Slow", "Medium", "Fast"]
    this.tuneOptions = ["AMSynth", "FMSynth", "M1Synth", "M2Synth"]
    this.speedValues = [300, 100, 1]
  }

  keypressListener(event) {
    if (event.keyCode === 32) {
      this.playClick()
    } 
    if (event.keyCode === 82) {
      this.restartClick()
    }
  }

  componentDidMount() {
    this.fillHeights()
    this.setCurrentAlgorithm("insertion")
    this.fillAudioNotes()
    this.updateVolume()
    document.addEventListener("keydown", this.keypressListener, false);
  }

  componentWillUnmount(){
    document.removeEventListener("keydown", this.keypressListener, false);
  }

  fillHeights = () => {
    let rand = 0
    let temp = 0
    let tempHeights = Array.from({length : this.state.maxBars}, (_, i) => Math.floor(i*(this.maxHeight+4)/this.state.maxBars) + 1)

    for (let i = 0; i < this.state.maxBars; ++i) {
      rand = Math.floor((Math.random() * this.state.maxBars))
      temp = tempHeights[rand]
      tempHeights[rand] = tempHeights[i]
      tempHeights[i] = temp
    }
    this.setState({
      heights : tempHeights
    })
    this.fillColors()
  }

  getTime = () => {
    return Math.abs(this.startTime - Date.now())/1000
  }

  fillColors = () => {
    let localColors = []
    for (let i = 0; i <= this.state.maxBars; ++i) {
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

    for (let i = 0; i < 8; ++i) {
      for (let j = 0; j < 7; ++j) {
        notes.push(this.state.audioNotes[j] + i.toString())
        ++total
      }
    }
    
    this.setState({
      audioNoteCombinations : notes,
      audioNoteCombinationStart : (total / 2) + (this.state.maxBars)
    })
  }

  incrementSpeed = () => {
    const prevCount =  this.state.speedCounter 
    const prevDelay = this.state.transitionCounter
    let newCount = prevCount
    let newDelay = prevDelay
    if (prevDelay + 1 < 3) {
      newCount = prevCount + 1
      newDelay = prevDelay + 1
      this.setState({
        speedCounter : newCount,
        currentSpeed : this.speedOptions[newCount],
        transitionCounter : newDelay,
        transitionDelay :  this.speedValues[newDelay]
      })
    }
  }

  decrementSpeed = () => {
    const prevCount = this.state.speedCounter 
    const prevDelay = this.state.transitionCounter
    let newCount = prevCount
    let newDelay = prevDelay
    if (prevCount - 1 >= 0) {
      newCount = prevCount - 1
      newDelay = prevDelay - 1
      this.setState({
        speedCounter : newCount,
        currentSpeed : this.speedOptions[newCount],
        transitionCounter : newDelay,
        transitionDelay :  this.speedValues[newDelay]
      })
    }
  }

  incrementTune = () => {
    this.state.tune.triggerRelease()

    const prevCount =  this.state.tuneCounter
    let newCount = prevCount;
    if (prevCount + 1 < 4) {
      newCount = prevCount + 1
    }
    let newTune = this.tuneOptions[Math.abs(newCount)]
    let tempTune = new Tone.AMSynth().toDestination()
    tempTune = this.updateTune(newTune.toLowerCase(), tempTune)

    this.setState({
      tuneCounter : newCount,
      currentTune : newTune,
      tune : tempTune
    })
  }

  decrementTune = () => {
    this.state.tune.triggerRelease()

    const prevCount = this.state.tuneCounter
    let newCount = prevCount;
    if (prevCount - 1 >= 0) {
      newCount = prevCount - 1
    }
    let tempTune = new Tone.AMSynth().toDestination()
    let newTune = this.tuneOptions[Math.abs(newCount)]
    tempTune = this.updateTune(newTune.toLowerCase(), tempTune)
    
    this.setState({
      tuneCounter : newCount,
      currentTune : newTune,
      tune : tempTune
    })
  }

  updateTune = (newTune, tempTune) => {
    if (newTune === "AMSynth".toLowerCase()) {
      tempTune = new Tone.AMSynth().toDestination()
    } else if (newTune === "FMSynth".toLowerCase()) {
      tempTune = new Tone.FMSynth().toDestination()
    } else if (newTune === "M1Synth".toLowerCase()) {
      tempTune = new Tone.MonoSynth().toDestination()
    } else if (newTune === "M2Synth".toLowerCase()) {
      tempTune = new Tone.MembraneSynth().toDestination()
    }

    if (this.state.volume === '-20') {
      tempTune.volume.value = -1000
    } else {
      tempTune.volume.value = this.state.volume
    }
    return tempTune
  }

  updateBars = async (bars) => {
    const prevMaxBars = this.state.maxBars;

    if (prevMaxBars + bars > 20 || prevMaxBars + bars < 2) {
      return
    }

    await this.setState({
      maxBars : prevMaxBars + bars
    })
    this.restartClick()
  }

  setCurrentAlgorithm = async (name) => {
    this.setState({
      currentAlgorithm : name
    })
    this.restartClick()
  }

  playAllBars = async () => {
    this.pastTime = Math.abs((Date.now() - this.startTime) / 1000)
    let delay = 2000
    for (let i = 0; i < this.state.heights.length; ++i) {
      if (!this.state.isPlaying) {    
        this.state.tune.triggerRelease()
        return
      }
      await this.playSound(i)
      await this.updateColors(i, "#FFFFFF", delay)
    }
    this.state.tune.triggerRelease()
  }

  playClick = async () => {
    this.startTime = Date.now()
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
      else if (this.state.currentAlgorithm === "bubble") {
        await this.bubblesort(tempHeights)
      }
      else if (this.state.currentAlgorithm === "insertion") {
        await this.insertionsort(tempHeights)
      }
      else if (this.state.currentAlgorithm === "merge") {
        console.log("original:", tempHeights)
        await this.mergesort(tempHeights, 0, tempHeights.length-1)
        console.log("sorted:", tempHeights)
      }
  
      if (this.state.isPlaying === true) await this.playAllBars()
      
      this.setState({
        isPlaying : false,
        isSorted : true
      })
    }

    this.state.tune.triggerRelease()
    
  }

  restartClick = async () => {
    this.comparisons = 0
    this.pastTime = 0
    this.state.tune.triggerRelease()
    this.setState({
      isPlaying : false,
      isSorted : false
    })
    this.fillHeights()
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
    this.state.tune.triggerRelease()
    let temp = new Tone.AMSynth().toDestination()
    let localVolume = document.getElementById("volume").value - 30

    if (this.state.currentTune === "AMSynth") {
      temp = new Tone.AMSynth().toDestination()
    } else if (this.state.currentTune === "FMSynth") {
      temp = new Tone.FMSynth().toDestination()
    } else if (this.state.currentTune === "M1Synth") {
      temp = new Tone.MonoSynth().toDestination()
    } else if (this.state.currentTune === "M2Synth") {
      temp = new Tone.MembraneSynth().toDestination()
    }

    if (localVolume === -30) {
      temp.volume.value = -500
    } else {
      temp.volume.value = localVolume
    }
    
    this.setState({
      tune : temp,
      volume : localVolume
    })
  }

  playSound = async (distance) => {
    await new Promise(r => setTimeout(r, this.state.soundEffectDelay));
    this.state.tune.triggerRelease()
    let note = this.state.audioNoteCombinations[this.state.audioNoteCombinationStart - distance]
    
    this.state.tune.triggerAttackRelease(note, this.state.soundEffectDelay);
  }

  updateColors = async (index, newColor, delay) => {
    if (!delay) delay = 0
    let tempColors = this.state.colors
    tempColors[index] = newColor
    this.setState({
      colors : tempColors
    })
    
    await new Promise(r => setTimeout(r, this.state.transitionDelay * 2));
    
    tempColors[index] = "#CC20A5"
    this.setState({
      colors : tempColors
    })
  }

  updateMergeColors = async (index1, index2, index3, newColor, delay) => {
    if (!delay) delay = 0
    let tempColors = this.state.colors
    tempColors[index1] = newColor
    tempColors[index2] = newColor
    tempColors[index3] = newColor
    this.setState({
      colors : tempColors
    })
    
    await new Promise(r => setTimeout(r, this.state.transitionDelay * 2));
    
    tempColors[index1] = "#CC20A5"
    tempColors[index2] = "#CC20A5"
    tempColors[index3] = "#CC20A5"
    this.setState({
      colors : tempColors
    })
  } 

  swapColors = async (index1, index2) => {
    let tempColors = this.state.colors

    tempColors[index1] = "#00FF00"
    tempColors[index2] = "#FF0000"
    
    this.setState({
      colors : tempColors
    })
    
    await new Promise(r => setTimeout(r, this.state.transitionDelay * 3));
    
    tempColors[index1] = "#CC20A5"
    tempColors[index2] = "#CC20A5"

    this.setState({
      colors : tempColors
    })
  }

  updateHeight = async (data) => {
    this.setState({
      heights : data
    })
    await new Promise(r => setTimeout(r, this.state.transitionDelay));
  }

  // ALGORITHMS
  
  swap = async (data, indexOne, indexTwo) => {
    if (!this.state.isPlaying) return
    let temp = data[indexOne]
    data[indexOne] = data[indexTwo]
    data[indexTwo] = temp
  }

  quicksort = async (data, left, right) => {
    if (!this.state.isPlaying) return
    this.comparisons += 1
    if (left < right) {
      this.comparisons += 1
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
      await this.updateColors(j, "#FFFFFF")
      await this.playSound(data[j])
      this.comparisons += 1
      if (data[j] < pivot) {
        this.comparisons += 1
        ++i
        await this.swapColors(i, j)
        this.swap(data, j, i)
        await this.updateHeight(data)
        
      }
    }
    await this.swapColors(i+1, right)
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
      this.comparisons += 1
      if (unsorted[minIndex + 1] !== null && unsorted[minIndex] === unsorted[minIndex + 1]) {
      } else {
        for (let i = 0; i < data.length; ++i) {
          if (!this.state.isPlaying) return
          await this.playSound(data[i])
          await this.updateColors(i, "#FFFFFF")
          this.comparisons += 1
          if (unsorted[i] <= unsorted[minIndex]) {
            minIndex = i
          }
        }
      }
      
      await this.swapColors(sorted.length, sorted.length + minIndex)
      sorted.push(unsorted.splice(minIndex, 1))
      data = sorted.concat(unsorted)

      await this.updateHeight(data)
    }
  }

  bubblesort = async (data) => {
    let didSwap = true

    while (didSwap) {
      didSwap = false

      for (let i = 0; i < data.length; ++i) {
        if (!this.state.isPlaying) return
        await this.playSound(data[i])
        await this.updateColors(i, "#FFFFFF")

        this.comparisons += 1
        if (i+1 < data.length && data[i] > data[i+1]) {
          if (!this.state.isPlaying) return
          await this.swap(data, i, i+1)
          await this.swapColors(i, i+1)
          didSwap = true
        }
      }
    }
    await this.updateHeight(data)
  }

  insertionsort = async (data) => {
    let i, j, cur

    for (i = 1; i < data.length; ++i) {
      if (!this.state.isPlaying) return
      
      cur = data[i]
      j = i - 1
      
      await this.playSound(data[i])
      await this.updateColors(i, "#FFFFFF")

      while (j >= 0 && data[j] > cur) {
        if (!this.state.isPlaying) return

        await this.playSound(data[j])
        await this.updateColors(j, "#FFFFFF")

        data[j + 1] = data[j]
        j -= 1
      }
      if (data[j + 1] !== cur) {
        if (!this.state.isPlaying) return
        data[j + 1] = cur
        await this.swapColors(j + 1, i)
      }
    }
    await this.updateHeight(data)
  }

  mergesort = async (data, startIndex, endIndex) => {
    await this.updateHeight(data)
    if (startIndex >= endIndex) return

    let middleIndex = startIndex + parseInt((endIndex - startIndex) / 2)
    
    await this.playSound(data[middleIndex])
    await this.updateMergeColors(startIndex, middleIndex, endIndex, "#FFFFFF")
    
    if (!this.state.isPlaying) return
    await this.mergesort(data, startIndex, middleIndex)
    await this.mergesort(data, middleIndex + 1, endIndex)
    await this.merge(data, startIndex, middleIndex, endIndex)
  }

  merge = async(data, startIndex, middleIndex, endIndex) => {
    // Store values in original list from left to mid - left + 1, and from mid + 1 to right in two temp subarrays 
    let leftSubArraySize = middleIndex - startIndex + 1
    let rightSubArraySize = endIndex - middleIndex

    let leftSubArray = new Array(leftSubArraySize)
    let rightSubArray = new Array(rightSubArraySize)
    
    for (let i = 0; i < leftSubArraySize; i++) {
      leftSubArray[i] = data[startIndex + i]
    }
    for (let i = 0; i < rightSubArraySize; i++) {
      rightSubArray[i] = data[middleIndex + 1 + i]
    }
    
    // Store indices of the two temp subarrays and the index of the merged array in variables
    let leftSubArrayIndex = 0
    let rightSubArrayIndex = 0
    let mergedArrayIndex = startIndex

    // Sort original list as temp subarrays merged with original list
    while (leftSubArrayIndex < leftSubArraySize && rightSubArrayIndex < rightSubArraySize) {
      if (!this.state.isPlaying) return
      if (leftSubArray[leftSubArrayIndex] < rightSubArray[rightSubArrayIndex]) {
        data[mergedArrayIndex] = leftSubArray[leftSubArrayIndex]
        ++leftSubArrayIndex
        await this.playSound(data[mergedArrayIndex])
        await this.swapColors(mergedArrayIndex, data.indexOf(leftSubArray[leftSubArrayIndex]))
        await this.updateHeight(data)
      } else {
        data[mergedArrayIndex] = rightSubArray[rightSubArrayIndex]
        ++rightSubArrayIndex
        await this.playSound(data[mergedArrayIndex])
        await this.swapColors(mergedArrayIndex, data.indexOf(rightSubArray[rightSubArrayIndex]))
        await this.updateHeight(data)
      }
      ++mergedArrayIndex
    }

    // Copy remaining elements of left & right subarray if they exist
    while (leftSubArrayIndex < leftSubArraySize) {
      data[mergedArrayIndex] = leftSubArray[leftSubArrayIndex]
      ++leftSubArrayIndex
      ++mergedArrayIndex
    }
    
    while (rightSubArrayIndex < rightSubArraySize) {
      data[mergedArrayIndex] = rightSubArray[rightSubArrayIndex]
      ++rightSubArrayIndex
      ++mergedArrayIndex
    }
  }

  render() {

    return (
      <React.Fragment>

        <div id="header">
          <div id="titleContainer">
            <p class="title" id="titleA">Sorting</p>
            <p class="title" id="titleB">Visualizer</p>  
          </div>
          <Navbar setCurrentAlgorithm={this.setCurrentAlgorithm} />
        </div>
   
        <div id="content">
          
          <InfoLeft alg={this.state.currentAlgorithm}/>
          
          <div id="animationWrapper">
            <div id="animation">
              {animate(this.state.maxBars, this.state.heights, this.state.colors, this.state.barThickness)}
            </div>
            
            <Taskbar 
            restartClick={this.restartClick} 
            playClick={this.playClick} 
            volumeHover={this.volumeHover} 
            volumeNotHover={this.volumeNotHover} 
            updateVolume={this.updateVolume} 
            openModal={this.openModal} />
          </div>

          <InfoRight 
          alg={this.state.currentAlgorithm} 
          comparisons={this.comparisons} 
          timeElapsed={this.state.isPlaying ? this.getTime() : this.pastTime} currentSpeed={this.state.currentSpeed} 
          currentTune={this.state.currentTune} 
          incrementSpeed={this.incrementSpeed} 
          decrementSpeed={this.decrementSpeed} 
          incrementTune={this.incrementTune} 
          decrementTune={this.decrementTune}
          updateBars={this.updateBars}
          maxBars={this.state.maxBars} />

          </div>
        
      </React.Fragment>
    );
  }
}

export default Home;