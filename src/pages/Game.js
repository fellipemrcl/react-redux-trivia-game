import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import './Game.css';
import { getQuestionsFromApi } from '../services';

const sortNumber = 0.5;

export default class Game extends Component {
  state = {
    questions: [],
    index: 0,
    loading: true,
    selected: false,
    answersSorted: [],
    isClockRunning: true,
    result: false,
    timer: 30,
  };

  componentDidMount() {
    const INTERVAL = 1000;
    this.timerMethod = setInterval(() => this.handleTimerOnScreen(), INTERVAL);
    this.handleQuestions();
  }

  componentDidUpdate() {
    const { timer, result } = this.state;
    if (timer === 0 && result === false) {
      this.setState({
        result: true,
      });
    }
  }

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
    this.setState({ selected: true });
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

  render() {
    const { questions, index, loading, answersSorted, timer, result } = this.state;

    if (loading) {
      return <p>Loading...</p>;
    }

    const { category, question, correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers } = questions[index];

    return (
      <div>
        <Header />
        <p>{ timer }</p>
        <div>
          <h1 data-testid="question-category">{category}</h1>
          <p data-testid="question-text">{question}</p>
          <div data-testid="answer-options">
            {answersSorted.map((answer, idx) => (
              <button
                key={ idx }
                data-testid={ incorrectAnswers
                  .includes(answer) ? `wrong-answer-${idx}` : 'correct-answer' }
                onClick={ this.verifyAnswer }
                className={ this.setColor(answer, correctAnswer) }
                disabled={ result }
              >
                {answer}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
