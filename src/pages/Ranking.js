import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { cleanScoreAction } from '../redux/actions';

class Ranking extends Component {
  state = {
    rankings: [],
  };

  componentDidMount() {
    const rankings = JSON.parse(localStorage.getItem('ranking'));
    this.setState({ rankings });
  }

  handleGoHome = () => {
    const { dispatch, history } = this.props;
    dispatch(cleanScoreAction());
    history.push('/');
  };

  render() {
    const { rankings } = this.state;
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <button
          onClick={ this.handleGoHome }
          data-testid="btn-go-home"
        >
          Retornar ao início
        </button>
        <div>
          {rankings
          && rankings
            .sort((first, second) => second.score - first.score)
            .map((player, index) => (
              <div key={ index }>
                <img src={ player.image } alt={ player.image } />
                <div>
                  <p data-testid={ `player-name-${index}` }>{player.name}</p>
                  <p
                    data-testid={ `player-score-${index}` }
                  >
                    {`Score: ${player.score}`}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }
}
Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};
export default connect()(Ranking);
