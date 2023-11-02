import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { DIV_URL, MULTI_URL, SUB_URL, SUM_URL } from '../shared/urls';
import { Result } from '../shared/data';

@Injectable({
  providedIn: 'root'
})
export class CalculateService {

  constructor(private http: HttpClient) { }

  sum(num1: Number, num2: Number): Observable<Result> {
    return this.http.get<Result>(SUM_URL + num1 + '/' + num2)
  }
  subtract(num1: Number, num2: Number): Observable<Result> {
    return this.http.get<Result>(SUB_URL + num1 + '/' + num2)
  }

  multiply(num1: Number, num2: Number): Observable<Result> {
    return this.http.get<Result>(MULTI_URL + num1 + '/' + num2)
  }
  division(num1: Number, num2: Number): Observable<Result> {
    return this.http.get<Result>(DIV_URL + num1 + '/' + num2)
  }
}
