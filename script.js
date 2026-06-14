/**
 * SISTEMA COMPACTO DE CONTROLE E INFRAESTRUTURA DINÂMICA
 * AgroTech do Pão - Alta Fidelidade
 */

// 1. DATA OBJECTS PARA RENDERIZAÇÃO AUTOMÁTICA (MANUTENÇÃO FACILITADA)
const dadosProcesso = [
    {
        passo: "01",
        titulo: "Semeadura Inteligente",
        descricao: "Sensores subterrâneos mapeiam os minerais do solo. A semente de trigo é inserida na profundidade exata calculada algoritmicamente."
    },
    {
        passo: "02",
        titulo: "Análise por Satélite",
        descricao: "Monitoramento constante espectral avalia a absorção de nitrogênio pelas plantas, prevenindo pragas sem aditivos químicos."
    },
    {
        passo: "03",
        titulo: "Colheita Robotizada",
        descricao: "Colheitadeiras elétricas autônomas e movidas a baterias solares realizam a colheita noturna para preservar a umidade interna do grão."
    },
    {
        passo: "04",
        titulo: "Moagem de Baixo Impacto",
        descricao: "Moinhos de pedra integrados a sensores de temperatura evitam o aquecimento do trigo, conservando as propriedades nutricionais nativas."
    },
    {
        passo: "05",
        titulo: "Fermentação Controlada",
        descricao: "Câmaras de fermentação com controle biométrico regulam o oxigênio e a umidade, permitindo o crescimento pleno da massa por 72 horas."
    }
];

const dadosFaq = [
    {
        pergunta: "Por que não utilizar a cor verde na identidade visual do Agro?",
        resposta: "A tecnologia e a sustentabilidade reais transcendem a cor verde cosmética. Utilizamos tons de azul-marinho aeroespacial e ouro-trigo para ressaltar a seriedade da engenharia de dados aliada à alta qualidade alimentar."
    },
    {
        pergunta: "Como funciona a rastreabilidade via Blockchain do pão?",
        resposta: "Ao escanear o QR Code da embalagem ecológica, o consumidor ganha acesso ao livro-razão público e imutável que registrou desde as coordenadas geográficas da semente até o consumo energético exato do forno em que foi assado."
    },
    {
        pergunta: "Qual é a vantagem da fermentação biotecnológica natural?",
        resposta: "Diferente do pão industrializado de cultivo rápido, as nossas leveduras selecionadas quebram os antinutrientes e o glúten de forma muito mais eficiente, resultando em um índice glicêmico significativamente menor e alta digestibilidade."
    },
    {
        pergunta: "De onde provém o suporte financeiro e a viabilidade do projeto?",
        resposta: "Operamos em um modelo de ecossistema integrado B2B e B2C. A alta tecnologia aplicada reduz radicalmente os custos com perdas de lavouras e desperdício de água, gerando uma operação altamente rentável e autossustentável."
    }
];

// 2. INICIALIZAÇÃO E MONTAGEM DA DOM
document.addEventListener("DOMContentLoaded", () => {
    renderizarCarrossel();
    renderizarAcordeao();
    configurarAcessibilidade();
    configurarNavegacaoCarrossel();
});

// 3. RENDERIZAÇÃO DOS COMPONENTES
function renderizarCarrossel() {
    const track = document.getElementById("carouselTrack");
    if (!track) return;
    
    track.innerHTML = dadosProcesso.map(item => `
        <div class="carousel-item">
            <span class="step-num">${item.passo}</span>
            <h3>${item.titulo}</h3>
            <p>${item.descricao}</p>
        </div>
    `).join('');
}

