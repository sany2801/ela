import React from 'react';
import './Default_button.css'

type Default_buttonProps = {
  setState: () => void,
  button_text: string,
  width: number | string,
  height: number | string,
  disabled?: boolean
};

const Default_button: React.FC<Default_buttonProps> = (props) => {
  return (
    <button
      disabled={props.disabled}
      style={{ width: props.width, height: props.height }}
      className='default_button'
      onClick={props.setState}
    >
      {props.button_text}
    </button>
  );
};

export default Default_button;