const Spinner = () => {
  return (
    <div className="overlay">
      <div className="d-flex align-items-center">
        <strong>Scanning please wait...</strong>
        <div
          className="spinner-border ms-auto"
          role="status"
          aria-hidden="true"
        ></div>
      </div>
    </div>
  );
};

export default Spinner;
