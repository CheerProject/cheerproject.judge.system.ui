import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  userForm: FormGroup;
  MIN_LENGTH = 4;

  constructor(private authService: AuthService, private router: Router) {
    this.userForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(this.MIN_LENGTH)
      ])
    });
    this.authService.logout();
  }

  ngOnInit() {
    this.authService.logout();
  }

  getErrorMessage() {
    return this.userForm.get('email').hasError('required')
      ? 'Debe ingresar un valor'
      : this.userForm.get('email').hasError('email')
        ? 'No es un email valido'
        : '';
  }

  getPasswordErrorMessage() {
    return this.userForm.get('password').hasError('required')
      ? 'Debe ingresar un valor'
      : this.userForm.get('password').hasError('minlength')
        ? `la contraseña debe ser mayor a ${this.MIN_LENGTH} caracteres`
        : '';
  }

  login() {
    if (this.userForm.valid) {
      const user = this.userForm.value as User;
      console.log(user);
      this.authService
        .logIn(user.email, user.password)
        .subscribe(data => this.router.navigateByUrl('/'));
    }
  }
}
