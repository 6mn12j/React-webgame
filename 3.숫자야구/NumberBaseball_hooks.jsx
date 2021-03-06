import React, { useState, useRef, memo } from 'react';
import Try from './Try_hooks';

function getNumbers() {
  const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const array = [];
  for (let i = 0; i < 4; i++) {
    const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    array.push(chosen);
  }
  return array;
}

const NumberBaseball = memo(() => {
  console.log('hooks');
  const [result, setResult] = useState('');
  const [value, setValue] = useState('');
  const [answer, setAnswer] = useState(getNumbers());
  const [tries, setTries] = useState([]);
  const inputEl = useRef(null);

  const onSubmitForm = (e) => {
    e.preventDefault();
    console.log(answer);
    if (value === answer.join('')) {
      setTries((prevTries) => {
        return [...prevTries, { try: value, result: '홈런!' }];
      });
      setResult('홈런!');
      alert('정답입니다. 게임을 다시 시작합니다.');
      setAnswer(getNumbers());
      setTries([]);
    } else {
      const answerArray = value.split('').map((value) => parseInt(value));
      let strike = 0;
      let ball = 0;
      if (tries.length >= 9) {
        //10번이상 틀렸을때
        setResult(`10번 넘게 틀려서 실패 ! 답은: ${answer.join(',')}였습니다`);
        alert('게임을 다시 시작합니다.');
        setValue('');
        setAnswer(getNumbers());
        setTries([]);
        inputEl.current.focus();
      } else {
        for (let i = 0; i < 4; i++) {
          if (answerArray[i] === answer[i]) {
            strike += 1;
          } else if (answer.includes(answerArray[i])) {
            ball += 1;
          }
        }
        setTries((prevTries) => [...prevTries, { try: value, result: `${strike} 스트라이크 ${ball}볼 입니다.` }]);
        setValue('');
        inputEl.current.focus();
      }
    }
  };
  const onChangeInput = (e) => {
    setValue(e.target.value);
  };
  return (
    <>
      <h1>{result}</h1>
      <form onSubmit={onSubmitForm}>
        <input ref={inputEl} maxLength={4} value={value} onChange={onChangeInput} placeholder="4자리 숫자를 맞춰보세요" />
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
});

export default NumberBaseball;
