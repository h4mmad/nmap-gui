import { useState } from "react";

const Form = ({ setIpAddr, spinner, setSpinner, setError, setErrorMessage, setCardData, setConsoleText, setScanReport }) => {
    const [disabled, setDisabled] = useState(true);
    const [host, setHost] = useState('');
    const [scanType, setScanType] = useState('-Pn');
    const [scanText, setScanText] = useState('Treat all hosts as online -- skip host discovery');

    async function getAPIData() {
        let data = ''
        try {
            setSpinner(true);
            setError(false);
            //change the url ip address if required, this may be causing the error
            const request = await fetch(`http://localhost:6969/${host}/${scanType}`);
            data = await request.json();
            setCardData(data.nmaprun.host.ports.port);

            console.log(data);
            setConsoleText(data);
            setConsoleText(data._comment.trim());
            setScanReport(data.stdout.trim());
            setIpAddr(data.nmaprun.host.address._attributes.addr);
        } catch (error) {
            console.log(error);
            setError(true);
            setSpinner(false);
            setErrorMessage(error);
            console.log(data);
        } finally {
            setSpinner(false);
        }
    }



    const inputHandler = e => {
        const inputText = e.target.value;

        const urlPattern = /[-a-zA-Z0-9@:%_+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_+.~#?&//=]*)?/gi;
        const ipAddrPattern = /\b(?:(?:2(?:[0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9])\.){3}(?:(?:2([0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9]))\b/ig;

        if (urlPattern.test(inputText) | ipAddrPattern.test(inputText) | inputText === 'localhost') {
            setHost(inputText);
            setDisabled(false);
        }
        else {
            setDisabled(true);
            setHost('');
        }
        console.log(host);
    }

    async function submitHandler(e) {
        e.preventDefault();
        getAPIData();
    }

    const dropDownHandler = e => {
        e.preventDefault();
        setScanType(e.target.getAttribute("value"));
        setScanText(e.target.textContent);
    }

    return (
        <form>
            <div className="mb-3 mt-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Enter Host URL</label>
                <input onChange={inputHandler} className="form-control" />

                <div className="dropdown mt-2">
                    {/* eslint-disable-next-line */}
                    <a className="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                        Scan type: {scanType}
                    </a>
                    <label className="p-2">{scanText}</label>


                    <ul className="dropdown-menu">
                        <li onClick={dropDownHandler}><button className="dropdown-item" value="-sO" >IP protocol scan</button></li>
                        <li onClick={dropDownHandler}><button className="dropdown-item" value="-sU">UDP Scan</button></li>
                        <li onClick={dropDownHandler}><button className="dropdown-item" value="-Pn">Treat all hosts as online -- skip host discovery</button></li>
                    </ul>
                </div>
                
                <button onClick={submitHandler} className={`btn  btn-primary mt-5 ${spinner | disabled ? "disabled" : ''}`}>Start scan</button>
            </div>
        </form>
    );
}
export default Form;