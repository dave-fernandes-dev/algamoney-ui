import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {Message} from 'primeng/api';

@Component({
  selector: 'app-message2',
  template: ` <p-messages [(value)]="msgs"></p-messages>`,
  styles: [
    `
      .p-messages-error {
        margin: 0;
        margin-top: 4px;
        padding: 3px;
      }
    `,
  ],
})
export class Message2Component implements OnInit {
  @Input() error!: string;
  @Input() control!: FormControl;
  @Input() text!: string;

  @Input() msgs!: Message[];

  constructor() {
    // vazio
  }

  ngOnInit() {

   // if (this.control.hasError("required") && this.control.dirty) {
      this.msgs.push({severity:'error', summary:'Info Message', detail:'PrimeNG rocks'});
    //}

  }
}

