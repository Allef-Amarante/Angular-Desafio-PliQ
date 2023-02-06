import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Estagio } from '../Models/Estagio';

@Injectable()
export class EstagioServices {
    estagioApiUrl = 'https://localhost:44341/api/Estagios';    
    estagioApiUrlDel = 'https://localhost:44341/api/Estagios/'; 
  constructor(private http: HttpClient) { }

  getEstagios() : Observable<Estagio[]> {
    return this.http.get<Estagio[]>(this.estagioApiUrl);
  }  

  createEstagios(estagio: Estagio) : Observable<Estagio> {
    return this.http.post<Estagio>(this.estagioApiUrl, estagio);
  }

  editEstagios(estagio: Estagio) : Observable<Estagio> {
    return this.http.put<Estagio>(this.estagioApiUrl, estagio);
  }

  deleteEstagios(id: number) : Observable<void> {
    return this.http.delete<void>(`${this.estagioApiUrlDel}${id}`);
  }
}