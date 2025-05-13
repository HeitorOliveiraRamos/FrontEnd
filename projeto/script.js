document.addEventListener('DOMContentLoaded', function () {
    const contactMethodRadios = document.querySelectorAll('input[name="metodo_contato"]');
    const emailInput = document.getElementById('email_input');
    const celularInput = document.getElementById('celular_input');
    const emailInputGroup = emailInput.parentElement;
    const celularInputGroup = celularInput.parentElement;

    function toggleContactInputs() {
        const selectedMethod = document.querySelector('input[name="metodo_contato"]:checked').value;
        if (selectedMethod === 'email') {
            emailInputGroup.style.display = 'block';
            celularInputGroup.style.display = 'none';
            emailInput.required = true;
            celularInput.required = false;
        } else if (selectedMethod === 'celular') {
            emailInputGroup.style.display = 'none';
            celularInputGroup.style.display = 'block';
            emailInput.required = false;
            celularInput.required = true;
        }
    }

    toggleContactInputs();

    contactMethodRadios.forEach(radio => {
        radio.addEventListener('change', toggleContactInputs);
    });

    const requiredInputs = document.querySelectorAll('input[required], textarea[required]');
    const customMessage = "Esse campo é obrigatório o preenchimento";

    requiredInputs.forEach(input => {
        input.addEventListener('invalid', function(event) {
            if (event.target.validity.valueMissing) {
                event.target.setCustomValidity(customMessage);
            }
        });

        input.addEventListener('input', function(event) {
            event.target.setCustomValidity('');
        });
    });

    const form = document.querySelector('.contact-form form');
    if (form) {
        form.addEventListener('submit', function(event) {
            let firstInvalidField = null;

            if (emailInput.required && !emailInput.value) {
                emailInput.setCustomValidity(customMessage);
                if (!firstInvalidField) firstInvalidField = emailInput;
            } else if (emailInput.required) {
                emailInput.setCustomValidity('');
            }

            if (celularInput.required && !celularInput.value) {
                celularInput.setCustomValidity(customMessage);
                if (!firstInvalidField) firstInvalidField = celularInput;
            } else if (celularInput.required) {
                celularInput.setCustomValidity('');
            }

            if (!form.checkValidity()) {
                event.preventDefault();
                if (firstInvalidField) {
                    firstInvalidField.reportValidity();
                } else {
                    const allInputs = form.querySelectorAll('input[required], textarea[required]');
                    for(let item of allInputs){
                        if(!item.validity.valid){
                            item.reportValidity();
                            break;
                        }
                    }
                }
                return;
            }


            event.preventDefault();
            const formData = new FormData(form);
            const data = {};
            formData.forEach((value, key) => {
                const currentSelectedMethod = document.querySelector('input[name="metodo_contato"]:checked').value;
                if (key === 'email_input' && currentSelectedMethod !== 'email') return;
                if (key === 'celular_input' && currentSelectedMethod !== 'celular') return;
                data[key] = value;
            });
            console.log('Form data:', data);
            alert('Mensagem enviada (simulação)! Verifique o console para os dados.');
            form.reset();
            toggleContactInputs();
            requiredInputs.forEach(input => input.setCustomValidity(''));
        });
    }
});