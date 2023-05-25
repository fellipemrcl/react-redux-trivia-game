import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import './Game.css';
import { fetchGravatarImage, getQuestionsFromApi } from '../services';
import { setScoreAction } from '../redux/actions';

const sortNumber = 0.5;
class Game extends Component {
  state = {
    questions: [],
    index: 0,
    loading: true,
    selected: false,
    answersSorted: [],
    isClockRunning: true,
    result: false,
    timer: 30,
    showNext: false,
  };

  componentDidMount() {
    const INTERVAL = 1000;
    this.timerMethod = setInterval(() => this.handleTimerOnScreen(), INTERVAL);
    this.handleQuestions();
    this.initializeLocalStorage();
  }

  componentDidUpdate() {
    const { timer, result } = this.state;
    if (timer === 0 && result === false) {
      this.setState({
        result: true,
      });
    }
  }

  initializeLocalStorage = () => {
    if (!JSON.parse(localStorage.getItem('ranking'))) {
      localStorage.setItem('ranking', JSON.stringify([]));
    }
  };

  handleQuestions = async () => {
    const { index } = this.state;
    try {
      const token = localStorage.getItem('token');
      const response = await getQuestionsFromApi(token);
      const { results: questions } = response;
      const currentQuestion = questions[index];
      const answers = [...currentQuestion.incorrect_answers,
        currentQuestion.correct_answer];
      const answersSorted = answers.sort(() => Math.random() - sortNumber);
      this.setState({ questions, loading: false, answersSorted });
    } catch (error) {
      const { history } = this.props;
      history.push('/');
      localStorage.removeItem('token');
    }
  };

  handleTimerOnScreen = () => {
    const { timer, isClockRunning } = this.state;
    if (timer === 0 || !isClockRunning) {
      clearInterval(this.timerMethod);
    } else {
      this.setState((prevState) => ({
        timer: prevState.timer - 1,
      }));
    }
  };

  verifyAnswer = () => {
    this.setState({ selected: true, showNext: true });
  };

  nextQuestion = () => {
    const { index, questions } = this.state;
    const { history, name, email, score } = this.props;
    if (index === questions.length - 1) {
      history.push('/feedback');
      const updatedRankingEntry = { name, image: fetchGravatarImage(email), score };
      const ranking = [
        ...JSON.parse(localStorage.getItem('ranking') ?? []), updatedRankingEntry];
      localStorage.setItem('ranking', JSON.stringify(ranking));
      return;
    }
    const nextIndex = index + 1;
    const nextQuestion = questions[nextIndex];
    const answers = [...nextQuestion.incorrect_answers, nextQuestion.correct_answer];
    const answersSorted = answers.sort(() => Math.random() - sortNumber);
    this.setState({
      index: nextIndex,
      selected: false,
      result: false,
      timer: 30,
      showNext: false,
      answersSorted,
    });
  };

  setColor = (answer, correctAnswer) => {
    const { selected } = this.state;
    if (selected) {
      if (correctAnswer === answer) {
        return 'correct_answer';
      }
      return 'wrong_answer';
    }
    return '';
  };

  handleScore = (answer) => {
    const { dispatch } = this.props;
    const { timer, questions, index } = this.state;
    const ten = 10;
    let questionDifficulty = 0;
    const hardDifficulty = 3;
    if (answer === questions[index].correct_answer) {
      switch (questions[index].difficulty) {
      case 'medium':
        questionDifficulty = 2;
        break;
      case 'hard':
        questionDifficulty = hardDifficulty;
        break;
      case 'easy':
        questionDifficulty = 1;
        break;
      default:
        break;
      }
      this.setState({
        localScore: ten + (timer * questionDifficulty),
      }, () => {
        const { localScore } = this.state;
        dispatch(setScoreAction(localScore));
      });
    }
  };

  render() {
    const { questions, index, loading, answersSorted, timer,
      result, showNext } = this.state;
    if (loading) {
      return <p>Loading...</p>;
    }
    const { category, question, correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers } = questions[index];
    return (
      <div>
        <Header />
        <p>{timer}</p>
        <div>
          <h1 data-testid="question-category">{category}</h1>
          <p data-testid="question-text">{question}</p>
          <div data-testid="answer-options">
            {answersSorted.map((answer, idx) => (
              <button
                key={ idx }
                data-testid={
                  incorrectAnswers.includes(answer)
                    ? `wrong-answer-${idx}`
                    : 'correct-answer'
                }
                onClick={ () => {
                  this.verifyAnswer();
                  this.handleScore(answer);
                } }
                className={ this.setColor(answer, correctAnswer) }
                disabled={ result }
              >
                {answer}
              </button>
            ))}
            {showNext && (
              <button data-testid="btn-next" onClick={ this.nextQuestion }>
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  name: state.player.name,
  email: state.player.gravatarEmail,
  score: state.player.score,
});
Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};
export default connect(mapStateToProps)(Game);
