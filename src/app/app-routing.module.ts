import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';
import { ProductsListComponent } from './products/products-list/products-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }
  ,{ path: 'login', component: LoginComponent }
  ,{ path: 'home', component: HomeComponent }
  ,{ path: 'productsList', component: ProductsListComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
