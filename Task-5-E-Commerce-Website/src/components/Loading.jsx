const Loading = () => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center" style={{minHeight: '400px'}}>
      <div className="spinner-border text-primary" role="status" style={{width: '3rem', height: '3rem'}}>
        <span className="visually-hidden">Loading...</span>
      </div>
      <p className="text-muted fs-5 mt-3">Loading...</p>
    </div>
  );
};

export default Loading;

