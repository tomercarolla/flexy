import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoMobileMessageComponent } from './no-mobile-message.component';

describe('NoMobileMessageComponent', () => {
  let component: NoMobileMessageComponent;
  let fixture: ComponentFixture<NoMobileMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoMobileMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoMobileMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
