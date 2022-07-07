import Image from './Image';
import Mathem from './Mathem';

class Scene{
    canvas: HTMLCanvasElement|null = null;
    ctx: CanvasRenderingContext2D|null = null;
    images: Image[] = [];
    width = 0;
    height = 0;
    strockeColors: string[] = [];
    Mathem = new Mathem();
    isEvent = false;
    isPointerDown = false;

    init(canvas: HTMLCanvasElement, width: number=0, height: number=0){
        this.canvas = canvas;
        this.canvas.width = width;
        this.canvas.height = height;
        this.ctx = canvas.getContext('2d');
        this.width = width;
        this.height = height;
        if(!this.isEvent){
            this.canvas.addEventListener('pointerdown', ()=>{
                console.log('start Drag!!!');
                this.isPointerDown = true;
            });

            this.canvas.addEventListener('pointerup', ()=>{
                console.log('stop Drag!!!');
                this.isPointerDown = false;
            });

            this.canvas.addEventListener('pointermove', (e:PointerEvent)=>{
                //console.log('start move!!!');
                if(this.isPointerDown){
                    console.log("x = ", e.pageX, " || y = ", e.pageY);
                    //console.log('start move!!!');
                } 
            });
            this.isEvent = true;
        }
        
        this.render();
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

    randomRGBA(){
        return `rgba(${this.Mathem.between(0,255)},${this.Mathem.between(0,255)},${this.Mathem.between(0,255)},1)`;
    }

    render(){
        console.log('render!!!');
        this.images.forEach((image)=>{
            if(this.ctx){
                console.log('rendery Cartincu!!!');
                this.ctx.drawImage(image.image, 0, 0);  
                this.ctx.strokeStyle = image.strockeColor;
                this.ctx.strokeRect(image.x, image.y, image.width, image.height);
                this.ctx.fillStyle = image.strockeColor;
                this.ctx.fillRect(0,0,5,5);
                this.ctx.fillRect(0-5/2,image.height-5/2,5,5);
                this.ctx.fillRect(image.width-5/2,image.height-5/2,5,5);
                this.ctx.fillRect(image.width-5/2,0-5/2,5,5);
            }
        });
    }
}

export default new Scene();