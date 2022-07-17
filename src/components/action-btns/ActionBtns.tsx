import React, { useState } from 'react';
import Scene from '../../objects/Scene';
import ModalAction from '../modal-action';
import ModalBody from '../modal-body';
import ModalWin from '../modal-win';

type Props = {
    isScan: boolean;
    selectImage: HTMLImageElement|null;
    isPickedColor: boolean;
}

const ActionBtns:React.FC<Props> = ({selectImage, isScan, isPickedColor})=>{
    const [inputWidth, setInputWidth] = useState('0');
    const [inputHeight, setInputHeight] = useState('0');
    const [percent, setPercent] = useState('1');

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
            setInputHeight(String(Scene.PointEvents.selectImage.height));
            setInputWidth(String(Scene.PointEvents.selectImage.width));
        } 
    };

    const onTransform = ()=>{
        Scene.transformSelect({percent: parseFloat(percent), width: parseFloat(inputWidth), height: parseFloat(inputHeight)});
        toggle();
    };

    const onPickColor = ()=>{
        Scene.pickColor();
    };

    return(
        <>
            <ModalWin show={show} toggle={toggle}>
                <ModalBody>
                    <div>
                        <label htmlFor='percent'>Procent to ZOOM_IN(1.2)/ZOOM_OUT(0.8):</label>
                        <input name='percent' value={percent} onChange={(e)=>setPercent(e.target.value)}/>
                    </div>
                    <div>
                        <div>
                            <label htmlFor='width'>Width:</label>
                            <input name='width' value={inputWidth} onChange={(e)=>setInputWidth(e.target.value)}/>
                        </div>
                        <div>
                            <label htmlFor='height'>Height:</label>
                            <input name='height' value={inputHeight} onChange={(e)=>setInputHeight(e.target.value)}/>
                        </div>
                    </div>
                    <ModalAction>
                        <button onClick={onTransform}>save</button>
                        <button onClick={toggle}>cancel</button>
                    </ModalAction>
                </ModalBody>
            </ModalWin>
            {
                (selectImage && !isScan)?
                <>
                    <button onClick={onDel}>Del</button>
                    <button onClick={onCopy}>Copy</button>
                    <button onClick={openModal}>Transform</button>
                </>

                :
                null
            }
            {
                !isPickedColor?
                <button onClick={onPickColor}>Pick Color</button>
                :
                null
            }
            
        </>
    );
};

export default ActionBtns;