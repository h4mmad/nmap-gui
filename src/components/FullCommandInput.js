import { useState } from "react";

const FullCommandInput = ({ setSpinner, setError, setCardData, setConsoleText, setScanReport, setIpAddr, setErrorMessage }) => {

    const [fullScanCommand, setFullScanCommand] = useState('');


    async function getData() {
        let data = ''
        try {
            setSpinner(true);
            setError(false);
            //change the url ip address if required, this may be causing the error
            const request = await fetch(`http://localhost:6969/${fullScanCommand}`);
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
            setErrorMessage(String(error));
            console.log(data);
        } finally {
            setSpinner(false);
        }
    }

    function textInputHandler(e) {
        setFullScanCommand(e.target.value);
    }
    function submitHandler(e) {
        e.preventDefault();
        getData();
    }

    return (
        <>
            <form className="mt-5">
                <div>
                    <input onChange={textInputHandler} className="form-control" placeholder="nmap -Pn localhost"></input>
                    <button onClick={submitHandler} className="btn btn-primary mt-2">Send scan command</button>
                </div>
            </form>
        </>
    );
};
export default FullCommandInput;