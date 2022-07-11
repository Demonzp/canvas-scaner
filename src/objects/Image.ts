import { TPoint } from '../types/geom';

export default class Image{
    image: HTMLImageElement;
    width = 0;
    height = 0;
    x = 0;
    y = 0;
    startPoint:TPoint = {x:0,y:0};
    x0 = 0;
    y0 = 0;
    x1 = 0;
    y1 = 0;
    defaultStrockeColor: string;
    strockeColor: string;
    selectStrokeColor:string = 'rgba(1,148,19,1)';

    constructor(image:HTMLImageElement, strockeColor:string, x: number = 10, y: number = 10, width:number = 0, height:number = 0){
        //console.log('image = ', image);
        this.x = x;
        this.y = y;
        this.image = image;

        if(width>0){
            this.width = width;
        }else{
            this.width = image.width;
        }
        
        if(height>0){
            this.height = height;
        }else{
            this.height = image.height;
        }
        
        
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

    setScaleX0(point:TPoint){
        const dx = point.x-this.startPoint.x;
        const dy = point.y-this.startPoint.y;
        const r = Math.sqrt((dx*dx)+(dy*dy));
        if(dx<0){
            this.x += dx;
            this.width += Math.abs(dx);
            this.height += Math.abs(dx);
            console.log('ZOOM_OUT');
        }else{
            this.x += dx;
            this.width -= dx;
            this.height -= dx;
            console.log('ZOOM_IN');
        }
        this.startPoint = point;
        this.calcRect();
        console.log('r = ', r);
        console.log('dx = ', dx, ' || dy = ', dy);
    }

    calcRect(){
        this.x0 = this.x;
        this.y0 = this.y;
        this.x1 = this.x + this.width;
        this.y1 = this.y + this.height;
    }

    private click(point:TPoint){
        this.startPoint = point;
        this.strockeColor = this.selectStrokeColor;
    }

    isOnClick(point:TPoint){
        if((point.x>=this.x0&&point.x<=this.x1)&&(point.y>=this.y0&&point.y<=this.y1)){
            //this.startPoint = point;
            //this.strockeColor = this.selectStrokeColor;
            this.click(point);
            return true;
        }
        this.deselect();
        return false;
    }

    isOnX0(point:TPoint){
        if((point.x>=this.x0-2&&point.x<=this.x0+2)&&(point.y>=this.y0-2&&point.y<=this.y0+2)){
            this.click(point);
            return true;
        }
        return false;
    }
}