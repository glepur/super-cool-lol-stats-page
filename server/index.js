'use strict';

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const LeagueJs = require('leaguejs');
const leagueJs = new LeagueJs(process.env.LEAGUE_API_KEY, {
  PLATFORM_ID: process.env.LEAGUE_API_PLATFORM_ID
});

app.use(bodyParser.json());

app.get('/summoner', async (req, res, next) => {
  try {
    const name = req.query.name;
    const summoner = await leagueJs.Summoner.gettingByName(name);
    res.json(summoner);
  } catch (e) {
    next(e);
  }
});

app.get('/summoner/:accountId/matches', async (req, res) => {
  try {
    const { accountId } = req.params;
    const { matches } = await leagueJs.Match.gettingListByAccount(
      accountId,
      null,
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

app.get('/summoner/:accountId/matches/:matchId', async (req, res) => {
  const { accountId, matchId } = req.params;
  const match = await leagueJs.Match.gettingById(matchId);
  if (match && match.gameId) {
    const { participantId } = match.participantIdentities.find(
      identity => identity.player.currentAccountId === +accountId
    );
    const participant = match.participants.find(
      participant => participant.participantId === +participantId
    );
    res.json(participant.stats);
  } else {
    res.status(404).json({ message: 'Match not found' });
  }
});

app.get('/', (req, res) => {
  res.json({ status: 'OK' });
});

app.use((err, req, res, next) => {
  console.log(err);
  res.json({ error: err.message });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
