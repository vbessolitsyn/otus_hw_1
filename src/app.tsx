import React from 'react';
import { evaluate } from './engine';

import './app.css';

export default class App extends React.Component {
  handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const inputEl = document.getElementsByClassName('input')[0] as HTMLInputElement;
      const resultEl = document.getElementsByClassName('result')[0] as HTMLElement;
      try {
        resultEl.innerHTML = evaluate(inputEl.value).toString();
      } catch (ex: unknown) {
        if (ex instanceof Error) resultEl.innerHTML = ex.message;
      }
    }
  };

  render() {
    return (
      <div role="main">
        <h1 className="header"> Задание 1: калькулятор </h1>
        <p className="main">
          Введите выражение и нажмите [Enter]:
          <br />
          <br />
          <input
            className="input"
            onKeyPress={(e) => this.handleKeyPress(e)}
            type="text"
            size={100}
            spellCheck="false"
          />
          <br />
          <br />
          Результат: <span className="result"></span>
        </p>
      </div>
    );
  }
}
