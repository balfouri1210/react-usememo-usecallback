import React, { useCallback, useMemo, useState } from 'react';

function colorTranslator(color: string) {
  console.log('color Translator');
  switch (color) {
    case 'red':
      return '빨강';

    case 'blue':
      return '파랑';
    
    case 'black':
      return '검정';
  }
}

function movieTranslator(movie: string) {
  console.log('movie Translator');
  switch (movie) {
    case 'harry potter':
      return '해리 포터';

    case 'load of the rings':
      return '반지의 제왕';

    case 'fast and furious':
      return '분노의 질주'
  }
}

function Translator() {
  const [selectedColor, setSelectedColor] = useState('black');
  const [selectedMovie, setSelectedMovie] = useState('harry potter');

  // selectColor와 selectMovie는 selectedColor, selectedMovie를 재할당하는 역할에 변화가 없으므로
  // useCallback을 통해 첫 마운트에만 메모리에 할당한다. (rerendering 시에는 함수를 새로 선언하지 않음)
  // 보통 하위컴포넌트에 콜백을 전달할때 많이 사용한다.
  // 하위컴포넌트는 상위컴포넌트에서 선언된 콜백만을 사용하는데,
  // 상위컴포넌트의 state가 바뀔때에도 불필요하게 리렌더링 되기 때문.
  function selectColor(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedColor(event.target.value);
  }

  function selectMovie(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedMovie(event.target.value);
  }

  // color와 movie중 바뀌는 값만 translator가 호출되는 것을 확인할 수 있다.
  // 이 예제에서 성능차이는 거의 제로지만 연산과정이 복잡한 함수일 경우 불필요한 계산을 막을 수 있다. 
  // 공식 문서에서도 useMemo에 넘겨주는 콜백 함수의 이름이 computeExpensiveValue() 라고 되어 있는 것을 주목
  const translatedColor = useMemo(() => colorTranslator(selectedColor), [selectedColor]);
  const translatedMovie = useMemo(() => movieTranslator(selectedMovie), [selectedMovie]);

  return (
    <div>
      Translation of
      <select name="color" value={selectedColor} onChange={useCallback(selectColor, [])} style={{ marginLeft: '8px' }}>
        {['red', 'blue', 'black'].map((color) => <option
          value={color}
          key={color}>
          {color}
        </option>)}
      </select> :

      <div style={{ fontSize: '42px', fontWeight: 800 }}>
        "{translatedColor}"
      </div>

      Translation of
      <select name="movie" value={selectedMovie} onChange={useCallback(selectMovie, [])} style={{ marginLeft: '8px' }}>
        {['harry potter', 'load of the rings', 'fast and furious'].map((movie) => <option
          value={movie}
          key={movie}>
          {movie}
        </option>)}
      </select> :

      <div style={{ fontSize: '42px', fontWeight: 800 }}>
        "{translatedMovie}"
      </div>
    </div>
  )
}

export default Translator;