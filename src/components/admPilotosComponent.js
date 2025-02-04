import { getPilots, savePilot, deletePilot } from "../../src/controllers/admPilotosController.js";

class AdmPilotosComponent extends HTMLElement {
  constructor() {
    super();
    this.pilotos = [];
    this.render();
  }

  async connectedCallback() {
    this.setupNavigation();
    await this.loadPilotos();
  }

  async loadPilotos() {
    try {
      this.pilotos = await getPilots();
      this.updatePilotoList();
    } catch (error) {
      console.error("Error al cargar pilotos:", error);
    }
  }

  setupNavigation() {
    const buttons = this.querySelectorAll(".nav-btn");
    const sections = this.querySelectorAll(".section");

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        sections.forEach((sec) => sec.classList.add("hidden"));
        document.getElementById(btn.dataset.target).classList.remove("hidden");
      });
    });

    this.setupFormHandlers();
  }

  setupFormHandlers() {
    const createForm = this.querySelector("#createForm");
    if (createForm) {
      createForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const nombre = this.querySelector("#nombre").value;
        const equipo = this.querySelector("#equipo").value;
        const pais = this.querySelector("#pais").value;

        const newPilot = { nombre, equipo, pais };
        try {
          await savePilot(newPilot);
          alert("Piloto creado con éxito!");
          await this.loadPilotos(); // Recargar lista
        } catch (error) {
          alert("Error al guardar el piloto.");
          console.error(error);
        }
      });
    }

    const deleteForm = this.querySelector("#deleteForm");
    if (deleteForm) {
      deleteForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const id = this.querySelector("#deleteId").value;

        try {
          await deletePilot(id);
          alert("Piloto eliminado con éxito!");
          await this.loadPilotos(); // Recargar lista
        } catch (error) {
          alert("Error al eliminar el piloto.");
          console.error(error);
        }
      });
    }
  }

  updatePilotoList() {
    const listContainer = this.querySelector("#pilotosList");
    listContainer.innerHTML = "";

    if (this.pilotos.length === 0) {
      listContainer.innerHTML = "<p>No hay pilotos registrados.</p>";
      return;
    }

    this.pilotos.forEach((p) => {
      const li = document.createElement("li");
      li.textContent = `${p.nombre} - ${p.equipo} (${p.pais})`;
      listContainer.appendChild(li);
    });
  }

  render() {
    this.innerHTML = /*html*/ `
    <style>@import url("http://localhost:5502/src/styles/admPiloto.css");</style>

      <header class="header">
        <h1>Gestión de Pilotos</h1>
      </header>

      <div class="nav-container">
        <a class="nav-btn" data-target="create">➕ Crear</a>
        <a class="nav-btn" data-target="delete">🗑 Eliminar</a>
        <a class="nav-btn" data-target="view">👀 Ver Pilotos</a>
      </div>

      <div class="container">

        <section id="create" class="section">
          <h2>Crear Piloto</h2>
          <form id="createForm">
            <input type="text" id="nombre" placeholder="Nombre" required>
            <input type="text" id="equipo" placeholder="Equipo" required>
            <input type="text" id="pais" placeholder="País" required>
            <button type="submit">Guardar</button>
          </form>
        </section>

        <!-- Sección Eliminar Piloto -->
        <section id="delete" class="section hidden">
          <h2>Eliminar Piloto</h2>
          <form id="deleteForm">
            <input type="number" id="deleteId" placeholder="ID del Piloto" required>
            <button type="submit">Eliminar</button>
          </form>
        </section>

        <!-- Sección Ver Pilotos -->
        <section id="view" class="section hidden">
          <h2>Lista de Pilotos</h2>
          <ul id="pilotosList"></ul>
        </section>
      </div>

    `;

    this.updatePilotoList();
  }
}

customElements.define("adm-pilotos-form", AdmPilotosComponent);
