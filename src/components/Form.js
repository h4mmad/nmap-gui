const Form = ({ host, setHost, getAPIData }) => {


    const inputHandler = e => {
        setHost(e.target.value);
    }


    // 127.0.0.1:6969/elearning.usm.my
    async function submitHandler(e) {
        e.preventDefault();
        getAPIData(host);
    }

    return (
        <form>
            <div className="mb-3 mt-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Enter Host URL</label>
                <input onChange={inputHandler} type="email" className="form-control" id="exampleInputEmail1" value={host}/>
                <button onClick={submitHandler} className="btn  btn-outline-primary mt-2">Start scan</button>
            </div>
        </form>
    );
}
export default Form;