function renderizarAcordeao() {
    const wrapper = document.getElementById("faqAccordion");
    if (!wrapper) return;
    
    wrapper.innerHTML = dadosFaq.map((item, index) => `
        <div class="accordion-item">
            <button class="accordion-header" aria-expanded="false" aria-controls="faq-ans-${index}">
                <span>${item.pergunta}</span>
                <i class="fa-solid fa-chevron-down accordion-icon"></i>
            </button>
            <div id="faq-ans-${index}" class="accordion-content">
                <div class="accordion-inner">
                    <p>${item.resposta}</p>
                </div>
            </div>
        </div>
    `).join('');
    
    // Vincula eventos do Acordeão
    const headers = wrapper.querySelectorAll(".accordion-header");
    headers.forEach(header => {
        header.addEventListener("click", () => {
            const currentItem = header.parentElement;
            const content = currentItem.querySelector(".accordion-content");
            const isActive = currentItem.classList.contains("active");
            
            // Fecha todos os itens
            document.querySelectorAll(".accordion-item").forEach(item => {
                item.classList.remove("active");
                item.querySelector(".accordion-content").style.maxHeight = null;
                item.querySelector(".accordion-header").setAttribute("aria-expanded", "false");
            });
            
            // Ativa se não estava ativo
            if (!isActive) {
                currentItem.classList.add("active");
                content.style.maxHeight = content.scrollHeight + "px";
                header.setAttribute("aria-expanded", "true");
            }
        });
    });
}

// 4. LÓGICA DO CARROSSEL DE PROCESSO (LOGÍSTICA DE SLIDES)
let currentIndex = 0;
function configurarNavegacaoCarrossel() {
    const track = document.getElementById("carouselTrack");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    
    if (!track || !prevBtn || !nextBtn) return;
    
    const atualizarCarrossel = () => {
        const items = document.querySelectorAll(".carousel-item");
        if (items.length === 0) return;
        
        const itemWidth = items[0].getBoundingClientRect().width;
        const gap = 24; // Equivalente ao gap definido no CSS
        
        track.style.transform = `translateX(-${currentIndex * (itemWidth + gap)}px)`;
    };
    
    nextBtn.addEventListener("click", () => {
        const items = document.querySelectorAll(".carousel-item");
        let maxVisible = 3;
        if (window.innerWidth <= 1024) maxVisible = 2;
        if (window.innerWidth <= 768) maxVisible = 1;
        
        if (currentIndex < items.length - maxVisible) {
            currentIndex++;
            atualizarCarrossel();
        } else {
            currentIndex = 0; // Loop contínuo
            atualizarCarrossel();
        }
    });
    
    prevBtn.addEventListener("click", () => {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            let maxVisible = 3;
            if (window.innerWidth <= 1024) maxVisible = 2;
            if (window.innerWidth <= 768) maxVisible = 1;
            const items = document.querySelectorAll(".carousel-item");
            currentIndex = items.length - maxVisible;
        }
        atualizarCarrossel();
    });
    
    window.addEventListener("resize", () => {
        currentIndex = 0;
        atualizarCarrossel();
    });
}

// 5. MOTOR DE ACESSIBILIDADE (FONT SCALE & HIGH CONTRAST)
function configurarAcessibilidade() {
    const btnContrast = document.getElementById("btn-contrast");
    const btnFontInc = document.getElementById("btn-font-inc");
    const btnFontDec = document.getElementById("btn-font-dec");
    
    // Estado do tamanho base da fonte (rem/px)
    let tamanhoFonteAtual = 16;
    
    if (btnContrast) {
        btnContrast.addEventListener("click", () => {
            document.body.classList.toggle("high-contrast");
        });
    }
    
    if (btnFontInc) {
        btnFontInc.addEventListener("click", () => {
            if (tamanhoFonteAtual < 24) {
                tamanhoFonteAtual += 2;
                document.documentElement.style.setProperty('--base-font-size', tamanhoFonteAtual + "px");
            }
        });
    }
    
    if (btnFontDec) {
        btnFontDec.addEventListener("click", () => {
            if (tamanhoFonteAtual > 12) {
                tamanhoFonteAtual -= 2;
                document.documentElement.style.setProperty('--base-font-size', tamanhoFonteAtual + "px");
            }
        });
    }
}