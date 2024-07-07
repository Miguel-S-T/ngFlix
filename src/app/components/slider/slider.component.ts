import { Component, Input, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { MoviesService } from '../../services/movies-service.service';
import { trigger, state , style, transition, animate} from '@angular/animations';
import { imagesBaseUrl } from '../../constants/images.sizes';
import { Movie } from '../../types/movie';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss', 
  animations: [
    trigger("slideFade", [
      state("void", style({
        opacity: 0
      })), 
      transition("void <=> *", [animate("1s")])
    ])
  ]
})
export class SliderComponent implements OnInit {

  @Input() slides : Movie[] = []
  @Input() isHeader = false

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  // constructor(private moviesService: MoviesService) {
  //   // console.log("Slider Component")
  // }

  // movies$ = this.moviesService.getMoviesByType("popular")

  slideIndex = 0;

  // images urls from API
  imagesBaseUrl = imagesBaseUrl

  ngOnInit() {
    if (!this.isHeader) {
      this.changeSlide()
    }
   
  }

  changeSlide() {
    setInterval(() => {
      this.slideIndex += 1
      if (this.slideIndex > 10) {
        this.slideIndex = 0
      }
    }, 5000)
  }

//  items = ["Name1", "Name2", "Name3", "Name4", "Name5", "Name6", "Name7", "Name8", "Name9", "Name10"]
}
