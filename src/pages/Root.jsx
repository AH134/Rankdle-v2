import Header from "../components/Header";

function Root() {
  const wrapperStyle = {
    width: "50vw",
    margin: "0 auto",
  };

  return (
    <div style={wrapperStyle}>
      <div>
        <Header />
      </div>
      <div>hero</div>
    </div>
  );
}

export default Root;
