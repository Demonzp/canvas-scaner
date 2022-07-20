import { createId } from '../services/generId';
import { TColorData, TPoint, TScanDot } from '../types/geom';
import { TScene } from './Scene';

export default class Scaner{
    scene: TScene;
    ctx: CanvasRenderingContext2D;
    x = 0;
    y = 0;
    step = 4;
    // defaultStepY = 6;
    // stepX = 8;
    // stepY = 1;
    dots:TScanDot[] = [];
    circle: Path2D|null = null;
    circle2: Path2D|null = null;

    constructor(scene: TScene){
        this.scene = scene;
        this.ctx = scene.ctx!;
    }

    getColor(point: TPoint):TColorData{
        const pixel = this.ctx.getImageData(point.x,point.y,1,1);
        const data = pixel.data;

        const rgba = `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3]/255})`;
        return {
            rgba,
            r: data[0],
            g: data[1],
            b: data[2],
            a: data[3]/255
        };
    }

    compare(x:number,y:number){
        const colorData = this.getColor({x,y});
        //console.log('rgba = ', rgba);
        if(colorData.rgba==='rgba(0, 0, 0, 1)'
            ||(colorData.r<80&&colorData.g<80&&colorData.b<80&&colorData.a>=1)
        ){
            return true;
        }
        // if(rgba==='rgba(0, 0, 0, 1)'){
            

        //     return true;
        //     //this.x+=this.stepX;
        //     //this.stepY = this.defaultStepY;
        // }
        return false;
    }

    scanePoint(point: TPoint):TColorData{
        return this.getColor(point);
    }

    scane(){
        this.circle = new Path2D();
        //this.circle2 = new Path2D();
        for(let y=0; y<=this.scene.height; y++){
            for(let x=0; x<=this.scene.width; x++){
                const result = this.compare(x, y);
                let compY = y;
                let isRender = true;
                if(result){
                    const resultPrevX = this.compare(x-1,y);
                    if(!resultPrevX){
                        x+=2;
                    }

                    let resultPrevY = this.compare(x,y-1);
                    if(!resultPrevY){
                        compY+=2;
                    }

                    //const resultNextX = this.compare(x+1,compY);

                    const dotPrev = this.dots.find(dot=>{
                        if((dot.x>=x-this.step&&dot.x<=x+this.step)&&(dot.y>=compY-this.step&&dot.y<=compY)){
                            return true;
                        }
                        return false;
                    });

                    if(dotPrev){
                        //console.log('ne dolghe risovat!!!!!!!! = ', resultNextX);
                        //if(resultNextX){
                            isRender = false;
                        //}
                    }

                    if(isRender){
                        // if(!resultNextX){
                        //     x-=2;
                        // }
                        this.dots.push({
                            id: createId(8),
                            x,
                            y:compY
                        });
            
                        // this.circle.moveTo(x, compY);
                        // this.circle.arc(x, compY, 5, 0, 2 * Math.PI);
                        // this.ctx.fillStyle = 'red';
                        // this.ctx.fill(this.circle);
    
                        x = x+this.step;
                        let stepX = this.step;
                        let isTrue = this.compare(x,compY);
                        while (!isTrue){
    
                            stepX--;
                            x--;
    
                            if(this.compare(x,y) || stepX<=0){
                                isTrue = true;
                                x--;
                            }
                        }
                    }
                    //this.stepY = this.defaultStepY;
                }
                // else{
                //     this.ctx.fillStyle = 'yellow';
                //     this.ctx.fillRect(x,compY,1,1);
                // }
            }
            // if(this.stepY===this.defaultStepY){
            //     y = y+this.stepY;
            //     this.stepY = this.defaultStepY;
            // }
        }

        this.dots.forEach(dot=>{
            this.circle!.moveTo(dot.x, dot.y);
            this.circle!.arc(dot.x, dot.y, 5, 0, 2 * Math.PI);
            this.ctx.fillStyle = 'red';
            this.ctx.fill(this.circle!);
        });
        console.log('CONSHIL!!!!!!!!!!!!!!');
        this.scene.setComplateScane!(this.dots);
        this.dots = [];
    }
}