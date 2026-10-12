import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, it, expect } from 'vitest';
import { Session } from './session';
import { provideRouter } from '@angular/router';

describe('Session', () => {
  let component: Session;
  let fixture: ComponentFixture<Session>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Session],
       providers: [
        provideRouter([]),]
    }).compileComponents();

    fixture = TestBed.createComponent(Session);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
