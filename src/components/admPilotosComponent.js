import { Piloto } from "../../src/models/pilotoModel.js";
import { savePilot, deletePilot } from "../../src/controllers/admPilotosController.js";

class AdmPilotoComponent extends HTMLElement {
  constructor() {
    super();
    this.pilotData = null;
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = /*html*/ `
      <link rel="stylesheet" href="../../src/styles/admPiloto.css">
      <div class="container">
        <h2 class="title">Administración de Pilotos</h2>
        <form id="pilot-form" class="pilot-form">
          <input type="text" name="id" id="pilot-id" placeholder="ID (Asigna uno único)" required>
          <input type="text" name="nombre" id="pilot-name" placeholder="Nombre del piloto" required>
          <input type="text" name="equipo" id="pilot-team" placeholder="Equipo" required>
          <input type="text" name="rol" id="pilot-role" placeholder="Rol" required>
          <input type="text" name="imagen" id="pilot-image" placeholder="URL de la imagen" required>
          <input type="date" name="fechaNacimiento" id="pilot-birthdate" required>
          <input type="text" name="nacionalidad" id="pilot-nationality" placeholder="Nacionalidad" required>
          
          <div class="button-group">
            <button type="submit" class="btn save">Guardar</button>
            <button type="button" id="edit-btn" class="btn edit">Editar</button>
            <button type="button" id="delete-btn" class="btn delete">Eliminar</button>
          </div>
        </form>
      </div>
    `;

    this.querySelector("#pilot-form").addEventListener("submit", (e) => this.handleSubmit(e));
    this.querySelector("#delete-btn").addEventListener("click", () => this.handleDelete());
    this.querySelector("#edit-btn").addEventListener("click", () => this.handleEdit());
  }

  async handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(this.querySelector("#pilot-form"));
    const pilot = Piloto.fromForm(formData);

    try {
      await savePilot(pilot);
      this.dispatchEvent(new CustomEvent("pilotUpdated", { bubbles: true }));
      this.resetForm();
    } catch (error) {
      console.error("Error al guardar piloto", error);
    }
  }

  async handleDelete() {
    const id = this.querySelector("#pilot-id").value;
    if (!id) {
      alert("Debes ingresar un ID para eliminar un piloto.");
      return;
    }

    try {
      await deletePilot(id);
      alert("Piloto eliminado correctamente.");
      this.resetForm();
    } catch (error) {
      console.error("Error al eliminar piloto", error);
    }
  }

  handleEdit() {
    alert("Función de edición pendiente de implementación.");
  }

  resetForm() {
    this.querySelector("#pilot-form").reset();
  }
}

customElements.define("adm-piloto-form", AdmPilotoComponent);
