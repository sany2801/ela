import React, { ReactNode } from 'react';
import "./modal.css"

interface PopapModalProps {
    active: boolean;
    setActive: React.Dispatch<React.SetStateAction<boolean>>;
    children: ReactNode;
}

const PopapModal: React.FC<PopapModalProps> = ({ active, setActive, children }) => {
    return (
        <div className={active ? "modal active" : "modal"} onClick={() => setActive(false)}>
            <div className={active ? "modal__content active" : "modal__content"} onClick={(e) => e.stopPropagation()}>
                {children}
                <div className='btn_closse_popap' onClick={() => setActive(false)}>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </div>
    );
};

export default PopapModal;
