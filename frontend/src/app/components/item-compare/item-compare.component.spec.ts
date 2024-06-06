import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemCompareComponent } from './item-compare.component';

describe('ItemCompareComponent', () => {
  let component: ItemCompareComponent;
  let fixture: ComponentFixture<ItemCompareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemCompareComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItemCompareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
