import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestComponent } from './test.component';
import { AppSharedModule } from '../app.shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { SeriesService } from '../services/series.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { defer } from 'rxjs';

const MOCK_SERIES = [
  {
    'id': '81189',
    'unique_name': 'breaking_bad',
    'name': 'Breaking Bad',
    'description': 'Walter White, a struggling high school chemistry teacher, is diagnosed with advanced lung cancer. ' +
      'He turns to a life of crime, producing and selling ' +
      'methamphetamine accompanied by a former student, Jesse Pinkman, with the aim of securing ' +
      'his family\'s financial future before he dies.',
    'firstaired': '2008-01-20',
    'rating': '9.4',
    'rating_updated': '0000-00-00 00:00:00',
    'imdb_id': 'tt0903747',
    'poster_image': 'breaking_bad.jpg',
    'poster_image_converted': true,
    'fanart_image': 'breaking_bad.jpg',
    'fanart_image_converted': true,
    'banner_image': 'breaking_bad.jpg',
    'banner_image_converted': true,
    'category': '|Crime|Drama|Suspense|Thriller|',
    'status': 'Ended',
    'popular': false,
    'trend': '1413',
    'season_amount': '6',
    'episode_amount': '62',
    'has_specials': true,
    'specials_amount': '17',
    'created_at': '2015-03-19 05:11:38',
    'updated_at': '2017-03-08 01:33:03',
    'series_id': '81189',
    'count': '1413',
    'following': 1
  },
  {
    'id': '264586',
    'unique_name': 'orange_is_the_new_black',
    'name': 'Orange Is the New Black',
    'description': 'Piper Chapman is a public relations executive with a career and a fiance when her past suddenly catches up to her.' +
      ' In her mid-30s she is sentenced to spend time in a minimum-security women\'s prison in Connecticut for her association with' +
      ' a drug runner 10 years earlier. This Netflix original series is based on the book of the same title. Forced to trade power' +
      ' suits for prison orange, Chapman makes her way through the corrections system and adjusts to life behind bars, making' +
      ' friends with the many eccentric, unusual and unexpected people she meets.',
    'firstaired': '2013-07-11',
    'rating': '8.6',
    'rating_updated': '0000-00-00 00:00:00',
    'imdb_id': 'tt2372162',
    'poster_image': 'orange_is_the_new_black.jpg',
    'poster_image_converted': true,
    'fanart_image': 'orange_is_the_new_black.jpg',
    'fanart_image_converted': true,
    'banner_image': 'orange_is_the_new_black.jpg',
    'banner_image_converted': true,
    'category': '|Comedy|Crime|Drama|',
    'status': 'Continuing',
    'popular': false,
    'trend': '987',
    'season_amount': '5',
    'episode_amount': '53',
    'has_specials': false,
    'specials_amount': '0',
    'created_at': '2015-03-19 05:13:31',
    'updated_at': '2017-03-05 15:58:15',
    'series_id': '264586',
    'count': '987',
    'following': 1
  },
  {
    'id': '250487',
    'unique_name': 'american_horror_story',
    'name': 'American Horror Story',
    'description': 'An anthology series that centers on different characters and locations, including a house with a murderous past,' +
      ' an insane asylum, a witch coven, a freak show, an enigmatic hotel and a sinister farmhouse in Roanoke, North Carolina.',
    'firstaired': '2011-10-05',
    'rating': '8.4',
    'rating_updated': '0000-00-00 00:00:00',
    'imdb_id': 'tt1844624',
    'poster_image': 'american_horror_story.jpg',
    'poster_image_converted': true,
    'fanart_image': 'american_horror_story.jpg',
    'fanart_image_converted': true,
    'banner_image': 'american_horror_story.jpg',
    'banner_image_converted': true,
    'category': '|Drama|Horror|Thriller|',
    'status': 'Continuing',
    'popular': false,
    'trend': '724',
    'season_amount': '6',
    'episode_amount': '73',
    'has_specials': false,
    'specials_amount': '0',
    'created_at': '2015-03-05 01:47:18',
    'updated_at': '2017-03-05 07:25:36',
    'series_id': '250487',
    'count': '724',
    'following': 1
  },
  {
    'id': '264492',
    'unique_name': 'under_the_dome',
    'name': 'Under the Dome',
    'description': 'An invisible and mysterious force field descends upon a small fictional town in the United States, ' +
      'trapping residents inside, cut off from the rest of civilization. The trapped townsfolk must discover the secrets ' +
      'and purpose of the \'dome\' and its origins, while coming to learn more than they ever knew about each other.',
    'firstaired': '2013-06-24',
    'rating': '7.8',
    'rating_updated': '0000-00-00 00:00:00',
    'imdb_id': 'tt1553656',
    'poster_image': 'under_the_dome.jpg',
    'poster_image_converted': true,
    'fanart_image': 'under_the_dome.jpg',
    'fanart_image_converted': true,
    'banner_image': 'under_the_dome.jpg',
    'banner_image_converted': true,
    'category': '|Drama|Horror|Mystery|Science-Fiction|',
    'status': 'Ended',
    'popular': false,
    'trend': '594',
    'season_amount': '4',
    'episode_amount': '39',
    'has_specials': true,
    'specials_amount': '1',
    'created_at': '2015-03-09 22:56:27',
    'updated_at': '2017-03-06 10:04:53',
    'series_id': '264492',
    'count': '594',
    'following': 1
  },
  {
    'id': '108611',
    'unique_name': 'white_collar',
    'name': 'White Collar',
    'description': 'A white collar criminal agrees to help the FBI catch other white collar criminals using ' +
      'his expertise as an art and securities thief, counterfeiter, and conman.',
    'firstaired': '2009-10-23',
    'rating': '8.7',
    'rating_updated': '2010-01-08 00:00:00',
    'imdb_id': 'tt1358522',
    'poster_image': 'white_collar.jpg',
    'poster_image_converted': true,
    'fanart_image': 'white_collar.jpg',
    'fanart_image_converted': true,
    'banner_image': 'white_collar.jpg',
    'banner_image_converted': true,
    'category': '|Comedy|Crime|Drama|Mystery|',
    'status': 'Ended',
    'popular': true,
    'trend': '556',
    'season_amount': '6',
    'episode_amount': '81',
    'has_specials': false,
    'specials_amount': '0',
    'created_at': '2015-03-16 01:46:41',
    'updated_at': '2017-02-27 13:40:28',
    'series_id': '108611',
    'count': '556',
    'following': 0
  }
];

describe('TestComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  /**
   *  Create async observable that emits-once and completes
   *  after a JS engine turn
   */
  function fakeAsyncResponse<T>(data: T) {
    return defer(() => Promise.resolve(data));
  }

  const seriesServiceStub = {
    getTopSeries() {
      return fakeAsyncResponse(MOCK_SERIES);
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ AppSharedModule, RouterTestingModule, HttpClientTestingModule ],
      declarations: [ TestComponent ],
      providers: [
        { provide: SeriesService, useValue: seriesServiceStub }
      ]})
      .compileComponents();

    fixture = TestBed.createComponent(TestComponent);

    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', async () => {
    expect(component).toBeTruthy();
  });

  it('should create', async () => {
    const heading = fixture.debugElement.nativeElement.querySelector('.title');
    expect(heading.innerHTML).toEqual('Hello there');
    expect(component).toBeTruthy();
  });


  it('should be series in the object', async() => {
    expect(component.series.length).toBeGreaterThan(1);
  });
});
