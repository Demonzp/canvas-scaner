import { useState } from 'react';
import BtnDel from '../components/btn-del';
import ImgPicker from '../components/img-picker';
import MainCanvas from '../components/main-canvas';
import ScanerBtn from '../components/scaner-btn';

const Home = ()=>{
    const [file, setFile] = useState<File>();
    const [isRender, setIsRender] = useState(false);
    const [isScan, setIsScan] = useState(false);
    const [selectImage, setSelectImage] = useState<HTMLImageElement|null>(null);

    return(
        <>
            <MainCanvas isScan={isScan} file={file} setIsRender={setIsRender} setSelectImage={setSelectImage}/>
            <ImgPicker setFile={setFile} isScan={isScan}/>
            <ScanerBtn isScan={isScan} isRender={isRender} setIsScan={setIsScan}/>
            <BtnDel selectImage={selectImage}/>
        </>
    );
};

export default Home;