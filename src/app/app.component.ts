import {
  Component,
  OnInit,
  OnDestroy,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { JokeService } from './joke.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { delay, Subscription } from 'rxjs';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  joke: string | null = null;
  loading: boolean = true;
  error: string = '';
  jokeSubscription: Subscription | null = null;
  isBrowser: boolean = false;

  constructor(
    private jokeService: JokeService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    // this.isBrowser = isPlatformBrowser(this.platformId);

    // if (this.isBrowser) {
    //   this.fetchJoke();
    // }
    this.fetchJoke();
  }

  fetchJoke(): void {
    this.loading = true;
    this.error = '';
    this.joke = null;

    if (this.jokeSubscription) {
      this.jokeSubscription.unsubscribe();
    }

    this.jokeSubscription = this.jokeService
      .getJoke()
      .pipe(delay(2000))
      .subscribe({
        next: (response) => {
          this.joke = response.joke;
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Failed to load joke. Please try again later.';
          this.loading = false;
        },
      });
  }
}
