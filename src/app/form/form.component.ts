import { Component, EventEmitter, Output } from "@angular/core";
import { PasswordRules } from "../shared/password-rules.interface";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {

  @Output()
  public onPasswordGenerate!: EventEmitter<string>;
  public rangeValue!: string;
  public strengthLevel!: string;
  public inputValue!: string;
  public passwordRules!: PasswordRules;

  constructor() {
    this.onPasswordGenerate = new EventEmitter<string>();
    this.strengthLevel = '';
    this.inputValue = '0';
    this.passwordRules = { uppercase: false, lowercase: false, symbols: false, numbers: false };
  }

  public getValue(event: Event): void {
    this.inputValue = (event.target as HTMLInputElement).value;
  }

  public checkPasswordRule(rule: string): void {
    switch (rule) {
      case 'uppercase':
        this.passwordRules.uppercase = !this.passwordRules.uppercase;
        break;
      case 'lowercase':
        this.passwordRules.lowercase = !this.passwordRules.lowercase;
        break;
      case 'symbols':
        this.passwordRules.symbols = !this.passwordRules.symbols;
        break;
      case 'numbers':
        this.passwordRules.numbers = !this.passwordRules.numbers;
        break;
      default:
        break;
    }
  }

  public generatePassword(): string {
    let possible = this.setPasswordRules();
    let password = "";

    for (let i = 0; i <= parseInt(this.inputValue); i++) {
      password += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    this.onPasswordGenerate.emit(password);

    return password;
  }

  private setPasswordRules(): string {
    let lowercase = "", uppercase = "", symbols = "", numbers = "";

    if (this.passwordRules.lowercase) {
      lowercase = "abcdefghijklmnopqrstuvwxyz";
    }
    if (this.passwordRules.uppercase) {
      uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    }
    if (this.passwordRules.symbols) {
      symbols = ",./;'[]\=-)(*&^%$#@!~`";
    }
    if (this.passwordRules.numbers) {
      numbers = "1234567890";
    }

    return `${lowercase}${uppercase}${symbols}${numbers}`;
  }
}
