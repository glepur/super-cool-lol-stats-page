'use strict';

require('dotenv').config();
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const LeagueJs = require('leaguejs');
const leagueJs = new LeagueJs(process.env.LEAGUE_API_KEY, {
  PLATFORM_ID: process.env.LEAGUE_API_PLATFORM_ID
});
const matchService = require('./match');

app.use(bodyParser.json());

app.get('/summoner', async (req, res, next) => {
  try {
    const name = req.query.name;
    const region = req.headers['x-region'];
    const summoner = await leagueJs.Summoner.gettingByName(name, region);
    res.json(summoner);
  } catch (e) {
    next(e);
  }
});

app.get('/summoner/:accountId/matches', async (req, res, next) => {
  try {
    const { accountId } = req.params;
    const region = req.headers['x-region'];
    const { matches } = await leagueJs.Match.gettingListByAccount(
      accountId,
      region,
      {
        beginIndex: 0,
        endIndex: 10
      }
    );
    if (matches && matches.length) {
      res.json(matches);
    } else {
      res.status(404).json({ message: 'No matches found' });
    }
  } catch (e) {
    next(e);
  }
});

app.get('/summoner/:accountId/matches/:matchId', async (req, res, next) => {
  const { accountId, matchId } = req.params;
  const region = req.headers['x-region'];
  const match = await leagueJs.Match.gettingById(matchId, region);
  if (match && match.gameId) {
    const matchData = matchService.getMatchData(match, accountId);
    res.json(matchData);
  } else {
    res.status(404).json({ message: 'Match not found' });
  }
});

app.use(express.static(path.normalize(__dirname + '/../client/')));

app.get('*', (req, res, next) => {
  res.sendFile(path.normalize(__dirname + '/../client/index.html'));
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.statusCode).json({ error: err.message });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
