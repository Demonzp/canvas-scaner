import React from 'react';

import './modal-action.css';

type Props = {
    children?: JSX.Element | JSX.Element[]; 
}

const ModalAction: React.FC<Props> = ({children})=> {
    return(
        <div className="card-action">
            {children}
        </div>
    );
};

export default ModalAction;