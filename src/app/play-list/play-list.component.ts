import { Component, OnInit, Inject } from '@angular/core';
import { Track } from '../modals/Track';
import { MuzixService } from '../muzix.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-play-list',
  templateUrl: './play-list.component.html',
  styleUrls: ['./play-list.component.css']
})
export class PlayListComponent implements OnInit {

  constructor(private muzixService: MuzixService, private dialog: MatDialog) { }

  public tracks: Track[];
  public deletedTrack: Track;
  public updatedComment: string;
  public updateTrack: Track;

  ngOnInit() {
    this.tracks = this.muzixService.trackList;
    console.log(this.tracks);
  }

  removeTrack(track: Track) {
    this.muzixService.removeTrack(track).subscribe(
      (data) => {
      this.deletedTrack = data;
        console.log(this.deletedTrack);
        alert("removed from playlist");

        this.muzixService.getPlayList().subscribe(
          data => { this.tracks = data }
        )
      })
  }

  openDialog(track: Track) {
    this.updateTrack = track;
    const dialogRef = this.dialog.open(PlayListCommentDialogue,
      {
        width: '250px',
        data: {}
      });

    dialogRef.afterClosed().subscribe(result => {
      this.updatedComment = result;
      console.log(`Dialog result: ${result}`);
      console.log(`updated comment:`, this.updatedComment);
      this.editTack();
    });
  }

  editTack() {
    this.updateTrack.name = this.updatedComment;
    this.muzixService.editTrack(this.updateTrack.id, this.updateTrack).subscribe(
      data => {
        console.log("updated Track ", data);
        this.muzixService.getPlayList().subscribe(
          data => { this.tracks = data }
        )
      }
    );
  }
}

@Component({
  selector: 'play-list-comment-dialogue',
  templateUrl: 'play-list-comment-dialogue.component.html',
})

export class PlayListCommentDialogue {

  constructor(

    public dialogRef: MatDialogRef<PlayListCommentDialogue>,
    @Inject(MAT_DIALOG_DATA) public data: Track) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}