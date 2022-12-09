import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../Models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {  

  readonly apiUrl = "http://localhost:3004/api/products/";

  constructor(private http: HttpClient) { }

  getAllProducts() {
    return this.http.get(this.apiUrl+'getAll');
  }

  getProductById(id:number) {
    return this.http.get(this.apiUrl+ `getProductById?id=${id}`);
  }

  createProduct(product:Product) {   
    return this.http.post(this.apiUrl+ `createProduct`, product);
  }

  updateProduct(product:Product) {
    return this.http.put(this.apiUrl+ `updateProduct`, product);
  }

  deleteProductById(id:number) {
    return this.http.delete(this.apiUrl+ `deleteProductById?id=${id}`);
  }

  deleteAllProducts() {
    return this.http.delete(this.apiUrl+ `deleteAllProducts`);
  }
}
