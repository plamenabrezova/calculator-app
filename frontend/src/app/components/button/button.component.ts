import { Component, Input } from '@angular/core';

@Component({
  selector: 'btn',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  @Input()
  value: string = '0'

  @Input()
  className: string = 'basic-btn'
}
