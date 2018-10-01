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

app.get('/', (req, res) => {
  res.json({ status: 'OK' });
});

app.get('/summoner', async (req, res) => {
  const name = req.query.name;
  const summoner = await leagueJs.Summoner.gettingByName(name);
  res.json({ summoner });
});

app.use((err, req, res, next) => {
  console.log(err);
  res.json({ error: err.message });
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));
