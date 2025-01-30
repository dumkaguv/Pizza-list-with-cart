function Button({ children, classes }) {
  return (
    <button tabIndex={0} className={[...classes].join(" ")} type="button">
      {children}
    </button>
  );
}

export default Button;
