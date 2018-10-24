import React, { Component } from 'react';

import ShowQueue from './ShowQueue';
import ShowTile from './ShowTile';

import MOCK_DATA from 'data/feed.json';
// GET http://api.tvmaze.com/shows

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
      shows: [],
      selectedShows: []
    };
  }

  get queue() {
    const { selectedShows } = this.state;

    if (!selectedShows.length) {
      return null;
    }

    return (
      <ShowQueue
        shows={selectedShows}
        onSelected={id => console.log(`SELECTED: ${id}`)}
      />
    );
  }

  get shows() {
    const { shows } = this.state;

    if (!shows.length) {
      return null;
    }

    return (
      <div className="my-shows">
        {shows.map(show => (
          <ShowTile
            key={show.id}
            onSelected={id => console.log(`SELECTED: ${id}`)}
            {...show}
          />
        ))}
      </div>
    );
  }

  get spinner() {
    const { loaded } = this.state;

    if (loaded) {
      return null;
    }

    return (
      <div className="my-spinner" role="alert" aria-live="assertive">
        <p className="visually-hidden">Loading...</p>
      </div>
    );
  }

  render() {
    return (
      <div className="my-app">
        <h1 className="my-app-title">TV Tracker</h1>
        {this.spinner}
        {this.queue}
        <div className="my-app-container">{this.shows}</div>
      </div>
    );
  }
}

export default App;
