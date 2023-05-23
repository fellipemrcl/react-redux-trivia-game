import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { getQuestionsFromApi } from '../services';

const sortNumber = 0.5;
class Game extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      // correctAnswer: '',
      // allAnswers: [],
      indexOfQuestions: 0,
      isLoading: true,
      answers: [],
      correctIndex: 0,
    };
  }

  async componentDidMount() {
    let response;
    const { indexOfQuestions } = this.state;
    const { history } = this.props;
    try {
      const token = localStorage.getItem('token');
      response = await getQuestionsFromApi(token);
      const questions = response.results;
      console.log(questions);
      const correctIndex = this
        .getRandomIndex(questions[indexOfQuestions].incorrect_answers.length);
      const answers = [...questions[indexOfQuestions].incorrect_answers,
        questions[indexOfQuestions].correct_answer];
      console.log(answers);
      answers.sort(() => Math.random() - sortNumber);
      this.setState({ questions, isLoading: false, correctIndex, answers });
    } catch (e) {
      localStorage.removeItem('token');
      history.push('/');
    }
  }

  getRandomIndex = (max) => Math.floor(Math.random() * max);

  render() {
    const { questions, indexOfQuestions, isLoading, answers, correctIndex } = this.state;
    let incorrectIndex = 0;
    return (
      <div>
        <Header />
        {isLoading ? (<span>carregando</span>)
          : (
            <div>
              <p data-testid="question-category">
                { questions[indexOfQuestions].category }
              </p>
              <h3 data-testid="question-text">
                { questions[indexOfQuestions].question }
              </h3>
              <div data-testid="answer-options">
                {
                  answers.map((answer, i) => {
                    if (i === correctIndex) {
                      return (
                        <button key={ i } data-testid="correct-answer">{ answer }</button>
                      );
                    }
                    incorrectIndex += 1;
                    return (
                      <button
                        key={ i }
                        data-testid={ `wrong-answer-${incorrectIndex - 1}` }
                      >
                        { answer }
                      </button>
                    );
                  })
                }
              </div>
            </div>
          )}
      </div>
    );
  }
}
export default connect()(Game);
