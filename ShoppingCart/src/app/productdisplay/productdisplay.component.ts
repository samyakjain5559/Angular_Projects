import { Component, EventEmitter, Output,OnInit } from '@angular/core';
import { ProductService } from '../Services/product.service';
import { Product } from '../Models/Product.Model';
import { IAlert } from '../Models/IAlert';

@Component({
  selector: 'app-productdisplay',
  templateUrl: './productdisplay.component.html',
  styleUrls: ['./productdisplay.component.scss'],
  providers:[ProductService]
})
export class ProductdisplayComponent implements OnInit {

  public alerts: Array<IAlert> = [];
  public globalResponse: any;
  public productResponse: any;
  public addResponseObject: any;
  allProducts: Product[];
  productAddedTocart:Product[];
  constructor(private productService:ProductService) { }

  ngOnInit() {
    this.productService.getAllProducts()  // do a get request to get all product in variable allProduct then use
// use it in html
// and in its html the.prodTable is inbuild class of scss for "table" class in displayproduct.html                                        
            .subscribe((result) => {
              this.globalResponse = result;              
            }, 
            error => { //This is error part
              console.log(error.message);
            },
            () => {
                //  This is Success part
                console.log("Product fetched sucssesfully.");
                this.allProducts=this.globalResponse;
                      for (let i in this.allProducts) {
                        this.allProducts[i].quantity=1;
                    }
                }
              )

 }

 addToCart(id: number){
  this.productService.addProductToCart(id) // call services to do a put call there
  .subscribe((result) => {
    this.addResponseObject = result;              
  },
  error => { //This is error part
    console.log(error.message);
    this.alerts.push({
      id: 1,
      type: 'Failed',
      message: 'Failed to add the product.'
    });
    setTimeout(()=>{   
      this.closeAlert(this.alerts);
     }, 3000);
  },
  () => {
      //  This is Success part
      console.log("Product fetched successfully.");
      this.alerts.push({
        id: 1,
        type: 'success',
        message: 'Product added to cart.'
      });
      setTimeout(()=>{   
        this.closeAlert(this.alerts);
   }, 3000);
      }
    )
 }
 
 OnAddCart(product:Product)
            {
              console.log(product);
              this.addToCart(product.id);
            }


            public closeAlert(alert:any) {
              const index: number = this.alerts.indexOf(alert);
              this.alerts.splice(index, 1);
          }   
  }

