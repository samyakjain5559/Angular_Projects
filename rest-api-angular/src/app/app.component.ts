import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'rest-api-angular';
  private statuses: Map<string,string> = new Map();
  private headers = {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache'
  }
  constructor(private http: HttpClient) { 
    this.http.get<any>('https://jsonplaceholder.typicode.com/todos',{headers: this.headers}).subscribe(data => {
           for(let i = 0; i < data.length; i++){
              this.statuses.set(data[i].id,data[i].title);
           }
           console.log(this.statuses);
    })  
  }
}
