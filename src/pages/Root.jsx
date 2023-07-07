import Header from "../components/Header";
import { Outlet } from "react-router-dom";
function Root() {
  const wrapperStyle = {
    display: "flex",
    flexDirection: "column",
    width: "50vw",
    margin: "0 auto",
    minHeight: "100vh",
  };

  return (
    <div style={wrapperStyle}>
      <div style={{ padding: "5px" }}>
        <Header />
      </div>
      <div style={{ padding: "5px", flex: "1" }}>
        <Outlet />
      </div>
    </div>
  );
}

export default Root;
