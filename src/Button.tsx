type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
};

function Button({ onClick, children }: ButtonProps) {
  return <button onClick={onClick}>{children}</button>;
}

export default Button;
