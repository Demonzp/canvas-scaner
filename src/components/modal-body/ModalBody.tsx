import React from 'react';

import './modal-body.css';

type Props = {
    title?: string;
    toggle?: ()=>void;
    children?: JSX.Element | JSX.Element[];
};

const ModalBody:React.FC<Props> = ({title='modal title', toggle, children})=>{
    return (
        <div className="card">
            <div className="head">
                <label>{title}</label>
                <button onClick={toggle}>X</button>
            </div>
            {children}
        </div>
    );
};

export default ModalBody;