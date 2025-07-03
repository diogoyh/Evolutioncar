document.addEventListener('DOMContentLoaded', () => {
    // --- Código do Carrossel ---
    const carouselTrack = document.querySelector('.carousel-track');
    const carouselItems = document.querySelectorAll('.carousel-item');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    let currentIndex = 0;

    const updateCarousel = () => {
        const itemWidth = carouselItems[0].offsetWidth + parseInt(getComputedStyle(carouselItems[0]).marginRight) * 2;
        carouselTrack.style.transform = `translateX(${-currentIndex * itemWidth}px)`;

        carouselItems.forEach((item, index) => {
            if (index === currentIndex) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    };

    // Ajuste inicial para garantir que o primeiro item esteja ativo
    if (carouselItems.length > 0) {
        carouselItems[0].classList.add('active');
    }

    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : carouselItems.length - 1;
        updateCarousel();
    });

    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex < carouselItems.length - 1) ? currentIndex + 1 : 0;
        updateCarousel();
    });

    // Atualiza o carrossel quando a janela é redimensionada
    window.addEventListener('resize', updateCarousel);

    // Chamada inicial para posicionar o carrossel corretamente ao carregar
    updateCarousel();


    // --- Validação do Formulário ---
    const contactForm = document.querySelector('.contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');

    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const phoneError = document.getElementById('phone-error');

    const validateName = () => {
        if (nameInput.value.trim() === '') {
            nameError.textContent = 'Por favor, digite seu nome.';
            return false;
        } else if (nameInput.value.trim().length < 3) {
            nameError.textContent = 'O nome deve ter pelo menos 3 caracteres.';
            return false;
        }
        nameError.textContent = '';
        return true;
    };

    const validateEmail = () => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailInput.value.trim() === '') {
            emailError.textContent = 'Por favor, digite seu e-mail.';
            return false;
        } else if (!emailPattern.test(emailInput.value.trim())) {
            emailError.textContent = 'Por favor, digite um e-mail válido.';
            return false;
        }
        emailError.textContent = '';
        return true;
    };

    const validatePhone = () => {
        // Permite números com e sem DDD, com 8 ou 9 dígitos, com ou sem hífen
        const phonePattern = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;
        if (phoneInput.value.trim() === '') {
            phoneError.textContent = 'Por favor, digite seu telefone.';
            return false;
        } else if (!phonePattern.test(phoneInput.value.trim())) {
            phoneError.textContent = 'Por favor, digite um telefone válido (ex: (XX) XXXXX-XXXX).';
            return false;
        }
        phoneError.textContent = '';
        return true;
    };

    nameInput.addEventListener('blur', validateName);
    emailInput.addEventListener('blur', validateEmail);
    phoneInput.addEventListener('blur', validatePhone);

    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPhoneValid = validatePhone();

        if (isNameValid && isEmailValid && isPhoneValid) {
            alert('Formulário enviado com sucesso!');
            contactForm.reset();
        } else {
            alert('Por favor, preencha todos os campos corretamente.');
        }
    });

    // --- Inicialização do AOS ---
    AOS.init({
        
        duration: 1000, 
        once: false,    
        offset: 120,   
    });
});