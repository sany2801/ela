import React from 'react';
import "./adaptive.css"
import { useNavigate } from 'react-router-dom';


const MediaWrapper = ({ children }) => {
    return (
        <div>
            {children}
        </div>
    );
};


export default MediaWrapper;

