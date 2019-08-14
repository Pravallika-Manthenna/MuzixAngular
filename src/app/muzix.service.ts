import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Result } from './modals/Result';
import { Track } from './modals/Track';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})

export class MuzixService {

  constructor(private httpclient: HttpClient) { }

  public results: any;
  public trackList: Track[];
  public url = "http://localhost:8090/track";
  lastFmUrl = 'http://ws.audioscrobbler.com/2.0/?method=track.search&track=Believe&api_key=b8dde93c701237504552ab3ec3953972&format=json';


  getLastFmTracks(searchString: string): Observable<Result> {
    let params = new HttpParams();
    params = params.append('track', searchString);
    var url = 'http://ws.audioscrobbler.com/2.0/?method=track.search&api_key=d49c2ee6942b4ad28ef6334c4591f231&format=json';
    this.httpclient.get<Result>(url, { params: params }).subscribe((data) => { this.results = data });
    return this.httpclient.get<Result>(url, { params: params });
  }

  getData() {
    console.log("Inside service");
    return this.httpclient.get(this.lastFmUrl);
  }

  saveTrack(track: Track): Observable<Track> {
    var postUrl = "http://localhost:8090/track";
    return this.httpclient.post<Track>(postUrl, track, httpOptions);
  }

  getPlayList(): Observable<Track[]> {
    var getUrl = "http://localhost:8090/track";
    return this.httpclient.get<Track[]>(getUrl);
  }

  removeTrack(track: Track): Observable<Track> {
    console.log(track);
    return this.httpclient.delete<Track>(this.url + "/" + track.id);
  }

  editTrack(id: number, track : Track)
  {
    return this.httpclient.put<Track>(this.url + "/" + track.id, track, httpOptions);
  }
}
