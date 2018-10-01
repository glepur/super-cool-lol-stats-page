import React, { Component } from 'react';

export default function SummonerSearchForm(props) {
  return (
    <form
      onSubmit={props.onSubmit}
      className="form-group row justify-content-center"
    >
      <label htmlFor="summoner-name" className="col-2 col-form-label">
        Summoner name:
      </label>
      <div className="col-2">
        <input
          className="form-control"
          type="text"
          id="summoner-name"
          onChange={props.onNameChange}
        />
      </div>
      <div className="col-1">
        <label htmlFor="region" className="col-2 col-form-label">
          Region:
        </label>
      </div>
      <div className="col-2">
        <select
          className="form-control"
          id="region"
          onChange={props.onRegionChange}
          defaultValue="na1"
        >
          <option value="ru">RU</option>
          <option value="kr">KR</option>
          <option value="br1">BR1</option>
          <option value="oc1">OC1</option>
          <option value="jp1">JP1</option>
          <option value="na1">NA1</option>
          <option value="eun1">EUN1</option>
          <option value="euw1">EUW1</option>
          <option value="tr1">TR1</option>
          <option value="la1">LA1</option>
          <option value="la2">LA2</option>
        </select>
      </div>
      <div className="col-2">
        <input type="submit" className="btn btn-primary" text="Submit" />
      </div>
    </form>
  );
}
