import {environment} from '../../environments/environment';

export class BaseService {
  protected baseApiUrl = environment.baseUrl + '/api';
}
