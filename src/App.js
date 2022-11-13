import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";
import Form from "./components/Form";
import Card from "./components/Card";
import Console from "./components/Console";
import Spinner from "./components/Spinner";
import Header from "./components/Header";

function App() {
  const [spinner, setSpinner] = useState(false);
  const [apiResult, setApiResult] = useState([]);
  const [consoleText, setConsoleText] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <div className="container-sm">
      <Header/>
      {error ? (
        <div className="alert alert-danger" role="alert">
          An error occured: {errorMessage}
        </div>
      ) : (
        ""
      )}

      <Form
        setApiResult={setApiResult}
        spinner={spinner}
        setSpinner={setSpinner}
        setError={setError}
        setErrorMessage={setErrorMessage}
        setConsoleText={setConsoleText}
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
