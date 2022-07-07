import { useState } from 'react';
import ImgPicker from '../components/img-picker';
import MainCanvas from '../components/main-canvas';
import ScanerBtn from '../components/scaner-btn';

const Home = ()=>{
    const [file, setFile] = useState<File>();
    const [isRender, setIsRender] = useState(false);
    const [isScan, setIsScan] = useState(false);

    return(
        <>
            <MainCanvas isScan={isScan} file={file} setIsRender={setIsRender}/>
            <ImgPicker setFile={setFile} isScan={isScan}/>
            <ScanerBtn isScan={isScan} isRender={isRender} setIsScan={setIsScan}/>
        </>
    );
};

export default Home;