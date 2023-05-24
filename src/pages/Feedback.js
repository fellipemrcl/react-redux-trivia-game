import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

function Feedback({ ass, score, history }) {
  const redirectToLogin = () => {
    history.push('/');
  };
  const min = 3;
  const men = ass < min ? 'Could be better...' : 'Well Done!';
  return (
    <div>
      <Header />
      <span data-testid="feedback-text">{men}</span>
      <span data-testid="feedback-total-score">{score}</span>
      <span data-testid="feedback-total-question">{ass}</span>
      <button
        onClick={ redirectToLogin }
        data-testid="btn-play-again"
      >
        Play Again

      </button>
      <button
        onClick={ () => history.push('/ranking') }
        data-testid="btn-ranking"
      >
        Ranking

      </button>
    </div>
  );
}

const mapStateToProps = (state) => ({
  ass: state.player.assertions,
  score: state.player.score,
});

Feedback.propTypes = {
  ass: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(mapStateToProps)(Feedback);
