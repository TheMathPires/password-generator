import { Component, ElementRef, EventEmitter, Output, ViewChild } from "@angular/core";
import { PasswordRules } from "../shared/password-rules.interface";
import { strengthLevelEnum } from "../shared/strength-level.enum";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {

  @Output()
  public onPasswordGenerate!: EventEmitter<string>;
  @ViewChild('levelElement')
  public levelElement!: ElementRef;
  public rangeValue!: string;
  public strengthLevel!: string;
  public characterLength!: string;
  public passwordRules!: PasswordRules;
  public points!: number;
  public passwordError!: boolean;

  constructor() {
    this.onPasswordGenerate = new EventEmitter<string>();
    this.strengthLevel = '';
    this.characterLength = '4';
    this.passwordRules = { uppercase: false, lowercase: false, symbols: false, numbers: false };
    this.points = 0;
    this.passwordError = false;
  }

  ngOnInit(): void {
    this.onPasswordGenerate.subscribe((password) => {
      this.calculateStrengthLevel(password);
      this.checkPasswordStatus();
    });
  }

  private checkPasswordStatus(): void {
    if (
      !this.passwordRules.lowercase &&
      !this.passwordRules.uppercase &&
      !this.passwordRules.numbers &&
      !this.passwordRules.symbols
    ) {
      this.passwordError = true;
    } else {
      this.passwordError = false;
    }
  }

  public getValue(event: Event): void {
    this.characterLength = (event.target as HTMLInputElement).value;
  }

  private setStrengthColor(level: string) {
    const everyLevel = ['too-weak', 'weak', 'medium', 'strong'];
    everyLevel.forEach((level) => this.levelElement.nativeElement.classList.remove(level));
    this.levelElement.nativeElement.classList.add(level);
  }

  public calculateStrengthLevel(password: string): void {
    this.points += password.length;

    if (this.points > 7 && this.points <= 11) {
      this.strengthLevel = strengthLevelEnum.tooWeak;
      this.setStrengthColor('too-weak');
    }
    if (this.points > 11 && this.points <= 16) {
      this.strengthLevel = strengthLevelEnum.weak;~
      this.setStrengthColor('weak');
    }
    if (this.points > 16 && this.points <= 24) {
      this.strengthLevel = strengthLevelEnum.medium;
      this.setStrengthColor('medium');
    }
    if (this.points > 24) {
      this.strengthLevel = strengthLevelEnum.strong;
      this.setStrengthColor('strong');
    }
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
    this.points = 0;
    let possible = this.setPasswordRules();
    let password = "";

    for (let i = 0; i <= parseInt(this.characterLength); i++) {
      password += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    this.onPasswordGenerate.emit(password);

    return password;
  }

  private setPasswordRules(): string {
    let lowercase = "", uppercase = "", symbols = "", numbers = "";

    if (this.passwordRules.lowercase) {
      lowercase = "abcdefghijklmnopqrstuvwxyz";
      this.points += 3;
    }
    if (this.passwordRules.uppercase) {
      uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      this.points += 3;
    }
    if (this.passwordRules.symbols) {
      symbols = ",./;'[]\=-)(*&^%$#@!~`";
      this.points += 3;
    }
    if (this.passwordRules.numbers) {
      numbers = "1234567890";
      this.points += 3;
    }

    return `${lowercase}${uppercase}${symbols}${numbers}`;
  }
}
