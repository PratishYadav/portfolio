import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageShowcase } from './image-showcase';

describe('ImageShowcase', () => {
  let component: ImageShowcase;
  let fixture: ComponentFixture<ImageShowcase>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageShowcase],
    }).compileComponents();

    fixture = TestBed.createComponent(ImageShowcase);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
