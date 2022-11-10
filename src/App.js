import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './App.css';
import Form from './components/Form';
import Card from './components/Card';
import Console from './components/Console';

function App() {

  const [host, setHost] = useState('');
  const [apiResult, setApiResult] = useState([]);
  const [consoleText, setConsoleText] = useState('');

  async function getAPIData(host) {
    const response = await fetch(`http://localhost:6969/${host}`);
    const data = await response.text();

    const arr = data.match(/[0-9]?[0-9]?[0-9]?[0-9]?\/(tcp|udp).*/mg);
    const objArr = arr.map(e => {
      const splitArr = e.split(/[ ]{1,}/);
      const myObj = {
        port: splitArr[0],
        status: splitArr[1],
        service: splitArr[2]
      }
      return myObj;
    })
    setApiResult(objArr);
    setConsoleText(data);
    console.log(data);
  }



  return (
    <div className='container-sm'>
      <Form
        host={host}
        setHost={setHost}
        apiResult={apiResult}
        setApiResult={setApiResult}
        getAPIData={getAPIData}
      />

      <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
        {apiResult.map(e => (<Card key={uuidv4()} individualCard={e}/>))}
      </div>


      <Console consoleText={consoleText} />

    </div>
  );
}

export default App;
