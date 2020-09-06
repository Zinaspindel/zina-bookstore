import { Injectable } from '@angular/core';
import { Book } from './book.module';
import { Categories } from '../shared/category.enum';
import { Subject } from 'rxjs';
import { Review } from '../shared/review.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {
constructor() { }
booksChanged = new Subject<Book[]>();
private books:Book[] = [];
  
  setBooks(books:Book[]){
    this.books = books;
    this.booksChanged.next(this.books.slice());
  }
  addBook(book:Book){
    this.books.push(book);
    this.booksChanged.next(this.books.slice());
  }
  updateBook(id:string,newBook:Book){
    id= id.replace('%20',' ');
    let bookToUpdate = this.books.filter((book) =>{
      return book.name == id;
    });
    let bookIndex = this.books.indexOf(bookToUpdate[0]);
    this.books[bookIndex] = newBook;
    this.booksChanged.next(this.books.slice());
  }
  deleteBook(id:string){
    id=id.replace('%20',' ');
    let bookToUpdate = this.books.filter(book =>{
      return book.name == id;
    });
    let bookIndex = this.books.indexOf(bookToUpdate[0]);
    this.books.splice(bookIndex,1);
    this.booksChanged.next(this.books.slice());
  }
  getBooks(){
    return this.books.slice();
  }
  getBooksOfCategory(category:Categories){
    let booksInCategory = this.books.filter(book=>{
      let bookcategories = book.category;
      if(bookcategories.indexOf(category)!=-1)
        return book; 
      })
      return booksInCategory;
  }
  getBook(id:string):Book{
    id = id.replace('%20',' ');
    let bookFound= this.books.filter((book) =>{
      return book.name == id;
    });
    return bookFound[0] as Book;
  }
  getBooksByName(name:string){
    let booksFound=[];
    for(let i=0;i<this.books.length;i++){
      if(this.books[i].name.replace(/\s/g, "").toLowerCase().search(name.replace(/\s/g, "").toLowerCase())!=-1)
        booksFound.push(this.books[i])
      if(this.books[i].author.replace(/\s/g, "").toLowerCase().search(name.replace(/\s/g, "").toLowerCase())!=-1){
        if(booksFound.indexOf(this.books[i])==-1)
          booksFound.push(this.books[i])
      }
    }
    return booksFound;
  }
  addCategoryToBook(book:Book,category:Categories){
    let bookToUpdate = this.books.indexOf(book);
    this.books[bookToUpdate].category.push(category);
    this.booksChanged.next(this.books.slice());
  }
  addReviewToBook(book:Book,review:Review){
    book.reviews.push(review);
    this.booksChanged.next(this.books.slice());
  }

}

