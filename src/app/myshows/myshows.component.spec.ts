import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MyshowsComponent } from './myshows.component';
import { AppSharedModule } from '../app.shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { SeriesService } from '../services/series.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { defer } from 'rxjs';
import { FanartPipe } from '../pipes';
import { FollowbuttonComponent } from '../buttons/follow/follow-button.component';
import { AuthService } from '../services/auth.service';
import { SeriesServiceStub } from '../test-helpers/app.test.service.mocks';
import { SortablejsModule } from 'angular-sortablejs';
import { BadgeComponent } from './badge/badge.component';
import { OrderDisplayComponent } from './orderDisplay/orderdisplay.component';
import {LOCAL_STORAGE, LocalStorageService} from 'ngx-webstorage';


describe('MyShowsComponent', () => {
  let component: MyshowsComponent;
  let fixture: ComponentFixture<MyshowsComponent>;
  const seriesServiceStub = new SeriesServiceStub();
  /*
   *  Create async observable that emits-once and completes
   *  after a JS engine turn
   */
  function fakeAsyncResponse<T>(data: T) {
    return defer(() => Promise.resolve(data));
  }

  const authServiceStub = {
    getAuth() {
      return fakeAsyncResponse(   {'authcheck': {
          'id': '4291',
          'accountname': 'henkigek',
          'thirdparty': false
        }});
    },

    isLoggedIn() {
      return true;
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ AppSharedModule, RouterTestingModule, HttpClientTestingModule,
        SortablejsModule],
      declarations: [ MyshowsComponent, FanartPipe, FollowbuttonComponent, BadgeComponent,
      OrderDisplayComponent],
      providers: [
        { provide: SeriesService, useValue: seriesServiceStub },
        { provide: AuthService, useValue: authServiceStub },
        { provide: LOCAL_STORAGE, useClass: LocalStorageService }

      ]})
      .compileComponents();

    fixture = TestBed.createComponent(MyshowsComponent);

    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', async () => {
    expect(component).toBeTruthy();
  });

  // it('should create', async () => {
  //   const heading = fixture.debugElement.nativeElement.querySelector('.title');
  //   expect(heading.innerHTML).toEqual('Hello there');
  //   expect(component).toBeTruthy();
  // });

  // it('should be series in the object', async() => {
  //   expect(component.series.length).toBeGreaterThan(1);
  // });
});
