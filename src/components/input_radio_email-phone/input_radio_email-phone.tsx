import React, { useState, ChangeEvent } from 'react';
import "./input_radio_email-phone.css"


interface InputRadioProps {
    name?: string;
    value?: string;
    label?: string;
    checked?: boolean;
    ID?: string;
    onChange: (value: string) => void;
}

const INPUT_RADIO: React.FC<InputRadioProps> = ({ checked, onChange, }) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            onChange(event.target.value);
        }
    };

    return (
        <div className="typeUser">
            <input id="PR"
                value="PR"
                type="radio"
                name="typeUser"
                checked={checked}
                onChange={handleChange}
            ></input>
            <label htmlFor="PR">Individual</label>

            <input id="OR"
                value="OR"
                type="radio"
                name="typeUser"
                checked={checked}
                onChange={handleChange}
            ></input>
            <label htmlFor="OR">Bussines</label>
        </div>

    );
};




export default INPUT_RADIO;