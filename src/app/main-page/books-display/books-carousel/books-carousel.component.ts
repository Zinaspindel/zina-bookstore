import { Component, OnInit, Input } from '@angular/core';
import { Book } from 'src/app/book/book.module';

@Component({
  selector: 'app-books-carousel',
  templateUrl: './books-carousel.component.html',
  styleUrls: ['./books-carousel.component.css']
})
export class BooksCarouselComponent implements OnInit {
  @Input() category: Book[];
  booksInCategory:Book[]=[]
  constructor() { }
  
  ngOnInit(): void {
    this.booksInCategory = this.category.slice(0,4);
  }

}
