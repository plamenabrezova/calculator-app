import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CalculateService } from 'src/app/services/calculator.service';
import { Result } from 'src/app/shared/models';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  // first
  current: string = '0';
  // second
  operand: string = '';
  result: string = '';
  operation: string | null = null;

  constructor(private calculateService: CalculateService, activatedRoute: ActivatedRoute) {
    activatedRoute.params.subscribe((params) => {
      if ((params['operation'] && ['sum', 'sub', 'multi', 'div'].includes(params['operation']))
        && params['num1'] && params['num2']) {
        switch (params['operation']) {
          case 'sum':
            this.operation = '+';
            break;
          case 'sub':
            this.operation = '-';
            break;
          case 'multi':
            this.operation = '*';
            break;
          case 'div':
            this.operation = '/';
            break;
        }
        this.current = params['num1'];
        this.operand = params['num2'];
        this.calculate();
      }
    })
  }

  addDigit(digit: string) {
    if (this.operation === null) {
      this.current === '0' || this.current === this.result ? this.current = digit : this.current += digit;
    } else {
      this.operand === '' ? this.operand = digit : this.operand += digit;
    }
  }

  convertToDecimal() {
    if (!this.current.includes('.')) {
      this.current += '.';
    }
  }

  changeSign() {
    if (this.current.startsWith('-')) {
      this.current = this.current.slice(1);
    } else {
      this.current = "-" + this.current;
    }
  }

  clear() {
    this.current = '0';
    this.operand = '';
    this.result = '';
    this.operation = null;
  }

  setOperation(operation: string) {
    this.operation = operation;
  }

  onEqual() {
    if (this.operation === null) {
      this.result = this.current;
    } else {
      if (this.operand === null) {
        this.operand = this.current;
      }
      this.calculate();
    }
  }

  calculate() {
    let resultObservable: Observable<Result>
    switch (this.operation) {
      case '+':
        resultObservable = this.calculateService.sum(Number(this.current), Number(this.operand));
        break;
      case '-':
        resultObservable = this.calculateService.subtract(Number(this.current), Number(this.operand))
        break
      case '*':
        resultObservable = this.calculateService.multiply(Number(this.current), Number(this.operand));
        break;
      case '/':
        resultObservable = this.calculateService.division(Number(this.current), Number(this.operand))
        break
      default:
        resultObservable = new Observable<Result>;
    }

    resultObservable.subscribe((result) => {
      this.result = String(Object.values(result)[0]);
      this.current = this.result;
    })

    this.operand = '';
    this.operation = null;
  }
}
