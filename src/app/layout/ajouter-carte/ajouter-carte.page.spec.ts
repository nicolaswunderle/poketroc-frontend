import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AjouterCartePage } from './ajouter-carte.page';

describe('AjouterCartePage', () => {
  let component: AjouterCartePage;
  let fixture: ComponentFixture<AjouterCartePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AjouterCartePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
