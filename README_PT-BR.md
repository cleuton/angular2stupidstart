# Angular 2+ Stupid Start
## Agora na versão 4.0

*Por Cleuton Sampaio*

O Angular 2 não é fácil de aprender, apesar dos esforços em criar um tutorial, mesmo esse tutorial é bem difícil de entender. Há muitos novos conceitos, e uma boa porção de Complexidade Acidental, que assustaria até mesmo desenvolvedores Java.

**Stupid Start** Mostra uma app REST/web simples, que consome um RESTful service. Ele não lhe mostrará todos os segredos de uma app completa, feita com Angular 2.x, 
mas o colocará "andando" rapidamente, permitindo que aprenda o básico e lhe preparando para criar apps mais complexas posteriormente.

Siga as instruções. Se quiser, pode baixar a app completa deste repositório, e apenas executá-la.

Ahn, por falar nisso, ajudará bastante se você já souber **Java** ou outra linguagem OOP, como: **C++**, **pythin** ou **Ruby**.

## Caramba! Como eu começo?

Ok, seu chefe vendeu uma nova e melhorada interface web para o Cliente! Ele disse que ela usaria Angular 2
(ou talvez Angular 4.0). E você, com sua experiência *dura* com o Angular 1.x, não está preparado. Apenas...

**CALMA VOCÊ MANTENHA, E O CAMINHO SIGA, PADAWAN**

**Baixe o repositório quickstart seed**

