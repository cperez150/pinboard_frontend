import React, { Component } from "react";
import "bulma/css/bulma.css";
import EditPin from "./EditPin";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Facebook, Twitter, Tumblr } from "react-sharingbuttons";
import "react-sharingbuttons/dist/main.css";
//ICONS
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbtack } from "@fortawesome/free-solid-svg-icons";
const pinIcon = <FontAwesomeIcon icon={faThumbtack} rotation={270} />;

class ShowPin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      togglePopUp: true
    };
    this.updateWindow = this.updateWindow.bind(this);
  }

  updateWindow() {
    console.log("this was clicked");
    this.setState({
      togglePopUp: !this.state.togglePopUp
    });
  }

  render() {
    const sharingButtons = () => {
      const url = "/pins";
      const shareText = "Check this site out---> www.pinIt.surge.sh";

      return (
        <div>
          <Facebook url={url} />
          <Twitter url={url} shareText={shareText} />
          <Tumblr url={url} />
        </div>
      );
    };
    let className = "modal";
    className += this.state.togglePopUp === true ? " is-active" : null;
    return (
      <div className={className}>
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">
              <strong>{this.props.pin.title.toUpperCase()}</strong>
            </p>
            <Link to="/">
              <button className="delete" aria-label="close"></button>
            </Link>
          </header>
          <section className="modal-card-body">
            <div className="pinInfo">
              <img
                className="imgPinDetails"
                src={this.props.pin.img}
                alt="pinImage"
              ></img>
              <p>{this.props.pin.description}</p>
              <br />
              <div className="parentShowPin">
                <div className="childShowPin1">
                  <p style={{ fontSize: "11px" }}>
                    category: {this.props.pin.category.toLowerCase()}
                  </p>
                </div>
                <div className="childShowPin1">
                  <p style={{ fontSize: "11px" }}>
                    {pinIcon} created by: {this.props.pin.creator.toLowerCase()}{" "}
                  </p>
                </div>
              </div>
            </div>
            <br />
            <div style={{ textAlign: "center" }}>{sharingButtons()}</div>
          </section>
          <footer className="modal-card-foot">
            <div
            // onClick={() => {
            //   this.updateWindow();
            // }}
            >
              <EditPin
                pin={this.props.pin}
                getPins={this.props.getPins}
                update={this.props.update}
                base={this.props.baseURL}
              />
            </div>
            <Link to="/">
              <button className="button">Cancel</button>
            </Link>
            <div className="showPin"></div>
          </footer>
        </div>
      </div>
    );
  }
}

export default ShowPin;
