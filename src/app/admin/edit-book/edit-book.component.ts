import { Component, OnInit, Input, ViewChild, ElementRef, Renderer2, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { BookService } from 'src/app/book/book.service';
import { NgForm } from '@angular/forms';
import { Categories } from 'src/app/shared/category.enum';
import { Book } from 'src/app/book/book.module';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit, AfterViewInit {
  @Output() editModeFinished= new EventEmitter<boolean>()
  @Input() book:Book;
  @ViewChild('bookname') bookname: ElementRef;
  @ViewChild('bookauthor') bookauthor: ElementRef;
  @ViewChild('bookimage') bookimage: ElementRef;
  @ViewChild('bookprice') bookprice: ElementRef;
  @ViewChild('bookdescription') bookdescription: ElementRef;
  
  constructor(private bookService: BookService,private renderer: Renderer2) { }

  ngOnInit(): void {
    $("#modalEditForm").modal('show');
  }
  ngAfterViewInit(){
    this.renderer.setAttribute(
      this.bookname.nativeElement,
      'placeholder',
      this.book.name,
    );
    this.renderer.setAttribute(
      this.bookauthor.nativeElement,
      'placeholder',
      this.book.author,
    );
    this.renderer.setAttribute(
      this.bookimage.nativeElement,
      'placeholder',
      this.book.imagePath,
    );
    this.renderer.setAttribute(
      this.bookprice.nativeElement,
      'placeholder',
      this.book.price+"",
    );
    this.renderer.setAttribute(
      this.bookdescription.nativeElement,
      'placeholder',
      this.book.description,
    );
  }
  onCloseEdit(){
    this.editModeFinished.emit(false);
  }
  onSubmit(form:NgForm){
    let categories = form.value.bookCategories;
    let enumCategories:Categories[] = this.enumSwitch(categories);

    const bookName = form.value.bookName==""?this.book.name:form.value.bookName;
    const bookAuthor = form.value.author==""?this.book.author:form.value.author;
    const bookImg = form.value.bookImg===""?this.book.imagePath:form.value.bookImg;
    const bookPrice = form.value.bookPrice==""?this.book.price:form.value.bookPrice;
    const bookCategories = enumCategories;
    const bookDescription = form.value.bookDescription==""?this.book.description:form.value.bookDescription;

    let newBook = new Book(bookName,bookAuthor,bookImg,bookPrice,bookCategories,bookDescription);
    this.bookService.addBook(newBook);
    form.reset();
    $("#modalEditForm").modal('hide');
    this.editModeFinished.emit(false);
    this.bookService.deleteBook(this.book.name);
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
