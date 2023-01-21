import React from 'react';
import { TScanDot, TTransformData } from '../types/geom';
import Image from './Image';
import Mathem from './Mathem';
import PointEvents from './PointEvents';
import Scaner from './Scaner';

class Scene{
    canvas: HTMLCanvasElement|null = null;
    ctx: CanvasRenderingContext2D|null = null;
    images: Image[] = [];
    width = 0;
    height = 0;
    strockeColors: string[] = [];
    Mathem = new Mathem();
    PointEvents: PointEvents|null = null;
    Scaner: Scaner|null = null;
    setSelectImage: React.Dispatch<React.SetStateAction<HTMLImageElement|null>>|null = null;
    setComplateScane: ((data:TScanDot[])=>void) | null = null;
    setComplateScane2: ((data:any[])=>void) | null = null;
    setPickedColor: React.Dispatch<React.SetStateAction<boolean>>|null = null;
    isPickColor: boolean = false;

    init(canvas: HTMLCanvasElement, 
        setSelectImage: React.Dispatch<React.SetStateAction<HTMLImageElement|null>>, 
        setComplateScane: (data:TScanDot[])=>void, 
        setComplateScane2: (data:any[])=>void,
        setPickedColor: React.Dispatch<React.SetStateAction<boolean>>|null,
        width: number=0, 
        height: number=0
    ){
        this.canvas = canvas;
        this.canvas.width = width;
        this.canvas.height = height;
        this.ctx = canvas.getContext('2d');
        if(!this.ctx){
            throw new Error('Not find CanvasRenderingContext2D!!!');
        }
        this.width = width;
        this.height = height;
        this.setSelectImage = setSelectImage;
        this.setComplateScane = setComplateScane;
        this.setComplateScane2 = setComplateScane2;
        this.setPickedColor = setPickedColor;
        if(!this.PointEvents){
            this.PointEvents = new PointEvents(canvas, this);
        }

        if(!this.Scaner){
            this.Scaner = new Scaner(this);
        }
        

        this.render();
    }

    renderText(){
        console.log('renderText');
        const text = `ДЯКУЮ`;
        //const text2 = "";
        //this.ctx!.font = "56px 'Press Start 2P', cursive";
        this.ctx!.font = "expanded 66px 'Press Start 2P', cursive";
        this.ctx!.fillText(text, 12, 80);
        //this.ctx!.fillText(text2, 12, 140);
        //351
        //241
        
        // const text2 = "HELLO";
        // this.ctx!.font = "38px 'Press Start 2P', cursive";
        // console.log('textSizes = ', measureText);
        // this.ctx!.fillText(text2, 10, 90);
        // this.ctx!.strokeStyle = 'red';
        // this.ctx!.lineWidth = 1;
        // this.ctx!.beginPath();
        // this.ctx!.moveTo(10, 50-measureText.actualBoundingBoxAscent);
        // this.ctx!.lineTo(10+measureText.width+measureText.actualBoundingBoxDescent, 50-measureText.actualBoundingBoxAscent);
        
        // this.ctx!.closePath();
        // this.ctx!.stroke();

        // this.ctx!.strokeStyle = 'green';
        // this.ctx!.lineWidth = 1;
        // this.ctx!.beginPath();
        // this.ctx!.moveTo(10, 50-measureText.actualBoundingBoxAscent+(measureText.actualBoundingBoxDescent/2));
        // this.ctx!.lineTo(10+measureText.width+measureText.actualBoundingBoxDescent, 50-measureText.actualBoundingBoxAscent+(measureText.actualBoundingBoxDescent/2));
        
        // this.ctx!.closePath();
        // this.ctx!.stroke();
    }

    addImage(image:HTMLImageElement){
        //setTimeout(()=>{
            let strockeColor = 'rgba(0,0,255,1)';
            if(this.strockeColors.length>=0){
                //strockeColor = this.randomRGBA();
                while (this.strockeColors.find(color=>color===strockeColor)){
                    strockeColor = this.randomRGBA();
                }
                this.strockeColors.push(strockeColor);
            }else{
                this.strockeColors.push(strockeColor);
            }
            this.images.push(new Image(image, strockeColor));
            this.render();
        //});

    }

    scanerImgLikePixel(){
        this.Scaner?.scanerImgLikePixel();
    }

    scaneText(){
        this.Scaner?.scaneText();
    }

    scanePolygon(){
        this.Scaner?.scanePolygon();
    }

    scane(){
        this.Scaner?.scane();
    }

    delSelect(){
        this.images = this.images.filter((image)=>image.defaultStrockeColor!==this.PointEvents?.selectImage?.defaultStrockeColor);
        this.setSelectImage!(null);
        this.PointEvents!.selectImage = undefined;
        this.render();
    }

    transformSelect(data:TTransformData){
        if(this.PointEvents && this.PointEvents.selectImage){
            this.PointEvents.selectImage.transform(data);
            this.render();
        }
    }

    pickColor(){
        this.setPickedColor!(false);
        this.isPickColor = true;
    }

    copySelect(){
        let strockeColor = 'rgba(0,0,255,1)';

        while (this.strockeColors.find(color=>color===strockeColor)){
            strockeColor = this.randomRGBA();
        }
        this.strockeColors.push(strockeColor);

        if(this.PointEvents && this.PointEvents.selectImage){
            this.images.push(
                new Image(
                    this.PointEvents.selectImage.image,
                    strockeColor,
                    10,
                    10,
                    this.PointEvents.selectImage.width,
                    this.PointEvents.selectImage.height
                )
            );
            this.render();
        }
        
    }

    randomRGBA(){
        return `rgba(${this.Mathem.between(0,255)},${this.Mathem.between(0,255)},${this.Mathem.between(0,255)},1)`;
    }

    render(){
        console.log('render!!!');
        this.ctx?.clearRect(0,0, this.width, this.height);
        //this.renderText();
        this.images.forEach((image)=>{
            if(this.ctx){
                
                console.log('rendery Cartincu!!!');
                this.ctx.drawImage(image.image, image.x, image.y, image.width, image.height);  
                this.ctx.strokeStyle = image.strockeColor;
                this.ctx.strokeRect(image.x, image.y, image.width, image.height);
                this.ctx.fillStyle = image.strockeColor;
                this.ctx.fillRect(image.x-5/2,image.y-5/2,5,5);
                this.ctx.fillRect(image.x+image.width-5/2,image.y-5/2,5,5);
                this.ctx.fillRect(image.x-5/2,image.y+image.height-5/2,5,5);
                this.ctx.fillRect(image.x+image.width-5/2,image.y+image.height-5/2,5,5);
            }
        });
    }
}

export type TScene = Scene;

export default new Scene();