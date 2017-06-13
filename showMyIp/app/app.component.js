"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Rx_1 = require("rxjs/Rx");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
var Resultado = (function () {
    function Resultado() {
    }
    return Resultado;
}());
var AppComponent = (function () {
    function AppComponent(http) {
        this.http = http;
        this.name = 'Show My IP';
    }
    AppComponent.prototype.pesquisar = function () {
        var _this = this;
        this.getIpData()
            .subscribe(function (res) {
            console.log(JSON.stringify(res));
            _this.resultado = res;
        }, function (err) {
            console.log(err);
        });
    };
    AppComponent.prototype.getIpData = function () {
        return this.http.get('http://ipinfo.io')
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        template: "\n      <h1>Welcome to: {{name}}</h1>\n      <input type=\"button\" value=\"Pesquisar\" (click)=\"pesquisar()\"/>\n      <hr/>\n      <div *ngIf=\"resultado\">\n          <table border=\"1\">\n              <thead>\n                  <tr role=\"row\">\n                      <th>Propriedade</th>\n                      <th>Valor</th>\n                  </tr>\n              </thead>\n              <tbody>\n                  <tr>\n                      <td>ip</td>\n                      <td>{{resultado.ip}}</td>\n                  </tr>\n                  <tr>\n                      <td>hostname</td>\n                      <td>{{resultado.city}}</td>\n                  </tr>\n                  <tr>\n                      <td>region</td>\n                      <td>{{resultado.region}}</td>\n                  </tr>\n                  <tr>\n                      <td>country</td>\n                      <td>{{resultado.country}}</td>\n                  </tr>\n                  <tr>\n                      <td>loc</td>\n                      <td>{{resultado.loc}}</td>\n                  </tr>\n                  <tr>\n                      <td>org</td>\n                      <td>{{resultado.org}}</td>\n                  </tr>\n              </tbody>\n          </table>        \n      </div> \n  ",
    }),
    __metadata("design:paramtypes", [http_1.Http])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map