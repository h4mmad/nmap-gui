const Console = ({ consoleText, title }) => {
    return (
        <div className="mt-5 mb-3">
            <h4>{title}</h4>
            <div className="card mt-3" style={{ "backgroundColor": "rgba(30,30,30,255)", "color": "white" }}>
                <pre style={{ "padding": "1rem" }}>
                    <code>
                        {consoleText}
                    </code>
                </pre>
            </div>
        </div>

    );
}
export default Console;