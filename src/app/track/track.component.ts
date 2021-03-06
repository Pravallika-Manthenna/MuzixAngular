import { Component, OnInit } from '@angular/core';
import {Track} from '../modals/Track';
import {MuzixService} from '../muzix.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css']
})
export class TrackComponent implements OnInit {

  public tracks : Track[];
  public track : Track;

  constructor(private muzixService : MuzixService, private route : ActivatedRoute ) { 
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) =>
    {
      let searchString = params.get('searchString');
      this.muzixService.getLastFmTracks(searchString).subscribe((data) => {
      this.tracks = data.results.trackmatches.track;
      console.log("result is ",this.tracks);
    });
    })
  }

  saveTrack(track : Track)
  {
      this.muzixService.saveTrack(track).subscribe((data) => {
      this.track = data;
      console.log("result is ",this.track);
    });
  }
}
