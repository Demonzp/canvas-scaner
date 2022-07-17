import { useState } from 'react';
import ActionBtns from '../components/action-btns';
import ImgPicker from '../components/img-picker';
import MainCanvas from '../components/main-canvas';
import ScanerBtn from '../components/scaner-btn';
import { TScanDot } from '../types/geom';

const Home = ()=>{
    const [file, setFile] = useState<File>();
    const [isRender, setIsRender] = useState(false);
    const [isScan, setIsScan] = useState(false);
    const [selectImage, setSelectImage] = useState<HTMLImageElement|null>(null);
    const [complateScane, setComplateScane] = useState<TScanDot[]>([]);
    const [isPickedColor, setPickedColor] = useState<boolean>(false);

    const onSetComplateScane = (data: TScanDot[])=>{
        setComplateScane(data);
        setIsScan(false);
        const file = new Blob([JSON.stringify(data)], {type: 'aplication/json'});
        const link = document.createElement('a');
        link.setAttribute('href', URL.createObjectURL(file));
        link.setAttribute('download', 'data.json');
        link.style.display = 'none';
        link.textContent = 'DOWNLOAD DATA';
        document.body.append(link);
        //URL.revokeObjectURL(link.href);
        link.click();
        setTimeout(()=>{
            link.remove();
            URL.revokeObjectURL(link.href);
        }, 0);
    };

    return(
        <>
            <MainCanvas 
                isScan={isScan} 
                file={file} 
                setIsRender={setIsRender} 
                setSelectImage={setSelectImage} 
                setComplateScane={onSetComplateScane}
                setPickedColor = {setPickedColor}
            />
            <ImgPicker setFile={setFile} isScan={isScan}/>
            <ScanerBtn isScan={isScan} isRender={isRender} setIsScan={setIsScan}/>
            <ActionBtns isScan={isScan} selectImage={selectImage} isPickedColor={isPickedColor}/>
        </>
    );
};

export default Home;