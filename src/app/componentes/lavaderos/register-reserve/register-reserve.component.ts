import { Component } from '@angular/core';

@Component({
  selector: 'app-register-reserve',
  templateUrl: './register-reserve.component.html',
  styleUrls: ['./register-reserve.component.scss']
})
export class RegisterReserveComponent {
  validarInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input && input instanceof HTMLInputElement) {
      input.value = input.value.replace(/\D/g, '');
    }
  }

}
