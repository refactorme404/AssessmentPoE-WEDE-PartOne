// Search and Filter functionality for adopt page
document.addEventListener('DOMContentLoaded', function () {
  // Get all pet cards
  const petCards = document.querySelectorAll('.pet-card')
  const searchInput = document.getElementById('petSearch')
  const speciesFilter = document.getElementById('speciesFilter')
  const ageFilter = document.getElementById('ageFilter')
  const sizeFilter = document.getElementById('sizeFilter')
  const genderFilter = document.getElementById('genderFilter')
  const resetButton = document.getElementById('resetFilters')

  // Add event listeners
  if (searchInput) {
    searchInput.addEventListener('input', filterPets)
  }
  if (speciesFilter) {
    speciesFilter.addEventListener('change', filterPets)
  }
  if (ageFilter) {
    ageFilter.addEventListener('change', filterPets)
  }
  if (sizeFilter) {
    sizeFilter.addEventListener('change', filterPets)
  }
  if (genderFilter) {
    genderFilter.addEventListener('change', filterPets)
  }
  if (resetButton) {
    resetButton.addEventListener('click', resetFilters)
  }

  function filterPets() {
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : ''
    const speciesValue = speciesFilter ? speciesFilter.value : 'all'
    const ageValue = ageFilter ? ageFilter.value : 'all'
    const sizeValue = sizeFilter ? sizeFilter.value : 'all'
    const genderValue = genderFilter ? genderFilter.value : 'all'

    let visibleCount = 0

    petCards.forEach(function (card) {
      const petName = card.querySelector('.pet-name').textContent.toLowerCase()
      const petDescription = card
        .querySelector('.pet-description')
        .textContent.toLowerCase()
      const petSpecies = card.getAttribute('data-species')
      const petAge = card.getAttribute('data-age')
      const petSize = card.getAttribute('data-size')
      const petGender = card.getAttribute('data-gender')

      // Search filter
      const matchesSearch =
        searchTerm === '' ||
        petName.includes(searchTerm) ||
        petDescription.includes(searchTerm)

      // Species filter
      const matchesSpecies =
        speciesValue === 'all' || petSpecies === speciesValue

      // Age filter
      const matchesAge = ageValue === 'all' || petAge === ageValue

      // Size filter
      const matchesSize = sizeValue === 'all' || petSize === sizeValue

      // Gender filter
      const matchesGender = genderValue === 'all' || petGender === genderValue

      // Show or hide card based on all filters
      if (
        matchesSearch &&
        matchesSpecies &&
        matchesAge &&
        matchesSize &&
        matchesGender
      ) {
        card.style.display = 'block'
        visibleCount++
      } else {
        card.style.display = 'none'
      }
    })

    // Update results count
    updateResultsCount(visibleCount)
  }

  function resetFilters() {
    if (searchInput) searchInput.value = ''
    if (speciesFilter) speciesFilter.value = 'all'
    if (ageFilter) ageFilter.value = 'all'
    if (sizeFilter) sizeFilter.value = 'all'
    if (genderFilter) genderFilter.value = 'all'

    filterPets()
  }

  function updateResultsCount(count) {
    const resultsElement = document.getElementById('resultsCount')
    const noResultsElement = document.getElementById('noResults')

    if (resultsElement) {
      resultsElement.textContent = count
    }

    if (noResultsElement) {
      if (count === 0) {
        noResultsElement.style.display = 'block'
      } else {
        noResultsElement.style.display = 'none'
      }
    }
  }

  // Initialize filter on page load
  filterPets()
})
