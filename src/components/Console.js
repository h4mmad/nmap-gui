const Console = ({consoleText}) => {
    return (
        <div className="card mt-3" style={{"backgroundColor":"rgba(30,30,30,255)", "color":"white"}}>
            <pre style={{"padding":"1rem"}}>
                <code>
                    {consoleText}
                </code>
            </pre>
        </div>
    );
}
export default Console;