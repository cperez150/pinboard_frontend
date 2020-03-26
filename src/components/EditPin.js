import React, { Component } from "react";
import axios from "axios";
import "bulma/css/bulma.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class EditPin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      category: "",
      creator: "",
      img: "",
      showEdit: false,
      pin: this.props.pin
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleEditSubmit = this.handleEditSubmit.bind(this);
  }

  componentDidMount() {
    this.setState({
      title: this.props.pin.title,
      description: this.props.pin.description,
      category: this.props.pin.category,
      creator: this.props.pin.creator,
      img: this.props.pin.img
    });
  }

  handleOnChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  togglePopUp() {
    this.setState({
      showEdit: !this.state.showEdit
    });
  }
  async handleEditSubmit(event) {
    console.log("Clicked Submit");
    try {
      event.preventDefault();
      const url = `${this.props.baseURL}/pins/${this.props.pin.id}`;
      const reload = {
        title: this.state.title,
        description: this.state.description,
        img: this.state.img,
        creator: this.state.creator,
        category: this.state.category
      };
      const updatePin = await axios.put(url, reload);
      console.log(updatePin.pin);
      this.setState({
        title: this.state.title,
        description: this.state.description,
        img: this.state.img,
        creator: this.state.creator,
        category: this.state.category
      });
    } catch (err) {}
    this.setState({
      showEdit: false
    });
    this.props.getPins();
  }

  edit() {
    return (
      <div class="modal is-active">
        <div class="modal-background"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">Edit Pin</p>
            <Link to="/">
              <button class="delete" aria-label="close"></button>
            </Link>
          </header>
          <section class="modal-card-body">
            <form className="editPin" onSubmit={this.handleEditSubmit}>
              <div className="field">
                <label htmlFor="title">Pin Title:</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    id="title"
                    name="title"
                    onChange={this.handleOnChange}
                    value={this.state.title}
                    placeholder="Title"
                  />
                </div>
              </div>
              <div className="field">
                <label htmlFor="img">Image Url:</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    id="img"
                    name="img"
                    onChange={this.handleOnChange}
                    value={this.state.img}
                    placeholder="Image URL"
                  />
                </div>
              </div>
              <div className="field">
                <label htmlFor="description">Pin Details:</label>
                <textarea
                  className="input has-fixed-size"
                  type="text"
                  id="description"
                  name="description"
                  onChange={this.handleOnChange}
                  value={this.state.description}
                  placeholder="Pin details"
                  rows="10"
                ></textarea>
                {/* <div className="control">
          <input
            className="input"
            type="text"
            id="description"
            name="description"
            onChange={this.handleDescriptionChange}
            value={this.state.description}
            placeholder="Pin details"
          />
        </div> */}
              </div>
              <div className="field">
                <label htmlFor="category">Pin category:</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    id="category"
                    name="category"
                    onChange={this.handleOnChange}
                    value={this.state.category}
                    placeholder="Pin category"
                  />
                </div>
              </div>
              <div className="field">
                <label htmlFor="creator">Created By:</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    id="creator"
                    name="creator"
                    onChange={this.handleOnChange}
                    value={this.state.creator}
                    placeholder="First Initial, last name ex. JSmith"
                  />
                </div>
              </div>
              <footer className="modal-card-foot">
                <input
                  className="button is-success"
                  type="submit"
                  value="Save Changes"
                  onClick={<Link to="/"></Link>}
                />

                <button
                  className="button"
                  onClick={this.props.togglePopUp}
                  id="exitBtn"
                  onClick={<Link to="/"></Link>}
                >
                  Cancel
                </button>
              </footer>
            </form>
          </section>
        </div>
      </div>
    );
  }

  render() {
    const showEditPin = this.state.showEdit ? this.edit() : null;
    return (
      <div>
        <button
          className="button"
          onClick={() => {
            this.togglePopUp();
          }}
        >
          Edit pin
        </button>
        {showEditPin}
      </div>
    );
  }
}

export default EditPin;
