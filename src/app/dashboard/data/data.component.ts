import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { StoreService } from '../../shared/store.service';
import { BackendService } from '../../shared/backend.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-data',
  standalone: true,
  imports: [SharedModule, MatProgressSpinnerModule],
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {
  public page: number = 0;
  isDeleting: { [key: string]: boolean } = {}; // Adjusted to string keys

  constructor(
    public storeService: StoreService,
    private backendService: BackendService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  selectPage(i: any) {
    let currentPage = i;
    this.storeService.currentPage = i;
    this.backendService.getRegistrations(currentPage);
  }

  public returnAllPages() {
    var pagesCount = Math.ceil(this.storeService.registrationTotalCount / 2);
    let res = [];
    for (let i = 0; i < pagesCount; i++) {
      res.push(i + 1);
    }
    return res;
  }

  onDeleteRegistration(registrationId: number): void {
    this.isDeleting[registrationId] = true;
    this.backendService.deleteRegistration(registrationId).subscribe({
      next: () => {
        this.storeService.registrations = this.storeService.registrations.filter(
          (registration) => +registration.id !== registrationId
        );
        this.snackBar.open('Registration canceled successfully!', 'Close', {
          duration: 3000,
        });
        this.isDeleting[registrationId] = false;
      },
      error: () => {
        this.snackBar.open('Failed to cancel registration. Please try again.', 'Close', {
          duration: 3000,
        });
        this.isDeleting[registrationId] = false;
      },
    });
  }
}
