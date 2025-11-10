const alternadorModoEscuro = document.getElementById('alternadorModoEscuro');
const corpo = document.body;

if (localStorage.getItem('modoEscuro') === 'ativado') {
    corpo.classList.add('modo-escuro');
    alternadorModoEscuro.innerHTML = '<i class="fas fa-sun"></i>';
}

alternadorModoEscuro.addEventListener('click', () => {
    corpo.classList.toggle('modo-escuro');
    
    if (corpo.classList.contains('modo-escuro')) {
        alternadorModoEscuro.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('modoEscuro', 'ativado');
        criarParticulas();
    } else {
        alternadorModoEscuro.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('modoEscuro', 'desativado');
        criarParticulas();
    }
});

function criarParticulas() {
    const containerParticulas = document.getElementById('particulas');
    containerParticulas.innerHTML = '';
    
    const quantidadeParticulas = corpo.classList.contains('modo-escuro') ? 40 : 25;
    
    for (let i = 0; i < quantidadeParticulas; i++) {
        const particula = document.createElement('div');
        particula.classList.add('particula');
        
        const tamanho = Math.random() * 4 + 1;
        particula.style.width = `${tamanho}px`;
        particula.style.height = `${tamanho}px`;
        
        particula.style.left = `${Math.random() * 100}%`;
        particula.style.top = `${Math.random() * 100}%`;
        
        if (corpo.classList.contains('modo-escuro')) {
            const tonsVerde = ['#00ff88', '#00ffaa', '#88ffaa', '#00ffcc'];
            particula.style.background = tonsVerde[Math.floor(Math.random() * tonsVerde.length)];
        } else {
            const tonsVerde = ['#00cc6a', '#00994d', '#006633', '#00ff88'];
            particula.style.background = tonsVerde[Math.floor(Math.random() * tonsVerde.length)];
        }
        
        particula.style.animationDelay = `${Math.random() * 15}s`;
        particula.style.animationDuration = `${15 + Math.random() * 10}s`;
        
        containerParticulas.appendChild(particula);
    }
}

const textoDigitando = document.getElementById('textoDigitando');
const frases = ['Front-end', 'C#', 'Banco de Dados', 'Java', 'HTML', 'CSS'];
let indiceFrase = 0;
let indiceLetra = 0;
let fraseAtual = [];
let estaApagando = false;

function digitar() {
    const textoFraseAtual = frases[indiceFrase];
    
    if (!estaApagando && indiceLetra <= textoFraseAtual.length) {
        fraseAtual.push(textoFraseAtual[indiceLetra]);
        indiceLetra++;
        textoDigitando.innerHTML = fraseAtual.join('');
    }
    
    if (estaApagando && indiceLetra >= 0) {
        fraseAtual.pop();
        indiceLetra--;
        textoDigitando.innerHTML = fraseAtual.join('');
    }
    
    if (indiceLetra === textoFraseAtual.length) {
        estaApagando = true;
        setTimeout(digitar, 1000);
        return;
    }
    
    if (estaApagando && indiceLetra === 0) {
        fraseAtual = [];
        estaApagando = false;
        indiceFrase = (indiceFrase + 1) % frases.length;
    }
    
    const velocidade = estaApagando ? 50 : 100;
    setTimeout(digitar, velocidade);
}

const modal = document.getElementById('modalHabilidade');
const tituloModal = document.getElementById('tituloHabilidadeModal');
const conteudoModal = document.getElementById('conteudoHabilidadeModal');
const fecharModal = document.querySelector('.fechar-modal');
const itensHabilidade = document.querySelectorAll('.item-habilidade');

const dadosHabilidades = {
    html: {
        titulo: 'HTML',
        conteudo: 'HTML é a linguagem de marcação usada para estruturar páginas web. É o esqueleto básico de todo site, definindo cabeçalhos, parágrafos, links e outros elementos.'
    },
    css: {
        titulo: 'CSS',
        conteudo: 'CSS é usado para estilizar páginas web. Controla cores, fontes, layouts e torna os sites visualmente atraentes e responsivos para diferentes dispositivos.'
    },
    javascript: {
        titulo: 'JavaScript',
        conteudo: 'JavaScript adiciona interatividade às páginas web. Permite criar elementos dinâmicos, validar formulários, animações e muito mais.'
    },
    csharp: {
        titulo: 'C#',
        conteudo: 'C# é uma linguagem de programação moderna da Microsoft, usada para desenvolvimento de aplicações Windows, web e jogos com Unity.'
    },
    sql: {
        titulo: 'SQL',
        conteudo: 'SQL é a linguagem para gerenciar bancos de dados relacionais. Usada para consultar, inserir, atualizar e deletar dados em sistemas de informação.'
    },
    java: {
        titulo: 'Java',
        conteudo: 'Java é uma linguagem versátil usada em aplicações empresariais, desenvolvimento Android e sistemas de grande escala. É conhecida por "escreva uma vez, execute em qualquer lugar".'
    }
};

itensHabilidade.forEach(item => {
    item.addEventListener('click', () => {
        const habilidade = item.getAttribute('data-habilidade');
        tituloModal.textContent = dadosHabilidades[habilidade].titulo;
        conteudoModal.innerHTML = `<p>${dadosHabilidades[habilidade].conteudo}</p>`;
        modal.style.display = 'flex';
    });
});

fecharModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

const botaoDownload = document.getElementById('botaoDownload');
botaoDownload.addEventListener('click', () => {
    const link = document.createElement('a');
    link.href = 'curriculo-guilherme-lucas.pdf';
    link.download = 'Curriculo-Guillherme-Lucas.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    alert('Download do currículo iniciado!');
});

window.addEventListener('scroll', () => {
    const secoes = document.querySelectorAll('section');
    const linksNavegacao = document.querySelectorAll('.menu-navegacao a');
    
    let atual = '';
    
    secoes.forEach(secao => {
        const topoSecao = secao.offsetTop;
        const alturaSecao = secao.clientHeight;
        
        if (scrollY >= (topoSecao - 200)) {
            atual = secao.getAttribute('id');
        }
    });
    
    linksNavegacao.forEach(link => {
        link.classList.remove('ativo');
        if (link.getAttribute('href').substring(1) === atual) {
            link.classList.add('ativo');
        }
    });
});

const estilo = document.createElement('style');
estilo.textContent = `
    .menu-navegacao a.ativo {
        color: var(--cor-primaria) !important;
    }
`;
document.head.appendChild(estilo);

window.addEventListener('load', () => {
    digitar();
    criarParticulas();
});

window.addEventListener('resize', criarParticulas);