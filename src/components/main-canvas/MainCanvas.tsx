import React, { useEffect, useRef, useState } from 'react';
import Scene from '../../objects/Scene';

type Props = {
    isScan: boolean,
    file: File | undefined,
    setIsRender: React.Dispatch<React.SetStateAction<boolean>>,
    setSelectImage: React.Dispatch<React.SetStateAction<HTMLImageElement|null>>
}

const MainCanvas:React.FC<Props> = ({file, setSelectImage, setIsRender})=>{

    const refCanvas = useRef<HTMLCanvasElement>(null);
    //const [canvaWidth, setCanvaWidth] = useState(0);
    //const [canvaHeight, setCanvaHeight] = useState(0);

    useEffect(()=>{
        if(refCanvas.current){
            Scene.init(refCanvas.current, setSelectImage, 600, 340);
        }
    }, [refCanvas]);

    useEffect(()=>{
        if(file){
            const img = new Image();
            img.onload = ()=>{
                Scene.addImage(img);
                URL.revokeObjectURL(img.src);
                setIsRender(true);
            };

            img.src = URL.createObjectURL(file);
        }
    }, [file]);

    return(
        <>
            <canvas
                ref={refCanvas}
                style={{backgroundColor:'white'}}
            />
        </>
        
    );
};

export default MainCanvas;