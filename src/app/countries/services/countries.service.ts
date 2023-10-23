import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, delay, map, of } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1/';

  constructor(private httpClient: HttpClient) { }

  private getCountriesRequest(url: string): Observable<Country[]> {
    return this.httpClient.get<Country[]>(url)
      .pipe(
        catchError(error => {
          console.log(error);
          return of([]);
        }),
        delay(1000),
      );
  }

  searchCapital(query: string): Observable<Country[]>{
    const url = `${this.apiUrl}capital/${query}`;
    return this.getCountriesRequest(url);
  }

  searchCountry(query: string): Observable<Country[]>{
    const url = `${this.apiUrl}name/${query}`;
    return this.getCountriesRequest(url);
  }

  searchRegion(query: string): Observable<Country[]>{
    const url = `${this.apiUrl}region/${query}`;
    return this.getCountriesRequest(url);
  }

  searchCountryByAlphaCode(query: string): Observable<Country | null>{
    // debugger;
    const url = `${this.apiUrl}alpha/${query}`;

    return this.httpClient.get<Country[]>(url)
      .pipe(
        map(countries => countries.length > 0 ? countries[0]: null),
        catchError(() => of(null)),
      );
  }
}
