import React, { Component } from 'react';
import Match from './match';

export default class MatchHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matches: []
    };
  }

  componentDidMount() {
    this.setSummonerSpells();
    this.setRunes();
  }

  async setSummonerSpells() {
    const response = await fetch(
      `${this.props.dataDragonUrl}data/en_US/summoner.json`
    );
    const { data } = await response.json();
    this.setState({ summonerSpells: data });
  }

  async setRunes() {
    const response = await fetch(
      `${this.props.dataDragonUrl}data/en_US/runesReforged.json`
    );
    const data = await response.json();
    this.setState({ runes: data });
  }

  async componentDidUpdate(prevProps) {
    if (
      this.props.summonerId &&
      this.props.summonerId !== prevProps.summonerId
    ) {
      const response = await fetch(
        `/summoner/${this.props.summonerId}/matches`,
        {
          headers: {
            'X-Region': this.props.region
          }
        }
      );
      const matches = await response.json();
      this.setState({ matches });
    }
  }

  render() {
    if (this.props.summonerId) {
      return (
        <div className="row">
          {renderMatches(
            this.props.region,
            this.props.summonerId,
            this.state.matches,
            this.state.summonerSpells,
            this.state.runes,
            this.props.dataDragonUrl
          )}
        </div>
      );
    } else {
      return null;
    }
  }
}

function renderMatches(
  region,
  summonerId,
  matches,
  summonerSpells,
  runes,
  dataDragonUrl
) {
  if (matches && matches.length) {
    return matches.map(match => (
      <div className="row" key={match.gameId}>
        <Match
          region={region}
          summonerId={summonerId}
          match={match}
          summonerSpells={summonerSpells}
          runes={runes}
          dataDragonUrl={dataDragonUrl}
        />
      </div>
    ));
  } else {
    return null;
  }
}
