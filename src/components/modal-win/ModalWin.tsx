import React, { useMemo } from 'react';

import './modal-win.css';

type Props = {
    show: boolean;
    toggle: ()=>void;
    children?: JSX.Element;
};

const ModalWin:React.FC<Props> = ({show, toggle, children})=>{
    
    const newChild = useMemo(()=>{
        if(children){
            return React.cloneElement(children, {toggle});
        }
    }, [children, toggle]);

    return(
        <>
            {
                show?
                <div className="cont">
                    <div className="fon" onClick={toggle}></div>
                    {newChild}
                </div>
                :
                null
            }
        </>
    );
};

export default ModalWin;