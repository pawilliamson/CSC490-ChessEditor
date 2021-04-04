import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';

const baseUrl = 'http://localhost:8080/account';

@Injectable({
  providedIn: 'root'
})

export class UserService {
    constructor(private http : HttpClient) {}

    getAll(): Observable<any> {
        return this.http.get(baseUrl);
    }

    get(id): Observable<any> {
        return this.http.get(`${baseUrl}/${id}`);
    }

    create(data): Observable<any> {
        return this.http.post(baseUrl, data);
    }

    update(id, data): Observable<any> {
        return this.http.put(`${baseUrl}/${id}`, data);
    }

    delete(id): Observable<any> {
        return this.http.delete(`${baseUrl}/${id}`);
    }

    deleteAll(): Observable<any> {
        return this.http.delete(baseUrl);
    }

    findByEmail(email): Observable<any> {
        return this.http.get(baseUrl + "?emailAddress=" + email);
    }
}