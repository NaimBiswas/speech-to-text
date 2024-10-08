import { useState } from 'react';
import './App.css';
import useSpeechToText from './hooks/useSpeechToText';

function App() {
  const { isListening, transcript, storeOldText, startListening, stoptListening } = useSpeechToText({ continuous: true, lang: 'en-US' })

  const updateTextInputOnStop = () => {
    stoptListening()
  }

  return (
    <div className="App">
      <header className="App-header">
        <h2>Speech To Text</h2>
      </header>
      <main>
        <div className='main-div'>
          <div className="" style={{ textAlign: 'center', }}>
            <button
              style={{
                cursor: 'pointer', padding: "10px 25px",
                marginBottom: '20px', borderRadius: '5px',
                border: 'none', color: '#f1f1f1', fontSize: '16px', background: isListening ? "#10403B" : "#127369"
              }}
              onClick={() => { isListening ? updateTextInputOnStop() : startListening() }}
            > {isListening ? "Stop Speaking" : "Speak Up!"}</button>
          </div>
          <textarea name="" id="" placeholder='Here we go'
            value={isListening ? storeOldText + " " + transcript : storeOldText}
            disabled={true} />
          <br />
        </div>
      </main>
    </div>
  );
}

export default App;
