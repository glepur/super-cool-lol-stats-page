import React, { Component } from 'react';

export default function SummonerSearchForm(props) {
  return (
    <form
      onSubmit={props.onSubmit}
      className="form-group row justify-content-center"
    >
      <label htmlFor="example-text-input" className="col-2 col-form-label">
        Summoner name:
      </label>
      <div className="col-4">
        <input
          className="form-control"
          type="text"
          id="example-text-input"
          onChange={props.onNameChange}
        />
      </div>
      <div className="col-2">
        <input type="submit" className="btn btn-primary" text="Submit" />
      </div>
    </form>
  );
}
