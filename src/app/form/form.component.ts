import { Component } from "@angular/core";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {

  public rangeValue!: string;
  public strengthLevel!: string;

  constructor() {
    this.rangeValue = '1';
    this.strengthLevel = '';
  }

}
