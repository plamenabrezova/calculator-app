import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  operation: string | null = null;
  startSecondOperand: boolean = false

  constructor(private calculateService: CalculateService, activatedRoute: ActivatedRoute, private router: Router) {
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

        this.current = params['num2'];
        this.operand = params['num1'];
        this.calculate();
      } else {
        this.router.navigateByUrl('/')
      }
    })
  }

  addDigit(digit: string): void {
    if (this.startSecondOperand) {
      this.current = digit
      this.startSecondOperand = false
    } else {
      this.current === '0' ? this.current = digit : this.current += digit
    }
  }

  convertToDecimal(): void {
    if (!this.current.includes('.')) {
      this.current += '.';
    }
  }

  changeSign(): void {
    if (this.current.startsWith('-')) {
      this.current = this.current.slice(1);
    } else {
      this.current = "-" + this.current;
    }
  }

  clear(): void {
    this.current = '0';
    this.operand = '';
    this.operation = null;
  }

  setOperation(operation: string): void {
    if (this.operand === '') {
      this.operand = this.current;
    }
    this.operation = operation;
    this.startSecondOperand = true;
  }

  onEqual(): void {
    if (this.operation) this.calculate()
  }

  calculate(): void {
    let resultObservable: Observable<Result>
    switch (this.operation) {
      case '+':
        resultObservable = this.calculateService.sum(Number(this.operand), Number(this.current));
        break;
      case '-':
        resultObservable = this.calculateService.subtract(Number(this.operand), Number(this.current))
        break
      case '*':
        resultObservable = this.calculateService.multiply(Number(this.operand), Number(this.current));
        break;
      case '/':
        resultObservable = this.calculateService.division(Number(this.operand), Number(this.current))
        break
      default:
        resultObservable = new Observable<Result>;
    }

    resultObservable.subscribe((result) => {
      this.current = String(Object.values(result)[0]);
      this.operand = this.current;
    })
    this.operation = null;
  }
}
