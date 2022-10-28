import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor() {}

  title = 'Marvel';

  signOut() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userSrNo');
    sessionStorage.removeItem('name');
  }
}
