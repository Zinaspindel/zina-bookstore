import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from  '@angular/router'
import { Book } from './book.module';
import { DataStorageService } from '../shared/data-storage.service';
import { BookService } from './book.service';

@Injectable({providedIn: 'root'})
export class BookResolverService implements Resolve<Book[]>{
    constructor(private bookService:BookService,private dataStorageService:DataStorageService){}
    resolve(route:ActivatedRouteSnapshot,state:RouterStateSnapshot){
        const books = this.bookService.getBooks();
        if(books.length===0){
        return this.dataStorageService.fetchBooks();
        }else{
            return books;
        }
    }
}