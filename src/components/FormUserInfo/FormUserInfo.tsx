import React, { useState } from 'react';
import axios from 'axios';
import "./FormUserInfo.css"
import INPUT_RADIO from '../input_radio_email-phone/input_radio_email-phone';
import Input from '../input/Input';
import { useNavigate } from 'react-router-dom';
import Loader from '../loader/Loader';
import PhoneInput from 'react-phone-number-input/input';
import { isValidPhoneNumber } from 'react-phone-number-input';

const FormUserInfo = () => {


    const [step, setStep] = useState(1);
    const [userInfo, setUserInfo] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        company_name: "",
        user_type: ""
    })
    const [isLoading, setLoading] = useState(false)
    const navigate = useNavigate()
    const isFormValid = userInfo.user_type;
    const isFormPRValid = userInfo.first_name && userInfo.last_name && isValidPhoneNumber(String(userInfo.phone_number))
    const isFormORValid = userInfo.first_name && userInfo.last_name && isValidPhoneNumber(String(userInfo.phone_number)) && userInfo.company_name

    // console.log(token)
    // console.log(isValidPhoneNumber(undefined))
    const handleChange = (value: string) => {
        setUserInfo({
            first_name: "",
            phone_number: "",
            last_name: "",
            email: "",
            company_name: "",
            user_type: value

        })
        console.log(userInfo)
    }

    const handleInputChange = (value: string, inputName: string) => {
        console.log(value)
        console.log(inputName)
        setUserInfo({
            ...userInfo,
            [inputName]: value
        })
    };


    const handlClick = () => {
        console.log(userInfo.user_type)
        setStep(step + 1)
    }
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true)
        console.log('click')
        try {
            // Отправляем данные на бэкэнд
            const response = await axios.put(
                'https://elogistapp-backend.herokuapp.com/accounts/add_user_info/',
                {
                    phone_number: userInfo.phone_number,
                    userprofile: {
                        user_type: userInfo.user_type,
                        first_name: userInfo.first_name,
                        last_name: userInfo.last_name,
                        company_name: userInfo.company_name
                    },
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access")}`,
                    },
                }
            );
            console.log(response); // Обработка ответа от бэкэнда

            navigate("/home")
        } catch (error) {

            console.error(error);
            setLoading(false)

        }

    };


    const handleChangeMobilePhone = (value: string) => {
        setUserInfo({ ...userInfo, phone_number: value })
        console.log(userInfo.phone_number)

    }

    const handlClickBack = () => {
        setStep(step - 1)
        setUserInfo({
            first_name: "",
            last_name: "",
            email: "",
            phone_number: "",
            company_name: "",
            user_type: ""
        })
    }


    return (

        <div className='form_wrapper form_user-info'>
            {step === 1 && (
                <div className='userform_content'>
                    <p className='tittle'>Welcome to <span>eLogistApp</span></p>
                    <p className='discription'>Tell us about yourself</p>
                    <INPUT_RADIO onChange={handleChange} />
                    <button onClick={handlClick} className="formSubmit start" value="Continue" disabled={!isFormValid} >Continue</button>

                </div>
            )}
            {userInfo.user_type === "PR" && step === 2 && (
                <>
                    <h3 className='form_user_info-tittle'>Account settings</h3>
                    <Input type='name' inputName='first_name' value={userInfo.first_name} tittle_Value='First Name*' onChange={handleInputChange} />
                    <Input type='name' inputName='last_name' value={userInfo.last_name} tittle_Value='Last Name*' onChange={handleInputChange} />
                    <div className='input_wrapper'>
                        <label htmlFor='phone'>Mobile Phone*</label>
                        <PhoneInput
                            id="phone"
                            className=""
                            value={userInfo.phone_number}
                            onChange={handleChangeMobilePhone}
                            limitMaxLength={true}
                            countryCallingCodeEditable={true}
                        />
                    </div>
                    Is valid: {userInfo.phone_number && isValidPhoneNumber(String(userInfo.phone_number)) ? 'true' : 'false'}

                    <div className='btn_navigate_formInfo'>
                        <button onClick={handlClickBack} className="formSubmit" value="Continue" >Back</button>
                        <button onClick={handleSubmit} className="formSubmit" value="Continue" disabled={!isFormPRValid} >Next</button>
                    </div>

                </>
            )}
            {userInfo.user_type === "OR" && step === 2 && (
                <>
                    <h3>Account settings</h3>
                    <Input type='name' inputName='company_name' value={userInfo.company_name} tittle_Value='Company Name' onChange={handleInputChange} />
                    <Input type='name' inputName='first_name' value={userInfo.first_name} tittle_Value='First Name' onChange={handleInputChange} />
                    <Input type='name' inputName='last_name' value={userInfo.last_name} tittle_Value='Last Name' onChange={handleInputChange} />

                    <div className='input_wrapper'>
                        <label htmlFor='phone'>Mobile Phone*</label>
                        <PhoneInput
                            id="phone"
                            className=""
                            value={userInfo.phone_number}
                            onChange={handleChangeMobilePhone}
                            limitMaxLength={true}
                            countryCallingCodeEditable={true}
                        />
                    </div>
                    Is valid: {userInfo.phone_number && isValidPhoneNumber(userInfo.phone_number) ? 'true' : 'false'}
                    <div className='btn_navigate_formInfo'>
                        <button onClick={handlClickBack} className="formSubmit" value="Continue" >Back</button>
                        <button onClick={handleSubmit} className="formSubmit" value="Continue" disabled={!isFormORValid} >Next</button>
                    </div>
                </>
            )}

            {isLoading ? <Loader /> : ""}

        </div>
    );
};

export default FormUserInfo;