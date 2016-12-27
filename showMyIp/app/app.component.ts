import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

class Resultado {
  ip: string; 
  hostname: string;
  city: string;
  region: string;
  country: string;
  loc: string;
  org: string;  
}

@Component({
  selector: 'my-app',
  template: `
      <h1>Welcome to: {{name}}</h1>
      <input type="button" value="Pesquisar" (click)="pesquisar()"/>
      <hr/>
      <div *ngIf="resultado">
          <table border="1">
              <thead>
                  <tr role="row">
                      <th>Propriedade</th>
                      <th>Valor</th>
                  </tr>
              </thead>
              <tbody>
                  <tr>
                      <td>ip</td>
                      <td>{{resultado.ip}}</td>
                  </tr>
                  <tr>
                      <td>hostname</td>
                      <td>{{resultado.city}}</td>
                  </tr>
                  <tr>
                      <td>region</td>
                      <td>{{resultado.region}}</td>
                  </tr>
                  <tr>
                      <td>country</td>
                      <td>{{resultado.country}}</td>
                  </tr>
                  <tr>
                      <td>loc</td>
                      <td>{{resultado.loc}}</td>
                  </tr>
                  <tr>
                      <td>org</td>
                      <td>{{resultado.org}}</td>
                  </tr>
              </tbody>
          </table>        
      </div> 
  `,
})
export class AppComponent  { 

  constructor(private http: Http) { }

  name = 'Show My IP';
  resultado: Resultado;
  pesquisar(): void {
    this.getIpData()
      .subscribe(
          res => {
            console.log(JSON.stringify(res))
            this.resultado = res}, 
          err => {
              console.log(err);
          });    
  } 

  getIpData() : Observable<Resultado> {
    return this.http.get('http://ipinfo.io')
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
}
