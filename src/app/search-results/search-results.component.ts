import { Component, OnInit } from '@angular/core';
import { Book } from '../book/book.module';
import { BookService } from '../book/book.service';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { BooksCartService } from '../books-cart/books-cart.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  booksFound:Book[];
  noResults = false;
  constructor(private router:Router,private cartService:BooksCartService,private route:ActivatedRoute,private bookService:BookService) { }

  ngOnInit(): void {
    let searchValue = this.route.snapshot.params['value'];
    searchValue.replace('%20',' ');
    this.booksFound=this.bookService.getBooksByName(searchValue);
    this.route.params
    .subscribe(
      (params:Params)=>{
        let searchValue = params['value'];
        searchValue.replace('%20',' ');
        this.booksFound= this.bookService.getBooksByName(searchValue);
        if(this.booksFound.length==0)
          this.noResults = true;
      });
  }
  addToCart(book:Book){
    this.cartService.addBookToCart(book);
  };
  onLoadBook(book:Book){
    this.router.navigate(["book",book.name]);
  };
  cleanSearchValue(value:string){
    value.replace('%20',' ');
    
    return value;
  }
}
