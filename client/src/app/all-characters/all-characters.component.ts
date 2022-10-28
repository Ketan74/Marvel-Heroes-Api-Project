import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MarvelAPIService } from '../services/marvel-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MarvelReviewService } from '../services/marvel-review.service';
@Component({
  selector: 'app-all-characters',
  templateUrl: './all-characters.component.html',
  styleUrls: ['./all-characters.component.css'],
})
export class AllCharactersComponent implements OnInit {
  @ViewChild('closeModal') closeModal: any;
  comics: any = [];
  series: any = [];
  reviews: any = [];
  allCharacters: any = [];
  searchedCharacter: any = [];
  userReview: any;
  mode: string = 'R';
  showComicsDiv: boolean = false;
  showSeriesDiv: boolean = false;
  showReviewDiv: boolean = false;
  showComicData: boolean = false;
  showSearchResult: boolean = false;
  name: string = '';
  characterName: string = '';
  reviewMessage: string = '';
  characterId: string = '';

  constructor(
    private marvelApiService: MarvelAPIService,
    private marvelReviewService: MarvelReviewService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    route.params.subscribe((params) => {
      this.name = params['name'];
    });
    if (sessionStorage.getItem('token')) {
      this.marvelReviewService.verify().subscribe(
        (data) => {
          let tempData = JSON.parse(JSON.stringify(data));
          this.name = tempData.name;
          sessionStorage.setItem('name', this.name);
          sessionStorage.setItem('userSrNo', tempData.srNo);
          router.navigate(['characters', this.name]);
        },
        (error) => {
          console.log('Unauthorized');
          sessionStorage.removeItem('token');
          sessionStorage.removeItem('userSrNo');
          sessionStorage.removeItem('name');
          router.navigate(['characters', '__']);
        }
      );
    } else {
      router.navigate(['characters', '__']);
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('userSrNo');
      sessionStorage.removeItem('name');
    }
  }

  ngOnInit(): void {
    this.marvelApiService.allCharacters().subscribe((result) => {
      this.allCharacters = result.data.results;
    });
  }

  onKey(event: any) {
    if (event.target.placeholder === 'Enter your review')
      this.reviewMessage = event.target.value;
  }

  findCharacter(event: any) {
    this.characterName = event.target.value;
    console.log(this.characterName);
    this.marvelApiService
      .getCharacterByName(this.characterName)
      .subscribe((result) => {
        console.log(result);
        if (result.data.count > 0) {
          this.showSearchResult = true;
          this.searchedCharacter = result.data.results;
        } else {
          this.ngOnInit();
        }
      });
  }

  fetchComicsByCharacter(characterId: string) {
    this.showComicsDiv = false;
    this.marvelApiService
      .getComicsByCharacter(characterId)
      .subscribe((result) => {
        if (result.data.count > 0) {
          this.comics = result.data.results;
          this.showComicsDiv = true;
        }
      });
  }

  fetchSeriesByCharacter(characterId: string) {
    this.showSeriesDiv = false;
    this.marvelApiService
      .getSeriesByCharacter(characterId)
      .subscribe((result) => {
        if (result.data.count > 0) {
          this.series = result.data.results;
          this.showSeriesDiv = true;
        }
      });
  }

  fetchReviewByCharacter(characterId: string) {
    this.reviews = [];
    this.characterId = characterId;
    this.marvelReviewService.getReviews(characterId).subscribe(
      (data) => {
        let tempData = JSON.parse(JSON.stringify(data));

        if (tempData.length > 0) {
          tempData.forEach((i: any) => {
            if (i.userSrNo == sessionStorage.getItem('userSrNo')) {
              this.userReview = i;
            } else {
              this.reviews.push(i);
            }
          });
          this.showReviewDiv = true;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  addAReview() {
    this.route.params.subscribe((params) => {
      this.name = params['name'];
    });
    if (sessionStorage.getItem('token')) {
      this.marvelReviewService.verify().subscribe(
        (data) => {
          let tempData = JSON.parse(JSON.stringify(data));
          this.name = tempData.name;
          sessionStorage.setItem('name', this.name);
          sessionStorage.setItem('userSrNo', tempData.srNo);
          this.changeMode('W');
        },
        (error) => {
          console.log('Unauthorized');
        }
      );
    } else {
      this.router.navigate(['signin']);
      this.closeModal.nativeElement.click();
    }
  }

  postReview() {
    this.changeMode('R');
    console.log(this.reviewMessage);

    let userSrNo = parseInt(sessionStorage.getItem('userSrNo') || '');
    this.marvelReviewService
      .postReivew(userSrNo, this.characterId, this.reviewMessage)
      .subscribe(
        (data) => {
          let tempData = JSON.parse(JSON.stringify(data));
          this.reviewMessage = '';
          window.alert(tempData.reviewMessage);
          this.fetchReviewByCharacter(this.characterId);
        },
        (error) => {
          window.alert(error.error.message);
        }
      );
  }

  editReview() {
    this.changeMode('R');
    console.log(this.reviewMessage);
    let userSrNo = parseInt(sessionStorage.getItem('userSrNo') || '');
    if (this.reviewMessage !== this.userReview.reviewMessage) {
      this.marvelReviewService
        .updateReview(userSrNo, this.characterId, this.reviewMessage)
        .subscribe(
          (data) => {
            let tempData = JSON.parse(JSON.stringify(data));
            this.userReview.reviewMessage = this.reviewMessage;
            this.reviewMessage = '';
            window.alert(tempData.reviewMessage);
          },
          (error) => {
            window.alert(error.error.message);
          }
        );
    }
  }

  deleteReview() {
    let userSrNo = parseInt(sessionStorage.getItem('userSrNo') || '');
    this.marvelReviewService.deleteReview(userSrNo, this.characterId).subscribe(
      (data) => {
        this.userReview = null;
      },
      (error) => {
        window.alert(error.error.message);
      }
    );
  }
  changeMode(mode: string) {
    this.mode = mode;
    if (mode == 'U') this.reviewMessage = this.userReview.reviewMessage;
  }

  reset() {
    this.reviews = [];
    this.userReview = null;
    this.mode = 'R';
    this.showReviewDiv = false;
    this.reviewMessage = '';
    this.characterId = '';
  }
  showComic(title: string) {}
}
