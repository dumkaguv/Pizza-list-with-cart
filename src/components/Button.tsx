import React from 'react'

type ButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
  classes: string[];
}

const Button: React.FC<ButtonProps> = ({ onClick, children, classes = []}) => {
  return (
    <button onClick={onClick} tabIndex={0} className={classes.join(" ")} type="button">
      {children}
    </button>
  );
}

export default Button;
