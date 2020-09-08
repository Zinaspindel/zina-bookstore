import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { FormsModule }   from '@angular/forms';
import * as bootstrap from "bootstrap";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { BooksNavbarComponent } from './header/books-navbar/books-navbar/books-navbar.component';
import { GeneralNavbarComponent } from './header/general-navbar/general-navbar/general-navbar.component';
import { MainPageComponent } from './main-page/main-page.component';
import { SlidersComponent } from './main-page/sliders/sliders.component';
import { BooksDisplayComponent } from './main-page/books-display/books-display.component';
import { BookComponent } from './book/book.component';
import { BooksCarouselComponent } from './main-page/books-display/books-carousel/books-carousel.component';
import { BookItemComponent } from './main-page/books-display/books-carousel/book-item/book-item.component';
import { BookPageComponent } from './book-page/book-page.component';
import { ReviewsComponent } from './book-page/reviews/reviews.component';
import { CartComponent } from './header/books-navbar/cart/cart.component';
import { BooksCartComponent } from './books-cart/books-cart.component';
import { CategoryPageComponent } from './category-page/category-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegisterLoginComponent } from './register-login/register-login.component';
import { RegisterComponent } from './register-login/register/register.component';
import { AdminComponent } from './admin/admin.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { AddBookComponent } from './admin/add-book/add-book.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { ExampleComponent } from './example/example.component';
import { EditBookComponent } from './admin/edit-book/edit-book.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DropdownDirective,
    BooksNavbarComponent,
    GeneralNavbarComponent,
    MainPageComponent,
    SlidersComponent,
    BooksDisplayComponent,
    BookComponent,
    BooksCarouselComponent,
    BookItemComponent,
    BookPageComponent,
    ReviewsComponent,
    CartComponent,
    BooksCartComponent,
    CategoryPageComponent,
    PageNotFoundComponent,
    RegisterLoginComponent,
    RegisterComponent,
    AdminComponent,
    AddBookComponent,
    SearchResultsComponent,
    CartPageComponent,
    ExampleComponent,
    EditBookComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [{provide:HTTP_INTERCEPTORS, useClass:AuthInterceptorService,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
