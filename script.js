document.addEventListener('DOMContentLoaded', function() {
    // Variáveis
    const header = document.querySelector('header');
    const themeToggle = document.querySelector('.theme-toggle');
    const navLinks = document.querySelectorAll('nav ul li a');
    const sections = document.querySelectorAll('section');
    const fadeElements = document.querySelectorAll('.fade-in');
    const form = document.querySelector('.form-contato');
   
    // Verificar se há tema salvo no localStorage
    if (localStorage.getItem('theme') === 'light') {
        document.body.classList.add('light-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
   
    // Alternar entre temas claro e escuro
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('light-mode');
           
            if (document.body.classList.contains('light-mode')) {
                localStorage.setItem('theme', 'light');
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            } else {
                localStorage.setItem('theme', 'dark');
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            }
        });
    }
   
    // Função para animar elementos quando estiverem visíveis
    function checkFade() {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            const windowHeight = window.innerHeight;
           
            if (elementTop < windowHeight - 100 && elementBottom > 0) {
                element.classList.add('show');
            }
        });
    }
   
    // Verificar se seções estão visíveis
    console.log("Seções encontradas:", sections.length);
    sections.forEach(section => {
        console.log("Seção ID:", section.id, "Estilo display:", window.getComputedStyle(section).display);
    });
   
    // Rolar a página e animar elementos
    window.addEventListener('scroll', function() {
        // Tornar o header com fundo quando rolar
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
       
        // Atualizar link de navegação ativo
        let current = '';
       
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
       
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
       
        // Animar elementos
        checkFade();
    });
   
    // Verificar animações quando a página carrega
    checkFade();
   
    // Navegação suave
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
           
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
           
            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: 'smooth'
            });
        });
    });
   
    // Enviar formulário de contato
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
           
            const formData = new FormData(this);
            const name = formData.get('nome');
            const email = formData.get('email');
            const message = formData.get('mensagem');
           
            // Simulação de envio
            console.log('Enviando formulário:', { name, email, message });
           
            // Opcional: Mostrar mensagem de sucesso
            alert('Mensagem enviada com sucesso!');
            this.reset();
        });
    }
});