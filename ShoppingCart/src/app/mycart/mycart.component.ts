import { Component, OnInit } from '@angular/core';
import { Product } from '../Models/Product.Model';
import { ProductService } from '../Services/product.service';

@Component({
  selector: 'app-mycart',
  templateUrl: './mycart.component.html',
  styleUrls: ['./mycart.component.scss']
})
export class MycartComponent implements OnInit {
  dafualtQuantity:number=1;
  productAddedTocart:Product[];
  allTotal:number;
  public globalResponse: any;
  public productResponse: any;
  constructor(private productService:ProductService) 
  {
    
   }

  ngOnInit() { 
    this.productService.getProductFromCart()
    .subscribe((result) => {
      this.productResponse = result;              
    },
    error => { //This is error part
      console.log(error.message);
    },
    () => {
        //  This is Success part
        console.log("Product fetched sucssesfully.");
        this.productAddedTocart=this.productResponse;
        this.productAddedTocart = this.productAddedTocart.filter(p=>p.name !==null);

        this.calculteAllTotal(this.productAddedTocart);
        }
      )     
  }

  fetchProductsforCart(){
    this.productService.getProductFromCart()
    .subscribe((result) => {
      this.productResponse = result;              
    },
    error => { //This is error part
      console.log(error.message);
    },
    () => {
        //  This is Success part
        console.log("Product fetched successfully.");
        this.productAddedTocart=this.productResponse;
        this.productAddedTocart = this.productAddedTocart.filter(p=>p.name !==null);

        }
      )
   }

  onAddQuantity(product:Product)
  {
    //Get Product
    this.productService.addProductToCart(this.productAddedTocart.find(p=>p.id==product.id).id)
    .subscribe((result) => {
    },
    error => { //This is error part
      console.log(error.message);
    },
    () => {
        //  This is Success part
        console.log("Product quantity updated");
        }
      ) 

    this.productAddedTocart.find(p=>p.id==product.id).quantity = product.quantity+1;
    this.calculteAllTotal(this.productAddedTocart);

  }
  onRemoveQuantity(product:Product)
  {
    this.productService.removeProductFromCart(product.id)
    .subscribe((result) => {
    },
    error => { //This is error part
      console.log(error.message);
    },
    () => {
        //  This is Success part
        console.log("Product removed successfully");
        }
      ) 

    if(product.quantity==1){
      this.productAddedTocart = this.productAddedTocart.filter(p=>p.id !==product.id);
    }else{
      this.productAddedTocart.find(p=>p.id==product.id).quantity = product.quantity-1;
    }
    
    this.calculteAllTotal(this.productAddedTocart);

  }
  calculteAllTotal(allItems:Product[])
  {
    let total=0;
    for (let i in allItems) {
      total= total+(allItems[i].quantity *allItems[i].unitPrice);
   }
   this.allTotal=total;
  }

  removeAllItems(){
    this.productService.removeAllProductFromCart()
    .subscribe((result) => {
    },
    error => { //This is error part
      console.log(error.message);
    },
    () => {
        //  This is Success part
        console.log("Cart emptied.");
        }
      ) 

    this.productAddedTocart.splice(0);
    this.allTotal=0;

  }

}