import { Producto } from './../interfaces/producto.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: Producto[] = [];
  productosFiltrado: Producto[] = [];

  constructor( private http: HttpClient ) {
    this.cargarProductos();
  }

  private cargarProductos() {

    return new Promise( (resolve, reject) =>{
      this.http.get('https://angular-html-d13c4.firebaseio.com/productos_idx.json')
      .subscribe( (resp: Producto[]) => {
          this.productos = resp;
          this.cargando = false;
          resolve();
      });

    });


  }

  getProducto(id: string){
    return this.http.get(`https://angular-html-d13c4.firebaseio.com/productos/${id}.json`);
  }

  buscarProducto( termino: string){

    if(this.productos.length === 0){
        //cargar productos
        this.cargarProductos().then( ()=> {
            //Despues de tener los productos
            //Aplicar filtro
            this.filtrarProductos( termino );
        });
    }else{
            //ya podemos aplicar el filtro
            this.filtrarProductos( termino );
    }
  }


    private filtrarProductos(termino: string){

      this.productosFiltrado = [];

      termino = termino.toLocaleLowerCase();

          this.productos.forEach(prod => {

            const titulower = prod.titulo.toLocaleLowerCase();

              if(prod.categoria.indexOf(termino) >= 0 || titulower.indexOf(termino) >= 0  ){
                this.productosFiltrado.push( prod);
              }
          });


    }





}
