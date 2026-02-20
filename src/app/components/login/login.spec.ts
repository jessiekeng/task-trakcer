import { ComponentFixture, TestBed } from '@angular/core/testing';
// 1. Update this import to match the class name in login.ts
import { LoginComponent } from './login';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // 2. Update the imports array
      imports: [LoginComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Use detectChanges instead of whenStable for initial load
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});