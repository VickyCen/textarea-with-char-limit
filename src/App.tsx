import React from 'react';
import './css/style.scss';
import TextareaWithCharLimit from './components/TextareaWithCharLimit/TextareaWithCharLimit';

function App() {
  return (
    <div className="App">
      <TextareaWithCharLimit maxCharAllowed={1} />
    </div>
  );
}

export default App;
