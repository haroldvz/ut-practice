import { RedblackDirective } from './redblack.directive';
import { Component } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { DetailUserComponent } from '../../users/detail-user/detail-user.component';
import { By } from '@angular/platform-browser';

//mock component to test easy
@Component({
  template: `<p appRedblack>This text is a custom directive one</p>`,
})
class TestRedbackDirectiveComponent {

}


describe('RedblackDirective', () => {
  let appRedblack_directive:RedblackDirective;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestRedbackDirectiveComponent, RedblackDirective],//have to import detail user cause that component use the directive
    }).compileComponents();
    
  }));
  
  it('should create an instance', () => {
    const fixture = TestBed.createComponent(TestRedbackDirectiveComponent);
    const directiveEl = fixture.debugElement.query(By.css(`p`));
    const directive = new RedblackDirective(directiveEl);
    fixture.detectChanges();
    expect(directive).toBeTruthy();
  });

  it('should paint the text with red color', () => {
    const fixture = TestBed.createComponent(TestRedbackDirectiveComponent);
    const directiveEl = fixture.debugElement.query(By.css(`p`));
    const directive = new RedblackDirective(directiveEl);
    fixture.detectChanges();
    expect(directiveEl.nativeElement.style.color).toBe('red'); 
  });
});
