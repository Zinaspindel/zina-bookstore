import { Component, OnInit, Input } from '@angular/core';
import { Review } from 'src/app/shared/review.model';
import { AuthService } from 'src/app/auth/auth.service';
import { NgForm } from '@angular/forms';
import { Book } from 'src/app/book/book.module';
import { registerLocaleData } from '@angular/common';
import { BookService } from 'src/app/book/book.service';
import { Subscription } from 'rxjs';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {
  @Input() book: Book;
  bookReviews:Review[];
  subscription:Subscription;
  username:string;
  isAuthenticated = false;
  constructor(private authService:AuthService, private bookService:BookService, private storageService:DataStorageService) { }

  ngOnInit(): void {
    this.bookReviews = this.book.reviews;
    // this.subscription = this.bookService.booksChanged.subscribe(
    //   (books:Book[])=>{
    //     let currentBook= books.indexOf(this.book);
    //     this.book=books[currentBook];
    // });
    this.authService.user.subscribe(user=>{
      this.isAuthenticated = !!user;
      if(this.isAuthenticated)
        this.username = this.authService.getUsername();
    });

  }
  onSubmit(form:NgForm){
    const rating = parseInt(form.value.rating);
    const review = form.value.review;
    const writtenBy = this.username;
    const newReview = new Review(writtenBy,review,rating);

    this.bookService.addReviewToBook(this.book,newReview);
    this.storageService.storeBooks();
  }

}
