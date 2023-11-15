import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import axios from 'axios';
import Loader from '../loader/Loader';
import White_button from '../White_Button/White_Button';
import './Add_address_form.css';

type Add_address_formProps = {
  setState: () => void;
};

const Add_address_form: React.FC<Add_address_formProps> = ({ setState }) => {
  const [isFormValid, setIsFormValid] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [success_status, setSuccess_status] = useState<string>('');

  const handleSave = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formValues: { [key: string]: string } = {};
    formData.forEach((value, key) => {
      formValues[key] = value.toString();
    });
    setIsLoading(true);
    // console.log(formValues);
    patch_address(formValues).then(result => console.log(result))
  };

  const patch_address = async (value: any) => {
    try {
      const response = await axios.patch(
        'https://elogistapp-backend.herokuapp.com/accounts/add_address/',
        value,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );
      setIsLoading(false);
      setSuccess_status("Address has been added !");
      window.location.reload();
      return response;
    } catch (error) {
      setSuccess_status('Something went wrong !');
      setIsLoading(false);
      console.error(error);
    }
  }

  const validateForm = (): void => {
    const requiredFields = ['country', 'state', 'city', 'street', 'postal_code', 'building_number'];
    let isValid = true;

    requiredFields.forEach((field) => {
      const element = document.querySelector(`#${field}`) as HTMLInputElement;
      if (element && element.value.trim() === '') {
        isValid = false;
      }
    });

    setIsFormValid(isValid);
  };

  useEffect(() => {
    if (localStorage.getItem('users_address')) {
      const address: string[] = localStorage.getItem('users_address')?.split(',') as string[];

      const countryElement = document.querySelector('#country') as HTMLInputElement;
      if (countryElement) {
        countryElement.value = address.at(-1) || '';
      }
      const stateElement = document.querySelector('#state') as HTMLInputElement;
      if (stateElement) {
        stateElement.value = address.at(-3) || '';
      }
      const cityElement = document.querySelector('#city') as HTMLInputElement;
      if (cityElement) {
        cityElement.value = address.at(2) || '';
      }
      const streetElement = document.querySelector('#street') as HTMLInputElement;
      if (streetElement) {
        streetElement.value = address.at(1) || '';
      }
      const postal_codeElement = document.querySelector('#postal_code') as HTMLInputElement;
      if (postal_codeElement) {
        postal_codeElement.value = address.at(-2) || '';
      }
      const building_numberElement = document.querySelector('#building_number') as HTMLInputElement;
      if (building_numberElement) {
        building_numberElement.value = address.at(0) || '';
      }

      validateForm();
    }
  }, []);

  return (
    <div id="form_wrap">
      <div id='form_header'>
        <h3>Add address</h3>
        {success_status}
      </div>
      <Box
        component="form"
        onSubmit={handleSave}
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <div id="form_cont">
          <div className="form_half">
            <TextField
              required id="country"
              name="country"
              label="Country"
              variant="standard"
              onChange={validateForm}
            />
            <TextField
              required
              id="state"
              name="state"
              label="State/Province"
              defaultValue=""
              variant="standard"
              onChange={validateForm}
            />
            <TextField
              required
              id="building_number"
              name="building_number"
              label="Building number"
              variant="standard"
              onChange={validateForm}
            />
            <TextField
              name="apartment"
              label="Apartment"
              variant="standard"
            />
          </div>
          <div className="form_half">
            <TextField
              required
              id="city"
              name="city"
              label="City"
              variant="standard"
              onChange={validateForm}
            />
            <TextField
              required
              id="street"
              name="street"
              label="Street"
              variant="standard"
              onChange={validateForm}
            />
            <TextField
              required
              id="postal_code"
              name="postal_code"
              label="Postal code"
              variant="standard"
              onChange={validateForm}
            />
            <TextField
              name="floor"
              label="Floor"
              variant="standard"
            />
          </div>
        </div>
        <div id="btns_wrap">
          <button id={isFormValid ? "submition_btn" : "invalid_submition_btn"} type="submit" disabled={!isFormValid}>
            Save
          </button>
          <White_button setState={setState} button_text={'Choose another point'} width={245} height={40} />
        </div>
      </Box>
      {isLoading ? <Loader /> : ""}
    </div>
  )
};

export default Add_address_form;
