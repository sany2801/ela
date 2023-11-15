import React from 'react';
import add_icon from '../../images/add.svg'
import './DefaultFilterItem.css'

type DefaultFilterItemProps = {
  handleExtended: () => void;
  title: string
};

const DefaultFilterItem: React.FC<DefaultFilterItemProps> = ({ handleExtended, title }) => {
  return (
    <div onClick={handleExtended} className='filter_item'>
      <button className='filter_add_btn'>
        <img src={add_icon} alt='add' />
      </button>
      {title}
    </div>
  );
};

export default DefaultFilterItem;