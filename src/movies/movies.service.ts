import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class MoviesService {
    private apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNmUzOTgxNTliM2VhNjUxMTQ0YWYxNWZhZGJkMzllYSIsInN1YiI6IjY1OTgxZWE5NWNjMTFkNzdkODdkZDhkZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8JFdLCqu_Wd-Ak6HAenpzr0WKCHZjThrnubAoLZqCm4';
    private apiUrl = 'https://api.themoviedb.org/3';

  async getCurrentMovies() {
    const response = await axios.get(`${this.apiUrl}/movie/now_playing`, {
      params: { api_key: this.apiKey },
    });
    return response.data.results;
  }
}
