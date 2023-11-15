import React from 'react';
import './White_Button.css'

type White_buttonProps = {
  setState: () => void,
  button_text: string,
  width: number | string,
  height: number | string,
  disabled?: boolean
};

const White_button: React.FC<White_buttonProps> = (props) => {
  return (
    <button
      disabled={props.disabled}
      style={{ width: props.width, height: props.height }}
      className='white_button'
      onClick={props.setState}
    >
      {props.button_text}
    </button>
  );
};

export default White_button;