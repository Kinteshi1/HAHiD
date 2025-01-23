import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BackendService } from '../../shared/backend.service';
import { StoreService } from '../../shared/store.service';
import { SharedModule } from '../../shared/shared.module';
import { MatSnackBar } from '@angular/material/snack-bar'; // Import MatSnackBar

@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.css'],
  standalone: true,
  imports: [SharedModule],
})
export class AddDataComponent implements OnInit {
  registrationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private backendService: BackendService,
    public storeService: StoreService,
    private snackBar: MatSnackBar // Inject MatSnackBar for notifications
  ) {
    // Initialize the registration form with validation
    this.registrationForm = this.fb.group({
      name: ['', Validators.required],
      birthdate: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      newsletter: [false],
      courseId: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // Fetch courses to populate the dropdown
    this.backendService.getCourses();
  }

  onSubmit(): void {
    if (this.registrationForm.valid) {
      // Log form values (you can replace this with actual API calls if required)
      console.log('Form Submitted:', this.registrationForm.value);

      // Show a success notification using MatSnackBar
      this.snackBar.open('Registration successful!', 'Close', {
        duration: 3000, // Show the snackbar for 3 seconds
        horizontalPosition: 'center', // Center align horizontally
        verticalPosition: 'top', // Show it at the top
      });

      // Reset the form to clear the fields
      this.registrationForm.reset();
    } else {
      // Log an error if form is invalid (for debugging)
      console.error('Form is invalid:', this.registrationForm.errors);
    }
  }
}
