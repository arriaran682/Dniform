import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DniFormComponent } from './dni-form.component';

describe('DniFormComponent', () => {
  let component: DniFormComponent;
  let fixture: ComponentFixture<DniFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DniFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DniFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
