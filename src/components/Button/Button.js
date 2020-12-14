import React from 'react'
import './Button.css'

function Button({title, onClick, className, children}) {

  return (
    <button onClick={onClick} className={`button__wrapper className ${className}`}>
      {title}
    </button>
  );
}

export default Button;