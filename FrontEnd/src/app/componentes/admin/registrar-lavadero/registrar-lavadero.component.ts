import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-registrar-lavadero',
  templateUrl: './registrar-lavadero.component.html',
  styleUrls: ['./registrar-lavadero.component.scss'],
})
export class RegistrarLavaderoComponent {
  lavaderoForm: FormGroup;
  files: File[] = [];

  constructor(private fb: FormBuilder, private admin: AdminService) {
    this.lavaderoForm = this.fb.group({
      nombre: [''],
      ciudad: [''],
      direccion: [''],
      telefono: [''],
      correo_electronico: [''],
      contrasena: [''],
      horario_atencion: [''],
    });
  }

  onFileSelected(event) {
    this.files = event.target.files;
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('nombre', this.lavaderoForm.get('nombre').value);
    formData.append('ciudad', this.lavaderoForm.get('ciudad').value);
    formData.append('direccion', this.lavaderoForm.get('direccion').value);
    formData.append('telefono', this.lavaderoForm.get('telefono').value);
    formData.append('correo_electronico', this.lavaderoForm.get('correo_electronico').value);
    formData.append('contrasena', this.lavaderoForm.get('contrasena').value);
    formData.append('horario_atencion', this.lavaderoForm.get('horario_atencion').value);

    for (let i = 0; i < this.files.length; i++) {
      formData.append('images', this.files[i]);
    }

    this.admin.registrarLavadero(formData).subscribe(
      (response) => {
        console.log('Datos enviados correctamente', response);
      },
      (error) => {
        console.log(error)
      }
    );
  }
}
