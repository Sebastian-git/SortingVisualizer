import React from "react"
import "./Navigation.css"

function Navigation() {
  return (
    <React.Fragment>

      <div id="navbar">
        <button class="navbarComponent">Quick</button>
        <button class="navbarComponent">Selection</button>
        <button class="navbarComponent">Bubble</button>
        <button class="navbarComponent">Insertion</button>
        <button class="navbarComponent">Merge</button>
      </div>

    </React.Fragment>
  );
}

export default Navigation;