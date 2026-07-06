// ==========================
// INICIALIZAÇÃO DO AOS (Animações)
// ==========================
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// ==========================
// MENU MOBILE E HEADER ESTILO
// ==========================
const menu = document.querySelector(".mobile-menu");
const toggle = document.querySelector(".menu-toggle");
const header = document.querySelector("header");

// Abre e fecha menu mobile
toggle.addEventListener("click", (e) => {
    e.stopPropagation();
    menu.classList.toggle("active");
});

// Fecha o menu ao clicar fora dele
document.addEventListener("click", (e) => {
    if (menu.classList.contains("active") && !menu.contains(e.target)) {
        menu.classList.remove("active");
    }
});

// Fecha o menu ao clicar em qualquer link interno
document.querySelectorAll(".mobile-menu a").forEach(link => {
    link.addEventListener("click", () => {
        menu.classList.remove("active");
    });
});

// Header reduz tamanho quando desce a página
window.addEventListener("scroll", () => {
    if (window.scrollY > 80) {
        header.classList.add("scroll");
    } else {
        header.classList.remove("scroll");
    }
});

// ==========================
// BOTÃO VOLTAR AO TOPO
// ==========================
const backTop = document.querySelector("#backTop");

window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
        backTop.classList.add("show");
    } else {
        backTop.classList.remove("show");
    }
});

if (backTop) {
    backTop.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

// ==========================
// BARRA DE PROGRESSO DE LEITURA
// ==========================
const progress = document.querySelector("#progress-bar");

window.addEventListener("scroll", () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const percent = (window.scrollY / total) * 100;
    if (progress) {
        progress.style.width = percent + "%";
    }
});

// ==========================
// FAQ (Perguntas Frequentes)
// ==========================
const faqs = document.querySelectorAll(".faq-item");

faqs.forEach(item => {
    const button = item.querySelector(".faq-question");
    
    if (button) {
        button.addEventListener("click", () => {
            const isActive = item.classList.contains("active");
            
            // Fecha todos os outros
            faqs.forEach(faq => {
                faq.classList.remove("active");
            });

            // Abre o que foi clicado (se não estava aberto)
            if (!isActive) {
                item.classList.add("active");
            }
        });
    }
});

// ==========================
// SLIDER DE DEPOIMENTOS
// ==========================
document.addEventListener("DOMContentLoaded", function() {
    const testimonialsList = [
        { text: '"Desde o primeiro contato fomos acolhidos com muito respeito. A equipe nos deu forças para recomeçar."', name: "Familiar de paciente", role: "Familiar" },
        { text: '"A clínica ofereceu toda a infraestrutura e o apoio psicológico que precisávamos. Sou eternamente grata pela nova chance que nos deram."', name: "Maria S.", role: "Mãe de paciente" },
        { text: '"O tratamento humanizado fez toda a diferença. Hoje vivo uma nova história graças à dedicação de todos os profissionais."', name: "João P.", role: "Paciente em recuperação" },
        { text: '"Encontrar um ambiente que une excelência clínica e empatia foi fundamental. Um cuidado que emociona e traz resultados reais."', name: "Carlos E.", role: "Paciente reabilitado" },
        { text: '"O respeito ao sigilo e o acolhimento nos devolveram a paz que há muito tempo não tínhamos. Excelente estrutura e atendimento impecável."', name: "Ana Clara", role: "Esposa de paciente" }
    ];

    let currentIndex = 0;
    const contentDiv = document.querySelector('.testimonial-content');
    const textEl = document.getElementById('testimonial-text');
    const nameEl = document.getElementById('testimonial-name');
    const roleEl = document.getElementById('testimonial-role');
    const dots = document.querySelectorAll('.testimonial-dots .dot'); // Isolado para depoimentos
    const prevBtn = document.querySelector('.testimonial-slider .prev'); // Isolado para depoimentos
    const nextBtn = document.querySelector('.testimonial-slider .next'); // Isolado para depoimentos
    let autoSlideInterval;

    if (!contentDiv) return;

    function updateTestimonial(index) {
        contentDiv.style.opacity = '0';

        setTimeout(() => {
            textEl.textContent = testimonialsList[index].text;
            nameEl.textContent = testimonialsList[index].name;
            roleEl.textContent = testimonialsList[index].role;

            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });

            contentDiv.style.opacity = '1';
        }, 600);
    }

    function nextTestimonial() {
        currentIndex = (currentIndex + 1) % testimonialsList.length;
        updateTestimonial(currentIndex);
    }

    function prevTestimonial() {
        currentIndex = (currentIndex - 1 + testimonialsList.length) % testimonialsList.length;
        updateTestimonial(currentIndex);
    }

    if (nextBtn) nextBtn.addEventListener('click', () => { nextTestimonial(); resetInterval(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { prevTestimonial(); resetInterval(); });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateTestimonial(currentIndex);
            resetInterval();
        });
    });

    function resetInterval() {
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(nextTestimonial, 6000);
    }

    resetInterval();
});

