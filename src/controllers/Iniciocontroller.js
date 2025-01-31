document.addEventListener("DOMContentLoaded", () => {
    const welcomeScreen = document.querySelector(".welcome-screen")
    const menuContainer = document.querySelector(".menu-container")
    const welcomeText = document.querySelectorAll(".welcome-text span")

    
    welcomeText.forEach((span, index) => {
        span.style.animationDelay = `${index * 0.1}s`
    })

    
    setTimeout(() => {
        welcomeScreen.style.transition = "opacity 1s ease, visibility 1s"
        welcomeScreen.style.opacity = "0"
        welcomeScreen.style.visibility = "hidden"

        menuContainer.style.opacity = "1"
        menuContainer.style.visibility = "visible"
    }, 3000)

    const menuItems = document.querySelectorAll(".menu-item")
    menuItems.forEach((item) => {
        item.addEventListener("click", function () {
            const flash = document.createElement("div")
            flash.style.position = "absolute"
            flash.style.top = "0"
            flash.style.left = "0"
            flash.style.width = "100%"
            flash.style.height = "100%"
            flash.style.backgroundColor = "rgba(0, 247, 255, 0.2)"
            flash.style.transition = "opacity 0.3s ease"

            this.style.position = "relative"
            this.appendChild(flash)

            setTimeout(() => {
                flash.style.opacity = "0"
                setTimeout(() => {
                    flash.remove()
                }, 300)
            }, 100)
        })
    })
})

  
  

