import React from "react"
import Modal from 'react-modal';

import backArrowImage from "../imgs/backArrowImage.png"

import "./Modals.css"

const modalStyles = {
    overlay: {
        background: "rgba(255, 255, 255, 0)"
    },
    content: {
        top: '75%',
        left: '60%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        background: "#161616",
        color: "black",
        position: "fixed",
        border: "none",
        padding: "1vw",
    }
}  

function settingsModal(showModal, closeModal, setModal, currentSpeed) { 
    return (
        <Modal
            isOpen={showModal}
            style={modalStyles}
            onRequestClose={closeModal}
        >

            <div id="modalContents">
            <div id="modalSpeed">
                <label class="modalLabel" onClick={() => setModal("speed")}>Speed</label>
                <button class="modalButton" onClick={() => setModal("speed")}>{currentSpeed}</button>
            </div>
            <div id="modalTune">
                <label class="modalLabel">Tune</label>
                <button class="modalButton">FMSynth</button>
            </div>
            </div>
        </Modal>
    )
}

function speedModal(showModal, closeModal, setModal, setSpeed) {
    return (
        <Modal
            isOpen={showModal}
            style={modalStyles}
            onRequestClose={closeModal}
        >

            <div id="speedModalContents">
                <div id="speedModalTop">
                    <img id="speedModalBack" src={backArrowImage} alt="Back arrow" onClick={() => setModal("general")} />
                    <label id="speedModalLabel" onClick={() => setModal("general")}>Speed</label>
                </div>
                <div id="speedModalBottom">
                    <button class="speedModalButton" onClick={() => setSpeed("fast")}>Fast</button>
                    <button class="speedModalButton" onClick={() => setSpeed("medium")}>Medium</button>
                    <button class="speedModalButton" onClick={() => setSpeed("slow")}>Slow</button>
                </div>
            </div>
        </Modal>
    )
}

function toneModal(showModal, closeModal, setModal) {
    return (
        <Modal
            isOpen={showModal}
            style={modalStyles}
            onRequestClose={closeModal}
        >

            <div id="toneModalContents">

            </div>
        </Modal>
    )
}

export { settingsModal, speedModal }