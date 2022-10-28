import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { MarvelReviewService } from '../services/marvel-review.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  constructor(
    private router: Router,
    private marvelReviewService: MarvelReviewService
  ) {}

  passwordVisible: boolean = false;
  name: string = '';
  @Input() userName: string = '';
  @Input() password: string = '';
  msgUserName: string = '';
  msgPassword: string = '';
  isValidUserName: boolean = true;
  isValidPassword: boolean = true;

  ngOnInit(): void {
    if (sessionStorage.getItem('token'))
      this.marvelReviewService.verify().subscribe(
        (data) => {
          let tempData = JSON.parse(JSON.stringify(data));
          this.name = tempData.name;
          sessionStorage.setItem('name', this.name);
          sessionStorage.setItem('userSrNo', tempData.srNo);
          this.router.navigate(['characters', this.name]);
        },
        (error) => {
          console.log('Unauthorized');
        }
      );
  }

  onKey(event: any) {
    if (event.target.placeholder === 'Username')
      this.userName = event.target.value;
    else if (event.target.placeholder === 'Password')
      this.password = event.target.value;
  }

  handlePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  routeToRegisterPage(): void {
    this.router.navigate(['register']);
  }

  onSubmit(): void {
    this.resetMessage();
    if (this.validate()) {
      this.marvelReviewService.signIn(this.userName, this.password).subscribe(
        (data) => {
          let tempData = JSON.parse(JSON.stringify(data));
          this.name = tempData.name;
          sessionStorage.setItem('token', tempData.token);
          sessionStorage.setItem('name', this.name);
          sessionStorage.setItem('userSrNo', tempData.srNo);
          this.router.navigate(['characters', this.name]);
        },
        (error) => {
          if (error.error.isValidUsername) {
            this.isValidPassword = false;
            this.msgPassword = error.error.message;
          } else {
            this.isValidUserName = false;
            this.msgUserName = error.error.message;
          }
        }
      );
    }
  }

  validate(): boolean {
    let flag = true;
    if (!this.userName) {
      this.msgUserName = '*Required Field';
      this.isValidUserName = false;
      flag = false;
    }

    if (!this.password) {
      this.msgPassword = '*Required Field';
      this.isValidPassword = false;
      flag = false;
    }

    return flag;
  }

  resetMessage(): void {
    this.msgUserName = '';
    this.msgPassword = '';
    this.isValidPassword = true;
    this.isValidUserName = true;
  }
}
