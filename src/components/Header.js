import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchGravatarImage } from '../services/index';

class Header extends Component {
  render() {
    const { name, score, gravatarEmail } = this.props;
    const gravatarURL = fetchGravatarImage(gravatarEmail);
    return (
      <header>
        <img
          data-testid="header-profile-picture"
          src={ gravatarURL }
          alt="Profile"
        />
        <p data-testid="header-player-name">{name}</p>
        <p data-testid="header-score">{score}</p>
      </header>
    );
  }
}
Header.propTypes = {
  gravatarEmail: PropTypes.string,
  name: PropTypes.string,
  score: PropTypes.number,
};
Header.defaultProps = {
  gravatarEmail: '',
  name: '',
  score: 0,
};
const mapStateToProps = (state) => ({
  ...state.player,
});
export default connect(mapStateToProps)(Header);
