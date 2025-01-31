document.addEventListener("DOMContentLoaded", () => {
    // Efecto de hover para las tarjetas
    const cards = document.querySelectorAll(".card")
  
    cards.forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
  
        const centerX = rect.width / 2
        const centerY = rect.height / 2
  
        const angleX = (y - centerY) / 20
        const angleY = (centerX - x) / 20
  
        card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateY(-5px)`
      })
  
      card.addEventListener("mouseleave", () => {
        card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)"
      })
  
      card.addEventListener("click", () => {
        const flash = document.createElement("div")
        flash.style.position = "absolute"
        flash.style.top = "0"
        flash.style.left = "0"
        flash.style.right = "0"
        flash.style.bottom = "0"
        flash.style.backgroundColor = "rgba(0, 247, 255, 0.3)"
        flash.style.animation = "flash 0.5s ease-out"
  
        card.appendChild(flash)
  
        setTimeout(() => {
          flash.remove()
        }, 500)
      })
    })
  

    const navItems = document.querySelectorAll(".nav-item")
  
    navItems.forEach((item) => {
      item.addEventListener("click", function () {
        navItems.forEach((nav) => nav.classList.remove("active"))
        this.classList.add("active")
      })
    })
  

    const statLines = document.querySelectorAll(".stat-line")
    let delay = 0
  
    statLines.forEach((line) => {
      line.style.animationDelay = `${delay}s`
      delay += 0.2
    })
  })
  
  
  
