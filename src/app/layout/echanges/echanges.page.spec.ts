import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EchangesPage } from './echanges.page';

describe('EchangesPage', () => {
  let component: EchangesPage;
  let fixture: ComponentFixture<EchangesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EchangesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
