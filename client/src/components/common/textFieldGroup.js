import React from "react";
import classnames from "classnames";
import propTypes from "prop-types";

//Este es un key component. Es nuestro modelo de input. Esta preparado para recibir data a traves de las props. Es decir que donde lo llamemos vamos a tener que pasarle toda esa data como props

function textFieldGroup({
  name,
  placeholder,
  value,
  label,
  error,
  info,
  type,
  onChange,
  disabled,
}) {
  return (
    <div className="form-group">
      <input
        type={type}
        className={classnames("form-control form-control-lg", {
          "is-invalid": error,
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
}

textFieldGroup.propTypes = {
  name: propTypes.string.isRequired,
  placeholder: propTypes.string,
  value: propTypes.string.isRequired,
  info: propTypes.string,
  error: propTypes.string,
  type: propTypes.string.isRequired,
  onChange: propTypes.string.isRequired,
  disabled: propTypes.string,
};

textFieldGroup.defaultProps = {
  type: "text",
};

export default textFieldGroup;
