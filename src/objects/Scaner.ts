import { createId } from '../services/generId';
import { TScanDot } from '../types/geom';
import { TScene } from './Scene';

export default class Scaner{
    scene: TScene;
    ctx: CanvasRenderingContext2D;
    x = 0;
    y = 0;
    defaultStepY = 3;
    stepX = 3;
    stepY = 1;
    dots:TScanDot[] = [];
    circle = new Path2D();

    constructor(scene: TScene){
        this.scene = scene;
        this.ctx = scene.ctx!;
    }

    scane(){
        setTimeout(()=>{
            const pixel = this.ctx.getImageData(this.x,this.y,1,1);
            const data = pixel.data;

            const rgba = `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3]/255})`;

            //console.log('rgba = ', rgba);
            if(rgba==='rgba(0, 0, 0, 1)'){
                this.dots.push({
                    id: createId(8),
                    x: this.x,
                    y: this.y
                });

                this.circle.moveTo(this.x, this.y);
                this.circle.arc(this.x, this.y, 5, 0, 2 * Math.PI);
                this.ctx.fillStyle = 'red';
                this.ctx.fill(this.circle);

                this.x+=this.stepX;
                this.stepY = this.defaultStepY;
            }else{
                this.x+= 1;
                if(this.x>=this.scene.width && this.y<this.scene.height){
                    if(this.y<this.scene.height){
                        this.x = 0;
                    }
                    this.y += this.stepY;
                    this.stepY = this.defaultStepY;
                }
            }

            if(this.y<this.scene.height&&this.x<this.scene.width){
                this.scane();
            }

            if(this.y>=this.scene.height&&this.x>=this.scene.width){
                console.log('OTSKANIL!!!!');
            }
            
        },0);
        
    }
}