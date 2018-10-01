import React, { Component } from 'react';
import { render } from 'react-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.summonerName = '';
  }
  handleSummonerNameChange(e) {
    this.summonerName = e.target.value;
  }
  submitSummonerName() {
    fetch(`/summoner/?name=${this.summonerName}`)
      .then(response => response.json())
      .then(data => this.setState({ summoner: data }));
  }
  render() {
    return (
      <div className="row">
        <div className="col-12">
          <div className="mt text-center">
            <h1>League of Legends stats page</h1>
          </div>
        </div>
        <div className="col-12">
          <div className="form-group row justify-content-center">
            <label
              htmlFor="example-text-input"
              className="col-2 col-form-label"
            >
              Summoner name:
            </label>
            <div className="col-4">
              <input
                className="form-control"
                type="text"
                id="example-text-input"
                onChange={this.handleSummonerNameChange.bind(this)}
              />
            </div>
            <div className="col-2">
              <button
                className="btn btn-primary"
                onClick={this.submitSummonerName.bind(this)}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
        {this.state && JSON.stringify(this.state.summoner)}
      </div>
    );
  }
}

render(<App />, document.getElementById('content'));
