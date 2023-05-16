import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-register-carwash',
  templateUrl: './register-carwash.component.html',
  styleUrls: ['./register-carwash.component.scss']
})
export class RegisterCarwashComponent {
  //el formulario
  lavaderoForm: FormGroup;
  files: File[] = [];

  constructor(private fb: FormBuilder, private admin: AdminService) {
    this.lavaderoForm = this.fb.group({
      nombre: new FormControl ('' ,[Validators.required]),
      ciudad: new FormControl ('' ,[Validators.required]),
      direccion: new FormControl ('' ,[Validators.required]),
      telefono:new FormControl ('', [Validators.required, Validators.minLength(10),Validators.maxLength(10)]),
      correo_electronico: new FormControl ('', [Validators.required, Validators.email]),
      contrasena: new FormControl ('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      hora_apertura: new FormControl ('', [Validators.required ]),
      hora_cierre: new FormControl ('', [Validators.required]),
      espacios_de_trabajo:new FormControl ('' , [Validators.required])
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
    formData.append('hora_apertura', this.lavaderoForm.get('hora_apertura').value);
    formData.append('hora_cierre', this.lavaderoForm.get('hora_cierre').value);

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




  // paginacion del formulario

  
  marginLeft: string = '0%';
  elementos: { contenido: string; activo: boolean; texto: string }[] = [
    { contenido: '1', activo: true, texto: 'Datos.' },
    { contenido: '2', activo: false, texto: 'Nac.' },
    { contenido: '3', activo: false, texto: 'Contac.' },
    { contenido: '4', activo: false, texto: 'Pass.' },
  ];
  camposPorPagina = [
    [], // No se requiere validación para avanzar a la primera página
    ['name', 'lastname'], // Campos a validar en la página 1
    ['fecha_nacimiento', 'genero'], // Campos a validar en la página 2
    ['email', 'cel'], // Campos a validar en la página 3
    ['password', 'confimar_password'], // Campos a validar en la página 4
  ];

  siguiente(lugar: string) {

      for (let i = 0; i < this.elementos.length; i++) {
        if (this.elementos[i].contenido === lugar) {
          console.log(lugar);
          this.marginLeft = '-' + i * 25 + '%';
          this.elementos[i].activo = true;
          this.elementos[i - 1].contenido = '✓';
        }
      }
    
  }

  anterior(lugar: string) {
    for (let i = 0; i < this.elementos.length; i++) {
      if (this.elementos[i].contenido === lugar) {
        this.marginLeft = '-' + (i - 1) * 25 + '%';
        this.elementos[i].activo = false;
        this.elementos[i - 1].contenido = i.toString();
      }
    }
  }
}
