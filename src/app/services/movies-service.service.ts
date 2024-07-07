import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenreDto, Movie, MoviesDto } from '../types/movie';
// import { ImagesDto } from '../types/image';
import { map } from 'rxjs';
import { VideoDto } from '../types/video';
import { ImagesDto } from '../types/image';
import { CreditsDto } from '../types/credits';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private apiUrl = environment.apiUrl;
  private apiKey = environment.apiKey

  constructor(private http: HttpClient) {
   }

  getMoviesByType(type: string, count = 20) {
    return this.http
      .get<MoviesDto>(`${this.apiUrl}/movie/${type}?api_key=${this.apiKey}`)
      .pipe(map((response) => response.results.slice(0, count)));
  }

  //  getPopularMovies() {
  //  return this.http.get<MoviesDto>(`${this.apiUrl}/movie/popular?api_key=${this.apiKey}`)
  // }

  //  getUpcomingMovies() {
  //  return this.http.get<MoviesDto>(`${this.apiUrl}/movie/upcoming?api_key=${this.apiKey}`)
  // }

  // getTopRatedMovies() {
  //   return this.http.get<MoviesDto>(`${this.apiUrl}/movie/top_rated?api_key=${this.apiKey}`)
  //  }

  getMovieById(id: string) {
    return this.http.get<Movie>(`${this.apiUrl}/movie/${id}?api_key=${this.apiKey}`)
  }

  getMovieVideos(id: string) {
    return this.http.get<VideoDto>(`${this.apiUrl}/movie/${id}/videos?api_key=${this.apiKey}`)
    .pipe(map((data) => data.results))
  }

  getMovieImages(id: string) {
    return this.http.get<ImagesDto>(`${this.apiUrl}/movie/${id}/images?api_key=${this.apiKey}`)
    .pipe(map((data) => data.backdrops))
  }

  getMovieCast(id: string) {
    return this.http.get<CreditsDto>(`${this.apiUrl}/movie/${id}/credits?api_key=${this.apiKey}`)
    .pipe(map((data) => data.cast))
  }

  searchMovies(page: number, searchValue?: string) {
  const uri = searchValue ? "search/movie" : "movie/popular"

    return this.http.get<MoviesDto>(`${this.apiUrl}/${uri}?query=${searchValue}&page=${page}&api_key=${this.apiKey}`)
  }

  getMoviesGenres() {
    return this.http.get<GenreDto>(`${this.apiUrl}/genre/movie/list?api_key=${this.apiKey}`)
    .pipe(map((data) => {
      // console.log(data.genres)
      return data.genres
    }))
  }

  getMoviesByGenre(genreId: string, pageNumber = 1) {
    return this.http
      .get<MoviesDto>(`${this.apiUrl}/discover/movie?with_genres=${genreId}&page=${pageNumber}&api_key=${this.apiKey}`)
      .pipe(map((response) => {
        // console.log(response, 'response')
        return response.results
      }));
  }
}

