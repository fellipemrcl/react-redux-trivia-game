// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import Header from '../components/Header';
// import { getQuestionsFromApi } from '../services';

// const sortNumber = 0.5;

// class Game extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       questions: [],
//       indexOfQuestion: 0,
//       isLoading: true,
//       answers: [],
//       correctIndex: 0,
//     };
//   }

//   async componentDidMount() {
//     const { indexOfQuestion } = this.state;
//     const { history } = this.props;

//     try {
//       const token = localStorage.getItem('token');
//       const response = await getQuestionsFromApi(token);
//       const { results: questions } = response;

//       const answers = [...questions[indexOfQuestion].incorrect_answers,
//         questions[indexOfQuestion].correct_answer];
//       answers.sort(() => Math.random() - sortNumber);

//       const correctIndex = answers
//         .findIndex((answer) => answer === questions[indexOfQuestion].correct_answer);

//       this.setState({ questions, isLoading: false, correctIndex, answers });
//     } catch (error) {
//       localStorage.removeItem('token');
//       history.push('/');
//     }
//   }

//   renderQuestion() {
//     const { questions, indexOfQuestion, isLoading, answers, correctIndex } = this.state;

//     if (isLoading) {
//       return <span>Carregando...</span>;
//     }

//     const question = questions[indexOfQuestion];

//     return (
//       <div>
//         <p data-testid="question-category">{question.category}</p>
//         <h3 data-testid="question-text">{question.question}</h3>
//         <div data-testid="answer-options">
//           {answers.map((answer, index) => {
//             if (index === correctIndex) {
//               return (
//                 <button key={ index } data-testid="correct-answer">
//                   {answer}
//                 </button>
//               );
//             }
//             return (
//               <button
//                 key={ index }
//                 data-testid={ `wrong-answer-${index - 1}` }
//               >
//                 {answer}
//               </button>
//             );
//           })}
//         </div>
//       </div>
//     );
//   }

//   render() {
//     return (
//       <div>
//         <Header />
//         {this.renderQuestion()}
//       </div>
//     );
//   }
// }
// Game.propTypes = {
//   history: PropTypes.shape({
//     push: PropTypes.func.isRequired,
//   }).isRequired,
// };
// export default connect()(Game);
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
  };

  async componentDidMount() {
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
  }

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
    const { questions, index, loading, answersSorted } = this.state;

    if (loading) {
      return <p>Loading...</p>;
    }

    const { category, question, correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers } = questions[index];

    return (
      <div>
        <Header />
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
