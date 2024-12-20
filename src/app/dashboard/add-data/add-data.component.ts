import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BackendService } from '../../shared/backend.service';
import { StoreService } from '../../shared/store.service';
import {SharedModule} from "../../shared/shared.module";

@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.css'],
  standalone: true,
  imports: [SharedModule]
})
export class AddDataComponent implements OnInit {
  registrationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private backendService: BackendService,
    public storeService: StoreService
  ) {
    this.registrationForm = this.fb.group({
      name: ['', Validators.required],
      birthdate: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      newsletter: [false],
      courseId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.backendService.getCourses();
  }

  onSubmit(): void {
    if (this.registrationForm.valid) {
      console.log(this.registrationForm.value);
    }
  }
}
