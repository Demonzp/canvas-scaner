import React, { useRef } from 'react';

type Props = {
    isScan: boolean
    setFile: React.Dispatch<React.SetStateAction<File|undefined>>
}

const ImgPicker:React.FC<Props> = ({setFile, isScan})=>{

    const refInput = useRef<HTMLInputElement>(null);

    const onChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const files = e.target.files;
        if(files?.length){
            setFile(files[0]);
        }
    };

    return(
        <>
            {
                !isScan?
                <>
                    <input
                        style={{display:'none'}}
                        ref={refInput}
                        type="file"
                        onChange={onChange} 
                    />
                    <button
                        onClick={()=>refInput.current?.click()}
                    >
                        Add Img
                    </button>
                </>
                :
                null
            }
            
        </>
    );
};

export default ImgPicker;