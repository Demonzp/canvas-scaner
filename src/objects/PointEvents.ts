import Image from './Image';
import { TScene } from './Scene';

type TSelectImage = Image|undefined;

export default class PointEvents{
    canvas: HTMLCanvasElement;
    scene: TScene;
    isEvent: boolean = false;
    isPointerDown: boolean = false;
    selectImage:TSelectImage  = undefined;
    isOnX0 = false;
    //timerClick: number = 200;

    constructor(canvas:HTMLCanvasElement, scene: TScene){
        this.canvas = canvas;
        this.scene = scene;

        this.init();
    }

    init(){
        if(!this.isEvent){

            this.canvas.addEventListener('pointerdown', (e:PointerEvent)=>{
                console.log('start Drag!!!');
                this.isPointerDown = true;
                const point = {x:e.pageX, y:e.pageY};
                this.scene.images.forEach((image)=>image.deselect());

                if(this.selectImage&&this.scene.setSelectImage){
                    this.scene.setSelectImage(null);
                }

                let selectImage: TSelectImage = undefined;
                selectImage = this.scene.images.find(image=>image.isOnX0(point));

                if(selectImage&&this.scene.setSelectImage){
                    this.isOnX0 = true;
                    this.scene.setSelectImage(selectImage.image);
                    this.selectImage = selectImage;
                }

                selectImage = this.scene.images.find((image)=>image.isOnClick(point));
                
                if(selectImage&&this.scene.setSelectImage){
                    this.scene.setSelectImage(selectImage.image);
                    this.selectImage = selectImage;
                }
                
                this.scene.render();
            });

            this.canvas.addEventListener('pointerup', ()=>{
                console.log('stop Drag!!!');
                // if(this.selectImage){
                //     this.selectImage.deselect();
                //     this.scene.render();
                // }
                //this.selectImage = undefined;
                this.isOnX0 = false;
                this.isPointerDown = false;
            });

            this.canvas.addEventListener('pointermove', (e:PointerEvent)=>{
                //console.log('start move!!!');
                const point = {x:e.pageX, y:e.pageY};
                let isOnX0 = false;
                if(this.scene.images.find(image=>image.isOnX0(point))){
                    isOnX0 = true;
                    this.canvas.style.cursor = 'nwse-resize';
                }

                if(this.isPointerDown && this.selectImage){
                    console.log('this.isOnX0 = ', this.isOnX0);
                    if(this.isOnX0){
                        this.selectImage.setScaleX0(point);
                    }else{
                        this.selectImage.setPosition(point);
                    }
                    
                    this.scene.render();
                    //console.log("x = ", e.pageX, " || y = ", e.pageY);
                    //console.log('start move!!!');
                    
                }

                if(!this.isOnX0&&!isOnX0){
                    this.canvas.style.cursor = 'default';
                }
                
                //if(!this.isPointerDown){
                
                //}
            });

            this.isEvent = true;
        }
    }
}