import { useState } from "react";

const Form = ({ spinner, setSpinner, setError, setErrorMessage, setApiResult, setConsoleText }) => {

    const [disabled, setDisabled] = useState(true);
    const [host, setHost] = useState('');
    const [scanType, setScanType] = useState('-Pn');
    const [scanText, setScanText] = useState('Treat all hosts as online -- skip host discovery');


    async function getAPIData() {

        let data = '';
        try {
            setSpinner(true);
            setError(false);
            const response = await fetch(`http://localhost:6969/${host}/${scanType}`);
            data = await response.text();
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
            console.log(data);
        } catch (error) {
            console.log(error);
            setError(true);
            setSpinner(false);
            setErrorMessage(data);
            console.log(data);
        } finally {
            setSpinner(false);
        }
    }



    const inputHandler = e => {

        const inputText = e.target.value;

        const urlPattern = /[-a-zA-Z0-9@:%_+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_+.~#?&//=]*)?/gi;
        const ipAddrPattern = /\b(?:(?:2(?:[0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9])\.){3}(?:(?:2([0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9]))\b/ig;

        if (urlPattern.test(inputText) | ipAddrPattern.test(inputText)) {
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
        setScanType(e.target.getAttribute("value"));
        setScanText(e.target.text);
    }

    return (
        <form>
            <div className="mb-3 mt-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Enter Host URL</label>
                <input onChange={inputHandler} type="email" className="form-control" />

                <div className="dropdown mt-2">
                    <a className="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                        Scan type: {scanType}
                    </a>
                    <label className="p-2">{scanText}</label>


                    <ul className="dropdown-menu">
                        <li onClick={dropDownHandler}><a className="dropdown-item" value="-sO" >IP protocol scan</a></li>
                        <li onClick={dropDownHandler}><a className="dropdown-item" value="-sU">UDP Scan</a></li>
                        <li onClick={dropDownHandler}><a className="dropdown-item" value="-sn" >Ping Scan - disable port scan</a></li>
                        <li onClick={dropDownHandler}><a className="dropdown-item" value="-Pn">Treat all hosts as online -- skip host discovery</a></li>
                    </ul>
                </div>

                <button onClick={submitHandler} className={`btn  btn-primary mt-5 ${spinner | disabled ? "disabled" : ''}`}>Start scan</button>
            </div>
        </form>
    );
}
export default Form;