/* eslint-disable react/jsx-pascal-case */
import React, { useState } from 'react';
import PopapModal from '../PopapModal/PopapModal';
import Map from '../map/Map';
import Add_address_form from '../add_address_form/Add_address_form';
import './Address_editing.css'

type Address_editingProps = {
  is_active_modal: boolean,
  setIs_active_modal: any;
};

const Address_editing: React.FC<Address_editingProps> = ({ is_active_modal, setIs_active_modal }) => {
  const [step, setStep] = useState<number>(1);

  const moveForword = () => {
    setStep(prev => prev + 1)
  }

  const moveBack = () => {
    setStep((prev: number) => {
      if (prev > 1) {
        return prev - 1
      }
      return prev
    })
  }

  return (
    <>
      {step === 1 && <PopapModal active={is_active_modal} setActive={setIs_active_modal} children={<Map setState={moveForword} />} />}
      {step === 2 && <PopapModal active={is_active_modal} setActive={setIs_active_modal} children={<Add_address_form setState={moveBack} />} />}
    </>
  );
};

export default Address_editing;