import Timer from "./Timer";

const Header = () => {
  return (
    <div>
      <h1>Rankdle V2</h1>

      <div>
        Rankdle resets in <Timer />
      </div>

      <nav>
        <ul>
          <li>Submit</li>
          <li>Hambuger menu (games)</li>
          <li>Account icon</li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
