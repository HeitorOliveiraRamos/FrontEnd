document.addEventListener('DOMContentLoaded', function () {
    const contactMethodRadios = document.querySelectorAll('input[name="metodo_contato"]');
    const emailInputGroup = document.getElementById('email_input').parentElement;
    const celularInputGroup = document.getElementById('celular_input').parentElement;

    function toggleContactInputs() {
        const selectedMethod = document.querySelector('input[name="metodo_contato"]:checked').value;
        if (selectedMethod === 'email') {
            emailInputGroup.style.display = 'block';
            celularInputGroup.style.display = 'none';
            document.getElementById('email_input').required = true;
            document.getElementById('celular_input').required = false;
        } else if (selectedMethod === 'celular') {
            emailInputGroup.style.display = 'none';
            celularInputGroup.style.display = 'block';
            document.getElementById('email_input').required = false;
            document.getElementById('celular_input').required = true;
        }
    }

    // Initial state based on checked radio
    toggleContactInputs();

    // Add event listeners to radio buttons
    contactMethodRadios.forEach(radio => {
        radio.addEventListener('change', toggleContactInputs);
    });

    // Optional: Form submission handling (basic example)
    const form = document.querySelector('.contact-form form');
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent actual submission for this example
            const formData = new FormData(form);
            const data = {};
            formData.forEach((value, key) => {
                // Only include relevant contact info based on selection
                if (key === 'email_input' && data['metodo_contato'] !== 'email') return;
                if (key === 'celular_input' && data['metodo_contato'] !== 'celular') return;
                data[key] = value;
            });
            console.log('Form data:', data);
            alert('Mensagem enviada (simulação)! Verifique o console para os dados.');
            form.reset(); // Reset form after submission
            toggleContactInputs(); // Re-apply initial visibility
        });
    }
});