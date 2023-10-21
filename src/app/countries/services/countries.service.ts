import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1/';

  constructor(private httpClient: HttpClient) { }

  searchCapital(query: string): Observable<Country[]>{
    // debugger;
    const url = `${this.apiUrl}capital/${query}`;
    return this.httpClient.get<Country[]>(url)
      .pipe(
        catchError(error => {
          console.log(error);
          return of([]);
        })
      );
  }

  searchCountry(query: string): Observable<Country[]>{
    // debugger;
    const url = `${this.apiUrl}name/${query}`;
    return this.httpClient.get<Country[]>(url)
      .pipe(
        catchError(error => {
          console.log(error);
          return of([]);
        })
      );
  }

  searchRegion(query: string): Observable<Country[]>{
    // debugger;
    const url = `${this.apiUrl}region/${query}`;
    return this.httpClient.get<Country[]>(url)
      .pipe(
        catchError(error => {
          console.log(error);
          return of([]);
        })
      );
  }
}
