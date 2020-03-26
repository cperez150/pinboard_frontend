import React from "react";
import Pins from "./components/Pins";
import NewPin from "./components/NewPin";
import "bulma/css/bulma.css";
import "./App.css";
import axios from "axios";
import { BrowserRouter as Router } from "react-router-dom";
import { DropTarget } from "react-drag-drop-container";

//ICONS
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
const trashIcon = <FontAwesomeIcon icon={faTrashAlt} size="2x" />;

//URL
let baseURL = process.env.REACT_APP_BASEURL;
if (process.env.NODE_ENV === "development") {
  baseURL = "http://localhost:3001";
} else {
  baseURL = "https://sleepy-harbor-02264.herokuapp.com";
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pins: [],
      filtered: [],
      results: [],
      showNew: false,
      closePinsWindow: false,
      titleDiv: false
    };
    this.togglePopUp = this.togglePopUp.bind(this);
    this.handleNewPin = this.handleNewPin.bind(this);
    this.handleDeleteonDrop = this.handleDeleteonDrop.bind(this);
    this.getPins = this.getPins.bind(this);
    this.getFilteredPins = this.getFilteredPins.bind(this);
    this.toggleTitleDiv = this.toggleTitleDiv.bind(this);
    this.toggleTitleclearDiv = this.toggleTitleclearDiv.bind(this);
  }

  handleNewPin(NewPin) {
    console.log(NewPin);
    this.setState({
      pins: [NewPin, ...this.state.pins]
    });
  }

  componentDidMount() {
    this.getPins();
    this.getFilteredPins();
  }

  togglePopUp() {
    this.setState({
      showNew: !this.state.showNew,
      closePinsWindow: !this.state.closePinsWindow
    });
  }

  async getPins() {
    const response = await axios.get(`${baseURL}/pins`);
    const data = response.data;
    this.setState({
      pins: data
    });
    console.log(data);
  }

  async handleDeleteonDrop(event, pin) {
    const pinId = pin.id;
    console.log(pinId);
    await axios.delete(`${baseURL}/pins/${pinId}`);
    this.getPins();
  }

  // //GET FILTERED PINS FOR TRAVEL
  async getFilteredPins(categoryName, description) {
    console.log("clicked");
    const response = await axios.get(`${baseURL}/pins`);
    const data = response.data;
    console.log("data for filtered pins");
    this.setState({
      filtered: [],
      results: data,
      name: "",
      description: ""
    });
    console.log(this.state.results);

    const name = categoryName;
    const titledescrpt = description;

    this.state.results.forEach(result => {
      if (result.category.toLowerCase() === name) {
        this.state.filtered.push(result);
        this.setState({
          pins: this.state.filtered
        });
      }
    });
    this.setState({
      name: name,
      description: titledescrpt
    });
  }

  toggleTitleDiv() {
    this.setState({ titleDiv: true });
  }
  toggleTitleclearDiv() {
    this.setState({ titleDiv: false });
  }

  render() {
    return (
      <Router>
        <div className="App">
          <header className="sticky">
            <div className="parentHome">
              <img
                className="logo child1"
                alt="logo"
                src="/images/pinItLogo.png"
              ></img>
              <div className="child2">
                {this.state.showNew ? (
                  <div className="modal is-active">
                    <div className="modal-background"></div>
                    <div className="modal-card">
                      <header className="modal-card-head">
                        <p className="modal-card-title">New Pin</p>
                        <button
                          className="delete"
                          onClick={this.togglePopUp}
                          aria-label="close"
                        ></button>
                      </header>
                      <section className="modal-card-body">
                        <NewPin
                          handleNewPin={this.handleNewPin}
                          togglePopUp={this.togglePopUp}
                          baseURL={baseURL}
                        />
                      </section>
                    </div>
                  </div>
                ) : null}
                <button
                  style={{ fontWeight: "700" }}
                  className="button is-normal addPinbtn"
                  onClick={this.togglePopUp}
                >
                  Create Pin
                </button>
              </div>
              <div className="child3">
                <DropTarget
                  baseURL={baseURL}
                  className="trashIcon"
                  targetKey="trash"
                >
                  {trashIcon}
                </DropTarget>
              </div>
            </div>
            {/* </div> */}
            <div className="tabs is-centered buttons is-normal">
              <ul>
                <li className="is-active">
                  <button
                    className="button is-white is-focused"
                    id="travel"
                    onClick={() => {
                      this.getFilteredPins(
                        "travel",
                        "trav·el /ˈtravəl/ verb 1.make a journey, typically of some length or abroad."
                      );
                      this.toggleTitleDiv();
                    }}
                  >
                    Travel
                  </button>
                </li>
                <li>
                  <button
                    className="button is-white is-focused"
                    id="Photography"
                    onClick={() => {
                      this.getFilteredPins(
                        "photography",
                        "pho·tog·ra·phy /fəˈtäɡrəfē/ noun/ the art or practice of taking and processing photographs."
                      );
                      this.toggleTitleDiv();
                    }}
                  >
                    Photography
                  </button>
                </li>
                <li>
                  <button
                    className="button is-white is-focused"
                    id="DIY"
                    onClick={() => {
                      this.getFilteredPins(
                        "diy",
                        "diy /ˌdē ī ˈwī/ noun the activity of decorating, building, and making repairs at home by oneself rather than employing a professional."
                      );
                      this.toggleTitleDiv();
                    }}
                  >
                    DIY
                  </button>
                </li>
                <li>
                  <button
                    className="button is-white is-focused"
                    id="Books"
                    onClick={() => {
                      this.getFilteredPins(
                        "books",
                        "book /bo͝ok/ noun/ 1. a written or printed work consisting of pages glued or sewn together along one side and bound in covers."
                      );
                      this.toggleTitleDiv();
                    }}
                  >
                    Books
                  </button>
                </li>
                <li>
                  <button
                    className="button is-white is-focused"
                    id="Weddings"
                    onClick={() => {
                      this.getFilteredPins(
                        "weddings",
                        "wed·ding /ˈwediNG/ noun a marriage ceremony, especially considered as including the associated celebrations."
                      );
                      this.toggleTitleDiv();
                    }}
                  >
                    Weddings
                  </button>
                </li>
                <li>
                  <button
                    className="button is-white is-focused"
                    id="home"
                    onClick={() => {
                      this.getFilteredPins(
                        "home",
                        "home /hōm/ noun / 1. a place where one's heart is."
                      );
                      this.toggleTitleDiv();
                    }}
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button
                    className="button is-white is-focused"
                    id="Cooking"
                    onClick={() => {
                      this.getFilteredPins(
                        "cooking",
                        "cook·ing /ˈko͝okiNG/ noun/ the practice or skill of preparing food by combining, mixing, and heating ingredients."
                      );
                      this.toggleTitleDiv();
                    }}
                  >
                    Cooking
                  </button>
                </li>
                <li>
                  <button
                    className="button is-white is-focused"
                    style={{ fontWeight: "700" }}
                    onClick={() => {
                      this.getPins();
                      this.toggleTitleclearDiv();
                    }}
                  >
                    All Pins
                  </button>
                </li>
              </ul>
            </div>
          </header>

          {this.state.titleDiv ? (
            <section class="hero is-light is-bold">
              <div class="hero-body">
                <div class="container">
                  <h1 class="title" style={{ textTransform: "uppercase" }}>
                    {this.state.name}
                  </h1>
                  <h4>{this.state.description}</h4>
                </div>
              </div>
            </section>
          ) : null}
          {this.state.closePinsWindow ? null : (
            <div>
              <Pins
                pins={this.state.pins}
                handleDeleteonDrop={this.handleDeleteonDrop}
                getPins={this.getPins}
                baseURL={baseURL}
              />
            </div>
          )}
          <footer className="footer">
            <div className="content has-text-centered">
              <p className="websiteCreator">
                Project Site Created By C.Perez 2019
              </p>
            </div>
          </footer>
        </div>
      </Router>
    );
  }
}

export default App;
