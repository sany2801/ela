import React, { useState } from 'react';
import "./verify-email.css"
import { Link, useNavigate } from 'react-router-dom';
import FourDigitInput from '../../components/input_send_code/INPUT_SEND_CODE';
import axios from 'axios';
import Loader from '../../components/loader/Loader';
import { useStore } from "react-redux";


const VerifyEmailPage = () => {
    const [isLoading, setLoading] = useState(false)
    const [messege_error, setMessege_error] = useState("messege_error")
    const [info_error, setInfo_error] = useState("")
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
            setMessege_error("messege_error_active")
            setInfo_error(error.response.data.error)
            setLoading(false)
        }
    }

    return (
        <div className='form_verify-email'>
            <Link style={{ marginBottom: "16px", }} to="/regist">Back</Link>
            <h3>Verify email address</h3>
            <p style={{ marginBottom: "32px", fontSize: "15px", fontWeight: "400", lineHeight: "20px" }}>Please enter the 6-digit code we sent to&nbsp;
                <span className='email_verify-password'>{localStorage.getItem("email")}</span> </p>
            <p className={messege_error}>{info_error}</p>
            <FourDigitInput />
            <p className='resend_code_btn' onClick={resendCode}> Resend code</p>
            {isLoading ? <Loader /> : ""}
        </div>
    );
};

export default VerifyEmailPage;