import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/book/book.service';
import { Book } from 'src/app/book/book.module';
import { Subscription } from 'rxjs';
import { Categories } from 'src/app/shared/category.enum';

@Component({
  selector: 'app-books-display',
  templateUrl: './books-display.component.html',
  styleUrls: ['./books-display.component.css']
})
export class BooksDisplayComponent implements OnInit {
  newBooks: Book[];
  popularBooks: Book[];
  categoryHeaders:string[]= ['Something new..','Popular right now'];
  categoryLinks:string[]=["/books/New","/books/Popular"];
  booksToPromot = [];

  subscription: Subscription;
  constructor(private bookService:BookService) { }

  ngOnInit(): void {
    this.subscription = this.bookService.booksChanged.subscribe(
      (books:Book[])=>{
        this.newBooks = this.bookService.getBooksOfCategory(Categories.New);
        this.popularBooks = this.bookService.getBooksOfCategory(Categories.Popular);
        this.booksToPromot = [this.newBooks,this.popularBooks];
      }
    )
    this.newBooks = this.bookService.getBooksOfCategory(Categories.New);
    this.popularBooks = this.bookService.getBooksOfCategory(Categories.Popular);
    this.booksToPromot = [this.newBooks,this.popularBooks];
  }
   ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
