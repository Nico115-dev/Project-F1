let audio = document.getElementById("miAudio");
    audio.volume = 1.0; // Volumen máximo al inicio
  
    function bajarVolumen() {
      if (audio.volume > 0.1) {
        audio.volume -= 0.1; // Baja el volumen en 10%
      } else {
        audio.volume = 0; // Silencia completamente si ya está bajo
      }
 }