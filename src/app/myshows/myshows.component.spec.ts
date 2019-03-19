import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';
import { MyshowsComponent } from './myshows.component';
import { FormsModule } from '@angular/forms';
import { SortablejsModule } from 'angular-sortablejs';
import { MyshowRoutingModule } from './myshows.routes';
import { AppSharedModule } from '../app.shared.module';
import { BadgeComponent } from './badge/badge.component';
import { OrderDisplayComponent } from './orderDisplay/orderdisplay.component';
import { SeriesService } from '../services/series.service';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../services/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';



describe('MyshowsComponent', () => {
  let component: MyshowsComponent;
  let fixture: ComponentFixture<MyshowsComponent>;
  let titleService: Title;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, SortablejsModule, MyshowRoutingModule, AppSharedModule, HttpClientTestingModule],
      declarations: [ MyshowsComponent, BadgeComponent, OrderDisplayComponent ],
      providers: [SeriesService , AuthService,  Title]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyshowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'Episode Alert - My Shows'`, async(() => {
    titleService = TestBed.get(Title);
    expect(titleService.getTitle()).toBe('Episode Alert - My Shows');
  }));

});
