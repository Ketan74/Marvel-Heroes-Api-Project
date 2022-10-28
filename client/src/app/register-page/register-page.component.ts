import { Component, Input, OnInit } from '@angular/core';
import { MarvelReviewService } from '../services/marvel-review.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],
})
export class RegisterPageComponent implements OnInit {
  constructor(
    private router: Router,
    private marvelReviewService: MarvelReviewService
  ) {}

  passwordVisible: boolean = false;
  confirmPasswordVisible: boolean = false;
  @Input() name: string = '';
  @Input() email: string = '';
  @Input() userName: string = '';
  @Input() password: string = '';
  @Input() confirmPassword: string = '';
  isValidName: boolean = true;
  isValidEmail: boolean = true;
  isValidUserName: boolean = true;
  isValidPassword: boolean = true;
  isValidConfirmPassword: boolean = true;
  isUserAdded: boolean = true;
  msgName: string = '';
  msgEmail: string = '';
  msgUserName: string = '';
  msgPassword: string = '';
  msgConfirmPassword: string = '';
  msgUserAdded: string = '';

  ngOnInit(): void {}

  onKey(event: any) {
    if (event.target.placeholder === 'Username')
      this.userName = event.target.value;
    else if (event.target.placeholder === 'Password')
      this.password = event.target.value;
    else if (event.target.placeholder === 'Name')
      this.name = event.target.value;
    else if (event.target.placeholder === 'Email Id')
      this.email = event.target.value;
    else if (event.target.placeholder === 'Confirm Password')
      this.confirmPassword = event.target.value;
  }

  handlePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  handleConfirmPasswordVisibility(): void {
    this.confirmPasswordVisible = !this.confirmPasswordVisible;
  }

  routeToRegisterPage(): void {
    this.router.navigate(['signin']);
  }

  onSubmit(): void {
    this.resetMessage();
    if (this.validate()) {
      this.marvelReviewService
        .register(this.name, this.email, this.userName, this.password)
        .subscribe(
          (data) => {
            let tempData = JSON.parse(JSON.stringify(data));
            window.alert(tempData.message);
            this.router.navigate(['signin']);
          },
          (error) => {
            this.isUserAdded = error.error.isUserAdded;
            this.msgUserAdded = error.error.message;
          }
        );
    }
  }

  validate(): boolean {
    let flag = true;
    if (!this.name) {
      this.msgName = '*Required Field';
      this.isValidName = false;
      flag = false;
    } else {
      if (/[^a-zA-Z ]/i.test(this.name)) {
        this.isValidName = false;
        flag = false;
        this.msgName = 'Only Alaphabets are allowed';
      }
    }

    if (!this.email) {
      this.msgEmail = '*Required Field';
      this.isValidEmail = false;
      flag = false;
    } else {
      let emailRegex = '^[a-z0-9_.]+@[a-z0-9.]+.[a-z]';
      if (!this.email.match(emailRegex)) {
        this.isValidEmail = false;
        flag = false;
        this.msgEmail = 'Enter a valid email id';
      }
    }

    if (!this.userName) {
      this.msgUserName = '*Required Field';
      this.isValidUserName = false;
      flag = false;
    } else {
      if (/[^a-zA-Z0-9_]/i.test(this.userName)) {
        this.isValidUserName = false;
        flag = false;
        this.msgUserName = 'Special characters and white space are not allowed';
      }
    }

    if (!this.password) {
      this.msgPassword = '*Required Field';
      this.isValidPassword = false;
      flag = false;
    } else {
      if (this.password.length >= 8 && this.password.length <= 15) {
        let paswd = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/;
        if (this.password.match(paswd)) {
          // console.log('contain everything');
        } else {
          this.msgPassword =
            'Password must contain atleast 1 special character and 1 digit';
          this.isValidPassword = false;
          flag = false;
        }
      } else {
        this.msgPassword = 'Length of Password must betwen 8 an 15';
        this.isValidPassword = false;
        flag = false;
      }
    }

    if (!this.confirmPassword) {
      this.msgConfirmPassword = '*Required Field';
      this.isValidConfirmPassword = false;
      flag = false;
    } else {
      if (
        this.confirmPassword.length >= 8 &&
        this.confirmPassword.length <= 15
      ) {
        let paswd = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/;
        if (this.confirmPassword.match(paswd)) {
          if (this.confirmPassword !== this.password) {
            this.msgConfirmPassword = 'Does not match with entered password';
            this.isValidConfirmPassword = false;
            flag = false;
          }
        } else {
          this.msgConfirmPassword =
            'Confirm Password must contain atleast 1 special character and 1 digit';
          this.isValidConfirmPassword = false;
          flag = false;
        }
      } else {
        this.msgConfirmPassword =
          'Length of Confirm Password must betwen 8 an 15';
        this.isValidConfirmPassword = false;
        flag = false;
      }
    }

    return flag;
  }

  resetMessage(): void {
    this.msgName = '';
    this.msgEmail = '';
    this.msgUserName = '';
    this.msgPassword = '';
    this.msgConfirmPassword = '';
    this.msgUserAdded = '';
    this.isValidName = true;
    this.isValidEmail = true;
    this.isValidUserName = true;
    this.isValidPassword = true;
    this.isValidConfirmPassword = true;
    this.isUserAdded = true;
  }
}
