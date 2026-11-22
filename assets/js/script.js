// Custom JavaScript file for the project

// Contact Form validation
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    console.log('got form element')
    // get elements
    const firstName = document.getElementById('fieldFirstName');
    const lastName = document.getElementById('fieldLastName');
    const email = document.getElementById('fieldEmail');
    const phone = document.getElementById('fieldPhone');
    const message = document.getElementById('fieldTextarea');
    const firstNameFeedback = document.getElementById('firstNameFeedback');
    const lastNameFeedback = document.getElementById('lastNameFeedback');
    const emailFeedback = document.getElementById('emailFeedback');
    const phoneFeedback = document.getElementById('phoneFeedback');
    const messageFeedback = document.getElementById('messageFeedback');

    const getValidations = () => [
        [firstName, firstNameFeedback, firstName.value.trim().length >= 2 && firstName.value.trim().length <= 50],
        [lastName, lastNameFeedback, lastName.value.trim().length >= 2 && lastName.value.trim().length <= 50],
        [email, emailFeedback, /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)*\.[^\s@.]{2,}$/.test(email.value.trim())],
        [phone, phoneFeedback, phone.value.trim() === '' || /^\+?[0-9 ]{7,15}$/.test(phone.value.trim())],
        [message, messageFeedback, message.value.trim().length >= 10 && message.value.trim().length <= 1000]
    ]

    const applyValidation = (field, feedback, isValid) => {
        field.setCustomValidity(isValid ? '' : 'Invalid field');
        field.classList.toggle('is-invalid', !isValid);
    }

    // Add event listener for form submission
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();
        event.stopPropagation();

        // validation
        let firstInvalidInput = null;
        for (const [field, feedback, isValid] of getValidations()) {
            applyValidation(field, feedback, isValid);
            if (!isValid && !firstInvalidInput) {
                firstInvalidInput = field;
            }
        }
        if (firstInvalidInput) {
            firstInvalidInput.focus();
            return;
        }

        // If form is valid - print to console, display confirmation modal
        console.log('Form submitted successfully');
        console.log('Form data:', {
            firstName: firstName.value.trim(),
            lastName: lastName.value.trim(),
            email: email.value.trim(),
            phone: phone.value.trim(),
            message: message.value.trim()
        });
        contactForm.reset();
        [firstName, lastName, email, phone, message].forEach((field) => {
            field.setCustomValidity('');
            field.classList.remove('is-invalid', 'is-valid');
        });
        // Display confirmation modal

        

    })
}