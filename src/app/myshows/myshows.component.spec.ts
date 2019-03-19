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
import {LOCAL_STORAGE_OBJECT, WebStorageModule} from 'h5webstorage';
import { LocalStorage, StorageProperty } from 'h5webstorage';


describe('MyshowsComponent', () => {
  let component: MyshowsComponent;
  let fixture: ComponentFixture<MyshowsComponent>;
  let titleService: Title;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, SortablejsModule, MyshowRoutingModule, AppSharedModule, HttpClientTestingModule, WebStorageModule.forRoot() ],
      declarations: [ MyshowsComponent, BadgeComponent, OrderDisplayComponent ],
      providers: [SeriesService , AuthService,  Title, {provide: LOCAL_STORAGE_OBJECT, useValue: {'myVariable': 'something'}}, LocalStorage]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyshowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should set myVariable', inject([LocalStorage], ( ls: LocalStorage) => {
    expect(ls['myVariable']).toBe('something');
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'Episode Alert - My Shows'`, async(() => {
    titleService = TestBed.get(Title);
    expect(titleService.getTitle()).toBe('Episode Alert - My Shows');
  }));

});
