import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfilModificationPage } from './profil-modification.page';

describe('ProfilModificationPage', () => {
  let component: ProfilModificationPage;
  let fixture: ComponentFixture<ProfilModificationPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ProfilModificationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
