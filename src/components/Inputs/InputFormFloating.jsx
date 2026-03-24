import React from 'react';

export const InputFormFloating = (props) => {
  const { label, type, placeholder, name, onBlur, onChange, value, error, id, referencia, className, pattern } = props;

  return (
    <div className={`wc-field ${className ?? 'mb-3'}`}>
      <label className="wc-field__label" htmlFor={id || name}>
        {label}
      </label>
      <input
        id={id || name}
        className={`wc-field__input${error ? ' wc-field__input--invalid' : ''}`}
        type={type}
        placeholder={placeholder || ' '}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        onKeyUp={onChange}
        value={value}
        ref={referencia}
        pattern={pattern}
        required
      />
      {error && <span className="wc-field__error">{error}</span>}
    </div>
  );
};
