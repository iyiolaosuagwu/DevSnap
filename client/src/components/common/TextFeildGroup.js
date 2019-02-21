import React from 'react';
import propTypes from 'prop-types';
import classnames from 'classnames';

const TextFeildGroup = ({
   name,
   placeholder,
   value,
   label,
   error,
   info,
   type,
   onChange,
   disabled
}) => {
  return (
    <div className="form-group">
      <input
         type={type}
         onChange={onChange} 
         value={value}
         className={classnames('form-control auth-input', {'is-invalid': error})}
         placeholder={placeholder}
         name={name}
         disabled={disabled}
        /> 
         {info && <small className="form-text text-muted">{info}</small>}
         {error && <div className="invalid-feedback">{error}</div>}
    </div>
  )
}

TextFeildGroup.propTypes = {
   name: propTypes.string.isRequired,
   placeholder: propTypes.string,
   value: propTypes.string.isRequired,
   info: propTypes.string,
   error: propTypes.string,
   type: propTypes.string,
   onChange: propTypes.func.isRequired,
   disabled: propTypes.string
}

TextFeildGroup.defaultProps = {
   type: 'text'
}

export default TextFeildGroup
