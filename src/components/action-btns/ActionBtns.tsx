import React, { useState } from 'react';
import Scene from '../../objects/Scene';
import ModalAction from '../modal-action';
import ModalBody from '../modal-body';
import ModalWin from '../modal-win';

type Props = {
    selectImage: HTMLImageElement|null;
}

const ActionBtns:React.FC<Props> = ({selectImage})=>{
    const [inputWidth, setInputWidth] = useState(0);
    const [inputHeight, setInputHeight] = useState(0);
    const [percent, setPercent] = useState(1);

    const [show, setShow] = useState(false);
    const toggle = ()=>setShow(!show);

    const onDel = ()=>{
        Scene.delSelect();
    };

    const onCopy = ()=>{
        Scene.copySelect();
    };

    const openModal = ()=>{
        toggle();
        if(Scene.PointEvents && Scene.PointEvents.selectImage){
            setInputHeight(Scene.PointEvents.selectImage.height);
            setInputWidth(Scene.PointEvents.selectImage.width);
        } 
    };

    return(
        <>
            <ModalWin show={show} toggle={toggle}>
                <ModalBody>
                    <div>
                        <label htmlFor='percent'>Procent to ZOOM_IN/ZOOM_OUT:</label>
                        <input name='percent'/>
                    </div>
                    <div>
                        <div>
                            <label htmlFor='width'>Width:</label>
                            <input name='width' value={inputWidth} onChange={(e)=>setInputWidth(Number(e.target.value))}/>
                        </div>
                        <div>
                            <label htmlFor='height'>Height:</label>
                            <input name='height' value={inputHeight} onChange={(e)=>setInputHeight(Number(e.target.value))}/>
                        </div>
                    </div>
                    <ModalAction>
                        <button>save</button>
                        <button onClick={toggle}>cancel</button>
                    </ModalAction>
                </ModalBody>
            </ModalWin>
            {
                selectImage?
                <>
                    <button onClick={onDel}>Del</button>
                    <button onClick={onCopy}>Copy</button>
                    <button onClick={openModal}>Transform</button>
                </>

                :
                null
            }
        </>
    );
};

export default ActionBtns;