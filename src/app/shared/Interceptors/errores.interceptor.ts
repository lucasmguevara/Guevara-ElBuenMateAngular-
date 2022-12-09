import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import swal from'sweetalert2';

@Injectable()
export class ErroresInterceptor implements HttpInterceptor {
  error: HttpErrorResponse | undefined;

  constructor(private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {   
      this.error = err as HttpErrorResponse;
      //  alert(err.status);
      //  alert(err.message);
      //  alert(err.error);     

      switch(err.status) {
        case 404: { 
          if(err.message.includes('Http failure response'))
            swal.fire('El sistema no está disponible','Reintente más tarde','info'); 
          else
            swal.fire('Sin Resultados',err.error,'info');         
           break; 
        } 
        case 408: { 
          swal.fire('Se Agotó El Tiempo De Espera','Intente nuevamente','info');  
           break; 
        } 
        case 0: {           
            swal.fire('Sistema No Disponible','Intente más tarde','warning');         
            break;           
        }
        case 400: { 
          swal.fire('Error de Solicitud',err.error,'error');
           break; 
        } 
        case 405: { 
          swal.fire('Error','Método no permitido','error');
           break; 
        }         
        case 500: {
          swal.fire('Error',err.error,'info');     
           break; 
        }  
        default: { 
          swal.fire('Error','Se ha producido un error en el sistema. Intente nuevamente','error');
           break; 
        } 
     }       
      const error = err.error.message || err.statusText;
      return throwError(error);
    }))
  }
}
