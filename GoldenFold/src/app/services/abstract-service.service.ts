import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export abstract class BaseService<T, ID> {

  protected abstract apiUrl: string;

  constructor(protected http: HttpClient) {}

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.apiUrl);
  }

  getById(id: ID): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/${id}`);
  }

  post(entity: T): Observable<T> {
    return this.http.post<T>(this.apiUrl, entity);
  }

  put(id: ID, entity: T): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}/${id}`, entity);
  }

  delete(id: ID): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  
}
