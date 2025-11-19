// Contact Form Validation and AJAX Simulation
document.addEventListener('DOMContentLoaded', function () {
  const contactForm = document.getElementById('contactForm')
  const responseSection = document.getElementById('formResponse')

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault()

      if (validateContactForm()) {
        submitContactForm()
      }
    })

    // Real-time validation
    setupRealTimeValidation()
  }

  function setupRealTimeValidation() {
    const emailInput = document.getElementById('email')
    const nameInput = document.getElementById('name')
    const subjectInput = document.getElementById('subject')
    const messageInput = document.getElementById('message')

    if (emailInput) {
      emailInput.addEventListener('blur', validateEmail)
    }

    if (nameInput) {
      nameInput.addEventListener('blur', validateName)
    }

    if (subjectInput) {
      subjectInput.addEventListener('blur', validateSubject)
    }

    if (messageInput) {
      messageInput.addEventListener('blur', validateMessage)
    }
  }

  function validateContactForm() {
    clearErrors()
    let isValid = true

    // Validate all required fields
    if (!validateName()) isValid = false
    if (!validateEmail()) isValid = false
    if (!validateSubject()) isValid = false
    if (!validateMessage()) isValid = false

    return isValid
  }

  function validateName() {
    const nameField = document.getElementById('name')
    const name = nameField.value.trim()

    if (!name) {
      showError(nameField, 'Please enter your full name')
      return false
    }

    if (name.length < 2) {
      showError(nameField, 'Name must be at least 2 characters long')
      return false
    }

    return true
  }

  function validateEmail() {
    const emailField = document.getElementById('email')
    const email = emailField.value.trim()
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!email) {
      showError(emailField, 'Please enter your email address')
      return false
    }

    if (!emailRegex.test(email)) {
      showError(emailField, 'Please enter a valid email address')
      return false
    }

    return true
  }

  function validateSubject() {
    const subjectField = document.getElementById('subject')
    const subject = subjectField.value.trim()

    if (!subject) {
      showError(subjectField, 'Please enter a subject for your message')
      return false
    }

    if (subject.length < 5) {
      showError(subjectField, 'Subject must be at least 5 characters long')
      return false
    }

    return true
  }

  function validateMessage() {
    const messageField = document.getElementById('message')
    const message = messageField.value.trim()

    if (!message) {
      showError(messageField, 'Please enter your message')
      return false
    }

    if (message.length < 10) {
      showError(messageField, 'Message must be at least 10 characters long')
      return false
    }

    if (message.length > 1000) {
      showError(messageField, 'Message must be less than 1000 characters')
      return false
    }

    return true
  }

  function showError(field, message) {
    const errorElement = document.createElement('div')
    errorElement.className = 'error-message'
    errorElement.textContent = message
    errorElement.style.cssText =
      'color: #e74c3c; font-size: 14px; margin-top: 5px;'

    field.parentNode.appendChild(errorElement)
    field.style.borderColor = '#e74c3c'
  }

  function clearErrors() {
    // Remove all error messages
    const errorMessages = document.querySelectorAll('.error-message')
    errorMessages.forEach(function (error) {
      error.remove()
    })

    // Reset border colors
    const formInputs = document.querySelectorAll(
      '#contactForm input, #contactForm textarea'
    )
    formInputs.forEach(function (input) {
      input.style.borderColor = ''
    })
  }

  function submitContactForm() {
    const submitBtn = document.querySelector('#contactForm .submit-button')
    const originalText = submitBtn.textContent

    // Show loading state
    submitBtn.textContent = 'Sending...'
    submitBtn.disabled = true

    // Simulate AJAX submission
    setTimeout(function () {
      const formData = getFormData()
      const response = generateContactResponse(formData)

      showContactResponse(response)
      resetContactForm()

      // Restore button
      submitBtn.textContent = originalText
      submitBtn.disabled = false
    }, 2000)
  }

  function getFormData() {
    return {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      subject: document.getElementById('subject').value,
      message: document.getElementById('message').value
    }
  }

  function generateContactResponse(formData) {
    // Check if it's an emergency based on keywords
    const emergencyKeywords = [
      'emergency',
      'urgent',
      'help now',
      'rescue needed',
      'animal in danger',
      'injured',
      'stuck',
      'abuse'
    ]
    const messageLower = formData.message.toLowerCase()
    const isEmergency = emergencyKeywords.some(keyword =>
      messageLower.includes(keyword)
    )

    let response = ''

    if (isEmergency) {
      response = `
                <div class="response-emergency">
                    <h3>🚨 Emergency Situation Detected</h3>
                    <p>Thank you for reporting this urgent matter, <strong>${formData.name}</strong>!</p>
                    <p>We've detected that your message requires immediate attention.</p>
                    
                    <div class="emergency-actions">
                        <p><strong>For immediate assistance:</strong></p>
                        <ul>
                            <li>📞 Call our emergency line: <strong>+27 82 123 4567</strong></li>
                            <li>📍 Provide exact location details</li>
                            <li>📱 Stay by your phone for our call</li>
                        </ul>
                    </div>
                    
                    <p>Our rescue team has been notified and will contact you within 15 minutes.</p>
                    <p class="emergency-note">If this is a life-threatening situation for an animal, please also contact local animal control services.</p>
                </div>
            `
    } else {
      response = `
                <div class="response-success">
                    <h3>✅ Message Sent Successfully!</h3>
                    <p>Thank you for contacting PawHope, <strong>${formData.name}</strong>!</p>
                    <p>We've received your message regarding <strong>"${formData.subject}"</strong> and will respond to <strong>${formData.email}</strong> within 1-2 business days.</p>
                    
                    <div class="response-details">
                        <p><strong>What happens next:</strong></p>
                        <ul>
                            <li>📧 You'll receive a confirmation email shortly</li>
                            <li>⏰ Our team will review your message</li>
                            <li>👥 We'll assign it to the appropriate department</li>
                            <li>💬 You'll get a personalized response</li>
                        </ul>
                    </div>
                    
                    <p class="response-note">For urgent matters, please call our main line: <strong>+27 12 345 6789</strong></p>
                </div>
            `
    }

    return response
  }

  function showContactResponse(responseHtml) {
    // Create or update response section
    let responseSection = document.getElementById('formResponse')
    if (!responseSection) {
      responseSection = document.createElement('div')
      responseSection.id = 'formResponse'
      responseSection.className = 'form-response'
      document
        .querySelector('.contact-form-section .container')
        .appendChild(responseSection)
    }

    responseSection.innerHTML = responseHtml
    responseSection.style.display = 'block'

    // Scroll to response
    responseSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  function resetContactForm() {
    document.getElementById('contactForm').reset()
    clearErrors()
  }

  // Character counter for message field
  const messageField = document.getElementById('message')
  if (messageField) {
    // Create character counter
    const counter = document.createElement('div')
    counter.className = 'char-counter'
    counter.style.cssText =
      'text-align: right; font-size: 12px; color: #666; margin-top: 5px;'
    messageField.parentNode.appendChild(counter)

    function updateCounter() {
      const length = messageField.value.length
      counter.textContent = `${length}/1000 characters`

      if (length > 900) {
        counter.style.color = '#e74c3c'
      } else if (length > 800) {
        counter.style.color = '#f39c12'
      } else {
        counter.style.color = '#666'
      }
    }

    messageField.addEventListener('input', updateCounter)
    updateCounter() // Initialize counter
  }
})
