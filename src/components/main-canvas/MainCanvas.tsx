import React, { useEffect, useRef, useState } from 'react';

type Props = {
    isScan: boolean,
    file: File | undefined,
    setIsRender: React.Dispatch<React.SetStateAction<boolean>>
}

const MainCanvas:React.FC<Props> = ({file, isScan, setIsRender})=>{

    const refCanvas = useRef<HTMLCanvasElement>(null);
    const [canvaWidth, setCanvaWidth] = useState(0);
    const [canvaHeight, setCanvaHeight] = useState(0);

    useEffect(()=>{
        if(file){
            const ctx = refCanvas.current?.getContext('2d');

            if(ctx){
                ctx.clearRect(0,0, canvaWidth, canvaHeight);
            }
            
            const img = new Image();

            img.onload = ()=>{
                setCanvaWidth(img.width);
                setCanvaHeight(img.height);

                setTimeout(()=>{
                    ctx?.drawImage(img,0,0);
                    URL.revokeObjectURL(img.src);
                    setIsRender(true);
                });
                
            };

            img.src = URL.createObjectURL(file);
        }
    }, [file]);

    useEffect(()=>{
        if(isScan){
            scaneCanvase();
        }
    }, [isScan]);

    const scaneCanvase = ()=>{
        const ctx = refCanvas.current?.getContext('2d');
        const pixel = ctx?.getImageData(100,110,canvaWidth, canvaWidth);
        const data = pixel?.data;

        if(data){
            console.log('color = ', data[0],'|', data[1],'|', data[2],'|', data[3]/255);
        }
    };

    return(
        <>
            {
                file?
                <canvas 
                    ref={refCanvas}
                    width={canvaWidth}
                    height={canvaHeight}
                >

                </canvas>
                :
                null
            }
        </>
        
    );
};

export default MainCanvas;