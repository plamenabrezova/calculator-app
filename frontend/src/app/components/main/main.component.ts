import { Component } from '@angular/core';
import { Observable, take } from 'rxjs';
import { CalculateService } from 'src/app/services/calculator.service';
import { Result, firstRowNumbers, secondRowNumbers, thirdRowNumbers, operations, numberModifiers } from 'src/app/shared/data';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  operations = operations
  firstRowNumbers = firstRowNumbers
  secondRowNumbers = secondRowNumbers
  thirdRowNumbers = thirdRowNumbers
  numberModifiers = numberModifiers


  // first
  current: string | null = null
  // second
  operand: string | null = null
  result: string | null = null
  operation: string | null = null

  constructor(private calculateService: CalculateService) { }

  addDigit(digit: string) {
    if (this.operation === null) {
      this.current === null ? this.current = digit : this.current += digit
    } else {
      this.operand === null ? this.operand = digit : this.operand += digit
    }
  }

  convertToDecimal() {
    if (this.current && !this.current.includes('.')) {
      this.current += '.'
    }
  }

  changeSign() {
    if (this.current && this.current.startsWith('-')) {
      this.current = this.current.slice(1)
    } else {
      this.current = "-" + this.current
    }
  }

  clear() {
    this.result = null;
    this.current = null;
    this.operand = null;
    this.operation = null;
  }

  setOperation(operation: string) {
    this.operation = operation
  }

  onEqual() {
    if (this.operation === null) {
      this.result = this.current
    } else {
      if (this.operand === null) {
        this.operand = this.current
      }
      this.calculate()
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
        resultObservable = new Observable<Result>
    }

    resultObservable.subscribe((result) => {
      this.result = String(Object.values(result)[0])
      this.current = this.result;
    })

    this.operand = null
    this.operation = null

  }

}
