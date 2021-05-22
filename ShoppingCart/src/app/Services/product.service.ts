import { Injectable } from '@angular/core';
import { HttpClient,HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Http, Response } from '@angular/http';  
import { Observable, of, throwError, pipe} from "rxjs"
import { map, filter, catchError, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public getAllProductsUrl:string="http://localhost:8083/products/getProductDetails";
  public getProductFromCartUrl:string="http://localhost:8083/products/getProductfromCart";
  public addProductToCartUrl:string="http://localhost:8083/products/addProductToCart/";
  public removeAllProductsfromCartUrl:string="http://localhost:8083/products/removeAllProductsfromCart";
  public removeProductfromCartUrl:string="http://localhost:8083/products/removeProductfromCart/";


  constructor(private httpClient:HttpClient) { }

  getAllProducts ()
  {
    return this.httpClient.get(this.getAllProductsUrl)
    .pipe(
      map(res => res),
       catchError( this.errorHandler)
      );
  }
  addProductToCart(id: number) {
    return this.httpClient.get(this.addProductToCartUrl+id, {responseType: 'text'})
    .pipe(
      map(res => res),
       catchError( this.errorHandler)
      );
  }
  removeProductFromCart(id: number) {
    return this.httpClient.get(this.removeProductfromCartUrl+id, {responseType: 'text'})
    .pipe(
      map(res => res),
       catchError( this.errorHandler)
      );
  }
  getProductFromCart() {
    return this.httpClient.get(this.getProductFromCartUrl)
    .pipe(
      map(res => res),
       catchError( this.errorHandler)
      );
  }
  removeAllProductFromCart() {
    return this.httpClient.get(this.removeAllProductsfromCartUrl, {responseType: 'text'})
    .pipe(
      map(res => res),
       catchError( this.errorHandler)
      );
  }
  errorHandler(error: Response) {  
    console.log(error);  
    return throwError(error);  
} 
}