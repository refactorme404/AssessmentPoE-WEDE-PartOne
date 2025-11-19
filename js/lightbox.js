// Lightbox functionality - simple version
document.addEventListener('DOMContentLoaded', function () {
  // Open lightbox when pet image is clicked
  const petImages = document.querySelectorAll('.pet-card img')

  petImages.forEach(function (image) {
    image.addEventListener('click', function () {
      const petCard = this.closest('.pet-card')
      const petName = petCard.querySelector('.pet-name').textContent
      const petDescription =
        petCard.querySelector('.pet-description').textContent
      const petDetails = petCard.querySelector('.pet-details').innerHTML

      openLightbox(this.src, petName, petDescription, petDetails)
    })
  })

  // Open lightbox when adopt button is clicked
  const adoptButtons = document.querySelectorAll('.adopt-button')

  adoptButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      const petCard = this.closest('.pet-card')
      const petImage = petCard.querySelector('img').src
      const petName = petCard.querySelector('.pet-name').textContent
      const petDescription =
        petCard.querySelector('.pet-description').textContent
      const petDetails = petCard.querySelector('.pet-details').innerHTML

      openLightbox(petImage, petName, petDescription, petDetails)
    })
  })
})

function openLightbox(imageSrc, petName, petDescription, petDetails) {
  // Create lightbox overlay
  const lightbox = document.createElement('div')
  lightbox.className = 'lightbox'
  lightbox.innerHTML = `
        <div class="lightbox-content">
            <button class="lightbox-close">&times;</button>
            <div class="lightbox-body">
                <div class="lightbox-image">
                    <img src="${imageSrc}" alt="${petName}" />
                </div>
                <div class="lightbox-info">
                    <h2>${petName}</h2>
                    <p class="pet-description">${petDescription}</p>
                    <div class="pet-details">
                        ${petDetails}
                    </div>
                    <div class="lightbox-actions">
                        <button class="btn-secondary" onclick="closeLightbox()">Close</button>
                        <button class="btn-primary" onclick="startAdoptionProcess('${petName}')">Adopt ${petName}</button>
                    </div>
                </div>
            </div>
        </div>
    `

  document.body.appendChild(lightbox)
  document.body.style.overflow = 'hidden' // Prevent scrolling

  // Close lightbox when close button is clicked
  const closeBtn = lightbox.querySelector('.lightbox-close')
  closeBtn.addEventListener('click', closeLightbox)

  // Close lightbox when clicking outside content
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) {
      closeLightbox()
    }
  })

  // Close with Escape key
  document.addEventListener('keydown', function lightboxKeyHandler(e) {
    if (e.key === 'Escape') {
      closeLightbox()
      document.removeEventListener('keydown', lightboxKeyHandler)
    }
  })
}

function closeLightbox() {
  const lightbox = document.querySelector('.lightbox')
  if (lightbox) {
    lightbox.remove()
    document.body.style.overflow = '' // Restore scrolling
  }
}

function startAdoptionProcess(petName) {
  // Redirect to enquiry form with pet name
  window.location.href = `enquiry.html?pet=${encodeURIComponent(petName)}`
  closeLightbox()
}
