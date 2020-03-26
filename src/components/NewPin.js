import React, { Component } from "react";
import axios from "axios";
import "bulma/css/bulma.css";

class NewPin extends Component {
  constructor() {
    super();
    this.state = {
      img: "",
      description: "",
      title: "",
      creator: "",
      category: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleImgChange = this.handleImgChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleCreatorChange = this.handleCreatorChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
  }

  handleTitleChange(event) {
    this.setState({ title: event.currentTarget.value });
  }
  handleImgChange(event) {
    this.setState({ img: event.currentTarget.value });
  }
  handleDescriptionChange(event) {
    this.setState({ description: event.currentTarget.value });
  }
  handleCategoryChange(event) {
    this.setState({ category: event.currentTarget.value });
  }
  handleCreatorChange(event) {
    this.setState({ creator: event.currentTarget.value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const response = await axios.post(`${this.props.baseURL}/pins`, {
      title: this.state.title,
      img: this.state.img,
      description: this.state.description,
      creator: this.state.creator,
      category: this.state.category
    });
    this.setState({
      img: "",
      description: "",
      title: "",
      creator: "",
      category: ""
    });
    this.props.handleNewPin(response.data);
    window.location.reload(false);
    this.props.togglePopUp();
  }

  render() {
    return (
      <div>
        <form className="addNewPin" onSubmit={this.handleSubmit}>
          <div className="field">
            <label htmlFor="title">Pin Title:</label>
            <div className="control">
              <input
                className="input"
                type="text"
                id="title"
                name="title"
                onChange={this.handleTitleChange}
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
                onChange={this.handleImgChange}
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
              onChange={this.handleDescriptionChange}
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
                onChange={this.handleCategoryChange}
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
                onChange={this.handleCreatorChange}
                value={this.state.cretor}
                placeholder="First Initial, last name ex. JSmith"
              />
            </div>
          </div>
          <footer className="modal-card-foot">
            <input
              className="button is-success"
              type="submit"
              value="Add Pin"
            />
            <button
              className="button"
              onClick={this.props.togglePopUp}
              id="exitBtn"
            >
              Cancel
            </button>
          </footer>
        </form>
      </div>
    );
  }
}

export default NewPin;
