import React, { Component } from "react"
import "./Taskbar.css"

import playImage from '../imgs/playImage.png'
import restart from '../imgs/restartImage.png'
import volumeImage from '../imgs/volumeImage.png'
import fullscreenImage from "../imgs/fullscreenImage.png"

class Navigation extends Component {

    render() {
    return (
        <React.Fragment>

            <div id="taskbar">
                <div id="leftTaskbar" onMouseOver={() => this.props.volumeHover()} onMouseLeave={() => this.props.volumeNotHover()} >
                    <img class="taskbarChild" src={playImage} alt="Play" onClick={() => this.props.playClick()} />
                    <img class="taskbarChild" src={restart} alt="Restart" onClick={() => this.props.restartClick()} />
                    <img class="taskbarChild" src={volumeImage} alt="Volume" />
                    <div id="volumeContainer">
                        <input type="range" id="volume" min="0" max="20" onClick={() => this.props.updateVolume()}></input>
                    </div>
                </div>
                <div id="rightTaskbar">
                    <img class="taskbarChild" src={fullscreenImage} alt="Full screen" />
                </div>
            </div>
            
        </React.Fragment>
    )
    }
    }

    export default Navigation;