import React, { Component } from 'react';

export default function SummonerInfo(props) {
  if (props.summoner) {
    return props.summoner.name ? summonerFound(props) : summonerNotFound();
  } else {
    return null;
  }
}

function summonerFound(props) {
  return (
    <div className="row mb-2">
      <img
        width="100"
        height="100"
        src={getProfileImageUrl(props.dataDragonUrl, props.summoner)}
        alt="Profile Image"
      />
      <h2 className="ml-2">{props.summoner.name}</h2>
    </div>
  );
}

function summonerNotFound() {
  return (
    <div className="row mb-2">
      <h2 className="ml-2">Summoner not found</h2>
    </div>
  );
}

function getProfileImageUrl(dataDragonUrl, summoner) {
  return `${dataDragonUrl}img/profileicon/${summoner.profileIconId}.png`;
}
