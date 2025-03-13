import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dni-form',
  templateUrl: './dni-form.component.html',
  standalone: false,
  styleUrls: ['./dni-form.component.css']
})
export class DniFormComponent {
  dniForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.dniForm = this.fb.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      dni: ['', [Validators.required, Validators.pattern(/^\d{8}[A-Z]$/)]],
      fechaNacimiento: ['', Validators.required],
      fechaCaducidad: ['', Validators.required],
      nacionalidad: ['', Validators.required],
      sexo: ['', Validators.required]
    });

    this.cargarDatos(); // Cargar datos del archivo al iniciar
  }

  // 📌 Método para guardar el formulario en un archivo JSON
  guardarDatos() {
    const datos = JSON.stringify(this.dniForm.value, null, 2);
    const blob = new Blob([datos], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'dni-data.json';
    a.click();
    window.URL.revokeObjectURL(url);
  }

  // 📌 Método para cargar un archivo JSON y rellenar el formulario
  cargarArchivo(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const datos = JSON.parse(e.target?.result as string);
          this.dniForm.patchValue(datos); // Cargar datos en el formulario
        } catch (error) {
          console.error('Error al leer el archivo JSON:', error);
        }
      };
      reader.readAsText(file);
    }
  }

  // 📌 Método para cargar datos almacenados en LocalStorage
  cargarDatos() {
    const datosGuardados = localStorage.getItem('dniData');
    if (datosGuardados) {
      this.dniForm.patchValue(JSON.parse(datosGuardados));
    }
  }

  // 📌 Método para guardar los datos en LocalStorage
  onSubmit() {
    if (this.dniForm.valid) {
      console.log('Formulario enviado:', this.dniForm.value);
      localStorage.setItem('dniData', JSON.stringify(this.dniForm.value)); // Guardar en LocalStorage
    } else {
      console.log('Formulario no válido');
    }
  }
}
