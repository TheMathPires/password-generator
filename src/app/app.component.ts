import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public title!: string;
  public generatedPassword!: string;

  constructor() {
    this.title = 'Password Generator';
    this.generatedPassword = '';
  }

  setPassword(password: string) {
    this.generatedPassword = password;
    console.log("generated password", this.generatedPassword);
  }
}
