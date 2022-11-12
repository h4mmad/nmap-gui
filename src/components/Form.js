import { useState } from "react";

const Form = ({ host, setHost, getAPIData, spinner}) => {

    const [disabled, setDisabled] = useState(true);


    const inputHandler = e => {

        const inputText = e.target.value;

        const urlPattern = /[-a-zA-Z0-9@:%_+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_+.~#?&//=]*)?/gi;
        const ipAddrPattern = /\b(?:(?:2(?:[0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9])\.){3}(?:(?:2([0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9]))\b/ig;

        if(urlPattern.test(inputText) | ipAddrPattern.test(inputText)){
            setHost(inputText);
            setDisabled(false);
        }
        else{
            setDisabled(true);
            setHost('');
        }
        console.log(host);
    }

    async function submitHandler(e) {
        e.preventDefault();
        getAPIData(host);
    }

    return (
        <form>
            <div className="mb-3 mt-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Enter Host URL</label>
                <input onChange={inputHandler} type="email" className="form-control"/>
                <button onClick={submitHandler} className={`btn  btn-primary mt-2 ${spinner | disabled ? "disabled" : ''}`}>Start scan</button>
            </div>
        </form>
    );
}
export default Form;