import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Router } from '@angular/router';

@Component({
  selector: 'app-books-navbar',
  templateUrl: './books-navbar.component.html',
  styleUrls: ['./books-navbar.component.css']
})
export class BooksNavbarComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  onSubmit(form:NgForm){
    const searchValue = form.value.search;
    console.log(searchValue);
    this.router.navigate(["/search",searchValue]);
  }
  onSearchChange($event:string){
    const searchValue = $event;
    this.router.navigate(["/search",searchValue]);
  }

}
