import { Component, OnInit } from '@angular/core';
import { BooksCartService } from '../books-cart/books-cart.service';
import { Book } from '../book/book.module';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
  booksInCart:Book[];
  totalPrice:string;

  subscription:Subscription;
  constructor(private cartService:BooksCartService) { }

  ngOnInit(): void {
    this.subscription = this.cartService.booksCartChanged.subscribe(
      (books:Book[])=>{
        this.booksInCart = this.cartService.getBooksCart();
        this.totalPrice = (this.cartService.getTotalPrice()+"").slice(0,5);
      }
    );
    this.booksInCart = this.cartService.getBooksCart();
    this.totalPrice = (this.cartService.getTotalPrice()+"").slice(0,5);
  }
  removeBookFromCart(book:Book){
    this.cartService.removeBookFromCart(book);
  }

}
