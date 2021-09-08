import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import * as _ from 'lodash';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-remove-product',
  templateUrl: './remove-product.component.html',
  styleUrls: ['./remove-product.component.css'],
})
export class RemoveProductComponent implements OnInit {
  productList: any;
  ascProductList: any;
  selectedCategory: any;

  constructor(private productService: ProductsService) {
    this.getAllProducts();
  }

  ngOnInit(): void {}

  getAllProducts() {
    this.productService.getAllProducts().subscribe((res: any) => {
      let data = res.docs;
      console.log(res.docs);
      // this.productList = data.map((obj: any) => obj.doc);
      console.log('productList', data);
      this.ascProductList = _.orderBy(data, ['category'], ['asc']);
      console.log('Ascending Product List :', this.ascProductList);
    });
  }

  removeProduct(id: any, rev: any) {
    console.log('id', id);
    console.log('rev', rev);

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');

        this.productService.removeProducts(id, rev).subscribe(
          (res) => {
            
            console.log('remove products result', res);
            document.location.reload();
          },
          (err) => {
            console.log('err Message', err);
          }
        );
      }
    });
  }
}
