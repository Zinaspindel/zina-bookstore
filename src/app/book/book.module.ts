import { Categories } from '../shared/category.enum';
import { Review } from '../shared/review.model';

export class Book { 
  public name: string;
  public author: string;
  public imagePath: string;
  public price: number;
  public category: Categories[];
  public description: string;
  public reviews?:Review[];


  constructor(name:string, author:string,imgPath:string,price:number, category:Categories[],description:string,reviews?:Review[]){
    this.name = name;
    this.author = author;
    this.imagePath = imgPath;
    this.price = price;
    this.category = category;
    this.description = description;
    this.reviews = reviews;
  }
}


