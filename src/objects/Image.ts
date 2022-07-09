import { TPoint } from '../types/geom';

export default class Image{
    image: HTMLImageElement;
    width = 0;
    height = 0;
    x = 10;
    y = 10;
    startPoint:TPoint = {x:0,y:0};
    x0 = 0;
    y0 = 0;
    x1 = 0;
    y1 = 0;
    defaultStrockeColor: string;
    strockeColor: string;
    selectStrokeColor:string = 'rgba(1,148,19,1)';

    constructor(image:HTMLImageElement, strockeColor:string){
        //console.log('image = ', image);
        this.image = image;
        this.width = image.width;
        this.height = image.height;
        
        this.strockeColor = strockeColor;
        this.defaultStrockeColor = strockeColor;
        
        this.calcRect();
    }

    deselect(){
        this.strockeColor = this.defaultStrockeColor;
    }

    setPosition(point: TPoint){
        //if(this.startPoint.x>point.x){
        this.x += point.x-this.startPoint.x;
        //}
        this.y += point.y-this.startPoint.y;
        this.startPoint = point;
        this.calcRect();
        //this.x = point.x;
        //this.y = point.y;
    }

    calcRect(){
        this.x0 = this.x;
        this.y0 = this.y;
        this.x1 = this.x + this.image.width;
        this.y1 = this.y + this.image.height;
    }

    isOnClick(point:TPoint){
        if((point.x>=this.x0&&point.x<=this.x1)&&(point.y>=this.y0&&point.y<=this.y1)){
            this.startPoint = point;
            this.strockeColor = this.selectStrokeColor;
            return true;
        }
        this.deselect();
        return false;
    }
}