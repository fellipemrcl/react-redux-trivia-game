import React, { Component } from 'react';
import Header from '../components/Header';

export default class Ranking extends Component {
  render() {
    return (
      <div>
        <Header />
        <h1 data-testid="ranking-title">Ranking</h1>
      </div>
    );
  }
}
