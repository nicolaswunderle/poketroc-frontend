import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeckChoixEchangePage } from './deck-choix-echange.page';


describe('DeckChoixEchangePage', () => {
  let component: DeckChoixEchangePage;
  let fixture: ComponentFixture<DeckChoixEchangePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DeckChoixEchangePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
