import React, { useEffect, useRef } from 'react';
import Scene from '../../objects/Scene';
import { TScanDot } from '../../types/geom';

type Props = {
    isScan: boolean;
    file: File | undefined;
    setIsRender: React.Dispatch<React.SetStateAction<boolean>>;
    setSelectImage: React.Dispatch<React.SetStateAction<HTMLImageElement|null>>;
    setComplateScane: (data:TScanDot[])=>void;
    setComplateScane2: (data: any[])=>void;
    setPickedColor: React.Dispatch<React.SetStateAction<boolean>>;
}

const MainCanvas:React.FC<Props> = ({file, setSelectImage, setIsRender, setComplateScane, setComplateScane2, setPickedColor})=>{

    const refCanvas = useRef<HTMLCanvasElement>(null);
    //const [canvaWidth, setCanvaWidth] = useState(0);
    //const [canvaHeight, setCanvaHeight] = useState(0);

    useEffect(()=>{
        if(refCanvas.current){
            Scene.init(refCanvas.current, setSelectImage, setComplateScane, setComplateScane2, setPickedColor, 540, 460);
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