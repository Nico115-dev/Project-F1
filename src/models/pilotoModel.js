export class Piloto {
  constructor({ id, nombre, equipo, rol, imagen, fechaNacimiento, nacionalidad }) {
    this.id = id; // Se debe proporcionar manualmente
    this.nombre = nombre;
    this.equipo = equipo;
    this.rol = rol;
    this.imagen = imagen;
    this.fechaNacimiento = fechaNacimiento;
    this.nacionalidad = nacionalidad;
  } 

  static fromForm(formData) {
    return new Piloto({
      id: formData.get("id"),   
      nombre: formData.get("nombre"),
      equipo: formData.get("equipo"),
      rol: formData.get("rol"),
      imagen: formData.get("imagen"), 
      fechaNacimiento: formData.get("fechaNacimiento"),
      nacionalidad: formData.get("nacionalidad"),
    });
  }
}
