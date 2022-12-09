export class Product {
    id: number;
    name: string;
    detail: string;
    price: number;
    category: string;
    isnew: boolean;
    issale: boolean;
    imgsrc: string;

    constructor() {
        this.id = 0;
        this.name = "";
        this.detail = "";
        this.price = 0;
        this.category = "";
        this.isnew = false;
        this.issale = false;
        this.imgsrc = "";
      }
}
