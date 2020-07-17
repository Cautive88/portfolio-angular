import { InfoPaginaService } from './../../services/info-pagina.service';
import { InfoPagina } from './../../interfaces/info-pagina.interface';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  constructor( public _servicio: InfoPaginaService,
               public router: Router ) { }

  ngOnInit(): void {
  }


  buscarProducto(termino: string ){

    if(termino.length < 1 ){
      return;
    }

    this.router.navigate(['/search', termino]);

  }

}
