import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { CaptchaServiceService } from './captcha-service.service';
import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    RecaptchaModule,
    RecaptchaFormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [CaptchaServiceService],
})
export class AppComponent implements OnInit {
  loginForm!: FormGroup;
  captchaId!: string;
  captcha: string = '';
  userInput: string = '';
  errorMessage: string = '';
  captchaMessage: string = '';
  isCaptchaVerified: boolean = false;
  constructor(
    private fb: FormBuilder,
    private captchaService: CaptchaServiceService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.generateCaptcha();
    this.loginForm = this.fb.group({
      Username: [null, Validators.required],
      password: [null, Validators.required],

      userInput: [null, Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const formData = {
        ...this.loginForm.value,
        captchaId: this.captchaId,
      };
      console.log(formData);
    }

    //   this.captchaService
    //     .validateCaptcha(this.captchaId, formData.captchaText)
    //     .subscribe((response: any) => {
    //       if (response.success) {
    //         // Call your login API with the formData excluding the captchaText
    //         this.http.post('/api/login', formData).subscribe(
    //           (response) => {
    //             console.log('Login successful', response);
    //           },
    //           (error) => {
    //             console.error('Login failed', error);
    //           }
    //         );
    //       } else {
    //         alert('CAPTCHA validation failed');
    //         this.loadCaptcha(); // Reload CAPTCHA
    //       }
    //     });
    // }
  }

  generateCaptcha(): void {
    this.captcha = this.captchaService.generateCaptcha(6);
  }

  verifyCaptcha(): void {
    debugger;
    const userInput = this.loginForm.get('userInput')?.value;
    if (userInput === this.captcha) {
      this.captchaMessage = 'CAPTCHA verified successfully!';
      this.isCaptchaVerified = true;
    } else {
      this.captchaMessage = 'Incorrect CAPTCHA. Please try again.';
      this.isCaptchaVerified = false;
      this.generateCaptcha(); // Regenerate CAPTCHA if verification fails
    }
  }

  onCaptchaInput(): void {
    this.captchaMessage = '';
  }
}
