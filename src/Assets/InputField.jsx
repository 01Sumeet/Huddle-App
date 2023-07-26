const InputField = (props) => {
  return (
    <input
      placeholder={props.placeholder}
      type={props.type}
      pattern={props.pattern}
      value={props.value}
      className="input"
      name={props.name}
      id={props.name}
      onChange={props.onChange}
      autoComplete="off"
    />
  );
};
export default InputField;
