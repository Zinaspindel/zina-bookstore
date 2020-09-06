import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { BookService } from '../book/book.service';
import { Book } from '../book/book.module';
import { map, tap, take, exhaustMap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private authService:AuthService,private http:HttpClient,private bookService:BookService) { }

  storeBooks(){
    const books = this.bookService.getBooks();
    this.http.put('https://ng-bookstore-project.firebaseio.com/books.json',books).subscribe(
      (response)=>{
        console.log(response);
      }
    );
  }
  fetchBooks(){
    return this.http
    .get<Book[]>(
      'https://ng-bookstore-project.firebaseio.com/books.json'
      ).pipe(
        map(books=>{
          return books.map(book=>{
            return {...book,reviews:book.reviews? book.reviews:[]};
          });
        }),
        tap(books=>{
           this.bookService.setBooks(books);
        })
      );
  }
}
