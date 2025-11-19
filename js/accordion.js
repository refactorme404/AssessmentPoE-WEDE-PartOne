// Accordion functionality - simple version
document.addEventListener('DOMContentLoaded', function () {
  const accordionHeaders = document.querySelectorAll('.accordion-header')

  accordionHeaders.forEach(function (header) {
    header.addEventListener('click', function () {
      // Toggle active class on the clicked header
      this.classList.toggle('active')

      // Get the content element
      const content = this.nextElementSibling

      // Toggle content visibility
      if (content.style.maxHeight) {
        content.style.maxHeight = null
        content.style.paddingTop = '0'
        content.style.paddingBottom = '0'
      } else {
        content.style.maxHeight = content.scrollHeight + 'px'
        content.style.padding = '12px'
      }
    })
  })
})
