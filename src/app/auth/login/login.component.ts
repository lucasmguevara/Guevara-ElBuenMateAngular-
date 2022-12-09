import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms'
import { Router } from '@angular/router';
import { LoginRequest } from 'src/app/shared/Models/login-request';
import { AuthService } from 'src/app/shared/Services/auth.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  formLogin = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
    password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]]
  });

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
      password: ['', [Validators.required, Validators.minLength(5),  Validators.maxLength(30)]]
    });

    this.resetForm();
    this.authService.logout();
  }


  resetForm() {
    this.formLogin.reset();
    this.authService.loginRequest = new LoginRequest();
  }

  iniciarSesion() {
    try {
      this.authService.loginRequest.username = this.formLogin.get('username')!.value as string;
      this.authService.loginRequest.password = this.formLogin.get('password')!.value as string;

      this.authService.iniciarSesion()
        .subscribe(res => {
         this.authService.setUser(this.formLogin.get('username')!.value as string);
          this.router.navigateByUrl('/home');
        },
          async err => {
            this.formLogin.reset();
          });
    }
    catch (ex) {
      swal.fire('Error al Iniciar Sesión', 'Intente nuevamente', 'error');
    }
  }
}

