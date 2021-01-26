import React, { Component } from 'react';
import '../styles/App.css';

/**
 * InputForm component 
 */
class InputForm extends Component {

  state = {
    value: ""
  };

  /**
   * Handler to perform changes of <input> value
   * @param {Object} event 
   */
  handleChange = (event) => {
    this.setState({ value: event.target.value });
  };

  /**
   * Method to handle submition of the fom
   * @param {Object} event 
   */
  onFormSubmit = (event) => {
    event.preventDefault();
    this.props.handleSearch(this.state.value);
    this.setState({ value: "" });
  };

  /**
   * Render method
   */
  render() {
    return (
      <form id="search" className="search" onSubmit={this.onFormSubmit}>
        <input type="search"
          placeholder="Search for a title..."
          value={this.state.value}
          onChange={this.handleChange} />
      </form>
    );
  }
}

export default InputForm;