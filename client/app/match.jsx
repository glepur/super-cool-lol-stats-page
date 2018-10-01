import React, { Component } from 'react';
import moment from 'moment';
import { get } from 'https';

export default class Match extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matchDetails: null
    };
  }

  componentDidMount() {
    this.getMatchAndSetState({});
  }

  componentDidUpdate(oldProps) {
    this.getMatchAndSetState(oldProps);
  }

  async getMatchAndSetState(oldProps) {
    if (
      this.props.summonerId &&
      this.props.match &&
      this.props.match.gameId &&
      oldProps.match !== this.props.match
    ) {
      const response = await fetch(
        `/summoner/${this.props.summonerId}/matches/${this.props.match.gameId}`
      );
      const match = await response.json();
      this.setState({ matchDetails: match });
    }
  }

  render() {
    const match = this.state.matchDetails;
    if (!match) {
      return null;
    }
    const summonerSpell1 = getSummonerSpell(
      this.props.summonerSpells,
      match.summonerSpell1Id
    );
    const summonerSpell1Url = getSummonerSpellUrl(
      summonerSpell1,
      this.props.dataDragonUrl
    );
    const summonerSpell2 = getSummonerSpell(
      this.props.summonerSpells,
      match.summonerSpell2Id
    );
    const summonerSpell2Url = getSummonerSpellUrl(
      summonerSpell2,
      this.props.dataDragonUrl
    );

    if (this.state.matchDetails) {
      return (
        <div className="col-12">
          <table className="table table-bordered">
            <tbody>
              <tr>
                <td>
                  {match.win ? (
                    <b className="text-success">Win</b>
                  ) : (
                    <b className="text-danger">Lose</b>
                  )}
                  <br />
                  {convertSecondsToReadable(match.duration)}
                </td>
                <td>{moment(this.props.match.timestamp).fromNow()}</td>
                <td>
                  Summoner spells:
                  <br />
                  <img
                    src={summonerSpell1Url}
                    alt="SummonerSpell1"
                    width="40"
                    height="40"
                  />
                  <img
                    src={summonerSpell2Url}
                    alt="SummonerSpell2"
                    width="40"
                    height="40"
                  />
                </td>
                <td>
                  Runes:
                  <br />
                  <img
                    src={getRuneUrl(this.props.runes, match.primaryRuneStyle)}
                    alt="SummonerSpell1"
                    width="40"
                    height="40"
                  />
                  <img
                    src={getRuneUrl(this.props.runes, match.secondaryRuneStyle)}
                    alt="SummonerSpell2"
                    width="40"
                    height="40"
                  />
                </td>
                <td>
                  <b>
                    {match.kills} /{' '}
                    <span className="text-danger">{match.kills}</span> /{' '}
                    {match.assists}
                  </b>
                </td>
                <td>
                  Level:
                  <br />
                  {match.champLevel}
                </td>
                <td>
                  Total creep score: {match.totalMinionsKilled}
                  <br />
                  Creep score per minute: {getCreepScorePerMinute(match)}
                </td>
                <td>
                  {renderItemImages(match.items, this.props.dataDragonUrl)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    } else {
      return null;
    }
  }
}

function convertSecondsToReadable(seconds) {
  return moment('2015-01-01')
    .startOf('day')
    .seconds(seconds)
    .format('H:mm:ss');
}

function getSummonerSpell(summonerSpells, id) {
  if (!summonerSpells) {
    return null;
  }
  for (let key in summonerSpells) {
    if (+summonerSpells[key].key === id) {
      return summonerSpells[key];
    }
  }
}

function getSummonerSpellUrl(summonerSpell, dataDragonUrl) {
  return `${dataDragonUrl}img/spell/${summonerSpell.id}.png`;
}

function getRuneUrl(runes, id) {
  if (!runes) {
    return null;
  }
  const rune = runes.find(rune => rune.id === id);
  return `https://ddragon.leagueoflegends.com/cdn/img/${rune.icon}`;
}

function getItemUrl(id, dataDragonUrl) {
  return `${dataDragonUrl}img/item/${id}.png`;
}

function getCreepScorePerMinute(match) {
  const cspm = (match.totalMinionsKilled / match.duration) * 60;
  return cspm.toFixed(2);
}

function renderItemImages(items, dataDragonUrl) {
  return items.map((item, index) => {
    return (
      <img
        key={index}
        width="40"
        height="40"
        src={getItemUrl(item, dataDragonUrl)}
      />
    );
  });
}
