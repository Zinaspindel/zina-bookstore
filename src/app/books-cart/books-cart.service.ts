import { Injectable } from '@angular/core';
import { Book } from '../book/book.module';
import { Subject } from 'rxjs/internal/Subject';
import { Categories } from '../shared/category.enum';

@Injectable({
    providedIn: 'root'
})
export class BooksCartService{
    booksCartChanged = new Subject<Book[]>();  
    private booksCart:Book[]= [];
    
    getBooksCart(){
        return this.booksCart;
    }
    addBookToCart(book:Book){
        this.booksCart.push(book);
        this.booksCartChanged.next(this.booksCart.slice());
    }
    removeBookFromCart(book:Book){
        let bookToRemove = this.booksCart.indexOf(book);
        this.booksCart.splice(bookToRemove,1);
        this.booksCartChanged.next(this.booksCart.slice());
    }
    getTotalPrice():number{
        let total = 0;
        for(let i=0; i<this.booksCart.length;i++){
            total+=this.booksCart[i].price;
        }
        return total;
    }
    textAbstract(text, length) {
        if (text == null) {
            return "";
        }
        if (text.length <= length) {
            return text;
        }
        text = text.substring(0, length);
        let last = text.lastIndexOf(" ");
        text = text.substring(0, last);
        return text + "...";
    }
    
}