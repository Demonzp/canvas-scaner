import Image from './Image';
import { TScene } from './Scene';

export default class PointEvents{
    canvas: HTMLCanvasElement;
    scene: TScene;
    isEvent: boolean = false;
    isPointerDown: boolean = false;
    selectImage: Image|undefined = undefined;
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
                this.scene.images.forEach((image)=>image.deselect());

                if(this.selectImage&&this.scene.setSelectImage){
                    this.scene.setSelectImage(null);
                }

                this.selectImage = this.scene.images.find((image)=>image.isOnClick({x:e.pageX, y:e.pageY}));
                
                if(this.selectImage&&this.scene.setSelectImage){
                    this.scene.setSelectImage(this.selectImage.image);
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
                this.isPointerDown = false;
            });

            this.canvas.addEventListener('pointermove', (e:PointerEvent)=>{
                //console.log('start move!!!');
                if(this.isPointerDown && this.selectImage){
                    this.selectImage.setPosition({x:e.pageX, y:e.pageY});
                    this.scene.render();
                    //console.log("x = ", e.pageX, " || y = ", e.pageY);
                    //console.log('start move!!!');
                    
                } 
            });

            this.isEvent = true;
        }
    }
}