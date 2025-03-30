document.addEventListener("DOMContentLoaded", function () {
    // Create the popup container
    const popup = document.createElement("div")
    popup.className = "image-popup-overlay"

    // Create the close button
    const closeBtn = document.createElement("span")
    closeBtn.className = "image-popup-close"
    closeBtn.innerHTML = "&times;"

    // Create toolbar with zoom controls
    const toolbar = document.createElement("div")
    toolbar.className = "image-popup-toolbar"

    const zoomInBtn = document.createElement("button")
    zoomInBtn.innerHTML = "+"
    zoomInBtn.title = "Zoom In"

    const zoomOutBtn = document.createElement("button")
    zoomOutBtn.innerHTML = "−"
    zoomOutBtn.title = "Zoom Out"

    const resetZoomBtn = document.createElement("button")
    resetZoomBtn.innerHTML = "↻"
    resetZoomBtn.title = "Reset Zoom"

    toolbar.appendChild(zoomInBtn)
    toolbar.appendChild(zoomOutBtn)
    toolbar.appendChild(resetZoomBtn)

    // Create container for the image
    const container = document.createElement("div")
    container.className = "image-popup-container"

    // Create the image element for the popup
    const popupImg = document.createElement("img")
    popupImg.className = "image-popup-img"

    // Append elements
    container.appendChild(popupImg)
    popup.appendChild(closeBtn)
    popup.appendChild(container)
    popup.appendChild(toolbar)
    document.body.appendChild(popup)

    // Zoom functionality
    let scale = 1
    let isDragging = false
    let startX,
        startY,
        translateX = 0,
        translateY = 0

    function updateTransform() {
        popupImg.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`
    }

    zoomInBtn.addEventListener("click", function (e) {
        e.stopPropagation()
        scale *= 1.2
        updateTransform()
    })

    zoomOutBtn.addEventListener("click", function (e) {
        e.stopPropagation()
        scale /= 1.2
        updateTransform()
    })

    resetZoomBtn.addEventListener("click", function (e) {
        e.stopPropagation()
        scale = 1
        translateX = 0
        translateY = 0
        updateTransform()
    })

    // Drag functionality
    popupImg.addEventListener("mousedown", function (e) {
        if (scale <= 1) return
        e.preventDefault()
        isDragging = true
        popupImg.classList.add("grabbing")
        startX = e.clientX - translateX
        startY = e.clientY - translateY
    })

    window.addEventListener("mousemove", function (e) {
        if (!isDragging) return
        translateX = e.clientX - startX
        translateY = e.clientY - startY
        updateTransform()
    })

    window.addEventListener("mouseup", function () {
        isDragging = false
        popupImg.classList.remove("grabbing")
    })

    // Add click event only to images with 'clickable' class
    const images = document.querySelectorAll("img.clickable")
    images.forEach(function (img) {
        img.addEventListener("click", function () {
            popup.style.display = "flex"
            popupImg.src = this.src
            popupImg.alt = this.alt
            // Reset zoom and position when opening new image
            scale = 1
            translateX = 0
            translateY = 0
            updateTransform()
        })
    })

    // Close popup when clicking X or anywhere in the popup
    closeBtn.addEventListener("click", function (e) {
        e.stopPropagation()
        popup.style.display = "none"
    })

    popup.addEventListener("click", function (e) {
        if (e.target === popup) {
            popup.style.display = "none"
        }
    })
})
