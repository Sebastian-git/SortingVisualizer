import React from "react"
import Modal from 'react-modal';

import backArrowImage from "../imgs/backArrowImage.png"

import "./Modals.css"

const modalStyles = {
    overlay: {
        background: "rgba(255, 255, 255, 0)"
    },
    content: {
        top: '64vh',
        left: '68vw',
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

function settingsModal(showModal, closeModal, setModal, currentSpeed, currentTune) { 
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
                <label class="modalLabel" onClick={() => setModal("tune")}>Tune</label>
                <button class="modalButton" onClick={() => setModal("tune")}>{currentTune}</button>
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
                    <label id="nestedModalLabel" onClick={() => setModal("general")}>Speed</label>
                </div>
                <div id="speedModalBottom">
                    <button class="nestedModalButton" onClick={() => setSpeed("fast")}>Fast</button>
                    <button class="nestedModalButton" onClick={() => setSpeed("medium")}>Medium</button>
                    <button class="nestedModalButton" onClick={() => setSpeed("slow")}>Slow</button>
                </div>
            </div>
        </Modal>
    )
}

function tuneModal(showModal, closeModal, setModal, setTune) {
    return (
        <Modal
            isOpen={showModal}
            style={modalStyles}
            onRequestClose={closeModal}
        >

            <div id="tuneModalContents">
                <div id="speedModalTop">
                        <img id="speedModalBack" src={backArrowImage} alt="Back arrow" onClick={() => setModal("general")} />
                        <label id="nestedModalLabel" onClick={() => setModal("general")}>Tune</label>
                    </div>
                    <div id="speedModalBottom">
                        <button class="nestedModalButton" onClick={() => setTune("AMSynth")}>AMSynth</button>
                        <button class="nestedModalButton" onClick={() => setTune("FMSynth")}>FMSynth</button>
                        <button class="nestedModalButton" onClick={() => setTune("MonoSynth")}>MonoSynth</button>
                        <button class="nestedModalButton" onClick={() => setTune("MembraneSynth")}>MembraneSynth</button>
                    </div>
            </div>
        </Modal>
    )
}

export { settingsModal, speedModal, tuneModal }