import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ShowTile extends Component {
  get summary() {
    const { summary } = this.props;

    return (
      <div
        className="my-show-summary"
        dangerouslySetInnerHTML={{ __html: summary }}
      />
    );
  }

  render() {
    const { id, image, name, onSelected, summary } = this.props;

    return (
      <div className="my-show">
        <h2 className="my-show-title">{name}</h2>
        <div className="my-show-content">
          <img className="my-show-image" src={image.medium} alt={name} />
          {this.summary}
        </div>
        <div className="my-show-controls">
          <button
            className="my-show-button"
            type="button"
            onClick={onSelected.bind(this, id)}
          >
            Add to My List
          </button>
        </div>
      </div>
    );
  }
}

ShowTile.propTypes = {
  genres: PropTypes.array.isRequired,
  id: PropTypes.number.isRequired,
  image: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  onSelected: PropTypes.func.isRequired,
  summary: PropTypes.string.isRequired
};

export default ShowTile;
