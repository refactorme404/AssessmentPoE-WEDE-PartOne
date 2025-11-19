// Leaflet Map functionality for contact page
document.addEventListener('DOMContentLoaded', function () {
  // Check if map container exists
  const mapContainer = document.getElementById('pawhopeMap')
  if (!mapContainer) return

  // Initialize the map
  const map = L.map('pawhopeMap').setView([-26.2041, 28.0473], 12) // Johannesburg coordinates

  // Add OpenStreetMap tiles
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 18
  }).addTo(map)

  // Define rescue locations with custom icons
  const rescueIcon = L.divIcon({
    className: 'rescue-marker',
    html: '🐾',
    iconSize: [30, 30],
    iconAnchor: [15, 30]
  })

  const vetIcon = L.divIcon({
    className: 'vet-marker',
    html: '🏥',
    iconSize: [30, 30],
    iconAnchor: [15, 30]
  })

  const adoptionIcon = L.divIcon({
    className: 'adoption-marker',
    html: '❤️',
    iconSize: [30, 30],
    iconAnchor: [15, 30]
  })

  // Rescue locations data
  const rescueLocations = [
    {
      coords: [-26.2041, 28.0473],
      title: 'PawHope Main Shelter',
      type: 'rescue',
      address: '123 Rescue Street, Johannesburg',
      phone: '+27 12 345 6789',
      hours: 'Mon-Sun: 8:00 AM - 6:00 PM',
      services: 'Animal Rescue, Adoption Center, Medical Care'
    },
    {
      coords: [-26.19, 28.04],
      title: 'Partner Veterinary Clinic',
      type: 'vet',
      address: '456 Care Avenue, Sandton',
      phone: '+27 11 234 5678',
      hours: 'Mon-Fri: 9:00 AM - 5:00 PM',
      services: 'Medical Checkups, Vaccinations, Emergency Care'
    },
    {
      coords: [-26.215, 28.055],
      title: 'Adoption Outreach Center',
      type: 'adoption',
      address: '789 Hope Road, Rosebank',
      phone: '+27 11 345 6789',
      hours: 'Sat-Sun: 10:00 AM - 4:00 PM',
      services: 'Meet & Greet, Adoption Process, Counseling'
    },
    {
      coords: [-26.195, 28.06],
      title: 'Emergency Rescue Point',
      type: 'rescue',
      address: '321 Save Lane, Parktown',
      phone: '+27 82 123 4567 (Emergency)',
      hours: '24/7 Emergency Line',
      services: 'Stray Animal Reports, Emergency Rescue'
    }
  ]

  // Add markers to the map
  rescueLocations.forEach(function (location) {
    let icon
    switch (location.type) {
      case 'vet':
        icon = vetIcon
        break
      case 'adoption':
        icon = adoptionIcon
        break
      default:
        icon = rescueIcon
    }

    const marker = L.marker(location.coords, { icon: icon }).addTo(map)

    // Create popup content
    const popupContent = `
            <div class="map-popup">
                <h4>${location.title}</h4>
                <div class="popup-info">
                    <p><strong>Address:</strong> ${location.address}</p>
                    <p><strong>Phone:</strong> ${location.phone}</p>
                    <p><strong>Hours:</strong> ${location.hours}</p>
                    <p><strong>Services:</strong> ${location.services}</p>
                </div>
                <div class="popup-actions">
                    <button onclick="getDirections(${location.coords[0]}, ${location.coords[1]})" 
                            class="direction-btn">Get Directions</button>
                    <button onclick="callNumber('${location.phone}')" 
                            class="call-btn">Call Now</button>
                </div>
            </div>
        `

    marker.bindPopup(popupContent)
  })

  // Add click event to focus on main shelter
  const mainShelterBtn = document.getElementById('focusMainShelter')
  if (mainShelterBtn) {
    mainShelterBtn.addEventListener('click', function () {
      map.setView([-26.2041, 28.0473], 15)
      // Open the main shelter popup
      setTimeout(function () {
        map.eachLayer(function (layer) {
          if (layer instanceof L.Marker) {
            const latlng = layer.getLatLng()
            if (latlng.lat === -26.2041 && latlng.lng === 28.0473) {
              layer.openPopup()
            }
          }
        })
      }, 500)
    })
  }
})

// Function to get directions (opens in Google Maps)
function getDirections(lat, lng) {
  const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`
  window.open(url, '_blank')
}

// Function to call a number
function callNumber(phone) {
  // Remove any non-digit characters except +
  const cleanPhone = phone.replace(/[^\d+]/g, '')
  window.location.href = `tel:${cleanPhone}`
}

// Function to find user's location and center map
function locateUser() {
  const map = L.map('pawhopeMap')

  if (!navigator.geolocation) {
    alert('Geolocation is not supported by this browser.')
    return
  }

  navigator.geolocation.getCurrentPosition(
    function (position) {
      const userLat = position.coords.latitude
      const userLng = position.coords.longitude

      map.setView([userLat, userLng], 13)

      // Add user location marker
      const userIcon = L.divIcon({
        className: 'user-marker',
        html: '📍',
        iconSize: [25, 25],
        iconAnchor: [12, 25]
      })

      L.marker([userLat, userLng], { icon: userIcon })
        .addTo(map)
        .bindPopup('Your current location')
        .openPopup()
    },
    function (error) {
      alert('Unable to get your location. Please enable location services.')
      console.error('Geolocation error:', error)
    }
  )
}
