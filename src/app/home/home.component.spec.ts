import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { AppSharedModule } from '../app.shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { SeriesService } from '../services/series.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { defer } from 'rxjs';
import { FanartPipe } from '../pipes';
import { FollowbuttonComponent } from '../buttons/follow/follow-button.component';
import { AuthService } from '../services/auth.service';
import { SeriesServiceStub, AuthServiceStub } from '../test-helpers/app.test.service.mocks';


describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  const seriesServiceStub = new SeriesServiceStub();
  const authServiceStub = new AuthServiceStub();

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ AppSharedModule, RouterTestingModule, HttpClientTestingModule ],
      declarations: [ HomeComponent, FanartPipe, FollowbuttonComponent ],
      providers: [
        { provide: SeriesService, useValue: seriesServiceStub },
        { provide: AuthService, useValue: authServiceStub }
      ]})
      .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);

    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', async () => {
    expect(component).toBeTruthy();
  });

});
