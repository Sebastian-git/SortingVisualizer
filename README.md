
Website is deployed live at https://visualsorting-424ef.web.app/ and a decorated readme is in progress.

# <a name="title" /> Sorting Visualizer

## Introduction
The following website will explain sorting algorithms using visual and auditorial aids. This project was inspired by the content from the YouTube channel [Timo Bingmann](https://www.youtube.com/c/TimoBingmann/videos). I hope this website can help simplify the process of understanding sorting algorithms for future students.

"An algorithm must be seen to be believed." - Donald Knuth

## Usage

#### Setup

1 - Clone the master repository (```git clone https://github.com/Sebastian-git/VisualSorting.git```) <br>
2 - Install Node.js [here](https://nodejs.org/en/download/) <br>
3 - Open up your cloned repository's directory and type ``` npm install ``` to download all dependencies <br>

#### Previews

#### Technical Information

This project was made primarily using [React](https://reactjs.org/), [Three.js](https://threejs.org/), and [Tone.js](https://tonejs.github.io/). The code is split into two main sections: Pages and Components. Currently the only page is Home.js, filled with functions and states keeping track of different settings along with all the algorithms. There are individual components for the taskbar, navigation bar, and one for each side of the information displayed on the screen.

I believe the two most important functions of this program are the ones that play the sound and update the colors, both located inside Home.js.

The function .playSound() takes the distance of the current bar from the start as a parameter. It pauses the program for however long the soundEffectDelay state specifies, then plays the note using Tone.js's .triggerAttackRelease() method.

```js
playSound = async (distance) => {
    await new Promise(r => setTimeout(r, this.state.soundEffectDelay));
    this.state.tune.triggerRelease()
    let note = this.state.audioNoteCombinations[this.state.audioNoteCombinationStart - distance]
    
    this.state.tune.triggerAttackRelease(note, this.state.soundEffectDelay);
  }
```

The function .updateColors() takes the index of the element inside the list, and the color it should be switched to. It then updates a state which contains a list of each bar's colors, waits for however long the transitionDelay state specifies, then switches the list of colors back to its original state.
```js
  updateColors = async (index, newColor) => {
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
```



## Launch
JavaScript 1.7 <br>

## Status: 

In Progress

#### [back to the top](#title)
