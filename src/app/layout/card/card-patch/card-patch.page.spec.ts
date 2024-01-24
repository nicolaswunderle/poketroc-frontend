import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardPatchPage } from './card-patch.page';

describe('CardPatchPage', () => {
  let component: CardPatchPage;
  let fixture: ComponentFixture<CardPatchPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CardPatchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
