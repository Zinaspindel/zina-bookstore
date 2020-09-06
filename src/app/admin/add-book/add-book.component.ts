import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Book } from 'src/app/book/book.module';
import { Categories } from 'src/app/shared/category.enum';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { BookService } from 'src/app/book/book.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  constructor(private dataStorageService: DataStorageService,private bookService: BookService) { }

  ngOnInit(): void {
  }
  onSubmit(form:NgForm){
    let categories = form.value.bookCategories;
    let enumCategories:Categories[] = this.enumSwitch(categories);
    
    const bookName = form.value.bookName;
    const bookAuthor = form.value.author;
    const bookImg = form.value.bookImg;
    const bookPrice = form.value.bookPrice;
    const bookCategories = enumCategories;
    const bookDescription = form.value.bookDescription;

    let newBook = new Book(bookName,bookAuthor,bookImg,bookPrice,bookCategories,bookDescription);
    this.bookService.addBook(newBook);
    form.reset();
  }
  enumSwitch(categories){
    let enumCategories:Categories[]=[];
    for(let category of categories){
      switch(category){
        case 'Travel':
          enumCategories.push(Categories.Travel);
          break;
        case 'Sci-Fi':
          enumCategories.push(Categories.Scifi);
          break;
        case 'Cooking':
          enumCategories.push(Categories.Cooking);
          break;
        case 'Romance':
          enumCategories.push(Categories.Romance);
          break;
        case 'Autobiography':
          enumCategories.push(Categories.Autobiogrophy);
          break;
        case 'Horror':
          enumCategories.push(Categories.Horror);
          break;
        case 'Popular':
          enumCategories.push(Categories.Popular);
          break;
        case 'New':
          enumCategories.push(Categories.New);
          break;
        case 'Philosophy':
          enumCategories.push(Categories.Philosophy);
          break;
        case 'Science':
          enumCategories.push(Categories.Science);
          break;
        case 'Children':
          enumCategories.push(Categories.Children);
          break;
    }};
    return enumCategories;
  }
}
