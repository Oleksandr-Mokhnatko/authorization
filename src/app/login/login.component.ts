import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  message: string = '';
  hidePass: boolean = true;
  pwMinLength: number = 6;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.form = new FormGroup(
      {
        email: new FormControl('', [Validators.email, Validators.required]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(this.pwMinLength),
        ]),
        confPassword: new FormControl('', [
          Validators.required,
          Validators.minLength(this.pwMinLength),
        ]),
      },
      {
        validators: this.passwordMatchingValidatior,
      }
    );
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    this.authService.login(this.form.value).subscribe(
      {
        next: () => {
          this.router.navigate(['/home']);
          this.form.reset();
        },
        error: (error) => {
          this.message = error;
        },
      }

      // (response) => {
      //   this.router.navigate(['/home']);
      //   this.form.reset();
      // },
      // (error) => {
      //   this.message = error;
      // }
    );
    console.log(this.message);
  }

  passwordMatchingValidatior(
    control: AbstractControl
  ): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confPassword');
    const error = { notmatched: true };
    const isValid = password?.value === confirmPassword?.value;
    if (!isValid) {
      confirmPassword?.setErrors(error);
    }
    return isValid ? null : error;
  }
  changePassState(event: MouseEvent): void {
    event.preventDefault();
    this.hidePass = !this.hidePass;
  }

  get emailControl(): FormControl {
    return this.form.controls['email'] as FormControl;
  }
  get passControl(): FormControl {
    return this.form.controls['password'] as FormControl;
  }
}
