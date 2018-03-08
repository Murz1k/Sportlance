import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Sport } from './sport';

@Injectable()
export class SportService {

  constructor(private http: HttpClient) { }

getSportsAsync(): Promise<any> {
  return this.http.get<Sport[]>('http://localhost:53560/api/sport').toPromise();
}
}
