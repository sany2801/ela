/* eslint-disable react/jsx-pascal-case */
import { useState,useRef } from "react";
import ItemContentInfo from "../../components/ItemContentInfo/ItemContentInfo";
import { useSelector } from "react-redux";
import InputInfo from "../../components/InputInfo/InputInfo";
import Address_editing from "../../components/Address_editing/Address_editing";
import house_icon from "../../images/house_icon.svg";
import key_icon from "../../images/key-square.png";
import Account_item from "../../components/Account_item/Account_item";
import ChangePassword from "../../components/ChangePassword/ChangePassword";
import PopapModal from "../../components/PopapModal/PopapModal";
import "./Profile.css";
import VerifyNumber from '../VerifyNumber/VerifyNumber';
import AuthCode from "react-auth-code-input";
import axios from "axios";
import Loader from "../../components/loader/Loader";

const Profile = () => {

    const [editBtn, setEditBtn] = useState("editBtnActive");
    const [is_active_modal_address, setIs_active_modal_address] = useState<boolean>(false);
    const [is_active_modal_pass, setIs_active_modal_pass] = useState<boolean>(false);
    const [is_change_input, setIs_change_input] = useState<boolean>(false);
    const [is_change_edit, setIs_change_edit] = useState<boolean>(false)
    const refFirstName = useRef<HTMLDivElement | null>(null);
    const refLastName = useRef<HTMLDivElement | null>(null);
    const refEmail = useRef<HTMLDivElement | null>(null);
    const refPhone= useRef<HTMLDivElement | null>(null);

    function handle_address_modal(): void {
        setIs_active_modal_address((prev: boolean) => !prev);
    }

    function handle_password_modal(): void {
        setIs_active_modal_pass((prev: boolean) => !prev);
    }

    function getStateInputChange(value: boolean): void {
        setIs_change_input(value);
    }

    function getStateEdit(value: boolean): void {
        setIs_change_edit(value);
    }


    const userData = useSelector((state: any) => state.data.userInfo);

    if (!userData || !userData.userprofile) {
        // Можно вернуть заглушку или сообщение об отсутствии данных
        return null;
    }


    console.log("Edit button "+is_change_edit)

    return (
        <div className="content_info">
            <ItemContentInfo
                setState={() => {
                }}
                nameRef={refFirstName}
                lastNameRef={refLastName}
                title="Personal Information"
                inputState={is_change_input}
                inputStateChang={getStateInputChange}
                buttonStateEdit={getStateEdit}
                classNameEdit={editBtn}
            >
                {!userData.phone_verified ? <VerifyNumber/> : ""}

                <InputInfo
                    value={userData.userprofile.first_name}
                    title="First Name"
                    className=""
                    inputStateChang={getStateInputChange}
                    ref={refFirstName}

                />
                <InputInfo
                    value={userData.userprofile.last_name}
                    title="Last Name"
                    className=""
                    inputStateChang={getStateInputChange}
                    ref={refLastName}

                />
                <InputInfo value={userData.email} title="Email" className="" ref={refEmail} editState={is_change_edit}/>
                <InputInfo
                    value={userData.phone_number}
                    title="Phone number"
                    ref={refPhone}
                    editState={is_change_edit}
                    className=""
                />
            </ItemContentInfo>
            {userData.userprofile.company_name ? (
                <ItemContentInfo
                    setState={() => {
                    }}
                    title="Company Information"
                    classNameEdit="editBtn"
                                    >
                    <InputInfo
                        value={userData.userprofile.company_name}
                        title="Company name"
                        className=""
                        editState={is_change_edit}
                    />
                    <InputInfo
                        value={userData.email}
                        title="Company Email"
                        className=""

                    />
                </ItemContentInfo>
            ) : null}

      <Account_item
        title={"Address"}
        img_src={house_icon}
        address={userData.address}
        setState={handle_address_modal}
      >
        <Address_editing
          is_active_modal={is_active_modal_address}
          setIs_active_modal={setIs_active_modal_address}
        />
      </Account_item>

            <Account_item
                title={"Change password"}
                img_src={key_icon}
                setState={handle_password_modal}

            >
                <PopapModal active={is_active_modal_pass} setActive={setIs_active_modal_pass}
                            children={<ChangePassword active={is_active_modal_pass}/>}/>
            </Account_item>
        </div>
    );
};

export default Profile;