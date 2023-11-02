import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { DIV_URL, MULTI_URL, SUB_URL, SUM_URL } from '../shared/urls';

@Injectable({
  providedIn: 'root'
})
export class CalculateService {

  constructor(private http: HttpClient) { }

  sum(num1: number, num2: number): Observable<number> {
    return this.http.get<number>(SUM_URL + num1 + '/' + num2)
  }
  subtract(num1: number, num2: number): Observable<number> {
    return this.http.get<number>(SUB_URL + num1 + '/' + num2)
  }

  multiply(num1: number, num2: number): Observable<number> {
    return this.http.get<number>(MULTI_URL + num1 + '/' + num2)
  }
  division(num1: number, num2: number): Observable<number> {
    return this.http.get<number>(DIV_URL + num1 + '/' + num2)
  }
}
