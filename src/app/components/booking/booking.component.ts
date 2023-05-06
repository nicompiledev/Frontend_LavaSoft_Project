import { Component } from '@angular/core';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent {
  currentDate: Date = new Date();
  dates: Date[] = [];

  selectedDate: Date;

  selectDate(date: Date) {
    this.selectedDate = date;
  }

  ngOnInit() {
    this.fillDatesArray();
  }
  fillDatesArray() {
    const today = new Date();
    const futureDate = new Date();
    futureDate.setDate(today.getDate() + 15);

    for (let i = 0; i < 15; i++) {
      const currentDate = new Date();
      currentDate.setDate(today.getDate() + i);
      this.dates.push(currentDate);
    }
}

  scrollPrevious() {
    const container = document.getElementById('container');
    container.scrollBy({ left: -80, behavior: 'smooth' });
  }
  scrollNext() {
    const container = document.getElementById('container');
    container.scrollBy({ left: 80, behavior: 'smooth' });
  }

  highlightDate(event: MouseEvent) {
    const element = event.target as HTMLElement;

    // Remove the highlight class from any previously highlighted dates
    const highlightedDates = document.querySelectorAll('.highlighted-date');
    highlightedDates.forEach((date) => {
      date.classList.remove('highlighted-date');
    });

    // Add the highlight class to the clicked date element
    element.classList.add('highlighted-date');
  }

}
