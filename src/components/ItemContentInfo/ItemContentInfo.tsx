import React, {useEffect, useState} from 'react';
import axios from "axios";
import WhiteButton from "../White_Button/White_Button";
import "./ItemContentInfo.css"
import security_safe from "../../images/security-safe.png"
import Loader from "../loader/Loader";

import {useSelector} from "react-redux";

type ItemContentInfoProps = {
    title: string;
    setState: () => void;
    inputStateChang?: (value: boolean) => void | null;
    buttonStateEdit?: (value: boolean) => void | null;
    children: any;
    classNameEdit: string;
    nameRef?: any;
    lastNameRef?: any;
    emailRef?: any;
    phoneRef?: any;
    inputState?: boolean;

}

const ItemContentInfo: React.FC<ItemContentInfoProps> = ({ title, setState, inputStateChang,buttonStateEdit, children, classNameEdit, nameRef, lastNameRef, inputState}
) => {

    const [isEdit, setIsEdit] = useState<boolean>(true);
    const [isCancel, setIsCancel] = useState<boolean>(false);
    const [isLoading, setLoading] = useState<boolean>(false);
    const user = useSelector((state: any) => state.data.userInfo.userprofile);
    const confirmation = useSelector((state: any) => state.data.userInfo.confirmation);
    const button = React.useRef<HTMLButtonElement | null>(null);
    let lastName: string  = lastNameRef.current?.children[0].value
    let firstName: string = nameRef.current?.children[0].value


    //обрабатываем кнопку Edit
    const handleEditButton = (): void => {
        // делаем доступными для редактирования input First Name/Last name
        nameRef.current.children[0].disabled = false;
        lastNameRef.current.children[0].disabled = false;

        //меняем состояние кнопки Edit
        setIsEdit((prevIsEdit) => !prevIsEdit);
        if (buttonStateEdit) buttonStateEdit(isEdit)

        //меняем состояние кнопки Cancel
        setIsCancel(true)
    }

    const switchStateToDefault = ():void => {

        if (inputStateChang) inputStateChang(false);
        if (buttonStateEdit) buttonStateEdit(false);
        nameRef.current.children[0].disabled = true;
        lastNameRef.current.children[0].disabled = true;

    }
    // обработка кнопки Cancel
    const handleCancelButton = (): void => {
        // прячем кнопку Edit, показываем кнопку Cancel и Save
        setIsEdit(true);
        setIsCancel(false);

        // изменяем состояние редактирования input и edit + делаем недоступными для редактирования input First Name/Last name
        switchStateToDefault()


    }
     // обработка кнопки Save
    const handleSaveButton = async (event: React.FormEvent) => {

        event.preventDefault();
        setLoading(true);


        try {
            // Проверяем измененное значение на равенство с первоначальным значением. Если значения равны отправляем пустую строку.
            if (lastName === user.last_name) {

                lastName = ''

            } else if (firstName === user.first_name) {

                firstName = ''

            }
            // отправляем запрос на сервер с измененными данными
            const response = await axios.put('https://elogistapp-backend.herokuapp.com/accounts/edit_name/',
                {
                    last_name: lastName,
                    first_name: firstName,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access")}`
                    }
                });
            // изменяем состояние редактирования input и edit + делаем недоступными для редактирования input First Name/Last name
            switchStateToDefault();
            console.log(response);
            setLoading(false);
            window.location.reload();

        } catch (error) {

            console.error(error);
            setLoading(false)
        }
    }

    useEffect(() => {

        if (inputState) {
            // появляется кнопка сохранить при вводе изменении в поле ввода
            button.current?.classList.remove("save_button");
            button.current?.classList.add("save_button_active");

        } else {
            // прячем кнопку сохранить
            button.current?.classList.remove("save_button_active");
            button.current?.classList.add("save_button");

        }
    }, [inputState])

    return (
        <div className='item_wrapper' onClick={setState}>
            <div className='titleItem'>
                <h3 className='title'>{title}</h3>
                {(isEdit && confirmation === null) && <button className={classNameEdit} onClick={handleEditButton}>
                    Edit
                </button>}
                {isCancel &&
                    <div className="button-wrapper">
                        <button onClick={handleSaveButton} ref={button} className="save_button">Save</button>
                        <WhiteButton
                            setState={handleCancelButton}
                            button_text="Cancel"
                            width={109}
                            height={32}/>
                    </div>
                }
            </div>
            {isLoading ? <Loader/> : ""}
            {isCancel &&
                <p className='message'> For security reasons, confirmation of changes in this section is inspected
                    internally. Processing time is up to 2 working days. </p>
            }
            {confirmation !== null &&
                <div className="notification-wrapper">
                    <p className="notification"><img className="notification-img" src={security_safe} alt="security_safe"/>
                        <span><strong>Name changes await confirmation.</strong> If this has not occurred within 2 business days, please contact support.</span>
                    </p>
                    <WhiteButton
                    setState={handleCancelButton}
                    button_text="Cancel"
                    width={109}
                    height={32}/>
                </div>
            }
            <div className='infoItem'>
                {children}
            </div>
        </div>
    );
};

export default ItemContentInfo;