import React from 'react';
import {  useSelector } from 'react-redux';

const Alert = () => {
    const {alert} = useSelector(state=>state)

    return (
        alert !== null &&
        alert.length > 0 &&
        alert.map((al) => {
            const {id,alertType,msg} = al
            return <div key={id} className={`alert alert-${alertType}`}>
                {msg}
            </div>;
        })
    );
};



export default Alert;
