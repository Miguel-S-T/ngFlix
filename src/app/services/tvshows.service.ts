import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { TvshowsDto } from '../types/tvshow';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TvshowsService {

  private apiUrl = environment.apiUrl;
  private apiKey = environment.apiKey

  constructor(private http: HttpClient) {
   }

  getTvShowsByType(type: string, count = 20) {
    return this.http
      .get<TvshowsDto>(`${this.apiUrl}/tv/${type}?api_key=${this.apiKey}`)
      .pipe(map((response) => response.results.slice(0, count)));
  }

  searchTv(page: number, searchValue?: string) {
    const uri = searchValue ? "search/tv" : "tv/popular"
  
      return this.http.get<TvshowsDto>(`${this.apiUrl}/${uri}?query=${searchValue}&page=${page}&api_key=${this.apiKey}`)
    }
}