import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

declare function _clickDoc(): any;
@Component({
  selector: 'app-login-and-register',
  templateUrl: './login-and-register.component.html',
  styleUrl: './login-and-register.component.css',
})
export class LoginAndRegisterComponent implements OnInit {
  formlogin!: FormGroup;
  formRegister!: FormGroup;
  formularioValidador: boolean = false;
  formularioValidadorRegistro: boolean = false;
  isUsed: boolean = false;
  regex: string = '([\\w-+]+(?:\\.[\\w-+]+)*@(?:[\\w-]+\\.)+[a-zA-Z]{2,7})';

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {}
  ngOnInit(): void {
    if (this.authService.user) {
      this.router.navigate(['/']);
    }
    this.loadEfect();
    this.loadLoginForm();
    this.loadRegisterForm();
  }
  loadLoginForm = () => {
    this.formlogin = this.fb.group({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(this.regex),
      ]),
      password: new FormControl('', Validators.required),
    });
  };

  login() {
    if (this.formlogin.valid) {
      const formValue = this.formlogin.value;
      formValue.email = formValue.email.toLowerCase();
      this.authService.login(this.formlogin.value).subscribe((resp) => {
        if (resp) {
          this.formlogin.reset();
          this.router.navigate(['/']).then(() => location.reload());
        }
      });
    } else {
      if (
        this.formlogin.touched ||
        !this.formlogin.get('email')?.value ||
        !this.formlogin.get('passowrd')?.value
      ) {
        this.formularioValidador = this.formlogin.touched ? true : false;
      }
    }
  }

  loadRegisterForm = () => {
    this.formRegister = this.fb.group(
      {
        email: new FormControl('', [
          Validators.required,
          Validators.pattern(this.regex),
        ]),
        name: new FormControl('', Validators.required),
        surname: new FormControl('', Validators.required),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
        ]),
        confirmPassword: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
        ]),
      },
      { validators: this.passwordMatchValidator }
    );
  };

  register() {
    console.log('llamado');
    if (this.formRegister.valid) {
      let formValue = this.formRegister.value;
      formValue.email = formValue.email.toLowerCase();
      delete formValue.confirmPassword;
      formValue = { ...formValue, rol: 'cliente' };
      this.authService.register(formValue).subscribe({
        next:(resp:any)=>{
          if(resp.message === 403){
            alert(resp.message_text);
            this.formRegister.reset();
          }else{
            alert(`Usuario creado correctamente ${formValue.email}`);
            this.formRegister.reset();
          }
        }
      })
    } else {
      if (this.formRegister.touched || this.formRegister.pristine) {
        this.formularioValidadorRegistro = true;
      }
    }
  }

  passwordMatchValidator(formGroup: FormGroup): { [key: string]: any } | null {
    const password = formGroup.get('password');
    const confirmPassword = formGroup.get('confirmPassword');

    if (
      password &&
      confirmPassword &&
      password.value !== confirmPassword.value
    ) {
      return { passwordMismatch: true };
    }
    return null;
  }

  loadEfect = () => {
    setTimeout(() => {
      _clickDoc();
    }, 50);
  };
}
