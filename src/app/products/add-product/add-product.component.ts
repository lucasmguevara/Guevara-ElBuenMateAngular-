import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Product } from 'src/app/shared/Models/product';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  productToAdd: Product = new Product();
  addProductForm!: FormGroup;

  categories = [
    { value: 'mates', description: 'Mates' },
    { value: 'termos', description: 'Termos' },
    { value: 'bombillas', description: 'Bombillas' },
    { value: 'yerba mate', description: 'Yerba Mate' },
  ];

  booleanOptions = [
    { value: false, description: 'No' },
    { value: true, description: 'Si' }
  ];

  constructor(public dialogRef: MatDialogRef<AddProductComponent>,
    @Inject(MAT_DIALOG_DATA) public product: Product) { }

  ngOnInit() {
    this.addProductForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      detail: new FormControl('', [Validators.required, Validators.maxLength(500)]),
      price: new FormControl('', [Validators.required, Validators.pattern(/^([0-9]{1,6}(\.[0-9]{0,2})?)$/)]),
      category: new FormControl('', Validators.required),
      isnew: new FormControl(false, Validators.required),
      issale: new FormControl(false, Validators.required),
      imgsrc: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    });
  
  }

  get f() {
    return this.addProductForm.controls;
  }

  addProduct() {
    this.productToAdd.name = this.addProductForm?.get('name')?.value;
    this.productToAdd.detail = this.addProductForm?.get('detail')?.value;
    this.productToAdd.price = this.addProductForm?.get('price')?.value;
    this.productToAdd.category = this.addProductForm?.get('category')?.value;
    this.productToAdd.isnew = this.addProductForm?.get('isnew')?.value;
    this.productToAdd.isnew = this.addProductForm?.get('issale')?.value;
    this.productToAdd.imgsrc = this.addProductForm?.get('imgsrc')?.value;
    this.dialogRef.close(this.productToAdd);
  }

  close() {
    this.dialogRef.close();
  }

}
