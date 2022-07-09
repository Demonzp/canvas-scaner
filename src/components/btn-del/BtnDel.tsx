import React from 'react';
import Scene from '../../objects/Scene';

type Props = {
    selectImage: HTMLImageElement|null;
}

const BtnDel:React.FC<Props> = ({selectImage})=>{
    const onDel = ()=>{
        Scene.delSelect();
    };

    return(
        <>
            {
                selectImage?
                <button onClick={onDel}>Del</button>
                :
                null
            }
        </>
    );
};

export default BtnDel;