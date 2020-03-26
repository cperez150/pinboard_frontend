import React, { Component } from "react";
import "../App.css";
import Masonry from "react-masonry-css";
import ShowPin from "./ShowPin";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { DragDropContainer } from "react-drag-drop-container";

const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1
};

class Pins extends Component {
  render() {
    return (
      <Router>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {this.props.pins.map(pin => {
            return (
              <DragDropContainer
                targetKey="trash"
                onDrop={event => {
                  this.props.handleDeleteonDrop(event, pin);
                }}
                key={pin.id}
              >
                <div className="pinCard" key={pin.id} id={pin.id}>
                  <Link to={`/pins/${pin.id}`}>
                    <div className="pinImage">
                      <img key={pin.id} src={pin.img} alt="pinImage"></img>
                    </div>
                  </Link>
                  <Route
                    path={`/pins/${pin.id}`}
                    render={props => (
                      <ShowPin
                        {...props}
                        pin={pin}
                        getPins={this.props.getPins}
                        baseURL={this.props.baseURL}
                      />
                    )}
                  />
                </div>
              </DragDropContainer>
            );
          })}
        </Masonry>
      </Router>
    );
  }
}

export default Pins;
