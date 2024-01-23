import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MessageUtilisateurPage } from './message-utilisateur.page';

describe('MessageUtilisateurPage', () => {
  let component: MessageUtilisateurPage;
  let fixture: ComponentFixture<MessageUtilisateurPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MessageUtilisateurPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
