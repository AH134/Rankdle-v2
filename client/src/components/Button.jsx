function Button({ context, handleClick }) {
  return <button onClick={handleClick}>{context}</button>;
}

export default Button;
