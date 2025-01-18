function Button({ children, classes }) {
  return (
    <button className={[...classes].join(" ")} type="button">
      {children}
    </button>
  );
}

export default Button;
