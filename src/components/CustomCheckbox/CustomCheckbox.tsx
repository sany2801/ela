import React from 'react';
import unChecked_icon from '../../images/empty_checkbox_icon.svg'
import checked_icon from '../../images/checked_checkbox_icon.svg'
import './CustomCheckbox.css'

type CustomCheckboxProps = {
  checked: boolean
};

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({ checked }) => {

  return (
    <div
      className={`custom_checkbox`}
    >
      {checked ? (
        <img src={checked_icon} alt="checked" />
      ) : (
        <img src={unChecked_icon} alt="unChecked" />
      )}
    </div>
  );
};

export default CustomCheckbox;