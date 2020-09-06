import { Component, OnInit } from '@angular/core';
import { Book } from '../book/book.module';
import { BookService } from '../book/book.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BooksCartService } from '../books-cart/books-cart.service';

@Component({
  selector: 'app-book-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.css']
})
export class BookPageComponent implements OnInit {
  book:Book;
  constructor(private cartService:BooksCartService, private bookService:BookService,private route:ActivatedRoute, private router:Router) { }
  ngOnInit(): void {
    let bookId = this.route.snapshot.params['id'];
    this.book = this.bookService.getBook(bookId);
    console.log(this.book);
    this.route.params
    .subscribe(
      (params:Params)=>{
        let bookId = params['id'];
        bookId.replace('%20',' ');
        console.log(bookId);
        let books = this.bookService.getBooks();
        console.log(books);
        let bookFound= books.filter((book) =>{
          return book.name == bookId;
        });
        if(bookFound.length==0)
          this.router.navigate(['/book-not-found']);
        
        this.book = this.bookService.getBook(params['id']);
      }
    )
  }
  addToCart(book:Book){
    this.cartService.addBookToCart(book);
  }
}
