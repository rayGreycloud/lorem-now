import React, { Component } from 'react';
import axios from 'axios';

import Output from './components/Output';
import Select from './components/controls/Select';
import Text from './components/controls/Text';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paragraphs: 3,
      format: 'html',
      text: ''
    }
  }

  componentWillMount() {
    this.getLorem();
  }

  getLorem() {
    const { paragraphs, format } = this.state;
    const baseUrl = 'https://dinoipsum.herokuapp.com/api';

    axios.get(`${baseUrl}?format=${format}&paragraphs=${paragraphs}`)
      .then((response) => {
        this.setState({
          text: response.data
        }, function() {
          console.log(this.state);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  setFormat(format) {
    this.setState({ format }, this.getLorem);
  }

  changeParagraphs(paragraphs) {
    this.setState({ paragraphs }, this.getLorem);
  }

  render() {
    return (
      <div className="App container">
        <h2 className="text-center">Lorem Now - Dummy Text Generator</h2>
        <hr />
        <hr />
        <form className="form-inline">
          <div className="form-group">
            <label>Paragraphs:</label>
            <Text
              value={this.state.paragraphs}
              onChange={this.changeParagraphs.bind(this)}
            />
          </div>
          <div className="form-group">
            <label>Output format:</label>
            <Select
              value={this.state.format}
              onChange={this.setFormat.bind(this)}
            />
          </div>
        </form>
        <br />
        <br />
        <Output value={this.state.text}/>
      </div>
    );
  }
}

export default App;
