import { createId } from '../services/generId';
import { TColorData, TPoint, TScanDot } from '../types/geom';
import { TScene } from './Scene';

export default class Scaner{
    scene: TScene;
    ctx: CanvasRenderingContext2D;
    x = 0;
    y = 0;
    step = 9;
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

    scanerImgLikePixel(){
        this.circle = new Path2D();
        const x0 = 0;
        const y0 = 0;
        const step = 8;
        let i = 0;
        let j = 0;

        const width = 540;
        const height = 242;
        const renderDots = [];
        //let startX = -1;
        //let startY = -1;
        for (let y = y0; y < height; y+=step) {
            console.log(y,'||',j);
            for (let x = x0; x < width; x+=step) {
             const result = this.compare(x, y);
             if(result){
                this.dots.push({
                    id: createId(8),
                    x:i,
                    y:j,
                    angle: 0
                });
                renderDots.push({
                    id: createId(8),
                    x,
                    y
                });
             }
             i++;
            }
            i=0;
            j++;
        }

        const startX = Math.min.apply(null, this.dots.map(obj=>{return obj.x}));
        const startY = Math.min.apply(null, this.dots.map(obj=>{return obj.y}));

        this.dots = this.dots.map((obj)=>{
            return{
                id: obj.id,
                x: obj.x-startX,
                y: obj.y-startY,
                angle:0
            }
        });
        
        console.log('CONSHIL!!!!!!!!!!!!!! = scanerImgLikePixel', this.dots);

        renderDots.forEach(dot=>{
            this.circle!.moveTo(dot.x, dot.y);
            this.circle!.arc(dot.x, dot.y, 5, 0, 2 * Math.PI);
            this.ctx.fillStyle = 'red';
            this.ctx.fill(this.circle!);
        });
        
        this.scene.setComplateScane!(this.dots);
        this.dots = [];
    }

    scaneText(){
        this.circle = new Path2D();
        const text = "ДЯКУЮ";
        const measureText = this.ctx!.measureText(text);
        console.log('textSizes = ', measureText);
        console.log('textSizes = ', Math.ceil(56/10));
        const x0 = 12;
        const y0 = 80-measureText.actualBoundingBoxAscent;
        const step = Math.ceil(measureText.actualBoundingBoxAscent/10);
        let i = 0;
        let j = 0;

        const width = 12 + measureText.width+measureText.actualBoundingBoxDescent;
        const height = 80 + measureText.actualBoundingBoxAscent;
        const renderDots = [];
        console.log('step = ', step);
        for (let y = y0; y < height; y+=7) {
           for (let x = x0; x < width; x+=7) {
            const result = this.compare(x, y);
            if(result){
                this.dots.push({
                    id: createId(8),
                    x:i,
                    y:j,
                    angle:0
                });
                renderDots.push({
                    id: createId(8),
                    x,
                    y
                });
            }
            i++;
           }
           i=0;
           j++;
        }
        console.log('CONSHIL!!!!!!!!!!!!!! = ', this.dots);

        renderDots.forEach(dot=>{
            this.circle!.moveTo(dot.x, dot.y);
            this.circle!.arc(dot.x, dot.y, 5, 0, 2 * Math.PI);
            this.ctx.fillStyle = 'red';
            this.ctx.fill(this.circle!);
        });
        
        this.scene.setComplateScane!(this.dots);
        this.dots = [];
    }

    scanePolygon(){
        this.circle = new Path2D();
        const widthStep = 47;
        const heightStep = 25;
        const numCols = this.scene.width/widthStep;
        const numRows = this.scene.height/heightStep;
        let x = 0;
        let y = 0;

        const arr = [];
        const renderDots = [];
        for (let i = 0; i < numCols; i++) {
            for (let j = 0; j < numRows; j++) {
                const x1 = x;
                const x2 = x + widthStep;
                const y1 = y;
                const y2 = y + heightStep;

                // x1, y1,
                // x2, y1,
                // x1, y2,

                // x1, y2,
                // x2, y1,
                // x2, y2,
                renderDots.push({
                    id: createId(12),
                    x,
                    y
                });
                arr.push(x1,y1,x2,y1,x1,y2,x1,y2,x2,y1,x2,y2);
                y += heightStep;
            }

            y = 0;

            x += widthStep;
        }

        renderDots.forEach(dot=>{
            this.circle!.moveTo(dot.x, dot.y);
            this.circle!.arc(dot.x, dot.y, 5, 0, 2 * Math.PI);
            this.ctx.fillStyle = 'red';
            this.ctx.fill(this.circle!);
        });
        console.log('arr.length = ', arr.length);
        this.scene.setComplateScane2!(arr);

    }

    simpleScane(){
        const stepX = 7;
        const stepY = 7;
        this.circle = new Path2D();
        let isDot = false;
        for(let y=0; y<=this.scene.height; y++){
            for(let x=0; x<=this.scene.width; x++){
                
                const result = this.compare(x, y);
                if(result){
                    const maxStep = stepX/2;
                    let step = maxStep;
                    let i = 1;
                    let isWhile = true;
                    let toBack = false;
                    while (isWhile){
                        let tempX = x+i;
                        const res = this.compare(tempX, y);
                        if(!res){
                            toBack = true;
                            isWhile = false;
                        }
                        if(i>=maxStep){
                            isWhile = false;
                        }
                        i++;
                        step--;
                    }
                    //let tempY = y+1;
                    if(toBack){
                        this.dots.push({
                            id: createId(8),
                            x:x-step,
                            y:y,
                            angle:0
                        });
                    }else{
                        this.dots.push({
                            id: createId(8),
                            x:x+stepX/2,
                            y:y,
                            angle:0
                        });
                    }
                    isDot = true;
                    x+=stepX;
                }

            }

            if(isDot){
                isDot = false;
                y+=stepY;
            }
        }

        this.dots.forEach(dot=>{
            this.circle!.moveTo(dot.x, dot.y);
            this.circle!.arc(dot.x, dot.y, 3, 0, 2 * Math.PI);
            this.ctx.fillStyle = 'red';
            this.ctx.fill(this.circle!);
        });

        console.log('dots = ', this.dots);
        this.scene.setComplateScane!(this.dots);
        this.dots = [];

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
                            y:compY,
                            angle:0
                        });
    
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