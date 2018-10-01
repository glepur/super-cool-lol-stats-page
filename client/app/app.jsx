import React, { Component } from 'react';
import { render } from 'react-dom';
import SummonerSearchForm from './summoner-search-form';
import SummonerInfo from './summoner-info';
import MatchHistory from './match-history';

const dataDragonUrl = 'https://ddragon.leagueoflegends.com/cdn/8.19.1/';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleSummonerNameChange = this.handleSummonerNameChange.bind(this);
    this.handleRegionChange = this.handleRegionChange.bind(this);
    this.submitSummonerName = this.submitSummonerName.bind(this);
    this.summonerName = '';
    this.region = 'na1';
    this.state = {};
  }

  handleSummonerNameChange(e) {
    this.summonerName = e.target.value;
  }

  handleRegionChange(e) {
    this.region = e.target.value;
  }

  async submitSummonerName(e) {
    e.preventDefault();
    const response = await fetch(`/summoner/?name=${this.summonerName}`, {
      headers: {
        'X-Region': this.region
      }
    });
    const data = await response.json();
    this.setState({ summoner: data });
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
          <SummonerSearchForm
            onNameChange={this.handleSummonerNameChange}
            onRegionChange={this.handleRegionChange}
            onSubmit={this.submitSummonerName}
          />
        </div>
        <div className="col-12">
          <SummonerInfo
            dataDragonUrl={dataDragonUrl}
            summoner={this.state.summoner}
          />
        </div>
        <div className="col-12">
          <MatchHistory
            region={this.region}
            dataDragonUrl={dataDragonUrl}
            summonerId={this.state.summoner && this.state.summoner.accountId}
          />
        </div>
      </div>
    );
  }
}

render(<App />, document.getElementById('content'));
