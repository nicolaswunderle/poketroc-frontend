import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MessageTchatUtilisateurPage } from './message-tchat-utilisateur.page';

describe('MessageTchatUtilisateurPage', () => {
  let component: MessageTchatUtilisateurPage;
  let fixture: ComponentFixture<MessageTchatUtilisateurPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MessageTchatUtilisateurPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
