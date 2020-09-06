import { Component, OnInit, Input } from '@angular/core';
import { Book } from 'src/app/book/book.module';
import { BookService } from 'src/app/book/book.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BooksCartService } from 'src/app/books-cart/books-cart.service';

@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.css']
})
export class BookItemComponent implements OnInit {
  @Input()book:Book;
  bookShortenName:string;
  constructor(private cartService:BooksCartService,private bookService:BookService, private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
    if(this.book.name.length>22){
      this.bookShortenName = this.book.name.slice(0,20)+'...'
    } else{
      this.bookShortenName = this.book.name;
    }
  }
  onLoadBook(){
    this.router.navigate(['/book',this.book.name],{relativeTo:this.route});
  }
  addToCart(book:Book){
    this.cartService.addBookToCart(book);
  }

}
