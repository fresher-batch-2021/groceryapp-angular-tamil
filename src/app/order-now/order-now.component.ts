import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartServiceService } from '../cart-service.service';
import { OrderService } from '../order.service';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-order-now',
  templateUrl: './order-now.component.html',
  styleUrls: ['./order-now.component.css'],
})
export class OrderNowComponent implements OnInit {
  cartItems: any;

  user: any;

  constructor(
    private route: ActivatedRoute,
    private service: CartServiceService,
    private orderService: OrderService,
    private router: Router,
    private toastr: ToastrService,
    private productService : ProductsService
  ) {
    this.cartItems = this.service.getCartItems();
    console.log('cart', this.cartItems);
    let userEmail = localStorage.getItem('LOGGED_IN_USER');
    this.user = userEmail != null ? JSON.parse(userEmail) : [];
    console.log('user.email', this.user.email);

    this.calculateTotalAmount();
  }

  calculateTotalAmount() {
    this.totalBillAmount = 0;
    for (let item of this.cartItems) {
      this.totalBillAmount += item.unit * item.price;
    }
  }

  ngOnInit(): void {}

  products: any = [];

  totalBillAmount = 0;

  updatePrice(index: number, stock: number) {
    
    
    console.log('change ', index);
    let cartItem = this.cartItems[index];
    if(cartItem.unit > stock){      
      this.toastr.error("Insufficient stocks");
      this.calculateTotalAmount(); 
    }
    else{
      cartItem.totalPrice = cartItem.unit * cartItem.price;
      this.cartItems[index] = cartItem;
      this.calculateTotalAmount();
    }
  }


  confirmOrder() {
    if (this.user.email == null || this.user.email == '' || this.user.email == undefined){      
        this.toastr.error('Please Login or Register');
        this.router.navigate(['/auth/login']);
      
    }
    else{

        
        let orderData = {
          items: this.cartItems,
          createdBy: this.user.email,
          status: 'ORDER',
          date: new Date().toJSON(),
          totalBillAmount: this.totalBillAmount,
        };
        console.log('e', orderData);
  
        this.orderService.placeOrder(orderData).subscribe((res) => {
          this.toastr.success('Order Added Successfully');
          this.service.emptyCart();
          this.decreaseStock(this.cartItems);
          this.router.navigate(['/myOrder']);
        }, err => {
          alert("Order Place Error came");
        });
    }
  }

  decreaseStock(cartItems:any){

    for(let item of cartItems){
      
      this.productService.getProduct(item.id).subscribe(res=>{

        let product:any = res;
        product.stock -= item.unit ;
        this.productService.updateProuductsStock(product).subscribe(res=>{
          console.log(item +" stock updated");
        })

      })
      
    }
    
  }

  emptyCart() {
    localStorage.removeItem('CART_ITEMS');
    this.cartItems = [];
    this.service.cartCount.next(this.service.getCartItems());
    this.calculateTotalAmount();
  }

  removeItem(index: any) {
    this.service.removeItem(index);
    this.cartItems = this.service.getCartItems();
    this.service.cartCount.next(this.service.getCartItems());
  }

  orderMore() {
    this.router.navigate(['/home']);
  }
}
