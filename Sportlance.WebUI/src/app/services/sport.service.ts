import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Sport} from './sport';
import {CollectionResponse} from './collection-response';

@Injectable()
export class SportService {

  constructor(private http: HttpClient) {
  }

  getSportsAsync(): Promise<CollectionResponse<Sport>> {
    return this.http.get<CollectionResponse<Sport>>('http://localhost:53560/api/sport').toPromise();
  }
}
