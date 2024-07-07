import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Genre, Movie } from '../../types/movie';
import { MoviesService } from '../../services/movies-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrl: './genres.component.scss'
})
export class GenresComponent implements OnInit {
 genres$ : Observable<Genre[]> | null = null;
 shows$ : Observable<Movie[]> | null = null;
 genreId = ""

  constructor(private mService: MoviesService, private route: ActivatedRoute) {}

  ngOnInit() {
    // snapshot - method to listen only once
    // subscrice - method to listen to every change
    // this.genreId = this.route.snapshot.params["genreId"]
    this.route.params.subscribe(params => {
      this.genreId = params["genreId"]
      this.shows$ = this.mService.getMoviesByGenre(this.genreId)
      // console.log("🚀   this.genreId:",  this.genreId);
    })

    this.genres$ = this.mService.getMoviesGenres();
   
    
  }

  // findByGenre(genreId: string) {
  // //  this.shows$ = this.mService.getMoviesByGenre(genreId)
  // }

}
