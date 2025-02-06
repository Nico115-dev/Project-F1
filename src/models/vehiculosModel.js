export class Equipo {
    constructor({ equipo, modelo, motor, velocidad_maxima_kmh, aceleracion_0_100, pilotos, rendimiento, imagen1, imagen2, id }) {
      this.equipo = equipo;
      this.modelo = modelo;
      this.motor = motor;
      this.velocidad_maxima_kmh = velocidad_maxima_kmh;
      this.aceleracion_0_100 = aceleracion_0_100;
      this.pilotos = pilotos;
      this.rendimiento = rendimiento;
      this.imagen1 = imagen1;
      this.imagen2 = imagen2;
      this.id = id;
    }
  
    // Método estático para crear un objeto Equipo desde un formulario
    static fromForm(formData) {
      return new Equipo({
        equipo: formData.get("equipo"),
        modelo: formData.get("modelo"),
        motor: formData.get("motor"),
        velocidad_maxima_kmh: formData.get("velocidad_maxima_kmh"),
        aceleracion_0_100: formData.get("aceleracion_0_100"),
        pilotos: formData.getAll("pilotos"),
        rendimiento: {
          conduccion_normal: {
            velocidad_promedio_kmh: formData.get("conduccion_normal_velocidad_promedio_kmh"),
            consumo_combustible: {
              seco: formData.get("conduccion_normal_consumo_seco"),
              lluvioso: formData.get("conduccion_normal_consumo_lluvioso"),
              extremo: formData.get("conduccion_normal_consumo_extremo")
            },
            desgaste_neumaticos: {
              seco: formData.get("conduccion_normal_desgaste_seco"),
              lluvioso: formData.get("conduccion_normal_desgaste_lluvioso"),
              extremo: formData.get("conduccion_normal_desgaste_extremo")
            }
          },
          conduccion_agresiva: {
            velocidad_promedio_kmh: formData.get("conduccion_agresiva_velocidad_promedio_kmh"),
            consumo_combustible: {
              seco: formData.get("conduccion_agresiva_consumo_seco"),
              lluvioso: formData.get("conduccion_agresiva_consumo_lluvioso"),
              extremo: formData.get("conduccion_agresiva_consumo_extremo")
            },
            desgaste_neumaticos: {
              seco: formData.get("conduccion_agresiva_desgaste_seco"),
              lluvioso: formData.get("conduccion_agresiva_desgaste_lluvioso"),
              extremo: formData.get("conduccion_agresiva_desgaste_extremo")
            }
          },
          ahorro_combustible: {
            velocidad_promedio_kmh: formData.get("ahorro_combustible_velocidad_promedio_kmh"),
            consumo_combustible: {
              seco: formData.get("ahorro_combustible_consumo_seco"),
              lluvioso: formData.get("ahorro_combustible_consumo_lluvioso"),
              extremo: formData.get("ahorro_combustible_consumo_extremo")
            },
            desgaste_neumaticos: {
              seco: formData.get("ahorro_combustible_desgaste_seco"),
              lluvioso: formData.get("ahorro_combustible_desgaste_lluvioso"),
              extremo: formData.get("ahorro_combustible_desgaste_extremo")
            }
          }
        },
        imagen1: formData.get("imagen1"),
        imagen2: formData.get("imagen2"),
        id: formData.get("id")
      });
    }
  }
  