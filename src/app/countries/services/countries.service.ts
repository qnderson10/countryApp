import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, delay, map, of, tap } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1/';

  public cacheStore: CacheStore = {
    byCapital: { term: '', countries: []},
    byCountry: { term: '', countries: []},
    byRegion: { countries: []},
  }

  constructor(private httpClient: HttpClient) {
    this.loadFromLocalStorage();
  }

  private saveToLocalStorage(){
    localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore));
  }

  private loadFromLocalStorage(){
    if (!localStorage.getItem('cacheStore')) return;

    this.cacheStore = JSON.parse(localStorage.getItem('cacheStore')!);
  }

  private getCountriesRequest(url: string): Observable<Country[]> {
    return this.httpClient.get<Country[]>(url)
      .pipe(
        catchError(error => {
          console.log(error);
          return of([]);
        }),
        // delay(1000),
      );
  }

  searchCapital(query: string): Observable<Country[]>{
    const url = `${this.apiUrl}capital/${query}`;
    return this.getCountriesRequest(url)
      .pipe(
        tap(countries => this.cacheStore.byCapital = {term: query, countries}),
        tap(() => this.saveToLocalStorage()),
      );
  }

  searchCountry(query: string): Observable<Country[]>{
    const url = `${this.apiUrl}name/${query}`;
    return this.getCountriesRequest(url)
      .pipe(
        tap(countries => this.cacheStore.byCountry = {term: query, countries}),
        tap(() => this.saveToLocalStorage()),
        );
  }

  searchRegion(query: Region): Observable<Country[]>{
    const url = `${this.apiUrl}region/${query}`;
    return this.getCountriesRequest(url)
      .pipe(
        tap(countries => this.cacheStore.byRegion = {region: query, countries}),
        tap(() => this.saveToLocalStorage()),
      );
  }

  searchCountryByAlphaCode(query: string): Observable<Country | null>{
    const url = `${this.apiUrl}alpha/${query}`;

    return this.httpClient.get<Country[]>(url)
      .pipe(
        map(countries => countries.length > 0 ? countries[0]: null),
        catchError(() => of(null)),
      );
  }
}
