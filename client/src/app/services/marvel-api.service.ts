import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MarvelAPIService {
  constructor(private http: HttpClient) {}
  limit = 50;

  Url =
    'https://gateway.marvel.com:443/v1/public/characters?limit=' +
    this.limit.toString() +
    '&orderBy=-modified&ts=1&apikey=06c8e672eac4adf5eff007e8b17f65af&hash=7a123cda1ac4a5dbbbbd07a72d32bb3d';

  allCharacters(): Observable<any> {
    return this.http.get(this.Url);
  }

  allComics(): Observable<any> {
    const comicUrl =
      'https://gateway.marvel.com:443/v1/public/comics?limit=' +
      this.limit.toString() +
      '&orderBy=-modified&ts=1&apikey=06c8e672eac4adf5eff007e8b17f65af&hash=7a123cda1ac4a5dbbbbd07a72d32bb3d';
    return this.http.get(comicUrl);
  }

  allSeries(): Observable<any> {
    const seriesUrl =
      'https://gateway.marvel.com:443/v1/public/series?limit=' +
      this.limit.toString() +
      '&orderBy=-modified&ts=1&apikey=06c8e672eac4adf5eff007e8b17f65af&hash=7a123cda1ac4a5dbbbbd07a72d32bb3d';
    return this.http.get(seriesUrl);
  }

  getComicsByCharacter(characterId: string): Observable<any> {
    const comicByCharacterUrl = `https://gateway.marvel.com:443/v1/public/characters/${characterId}/comics?ts=1&apikey=06c8e672eac4adf5eff007e8b17f65af&hash=7a123cda1ac4a5dbbbbd07a72d32bb3d`;
    return this.http.get(comicByCharacterUrl);
  }
  getSeriesByCharacter(characterId: string): Observable<any> {
    const comicByCharacterUrl = `https://gateway.marvel.com:443/v1/public/characters/${characterId}/series?ts=1&apikey=06c8e672eac4adf5eff007e8b17f65af&hash=7a123cda1ac4a5dbbbbd07a72d32bb3d`;
    return this.http.get(comicByCharacterUrl);
  }

  getCharacterByName(characterName: string): Observable<any> {
    const characterBYNameUrl = `https://gateway.marvel.com:443/v1/public/characters?name=${characterName}&ts=1&apikey=06c8e672eac4adf5eff007e8b17f65af&hash=7a123cda1ac4a5dbbbbd07a72d32bb3d`;
    return this.http.get(characterBYNameUrl);
  }
}
