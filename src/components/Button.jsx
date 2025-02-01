function Button({ onClick, children, classes }) {
  return (
    <button onClick={onClick} tabIndex={0} className={[...classes].join(" ")} type="button">
      {children}
    </button>
  );
}

export default Button;
