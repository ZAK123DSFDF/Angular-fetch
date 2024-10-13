import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class JokeService {
  private apiUrl = 'https://icanhazdadjoke.com/';

  constructor(private http: HttpClient) {}

  // Fetch joke from the API
  getJoke(): Observable<any> {
    const headers = new HttpHeaders({
      Accept: 'application/json',
    });

    return this.http.get(this.apiUrl, { headers }).pipe(
      catchError((error) => {
        console.error('Error fetching joke', error);
        return throwError(() => error);
      })
    );
  }
}
