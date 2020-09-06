import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { BookPageComponent } from './book-page/book-page.component';
import { CategoryPageComponent } from './category-page/category-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './auth/auth.guard';
import { RegisterLoginComponent } from './register-login/register-login.component';
import { RegisterComponent } from './register-login/register/register.component';
import { AdminComponent } from './admin/admin.component';
import { BookResolverService } from './book/book-resolver.service';
import { AdminGuard } from './auth/admin.guard';
import { SearchResultsComponent } from './search-results/search-results.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { ExampleComponent } from './example/example.component';


const appRoutes: Routes=[
  {path: '', component: MainPageComponent,resolve:[BookResolverService]},
  {path: 'book/:id', component:BookPageComponent,resolve:[BookResolverService]},
  {path: 'books/:category', component:CategoryPageComponent,resolve:[BookResolverService]},
  {path: 'login',component:RegisterLoginComponent},
  {path: 'register',component:RegisterComponent},
  {path: 'search/:value',component:SearchResultsComponent,resolve:[BookResolverService]},
  {path: 'admin',component:AdminComponent,resolve:[BookResolverService],canActivate:[AuthGuard,AdminGuard]},
  {path: 'cart',component:CartPageComponent,resolve:[BookResolverService]},
  {path: 'example',component:ExampleComponent},
  {path:'**',component:PageNotFoundComponent}
];

@NgModule({
  providers:[AuthGuard],
  imports: [RouterModule.forRoot(appRoutes,{ scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
