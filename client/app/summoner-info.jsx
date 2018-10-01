import React, { Component } from 'react';

export default function SummonerInfo(props) {
  if (props.summoner) {
    return (
      <div className="row">
        <img
          width="100"
          height="100"
          src={getProfileImageUrl(props.dataDragonUrl, props.summoner)}
          alt="Profile Image"
        />
        <h2 className="ml-2">{props.summoner.name}</h2>
      </div>
    );
  } else {
    return null;
  }
}

function getProfileImageUrl(dataDragonUrl, summoner) {
  return `${dataDragonUrl}img/profileicon/${summoner.profileIconId}.png`;
}
