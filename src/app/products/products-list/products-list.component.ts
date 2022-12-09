import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { Product } from 'src/app/shared/Models/product';
import { AuthService } from 'src/app/shared/Services/auth.service';
import { ProductsService } from 'src/app/shared/Services/products.service';
import swal from 'sweetalert2';
import { AddProductComponent } from '../add-product/add-product.component';
import { ProductDetailComponent } from '../product-detail/product-detail.component';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent {
  productsList: Product[] = [];
  columnas: string[] = ['Código', 'Nombre', 'Precio', 'Editar', 'Eliminar'];
  productSelect: Product = new Product();


  @ViewChild(MatTable) productsTable!: MatTable<Product>;

  constructor(private authService: AuthService,
    private productsService: ProductsService,
    public addProductDialog: MatDialog,
    public editProductDialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.productsService.getAllProducts().
      subscribe(result => {
        this.productsList = result as Product[];
        if (this.productsList.length == 0) {
          swal.fire('Sin Resultados', 'No se encontraron productos cargados', 'info');
        }
      });
  }

  openDialogCreateProduct() {
    const dialog1 = this.addProductDialog.open(AddProductComponent, {
      width: '600px',
      data: new Product()
    });

    dialog1.afterClosed().subscribe(prod => {
      if (prod != undefined)
      {     
        this.productsService.createProduct(prod).
        subscribe(result => {
          swal.fire('Producto creado!', '', 'success');
          this.getAllProducts();
        });
      }        
    });
  }

  openDialogEditProduct(product: Product) {
    const dialog1 = this.editProductDialog.open(ProductDetailComponent, {
      width: '600px',
      data: product
    });

    dialog1.afterClosed().subscribe(prod => {
      if (prod != undefined)
      {
        this.productsService.updateProduct(prod).
        subscribe(result => {
          swal.fire('Producto actualizado!', '', 'success');
          this.getAllProducts();
        });
      }        
    });
  }

  deleteProduct(idProduct: number) {
    swal.fire({
      title: 'Está seguro de eliminar el producto?',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {     
      if (result.isConfirmed) {
        this.productsService.deleteProductById(idProduct).
          subscribe(result => {
            swal.fire('Producto eliminado!', '', 'success')
            this.getAllProducts();
          });
      }
    })
  }

  deleteAllProducts() {
    swal.fire({
      title: 'Está seguro de eliminar todos los productos?',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {     
      if (result.isConfirmed) {
        this.productsService.deleteAllProducts().
          subscribe(result => {
            swal.fire('Productos eliminados!', '', 'success')
            this.getAllProducts();
          });
      }
    })
  }
}

