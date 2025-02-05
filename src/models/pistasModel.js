export class Pista {
    constructor({ id, round, type, dates, month, country, flag, title, subtitle, circuitImage, longitud, numero_vueltas, description }) {
      this.id = id;
      this.round = round;
      this.type = type;
      this.dates = dates;
      this.month = month;
      this.country = country;
      this.flag = flag;
      this.title = title;
      this.subtitle = subtitle;
      this.circuitImage = circuitImage;
      this.longitud = longitud;
      this.numero_vueltas = numero_vueltas;
      this.description = description;
    }
  
    // Método estático para crear un objeto Pista desde un formulario
    static fromForm(formData) {
      return new Pista({
        id: formData.get("id"),
        round: formData.get("round"),
        type: formData.get("type"),
        dates: formData.get("dates"),
        month: formData.get("month"),
        country: formData.get("country"),
        flag: formData.get("flag"),
        title: formData.get("title"),
        subtitle: formData.get("subtitle"),
        circuitImage: formData.get("circuitImage"),
        longitud: formData.get("longitud"),
        numero_vueltas: formData.get("numero_vueltas"),
        description: formData.get("description")
      });
    }
  }
  