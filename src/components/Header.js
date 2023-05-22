import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Header extends Component {
  render() {
    const { name, score, gravatarEmail } = this.props;
    console.log(gravatarEmail);
    const emailConverter = md5(gravatarEmail).toString();
    const gravatarURL = `https://www.gravatar.com/avatar/${emailConverter}`;
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
