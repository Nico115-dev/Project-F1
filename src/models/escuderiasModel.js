export class Escuderia {
    constructor({ nombre, pais, motor, pilotos, logo }) {

      this.nombre = nombre;
      this.pais = pais;
      this.motor = motor;
      this.pilotos = pilotos;
      this.logo = logo;

    } 
  
    static fromForm(formData) {
      return new Escuderia({  
        nombre: formData.get("nombre"),
        pais: formData.get("pais"),
        motor: formData.get("motor"),
        pilotos: formData.get("pilotos")?.split(',').map(p => parseInt(p.trim())),  // Convertir pilotos a un array de IDs
        logo: formData.get("logo"),
      });
    }
  }
  