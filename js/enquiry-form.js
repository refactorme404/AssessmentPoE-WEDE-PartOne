// Enquiry Form Validation and AJAX Simulation
document.addEventListener('DOMContentLoaded', function () {
  const enquiryForm = document.getElementById('enquiryForm')
  const responseSection = document.getElementById('formResponse')

  if (enquiryForm) {
    enquiryForm.addEventListener('submit', function (e) {
      e.preventDefault()

      if (validateForm()) {
        submitEnquiry()
      }
    })

    // Real-time validation and dynamic fields
    setupDynamicFields()
  }

  function setupDynamicFields() {
    const enquiryTypeSelect = document.getElementById('enquiryType')
    const budgetGroup = document.getElementById('budgetGroup')
    const animalGroup = document.getElementById('animalGroup')
    const messageGroup = document.getElementById('messageGroup')

    if (enquiryTypeSelect) {
      enquiryTypeSelect.addEventListener('change', function () {
        const selectedValue = this.value

        // Show/hide budget field for sponsorship
        if (budgetGroup) {
          budgetGroup.style.display =
            selectedValue === 'sponsor' ? 'block' : 'none'
        }

        // Show/hide animal selection for adoption
        if (animalGroup) {
          animalGroup.style.display =
            selectedValue === 'adopt' ? 'block' : 'none'
        }

        // Show/hide message field (hidden for adoption)
        if (messageGroup) {
          if (selectedValue === 'adopt') {
            messageGroup.style.display = 'none'
            // Remove required attribute for adoption
            document.getElementById('message').required = false
          } else {
            messageGroup.style.display = 'block'
            // Add required attribute for other types
            document.getElementById('message').required = true
          }
        }
      })
    }

    // Real-time validation
    const emailInput = document.getElementById('email')
    const phoneInput = document.getElementById('phone')
    const budgetInput = document.getElementById('budget')

    if (emailInput) {
      emailInput.addEventListener('blur', validateEmail)
    }

    if (phoneInput) {
      phoneInput.addEventListener('blur', validatePhone)
    }

    if (budgetInput) {
      budgetInput.addEventListener('blur', validateBudget)
    }
  }

  function validateForm() {
    clearErrors()
    let isValid = true

    // Required fields validation
    const requiredFields = ['fullName', 'email', 'enquiryType']
    requiredFields.forEach(function (fieldId) {
      const field = document.getElementById(fieldId)
      if (!field.value.trim()) {
        showError(field, 'This field is required')
        isValid = false
      }
    })

    // Email validation
    if (!validateEmail()) {
      isValid = false
    }

    // Phone validation (if provided)
    const phone = document.getElementById('phone').value
    if (phone && !validatePhone()) {
      isValid = false
    }

    // Budget validation (if provided and for sponsorship)
    const enquiryType = document.getElementById('enquiryType').value
    const budget = document.getElementById('budget').value
    if (enquiryType === 'sponsor' && budget && !validateBudget()) {
      isValid = false
    }

    // Animal selection validation (for adoption)
    if (enquiryType === 'adopt') {
      const animalSelect = document.getElementById('animalSelect')
      if (!animalSelect.value) {
        showError(animalSelect, 'Please select an animal you are interested in')
        isValid = false
      }
    }

    // Message validation (for non-adoption enquiries)
    if (enquiryType !== 'adopt') {
      const message = document.getElementById('message').value
      if (!message.trim()) {
        showError(
          document.getElementById('message'),
          'Please tell us more about your interest'
        )
        isValid = false
      }
    }

    return isValid
  }

  function validateEmail() {
    const emailField = document.getElementById('email')
    const email = emailField.value.trim()
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailRegex.test(email)) {
      showError(emailField, 'Please enter a valid email address')
      return false
    }

    return true
  }

  function validatePhone() {
    const phoneField = document.getElementById('phone')
    const phone = phoneField.value.trim()

    if (phone) {
      const phoneRegex = /^[\d\s\-\(\)\+]+$/
      const cleanPhone = phone.replace(/\D/g, '')

      if (!phoneRegex.test(phone) || cleanPhone.length < 10) {
        showError(phoneField, 'Please enter a valid phone number')
        return false
      }
    }

    return true
  }

  function validateBudget() {
    const budgetField = document.getElementById('budget')
    const budget = budgetField.value.trim()

    if (budget) {
      const budgetValue = parseFloat(budget)
      if (isNaN(budgetValue) || budgetValue < 0) {
        showError(budgetField, 'Please enter a valid budget amount')
        return false
      }
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
      '#enquiryForm input, #enquiryForm select, #enquiryForm textarea'
    )
    formInputs.forEach(function (input) {
      input.style.borderColor = ''
    })
  }

  function submitEnquiry() {
    const submitBtn = document.querySelector('#enquiryForm .submit-button')
    const originalText = submitBtn.textContent

    // Show loading state
    submitBtn.textContent = 'Processing...'
    submitBtn.disabled = true

    // Simulate AJAX submission
    setTimeout(function () {
      const formData = getFormData()
      const response = generateResponse(formData)

      showResponse(response)
      resetForm()

      // Restore button
      submitBtn.textContent = originalText
      submitBtn.disabled = false
    }, 1500)
  }

  function getFormData() {
    return {
      fullName: document.getElementById('fullName').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
      enquiryType: document.getElementById('enquiryType').value,
      animalSelect: document.getElementById('animalSelect').value,
      budget: document.getElementById('budget').value,
      timeline: document.getElementById('timeline').value,
      message: document.getElementById('message').value
    }
  }

  function generateResponse(formData) {
    const enquiryType = formData.enquiryType
    let response = ''

    switch (enquiryType) {
      case 'adopt':
        const animalName = formData.animalSelect || 'a pet'
        response = `
                    <h3>Thank you for your adoption interest, ${formData.fullName}!</h3>
                    <p>We've received your enquiry about adopting <strong>${animalName}</strong> from PawHope.</p>
                    <p><strong>Adoption Process:</strong></p>
                    <ul>
                        <li>Our adoption team will contact you within 24 hours</li>
                        <li>We'll schedule a meet & greet with ${animalName}</li>
                        <li>Home visit to ensure a safe environment</li>
                        <li>Adoption fee: R500 - R1,500 (includes vaccinations)</li>
                        <li>Final adoption paperwork and pet handover</li>
                    </ul>
                    <p><strong>Next Steps:</strong> Check your email for ${animalName}'s profile and our adoption guide.</p>
                `
        break

      case 'volunteer':
        response = `
                    <h3>Welcome to the PawHope volunteer team, ${formData.fullName}!</h3>
                    <p>We're excited about your interest in volunteering. Based on your message, we'll match you with suitable opportunities.</p>
                    <ul>
                        <li>Volunteer orientation session required</li>
                        <li>Flexible scheduling available</li>
                        <li>Training provided for all roles</li>
                        <li>Minimum commitment: 4 hours per week</li>
                    </ul>
                    <p><strong>Next Steps:</strong> Our volunteer coordinator will contact you within 2 business days.</p>
                `
        break

      case 'sponsor':
        const budget = formData.budget ? parseFloat(formData.budget) : 0
        let sponsorshipLevel = 'Custom'
        let benefits = ''

        if (budget >= 2500) {
          sponsorshipLevel = 'Gold Sponsor'
          benefits =
            'Full medical coverage for 2 animals, featured on website, annual report recognition'
        } else if (budget >= 1000) {
          sponsorshipLevel = 'Silver Sponsor'
          benefits =
            'Medical treatments for 1 animal, monthly updates, social media recognition'
        } else if (budget >= 500) {
          sponsorshipLevel = 'Bronze Sponsor'
          benefits =
            'Basic care package, quarterly updates, sponsor certificate'
        } else if (budget > 0) {
          benefits =
            'One-time support for specific needs, thank you certificate'
        } else {
          benefits =
            'Our team will contact you to discuss suitable sponsorship options'
        }

        response = `
                    <h3>Thank you for your sponsorship interest, ${formData.fullName}!</h3>
                    <p>Your proposed budget of <strong>R${budget}</strong> qualifies you as a <strong>${sponsorshipLevel}</strong>.</p>
                    <p><strong>Benefits include:</strong> ${benefits}</p>
                    <ul>
                        <li>Tax-deductible contributions</li>
                        <li>Regular impact reports</li>
                        <li>Recognition in our sponsor network</li>
                        <li>Option to visit sponsored animals</li>
                    </ul>
                    <p><strong>Next Steps:</strong> Our sponsorship team will contact you to finalize details.</p>
                `
        break

      case 'general':
        response = `
                    <h3>Thank you for contacting PawHope, ${formData.fullName}!</h3>
                    <p>We've received your message and will respond within 1-2 business days.</p>
                    <p>For urgent matters regarding animal rescue, please call our emergency line: <strong>+27 82 123 4567</strong></p>
                `
        break
    }

    return response
  }

  function showResponse(responseHtml) {
    const responseSection = document.getElementById('formResponse')
    if (responseSection) {
      responseSection.innerHTML = responseHtml
      responseSection.style.display = 'block'

      // Scroll to response
      responseSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  function resetForm() {
    document.getElementById('enquiryForm').reset()

    // Reset dynamic fields to default state
    const budgetGroup = document.getElementById('budgetGroup')
    const animalGroup = document.getElementById('animalGroup')
    const messageGroup = document.getElementById('messageGroup')

    if (budgetGroup) budgetGroup.style.display = 'none'
    if (animalGroup) animalGroup.style.display = 'none'
    if (messageGroup) {
      messageGroup.style.display = 'block'
      document.getElementById('message').required = true
    }

    clearErrors()
  }
})
