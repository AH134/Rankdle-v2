import Header from "../components/Header";
import { Outlet } from "react-router-dom";
function Root() {
  const wrapperStyle = {
    width: "50vw",
    margin: "0 auto",
  };

  return (
    <div style={wrapperStyle}>
      <div style={{ padding: "5px" }}>
        <Header />
      </div>
      <div style={{ padding: "5px" }}>
        <Outlet />
      </div>
    </div>
  );
}

export default Root;
