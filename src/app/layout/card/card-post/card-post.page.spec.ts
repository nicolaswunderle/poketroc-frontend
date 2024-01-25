import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardPostPage } from './card-post.page';

describe('CardPostPage', () => {
  let component: CardPostPage;
  let fixture: ComponentFixture<CardPostPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CardPostPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
