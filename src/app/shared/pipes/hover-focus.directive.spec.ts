import { HoverFocusDirective } from './hover-focus.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement, Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { DetailUserComponent } from '../../users/detail-user/detail-user.component';
@Component({
  template: `<input type="text" appHoverFocus>` 
})
class TestHoverFocusComponent {
}


describe('HoverFocusDirective', () => {
  let component: TestHoverFocusComponent;
  let fixture: ComponentFixture<TestHoverFocusComponent>;
  let inputEl: DebugElement;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestHoverFocusComponent, DetailUserComponent, HoverFocusDirective] 
    });
    fixture = TestBed.createComponent(TestHoverFocusComponent); 
    component = fixture.componentInstance;
    inputEl = fixture.debugElement.query(By.css('input'));
  });
  it('should create an instance', () => {
    const directive = new HoverFocusDirective();
    expect(directive).toBeTruthy();
  });

  it('should hovering over input and change background color', () => {
    inputEl.triggerEventHandler('mouseover', null); 
    fixture.detectChanges();
    expect(inputEl.nativeElement.style.backgroundColor).toBe('blue'); 
  
    inputEl.triggerEventHandler('mouseout', null);
    fixture.detectChanges();
    console.log(inputEl.nativeElement.style.backgroundColor);
    expect(inputEl.nativeElement.style.backgroundColor).toBe('inherit');
  });


  it('should hovering over input and change text color', () => {
    inputEl.triggerEventHandler('mouseover', null); 
    fixture.detectChanges();
    expect(inputEl.nativeElement.style.color).toBe('green'); 
  
    inputEl.triggerEventHandler('mouseout', null);
    fixture.detectChanges();
    console.log(inputEl.nativeElement.style.color);
    expect(inputEl.nativeElement.style.color).toBe('inherit');
  });
});
