import React, { Component } from "react"
import "./Information.css"

class InfoLeft extends Component {

  constructor() {
    super()
    this.descriptions = {
      "quick" : "This Divide and Conquer algorithm picks an arbitrary element as a pivot, then compares elements around the pivot putting smaller elements on the left and larger on the right. The process is repeated recursively until finished",
      "selection" : "Slow and inept, the algorithm repeatedly loops through a list to find the smallest element then shifts it to the front.",
      "bubble" : "Simple and sometimes referred to as sinking sort because it slowly shifts smaller values forwards as it repetitively loops through a list.",
      "insertion" : "Simple algorithm that builds its sorted portion as it goes through the entire list, shifting all larger items when a smaller value is found.",
      "merge" : "A Divide and Conquer algorithm that divides data in half calling itself recursively until the size of each portion is 1, then merges each portion together in order. "
    }
    this.histories = {
      "quick" : "Created by British computer scientist Tony Hoare in 1959 while visiting Moscow State University. Initially, he thought the algorithm was too simple to publish but finally got around to it in 1961.",
      "selection" : "Supposedly created by Oscar Wilde, though there is little documentation behind its origins. The algorithm is so simple that it has almost surely been used since before 480 B.C.",
      "bubble" : "Performs poorly compared to even insertion sort, yet favored in computer graphics. Useful when finding small error, or when most data is already sorted.",
      "insertion" : "Often compared to the way people sort decks of cards, making it difficult to place a name on a singular creator.",
      "merge" : "Created in 1945 by polymath John von Neumann, rumored to be discovered while playing cards. The Hungarian-American computer scientist was also known for being a mathematician, physicist, and engineer."
    }
  }

  render() {

    return (
    <React.Fragment>
        <div class="info">
          <div id="infoLeft">
            <div id="desc" class="infoCategory">
              <p class="infoTitle">DESCRIPTION</p>
              <p class="infoDesc">{this.descriptions[this.props.alg]}</p>
            </div>
            <div class="infoCategory">
              <p class="infoTitle">HISTORY</p>
              <p class="infoDesc">{this.histories[this.props.alg]}</p>
            </div>
          </div>
        </div>
    </React.Fragment>
    )
  }
}

export default InfoLeft;