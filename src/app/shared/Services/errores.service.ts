import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorMessage } from '../Models/error-message';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ErroresService {
  error: ErrorMessage = new ErrorMessage();

  constructor() { }

  handleError(err: HttpErrorResponse) : number {    
      this.error = new ErrorMessage();
      this.error.StatusCode = err.status;
      this.error.Message = err.error;

      switch (err.status) {
        case 0:
          swal.fire('', 'El sistema no se encuentra disponible.</br> Intente más tarde', 'error');
          break;
        case 400:
          swal.fire('', err.error, 'error');
          break;
        case 401:
          swal.fire('', 'Debe iniciar sesión para realizar esta acción', 'error');
          break;
        case 403:
          swal.fire('', 'No tienes permiso para acceder al recurso solicitado', 'error');
          break;
        case 404:
          swal.fire('', err.error, 'info');
          break;
        case 405:
          swal.fire('', 'Método no permitido', 'error');
          break;
        case 408:
          swal.fire('', 'Intente nuevamente', 'info');
          break;
        case 412:
          swal.fire('', 'Falló condición previa', 'error');
          break;
        case 500:
          swal.fire('', err.error, 'error');
          break;
        case 503:
          swal.fire('', 'El servicio solicitado no está disponible', 'error');
          break;
        case 422:
          swal.fire('', 'Error de validacion', 'error');
          break;
        default:
          swal.fire('', 'Se ha producido un error en el sistema. Intente nuevamente', 'error');
          break;
      }
     
      return err.status;
  }
}
