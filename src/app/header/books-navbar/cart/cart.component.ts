import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/book/book.module';
import { BooksCartService } from 'src/app/books-cart/books-cart.service';
import { Subscription } from 'rxjs';
import { Categories } from 'src/app/shared/category.enum';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart:Book[];
  subscription: Subscription;
  constructor(private booksCartService:BooksCartService) { }

  ngOnInit(): void {
    this.subscription = this.booksCartService.booksCartChanged.subscribe(
      (books:Book[])=>{
        this.cart = books;
      }
    )
    this.cart= this.booksCartService.getBooksCart();
  }
  removeBookFromCart(book){
    this.booksCartService.removeBookFromCart(book);
  }

}
