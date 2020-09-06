import { Component, OnInit, Input } from '@angular/core';
import { Categories } from '../shared/category.enum';
import { Book } from '../book/book.module';
import { BookService } from '../book/book.service';
import { Params, Router, ActivatedRoute } from '@angular/router';
import { BooksCartService } from '../books-cart/books-cart.service';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.css']
})
export class CategoryPageComponent implements OnInit {
  booksToShow:Book[]=[];
  constructor(private cartService:BooksCartService,private bookService:BookService,private route:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    let category = this.route.snapshot.params['category'];
    this.booksToShow = this.bookService.getBooksOfCategory((this.enumSwitch(category)));
    this.route.params
    .subscribe(
      (params:Params)=>{
        let category = this.route.snapshot.params['category'];
        this.booksToShow = this.bookService.getBooksOfCategory((this.enumSwitch(category)));
        if(this.booksToShow.length==0)
          this.router.navigate(['/book-not-found']);
      }
    )
  }
  onLoadBook(book:Book){
    this.router.navigate(["/book",book.name]);
  }
  addToCart(book:Book){
    this.cartService.addBookToCart(book);
  }
  enumSwitch(category){
      switch(category){
        case 'Travel':
          return Categories.Travel;
        case 'Sci-Fi':
          return Categories.Scifi;
        case 'Cooking':
          return Categories.Cooking;
        case 'Romance':
          return Categories.Romance;
        case 'Autobiography':
          return Categories.Autobiogrophy;
        case 'Horror':
          return Categories.Horror;
        case 'Popular':
          return Categories.Popular;
        case 'New':
          return Categories.New;
        case 'Philosophy':
          return Categories.Philosophy;
        case 'Science':
          return Categories.Science;
        case 'Enviroment':
          return Categories.Environment;
        case 'Children':
          return Categories.Children;
    };
  }
}
