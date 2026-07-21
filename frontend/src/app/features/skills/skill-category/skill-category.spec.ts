import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillCategory } from './skill-category';

describe('SkillCategory', () => {
  let component: SkillCategory;
  let fixture: ComponentFixture<SkillCategory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkillCategory],
    }).compileComponents();

    fixture = TestBed.createComponent(SkillCategory);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
