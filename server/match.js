exports.getMatchData = (match, accountId) => {
  const { participantId } = getParticipantIdentity(match, accountId);
  const participant = getParticipant(match, participantId);
  const output = {
    duration: match.gameDuration,
    win: participant.stats.win,
    summonerSpell1Id: participant.spell1Id,
    summonerSpell2Id: participant.spell2Id,
    primaryRuneStyle: participant.stats.perkPrimaryStyle,
    secondaryRuneStyle: participant.stats.perkSubStyle,
    kills: participant.stats.kills,
    deaths: participant.stats.deaths,
    assists: participant.stats.assists,
    items: [
      participant.stats.item0,
      participant.stats.item1,
      participant.stats.item2,
      participant.stats.item3,
      participant.stats.item4,
      participant.stats.item5,
      participant.stats.item6
    ],
    champId: participant.championId,
    champLevel: participant.stats.champLevel,
    totalMinionsKilled: participant.stats.totalMinionsKilled
  };
  return output;
};

function getParticipantIdentity(match, accountId) {
  return match.participantIdentities.find(
    identity => identity.player.currentAccountId === +accountId
  );
}

function getParticipant(match, participantId) {
  return match.participants.find(
    participant => participant.participantId === +participantId
  );
}
