import React, { createRef, Component } from 'react';
import Try from './Try';

function getNumbers() {
  const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const array = [];
  for (let i = 0; i < 4; i++) {
    const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    array.push(chosen);
  }
  return array;
}

class NumberBaseball extends Component {
  state = {
    result: '',
    value: '',
    answer: getNumbers(),
    tries: [],
  };
  onSubmitForm = (e) => {
    const { value, answer, tries } = this.state;
    e.preventDefault();
    console.log(answer);
    if (value === answer.join('')) {
      this.setState((prevState) => {
        return { result: '홈런!', tries: [...prevState.tries, { try: value, result: '홈런!' }] };
      });
      alert('정답입니다. 게임을 다시 시작합니다.');
      this.setState({
        answer: getNumbers(),
        tries: [],
      });
    } else {
      const answerArray = value.split('').map((value) => parseInt(value));
      let strike = 0;
      let ball = 0;
      if (tries.length >= 9) {
        //10번이상 틀렸을때
        this.setState({
          result: `10번 넘게 틀려서 실패 ! 답은: ${answer.join(',')}였습니다`,
        });
        alert('게임을 다시 시작합니다.');
        this.setState({
          answer: getNumbers(),
          tries: [],
        });
      } else {
        for (let i = 0; i < 4; i++) {
          if (answerArray[i] === answer[i]) {
            strike += 1;
          } else if (answer.includes(answerArray[i])) {
            ball += 1;
          }
        }
        this.setState((prevState) => {
          return { tries: [...prevState.tries, { try: value, result: `${strike} 스트라이크 ${ball}볼 입니다.` }], value: '' };
        });
      }
    }
  };
  onChangeInput = (e) => {
    this.setState({
      value: e.target.value,
    });
  };
  inputRef = createRef(); //this.inputRef
  render() {
    const { result, value, tries } = this.state;
    return (
      <>
        <h1>{result}</h1>
        <form onSubmit={this.onSubmitForm}>
          <input maxLength={4} value={value} onChange={this.onChangeInput} placeholder="4자리 숫자를 맞춰보세요" />
        </form>
        <div>
          시도:{tries.length}
          <ul>
            {tries.map((value, index) => {
              return <Try key={`${index + 1}차 시도:`} tryInfo={value} />;
            })}
          </ul>
        </div>
      </>
    );
  }
}
export default NumberBaseball;
