AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

const menu = document.querySelector(".mobile-menu");
const toggle = document.querySelector(".menu-toggle");
const header = document.querySelector("header");

// Abre e fecha menu
toggle.addEventListener("click",(e)=>{
    e.stopPropagation();
    menu.classList.toggle("active");
});

// Fecha ao clicar fora
document.addEventListener("click",(e)=>{
    if(
        menu.classList.contains("active") &&
        !menu.contains(e.target)
    ){
        menu.classList.remove("active");
    }
});

// Fecha ao clicar em qualquer link
document.querySelectorAll(".mobile-menu a").forEach(link=>{
    link.addEventListener("click",()=>{
        menu.classList.remove("active");
    });
});

// Header reduz quando desce
window.addEventListener("scroll",()=>{
    if(window.scrollY>80){
        header.classList.add("scroll");
    }else{
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

if(backTop) {
    backTop.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

// ==========================
// BARRA DE PROGRESSO
// ==========================

const progress = document.querySelector("#progress-bar");
window.addEventListener("scroll", () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const percent = (window.scrollY / total) * 100;
    if(progress) {
        progress.style.width = percent + "%";
    }
});

const faqs = document.querySelectorAll(".faq-item");

faqs.forEach(item => {
    const button = item.querySelector(".faq-question");
    
    if (button) {
        button.addEventListener("click", () => {
            const isActive = item.classList.contains("active");
            faqs.forEach(faq => {
                faq.classList.remove("active");
            });
            if (!isActive) {
                item.classList.add("active");
            }
        });
    }
});


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
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
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

            // 3. Aplica a transição de entrada
            contentDiv.style.opacity = '1';
        }, 600); // 600ms combina com o transition do CSS (0.6s)
    }

    function nextTestimonial() {
        currentIndex = (currentIndex + 1) % testimonialsList.length;
        updateTestimonial(currentIndex);
    }

    function prevTestimonial() {
        currentIndex = (currentIndex - 1 + testimonialsList.length) % testimonialsList.length;
        updateTestimonial(currentIndex);
    }

    // Configuração dos botões
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
        autoSlideInterval = setInterval(nextTestimonial, 6000); // 6 segundos é um tempo excelente
    }

    resetInterval();
});