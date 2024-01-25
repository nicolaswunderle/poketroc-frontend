import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MessageEcrirePage } from './message-ecrire.page';

describe('MessageEcrirePage', () => {
  let component: MessageEcrirePage;
  let fixture: ComponentFixture<MessageEcrirePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MessageEcrirePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
