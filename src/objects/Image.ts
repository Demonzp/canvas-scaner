export default class Image{
    image: HTMLImageElement
    width = 0;
    height = 0;
    x = 0;
    y = 0;
    strockeColor: string;

    constructor(image:HTMLImageElement, strockeColor:string){
        console.log('image = ', image);
        this.image = image;
        this.width = image.width;
        this.height = image.height;
        this.strockeColor = strockeColor;
    }
}