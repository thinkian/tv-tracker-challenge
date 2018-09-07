import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false
    };
  }

  get queue() {
    return null;
  }

  get shows() {
    return null;
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
