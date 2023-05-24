import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

export default class Ranking extends Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        <Header />
        <h1 data-testid="ranking-title">Ranking</h1>
        <button
          onClick={ () => history.push('/') }
          data-testid="btn-go-home"
        >
          Retornar ao início

        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
