import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";
import Form from "./components/Form";
import Card from "./components/Card";
import Console from "./components/Console";
import Spinner from "./components/Spinner";

function App() {
  const [host, setHost] = useState("");
  const [spinner, setSpinner] = useState(false);
  const [apiResult, setApiResult] = useState([]);
  const [consoleText, setConsoleText] = useState("");
  const [error, setError] = useState(false);

  async function getAPIData(host) {
    try {
      setSpinner(true);
      setError(false);
      const response = await fetch(`http://localhost:6969/${host}`);
      const data = await response.text();
      const arr = data.match(/[0-9]?[0-9]?[0-9]?[0-9]?\/(tcp|udp).*/gm);
      const objArr = arr.map((e) => {
        const splitArr = e.split(/[ ]{1,}/);
        const myObj = {
          port: splitArr[0],
          status: splitArr[1],
          service: splitArr[2],
        };
        return myObj;
      });
      setApiResult(objArr);
      setConsoleText(data);
    } catch (error) {
      console.log(error);
      setError(true);
      setSpinner(false);
    } finally {
      setSpinner(false);
    }
  }

  return (
    <div className="container-sm">
      {error ? (
        <div className="alert alert-warning" role="alert">
          An error occured
        </div>
      ) : (
        ""
      )}

      <Form
        host={host}
        setHost={setHost}
        apiResult={apiResult}
        setApiResult={setApiResult}
        getAPIData={getAPIData}
        spinner={spinner}
      />

      {spinner ? <Spinner /> : ""}

      {error | spinner ? (
        ""
      ) : (
        <div>
          <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
            {apiResult.map((e) => (
              <Card key={uuidv4()} individualCard={e} />
            ))}
          </div>

          {consoleText === "" ? "" : <Console consoleText={consoleText} />}
        </div>
      )}
    </div>
  );
}

export default App;
