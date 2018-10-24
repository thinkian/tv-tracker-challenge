import React, { Component } from 'react';

import ShowQueue from './ShowQueue';
import ShowTile from './ShowTile';

import MOCK_DATA from 'data/feed.json';
// GET http://api.tvmaze.com/shows

class App extends Component {
  constructor(props) {
    super(props);

    this.handleAddShow = this.handleAddShow.bind(this);
    this.handleRemoveShow = this.handleRemoveShow.bind(this);
    this.renderTopShows = this.renderTopShows.bind(this);

    this.state = {
      loaded: false,
      shows: [],
      selectedShows: []
    };
  }

  componentDidMount() {
    // const url = 'http://api.tvmaze.com/shows';
    // fetch(url)
    //   .then(res => res.json())
    //   .then(this.renderTopShows);

    this.renderTopShows(MOCK_DATA);
  }

  renderTopShows(data) {
    const shows = data.slice(0, 24);

    this.setState(() => ({
      loaded: true,
      shows
    }));
  }

  get queue() {
    const { selectedShows } = this.state;

    if (!selectedShows.length) {
      return null;
    }

    return (
      <ShowQueue shows={selectedShows} onSelected={this.handleRemoveShow} />
    );
  }

  get shows() {
    const { shows } = this.state;
    const unselectedShows = shows.filter(show => !show.selected);

    if (!unselectedShows.length) {
      return null;
    }

    return (
      <div className="my-shows">
        {unselectedShows.map(show => (
          <ShowTile key={show.id} onSelected={this.handleAddShow} {...show} />
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

  handleAddShow(selectedId) {
    const { selectedShows, shows } = this.state;
    const selectedShow = shows.find(show => show.id === selectedId);
    const updatedShows = shows.map(show => {
      if (show.id === selectedId) {
        return Object.assign({}, show, { selected: true });
      }

      return show;
    });

    this.setState({
      selectedShows: selectedShows.concat(selectedShow),
      shows: updatedShows
    });
  }

  handleRemoveShow(selectedId) {
    const { selectedShows, shows } = this.state;
    const selectedShow = shows.find(show => show.id === selectedId);
    const updatedShows = shows.map(show => {
      if (show.id === selectedId) {
        return Object.assign({}, show, { selected: false });
      }

      return show;
    });

    this.setState({
      selectedShows: selectedShows.filter(show => show.id !== selectedId),
      shows: updatedShows
    });
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
