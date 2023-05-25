import Ranking from "../pages/Ranking";
import { screen } from '@testing-library/react';

import renderWithRouterAndRedux from "./helpers/renderWith";
import userEvent from "@testing-library/user-event";

test('testa se os elementos HTML estão presentes na tela', () => {

const mockRanking = [{name: 'joao', image: 'urlImage', score: 50}]
  localStorage.setItem('ranking', JSON.stringify(mockRanking));
  renderWithRouterAndRedux(<Ranking history={window.history} />);

  expect(screen.getByRole('img', {  name: /urlImage/i})).toBeInTheDocument();
  expect(screen.getByRole('heading', {  name: /ranking/i})).toBeInTheDocument();


});

test('Ao clicar no botão Retornar ao início redireciona para a página de início', () => {
  renderWithRouterAndRedux(<Ranking history={window.history} />);
  window.history.push = jest.fn();
const button = screen.getByRole('button', {  name: /retornar ao início/i});
userEvent.click(button)

  expect(window.history.push).toBeCalledWith('/')
});

test('testa se o score do segundo está abaixo do primeiro', () => {

  const mockRanking = [{name: 'joao', image: 'urlImage', score: 265}, {name: 'maria', image: 'urlImage', score: 107}]
    localStorage.setItem('ranking', JSON.stringify(mockRanking));
    renderWithRouterAndRedux(<Ranking history={window.history} />);
  
    expect(screen.getByTestId('player-name-0')).toHaveTextContent('joao');
    expect(screen.getByTestId('player-name-1')).toHaveTextContent('maria');
  
  });