// ==========================
// SLIDER DA EQUIPE
// ==========================
const teamContainer = document.querySelector(".team-slider-container");

if (teamContainer) {
    const track = teamContainer.querySelector(".slider-track");
    const slides = teamContainer.querySelectorAll(".slider-track img");
    const dotsContainer = teamContainer.querySelector(".slider-dots");
    const prevTeamBtn = teamContainer.querySelector(".prev");
    const nextTeamBtn = teamContainer.querySelector(".next");
    
    let teamIndex = 0;
    let teamInterval;

    // Limpa as bolinhas estáticas do HTML antes de gerar dinamicamente
    dotsContainer.innerHTML = '';

    // Cria as bolinhas baseadas na quantidade de imagens
    slides.forEach((_, i) => {
        const dot = document.createElement("span");
        if (i === 0) dot.classList.add("active");
        dotsContainer.appendChild(dot);
    });

    const teamDots = teamContainer.querySelectorAll(".slider-dots span");

    function updateTeamSlider() {
        track.style.transform = `translateX(-${teamIndex * 100}%)`;
        slides.forEach(img => img.classList.remove("active"));
        teamDots.forEach(dot => dot.classList.remove("active"));

        slides[teamIndex].classList.add("active");
        teamDots[teamIndex].classList.add("active");
    }

    function nextTeamSlide() {
        teamIndex++;
        if (teamIndex >= slides.length) {
            teamIndex = 0;
        }
        updateTeamSlider();
    }

    function prevTeamSlide() {
        teamIndex--;
        if (teamIndex < 0) {
            teamIndex = slides.length - 1;
        }
        updateTeamSlider();
    }

    if(nextTeamBtn) nextTeamBtn.onclick = nextTeamSlide;
    if(prevTeamBtn) prevTeamBtn.onclick = prevTeamSlide;

    teamDots.forEach((dot, i) => {
        dot.onclick = () => {
            teamIndex = i;
            updateTeamSlider();
        }
    });

    function autoPlayTeam() {
        teamInterval = setInterval(nextTeamSlide, 5000);
    }

    autoPlayTeam();

    // Pausa animação ao passar o mouse
    teamContainer.addEventListener("mouseenter", () => {
        clearInterval(teamInterval);
    });

    teamContainer.addEventListener("mouseleave", () => {
        autoPlayTeam();
    });

    updateTeamSlider();
}

// ==========================
// ANIMAÇÃO DE REVELAÇÃO NO SCROLL (Classes extras)
// ==========================
const reveals = document.querySelectorAll(".reveal-left, .reveal-right, .reveal-up");

function revealOnScroll() {
    const windowHeight = window.innerHeight;

    reveals.forEach(el => {
        const top = el.getBoundingClientRect().top;

        // Revela quando o elemento estiver 120px dentro da tela
        if (top < windowHeight - 120) {
            el.classList.add("show");
        }
    });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll(); // Chama uma vez para verificar elementos já visíveis no topo