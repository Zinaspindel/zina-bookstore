import { Component, OnInit } from '@angular/core';
import { BookService } from '../book/book.service';
import { Book } from '../book/book.module';
import { DataStorageService } from '../shared/data-storage.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  books:Book[];
  subscription:Subscription;
  showAddNewBookSection = false;
  showEditBook = false;
  constructor(private dataStorageService: DataStorageService,private bookService: BookService) { }

  ngOnInit(): void {
    this.books=this.bookService.getBooks();
    this.subscription = this.bookService.booksChanged.subscribe(
      (books:Book[])=>{
        this.books = books;
      })
  }
  onSaveData(){
    this.dataStorageService.storeBooks();
  }
  onFetchData(){
    this.dataStorageService.fetchBooks().subscribe();
  }
  onDelete(book:Book){
    this.bookService.deleteBook(book.name);
  }
  onAddNewBook(){
    this.showEditBook = false;
    this.showAddNewBookSection = !this.showAddNewBookSection;
  }
  // onEdit(book:Book){
  //   this.showAddNewBookSection = false;
  //   this.showEditBook = !this.showEditBook;

  // }
}
