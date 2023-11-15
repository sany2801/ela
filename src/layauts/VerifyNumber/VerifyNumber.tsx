import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./VerifyNumber.css"
import FourDigitInput from '../../components/input_send_code/INPUT_SEND_CODE';
import PopapModal from '../../components/PopapModal/PopapModal';
import AuthCode from 'react-auth-code-input';
import Loader from '../../components/loader/Loader';
import "../../components/input_send_code/input_send_code.css"
import { useSelector } from 'react-redux';



const VerifyNumber = () => {
    const [isLoading, setLoading] = useState(false);
    const [messege_error, setMessege_error] = useState("messege_error");
    const [active_popap, set_active_popap] = useState(false);
    const MAX_CHARACTERS = 6;
    const userData = useSelector((state: any) => state.data.userInfo);
    const [code,setCode] = useState('');


//ИЗМЕНИТЬ НА НУЖНЫЙ ЭНДПОИНТ 
const verifyPhonePut = async () => {// Нужно написать функцию отправки запроса на сервер для получения кода
   set_active_popap(true);
    try {
    // //     // Отправляем данные на бэкэнд
        const response = await axios.post('https://elogistapp-backend.herokuapp.com/accounts/resend_code/phone/' , {
            "user_data_key": userData.phone_number,

        });
        setLoading(false)
        console.log('response--->', response); // Обработка ответа от бэкэнда
    } 
    catch (error: any) {
        setLoading(false);
    }
}

    const verifyPhoneChange = async () => {// Нужно написать функцию отправки запроса на сервер для получения кода
        console.log("Your code has been sent");
        setLoading(true);
        try {
        // //     // Отправляем данные на бэкэнд
            const response = await axios.post('https://elogistapp-backend.herokuapp.com/accounts/resend_code/phone/' , {
                "user_data_key": userData.phone_number,
                "code": code,

            });
            setLoading(false)
            console.log('response--->', response); // Обработка ответа от бэкэнда
        } 
        catch (error: any) {
            setLoading(false);
        }
    }

    const resendCode = async () => {
        setLoading(true)
        try {
            // Отправляем данные на бэкэнд
            const response = await axios.post('https://elogistapp-backend.herokuapp.com/accounts/resend_code/email/', {
                "user_data_key": localStorage.getItem('email')
            });
            setLoading(false)
            console.log(response); // Обработка ответа от бэкэнда
        } catch (error: any) {
            setLoading(false)
        }
    }

    useEffect(() => {
        if(code.length === MAX_CHARACTERS) verifyPhoneChange();
    },[code])

    const handleVerificationCodeChange = (value: string) => {
        setCode(value);
    } 

    return (
    
        <div className='notificationVerifyNumber'>
            <p className='VerifyNumberMessage'> You need to verify your phone number to be able to use it to log in to the app</p>
            <button className='verifyNumberBtn' onClick={verifyPhonePut}> Verify </button>
      
        {active_popap ? 
        <PopapModal active = {active_popap} setActive = {set_active_popap}>
        <div className='form_verify-phone'>
              <h3 className='verify-heading'>Verify phone</h3>
              <span className={messege_error}>Incorrect code. Check and try again.</span>
              <p className='verify-message'> To verify your phone, we've sent a confirmation code to&nbsp;{userData.phone_number} </p>

              <AuthCode  
                      inputClassName={'input_code'}
                      allowedCharacters='numeric'
                      onChange={handleVerificationCodeChange}
                      length={MAX_CHARACTERS}
                      autoFocus={true}    
              />
              <p className='resend_code_btn' onClick={resendCode}> Resend code</p>
          </div>

        </PopapModal>: ""}
      {isLoading ? <Loader /> : ""}
        </div>
    );
}

export default VerifyNumber;