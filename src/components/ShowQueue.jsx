import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ShowQueue extends Component {
  renderShowButton(show) {
    const { onSelected } = this.props;

    return (
      <button
        className="my-queue-button"
        type="button"
        onClick={onSelected.bind(this, show.id)}
      >
        <div className="my-queue-card">
          <div className="my-queue-card--front">
            <img src={show.image.medium} alt={show.name} />
          </div>
          <div className="my-queue-card--back">
            <span className="my-queue-button-text">Remove</span>
          </div>
        </div>
      </button>
    );
  }

  render() {
    const { shows } = this.props;

    if (!shows || !shows.length) {
      return null;
    }

    return (
      <div className="my-queue">
        <div className="my-app-container">
          <h2 className="my-queue-title">My List</h2>
          <ul className="my-queue-list">
            {shows.map(show => (
              <li key={show.id} className="my-queue-list-item">
                {this.renderShowButton(show)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

ShowQueue.propTypes = {
  onSelected: PropTypes.func.isRequired,
  shows: PropTypes.array.isRequired
};

export default ShowQueue;