A equipe do Angular criou um repositório muito simples, chamado "quickstart": [angular.io quickstart seed](https://github.com/angular/quickstart). 
Crie uma nova pasta, e baixe o arquivo ZIP dentro dela. Não clone o *repositório Quickstart seed*. Relaxe! Não se preocupe em criar um repositório Git ou instalar qualquer coisa.
As únicas ferramentas que necessitará, provavelmente já tem: [NPM and Node.js](https://nodejs.org/en/download/).

Uma vez que tenha baixado o arquivo ZIP, extraia seu conteúdo na pasta recém criada.

Renomeie a pasta extraída para "showMyIp", para ficar compatível com nossa app.

É claro que você pode baixar **esta app**, se quiser. Mas este tutorial assume que você baixou a *Quickstart Seed* app.

Certifique-se que tenha pelo menos as versões: node `v4.x.x` e npm `3.x.x`! Exdcute `node -v` e `npm -v` para verificá-las.

## Sobre a app

A **Stupid Start** é chamada de "showMyIp", e faz exatamente isso: Mostra o seu IP externo.

![Screenshot](showMyIp.png) 

É isso aí! Você clica em um botão e ela mostra seu IP e outras infos. Esta informação vem de um RESTful service público: 
**ipinfo.io**. Tente o link abaixo usando `curl` ou `wget`: 

`curl http://ipinfo.io`

Você deve ver algo assim: 

```
curl http://ipinfo.io
{
  "ip": "192.168.1.1",
  "hostname": "No Hostname",
  "city": "Rio de Janeiro",
  "region": "Rio de Janeiro",
  "country": "BR",
  "loc": "-22.9876,-43.3207",
  "org": "VIVO"
}
```

Só precisamos pegar esse JSON e mostrá-lo usando uma `<table>`.

Simples.

## Corta o papo furado

Ok, você provavelmente notou que existe um arquivo `package.json` junto com uma pasta `app`, certo? Então, abra a pasta principal em um terminal
(Eu recomendo [Visual Studio Code](https://code.visualstudio.com/)). 

Ok, se estiver usando o *VSCODE*, abra a pasta que contéo o `package.json`, e selecione o menu `view / integrated terminal`, 
se estiver usando um terminal simples (ou console), navegue para a pasta que você acabou de descompactar (que contém o `package.json`) e
digite: 

`npm install`

Pode demorar algum tempo. O NPM está instalando alguns arquivos, dentro de uma pasta chamada: `node_modules`. Tudo o que precisa saber por enquanto, é que esta pasta é uma biblioteca de componentes, necessários para o Angular.

Open folder "app", inside the main folder, and take a look at the files: 
Abra a pasta "app", dentro da pasta principal, e veja os arquivos: 

* **main.ts**: Script de inicialização da app Angular (*bootstrap* script). Ele inicia sua app. Ah, e por falar nisso, é escrito em [linguagem typescript](https://www.typescriptlang.org/) (Esqueci de te dizer... Foi mal!);
* **app.module.ts**: O módulo principal da sua app, que contém todos os outros componentes (mais `typescript`...);
* **app.component.ts**: O componente (**Component**) principal de sua app. Podem haver mais componentes, se necessitar. Sua app será composta por Componentes como este (**CARACA**! Tudo está em `typescript`!);

Execute a app atual, digitando no terminal: 

`npm start`

Uma nova janela de browser abrirá e mostrará a página principal da sua app: 

![main page](fig2.png)

Note a URL: `http://localhost:3000` este é o endereço do seu servidor web local, aberto pelo NPM. É uma opção do compilador `typescript`(`tsc -w`) que compila 
todo o seu código-fonte `typescript` em `javascript`, e serve o arquivo `index.html`usando a porta TCP 3000.

**O quê aconteceu?**

Ok, abra o arquivo `index.html`. Note que ele importa várias "porcarias", nenuma delas relacionada com a sua app: 

```
    <script src="node_modules/core-js/client/shim.min.js"></script>

    <script src="node_modules/zone.js/dist/zone.js"></script>
    <script src="node_modules/reflect-metadata/Reflect.js"></script>
    <script src="node_modules/systemjs/dist/system.src.js"></script>

    <script src="systemjs.config.js"></script>
```

Mas existem 2 coisas perto do fim do arquivo: 

```
    <script>
      System.import('app').catch(function(err){ console.error(err); });
    </script>

```

e 

```
<my-app>Loading AppComponent content here ...</my-app>
``` 

Esqueça o primeiro, apenas lembre-se que é necessário. Agora, o último é um tag customizado `<my-app>`, e é 
definido pela sua app, dentro do arquivo `app.component.ts`: 

```
@Component({
  selector: 'my-app',
  template: `<h1>Hello {{name}}</h1>`,
})
```

Esta declaração esquisita é um **decorator**, um tipo de Anotação que o `typescript` usa para **complementar** a declaração de uma classe. Vamos ver o arquivo inteiro `app.component.ts`: 

```
import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `<h1>Hello {{name}}</h1>`,
})
export class AppComponent  { name = 'Show My IP'; }
```

Temos um arquivo fonte que **importa** um módulo já existente. Você pode importar seus próprios módulos ou os feitos por outros. Neste caso, estamos importando um módulo do Angular,
que é o próprio "decorator" `@Component`. Dentro do decorator, declaramos alguns metadados sobre o nosso **Componente**: seu **tagname** e seu **gabarito**.

Nosso gabarito (template) está usando uma **expressão** Angular (cercada por ˜{{" e "}}"). A expressão inteira será substituída por uma *propriedade* chamada `name`.

E esta propriedade é declarada dentro da classe do nosso **Componente**, chamado: `AppComponent`.

**Como este Componente é carregado?**

Abra o arquivo `app.module.ts` e verá: 

```
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
```

O módulo principal da nossa app importa, declara e inicializa nossas classes de **Componente**! Se você tiver mais componentes, eles deverão
ser declarados dentro da propriedade `declarations`(dentro do decorator `@NgModule`), mas apenas um pode ser declarado dentro e `bootstrap`, e ele é o componente inicial da nossa app.

**É isso aí!**

E o arquivo `app.component.spec.ts`? É para os testes com o **Protractor**. Esqueça-o por enquanto.

## Vamos construir nossa app

Ok, agora que conhece a estrutura geral, vamos começar alterando o arquivo `app.component.ts` para: 

```
import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
      <h1>Welcome to: {{name}}</h1>
      <input type="button" value="Pesquisar" (click)="pesquisar()"/>
      <hr/>
  `,
})
export class AppComponent  { 
  name = 'Show My IP';
  pesquisar(): Resultado {
    return null;
  } 
}
```

Podem haver alguns erros no browser agora mesmo, e aparecem no VSCODE. Nós adicionamos um `button` com um evento `(click)`, apontando para uma função `pesquisar()`.
Esta função é declarada dentro da classe `AppComponent`. Note que ela retorna algo chamado `Resultado`, que não existe ainda.

A sintaxe `typescript` para funções é: 

```
function add(x: number, y: number): number {
    return x + y;
}

let myAdd = function(x: number, y: number): number { return x+y; }
```

Eu acho que você entendeu! Não vamos perder tempo com isso. Se quiser saber mais, leia [documentação typescript](https://www.typescriptlang.org/docs/tutorial.html).

Voltando ao arquivo `app.component`, vamos criar a definição da classe `Resultado`.

```
import { Component } from '@angular/core';

class Resultado {
  ip: string; 
  hostname: string;
  city: string;
  region: string;
  country: string;
  loc: string;
  org: string;  
}
...
```

Esta classe tem o mesmo layout da nossa resposta esperada. Note que todas as propriedades possuem tipos! Daí o nome **TYPE**script!

Agora, precisamos obter dados do `ipinfo`. A melhor maneira é criar um **Serviço** e obter os dados externos nele. Mas queremos que esta app seja simples e **Stupid**, então, vamos obter os dados dentdo do mesmo arquivo de componente.
Adicione o import, logo abaixo do primeiro import: 

```
import { Http, Response } from '@angular/http';
``` 

Importamos 2 coisas: o serviço `Http` e a classe `Response`. Agora, precisamos injetar o serviço `http` dentro da nossa classe de Componente. Isto é feito usando um **Construtor**, que inicializa uma propriedade **Private**. Adicione esta linha logo abaixo da linha `expor class...`: 

```
    constructor(private http: Http) { }
```

Mas calma ae... O módulo `HttpModule`, que é o **Provider** do serviço `Http`, precisa ser injetado em nossa classe `AppModule`! Abra `app.module.ts` e adicione o import, logo abaixo do primeiro:

```
import { HttpModule } from '@angular/http';
``` 

E altere a propriedade `import` do decorator `@NgModule` para importar `HttpModule` em sua classe: 

```
@NgModule({
  imports:      [ BrowserModule, HttpModule ],
```

Agora, o `HttpModule` está disponível para todos os componentes da nossa app. Vamos volar ao arquivo `app.component.ts`. Precisamos importar alguns arquivos das [Extensões Reactive - RxJS](https://github.com/Reactive-Extensions/RxJS) em nosso arquivo `app.component.ts`:

```
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
```

O serviço `Http` retorna uma instância da classe `Observable`(que é uma classe **template**, como em C++, ou **Generics** como em Java). E precisamos 2 métodos: `map` e `catch`.

Agora, vamos adicionar código para o botão na nossa classe do Componente. Adicione o código abaixo, logo depois da declaração da propriedade `name`: 

```
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
```

**CARACA! QUE P... É ESSA?**

Respire fundo, e eu explicarei...

A função `pesquisar()` é invocada pelo botão que criamos, certo? Está no template HTML do nosso componente.
Esta função usa outra função, chamada `getIpData()`, que também está declarada no nosso componente.

A primeira função (`pesquisar()`) apenas invoca `getIpData()`, que retorna uma instância de `Observable<Resultado>`. `Observable` é uma classe **template**, e permite monitorarmos de forma assíncrona os resultados da obtenção dos dados do IP.
O método `subscribe()` de um `Observable` permite obtermos os resultados usando uma expressão **lambda** (e o erro também).

Então, a segunda função (`getIpData()`) usa o `http.get()` para enviar um request **GET** para o RESTful service. Então, usamos a função `map`(que acabamos de importar) para pegar a resposta json(). Também usamos a função `catch`, para obter o erro.
 
É assim que obtemos dados usando o serviço `http`. Será mais fácil usar uma `Promise`, mas está fora do escopo desta demo.

**Vamos alterar o template HTML**

Precisamos mostrar as propriedades usando uma `<table>`. Isto é fácil! Altere a propriedade `template` do decorator `#Component` para: 

```
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
  `
``` 

O sinal "`" permite usarmos strings compostos por múltiplas linhas. Isto termina nosso tutorial.


## Ela funcionou? 

Se deixou o terminal aberto, o servidor web ficou atualizando a cada alteração de arquivo, e você deve ver a app final rodando. Mas, se os resultados forem diferentes, tente comprar seus arquivos com os meus (que estão no repositório).

Este é o primeiro tutorial de Angular 2.x ou superior. Me desculpe a informalidade e os palavrões. Mais tutoriais estão à caminho, e lembre-se: Este é o **Stupid Start**. Apenas para torná-lo apto mais rapidamente.

