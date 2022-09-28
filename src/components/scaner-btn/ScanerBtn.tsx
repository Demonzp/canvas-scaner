import React from 'react';
import Scene from '../../objects/Scene';
import { TScanDot } from '../../types/geom';

type Props = {
    isScan: boolean;
    isRender: boolean;
    setIsScan: React.Dispatch<React.SetStateAction<boolean>>;
}

const ScanerBtn:React.FC<Props> = ({isScan, isRender, setIsScan})=>{
    const onScan = ()=>{
        setIsScan(true);
        Scene.scane(); 
    };

    const onScaneText = ()=>{
        Scene.scaneText();
    };

    const onScaneIMGPixel = ()=>{
        Scene.scanerImgLikePixel();
    };

    return(
        <>
        <button onClick={onScaneText}>Scan Text</button>
        <button onClick={onScaneIMGPixel}>Scan IMG Like Pixel</button>
            {
                isRender?
                <button 
                    onClick={onScan}
                    disabled={isScan}
                >
                    Scan Img
                </button>
                :
                null
            }
        </>
    )
};

export default ScanerBtn;