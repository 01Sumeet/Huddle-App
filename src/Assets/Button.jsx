const Button = (props) => {
  return (
    <button
      className={props.className}
      onClick={props.onClick}
      type={props.type || "submit"}
    >
      {props.text}
      {props.children}
    </button>
  );
};
export default Button;
