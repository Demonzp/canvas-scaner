import React from 'react';

type Props = {
    isScan: boolean
    isRender: boolean
    setIsScan: React.Dispatch<React.SetStateAction<boolean>>
}

const ScanerBtn:React.FC<Props> = ({isScan, isRender, setIsScan})=>{
    const onScan = ()=>{
        setIsScan(true);
    }
    return(
        <>
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