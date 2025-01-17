import { Component } from '@angular/core';
import { MoviesService } from '../../services/movies-service.service';
import { TvshowsService } from '../../services/tvshows.service';
import { mapToMovies } from '../../types/tvshow';
import { map } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
popularMovies$ = this.moviesService.getMoviesByType("popular", 12)
upcomingMovies$ = this.moviesService.getMoviesByType("upcoming", 12)
topRatedMovies$ = this.moviesService.getMoviesByType("top_rated", 12)
popularTvshows$ = this.tvshowsService.getTvShowsByType("popular",12).pipe(map(mapToMovies))

constructor(private moviesService: MoviesService, private tvshowsService: TvshowsService) { }
}
