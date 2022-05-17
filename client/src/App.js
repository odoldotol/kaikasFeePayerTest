import './App.css';
import Caver from 'caver-js'

const caver = new Caver('https://api.baobab.klaytn.net:8651/')

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={() => {
          
        }}>
          토큰전송
        </button>
      </header>
    </div>
  );
}

export default App;
