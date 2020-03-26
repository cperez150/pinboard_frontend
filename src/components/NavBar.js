import React, { Component } from "react";

class NavBar extends Component {
  render() {
    return (
      <div class="tabs is-centered">
        <ul>
          <li class="is-active">
            <button onClick={this.props.getTravelPins}>Travel</button>
          </li>
          <li>
            <a>Photography</a>
          </li>
          <li>
            <a>DIY</a>
          </li>
          <li>
            <a>Books</a>
          </li>
          <li>
            <a>Weddings</a>
          </li>
          <li>
            <a>Home</a>
          </li>
        </ul>
      </div>
    );
  }
}

export default NavBar;
