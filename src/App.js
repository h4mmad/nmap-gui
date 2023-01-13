import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";
import Form from "./components/Form";
import Card from "./components/Card";
import Console from "./components/Console";
import Spinner from "./components/Spinner";
import Header from "./components/Header";
import DownloadScanReport from "./components/DownloadScanReport";


function App() {
  const [spinner, setSpinner] = useState(false);
  const [consoleText, setConsoleText] = useState("");
  const [scanReport, setScanReport] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [cardData, setCardData] = useState([]);
  const [ipAddr, setIpAddr] = useState('');


  return (
    <div className="container-sm">
      <Header />
      {error &&
        <div className="alert alert-danger" role="alert">
          An error occured: {errorMessage}
        </div>}



      <Form
        spinner={spinner}
        setSpinner={setSpinner}
        setError={setError}
        setErrorMessage={setErrorMessage}
        setConsoleText={setConsoleText}
        setCardData={setCardData}
        setIpAddr={setIpAddr}
        setScanReport={setScanReport}
      />
      



      {spinner && <Spinner />}

      {error | spinner ? (
        ""
      ) :
        <div>
          {scanReport && <h4 className="mb-3 mt-5">IP Address: {ipAddr}</h4>}

          <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
            {cardData.map((e) => (
              <Card key={uuidv4()} individualCard={e} />
            ))}
          </div>

          {scanReport && <hr></hr>}
          {scanReport && <DownloadScanReport scanReport={scanReport} consoleText={consoleText} />}
          {scanReport && <Console consoleText={consoleText} title="Scan command" />}
          {scanReport && <Console consoleText={scanReport} title="Scan report" />}
        </div>
      }



    </div>

  );
}

export default App;
