import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Product } from 'src/app/shared/Models/product';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {
  productToEdit: Product = new Product();
  editProductForm!: FormGroup;

  categories = [
    {value:'mates', description:'Mates'},
    {value:'termos', description:'Termos'},
    {value:'bombillas', description:'Bombillas'},
    {value:'yerba mate', description:'Yerba Mate'},
  ];

  booleanOptions = [
    {value:false, description:'No'},
    {value:true, description:'Si'}
  ];

  constructor(public dialogRef: MatDialogRef<ProductDetailComponent>,
    @ Inject(MAT_DIALOG_DATA) public product: Product) {}

  ngOnInit() {
    this.editProductForm = new FormGroup({
      name: new FormControl(this.product.name, [Validators.required, Validators.maxLength(50)]),
      detail: new FormControl(this.product.detail, [Validators.required, Validators.maxLength(500)]),
      price: new FormControl(this.product.price, [Validators.required, Validators.pattern(/^([0-9]{1,6}(\.[0-9]{0,2})?)$/)]),
      category: new FormControl(this.product.category, Validators.required),
      isnew: new FormControl(this.product.isnew, Validators.required),
      issale: new FormControl(this.product.issale, Validators.required),
      imgsrc: new FormControl(this.product.imgsrc, [Validators.required, Validators.maxLength(100)]),
    });
  }

  get f() {
    return this.editProductForm.controls;
  }

  editProduct() {
    this.productToEdit.id = this.product.id;
    this.productToEdit.name = this.editProductForm?.get('name')?.value;
    this.productToEdit.detail = this.editProductForm?.get('detail')?.value;
    this.productToEdit.price = this.editProductForm?.get('price')?.value;
    this.productToEdit.category = this.editProductForm?.get('category')?.value;
    this.productToEdit.isnew = this.editProductForm?.get('isnew')?.value;
    this.productToEdit.isnew = this.editProductForm?.get('issale')?.value;
    this.productToEdit.imgsrc = this.editProductForm?.get('imgsrc')?.value;
    this.dialogRef.close(this.productToEdit);
  }

  close() {
    this.dialogRef.close();
  }
}
