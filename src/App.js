import React, { Component } from 'react';
import axios from 'axios';

import Output from './components/Output';
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

  render() {
    return (
      <div className="App">
        <Output value={this.state.text}/>
      </div>
    );
  }
}

export default App;
