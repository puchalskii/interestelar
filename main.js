// Variáveis globais
const choices = [];
let currentQuestion = 0;

// Elementos DOM
const intro = document.getElementById('intro');
const progressContainer = document.getElementById('progress-container');
const progressFill = document.getElementById('progress-fill');
const questionsContainer = document.getElementById('questions-container');
const questions = [
    document.getElementById('question1'),
    document.getElementById('question2'),
    document.getElementById('question3'),
    document.getElementById('question4'),
    document.getElementById('question5')
];
const resultContainer = document.getElementById('result-container');
const resultContent = document.getElementById('result-content');

// Event Listeners
document.getElementById('start-btn').addEventListener('click', startAdventure);
document.getElementById('restart-btn').addEventListener('click', restartAdventure);

questions.forEach((question, index) => {
    const buttons = question.querySelectorAll('button[data-choice]');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            choices[index] = button.getAttribute('data-choice');
            nextQuestion();
        });
    });
});

function startAdventure() {
    intro.classList.add('hidden');
    progressContainer.classList.remove('hidden');
    questionsContainer.classList.remove('hidden');
    showQuestion(0);
    createStarField();
    updateProgress();
}

function nextQuestion() {
    currentQuestion++;
    updateProgress();
    
    if (currentQuestion < questions.length) {
        setTimeout(() => {
            showQuestion(currentQuestion);
        }, 200);
    } else {
        setTimeout(() => {
            showResult();
        }, 300);
    }
}

function showQuestion(index) {
    questions.forEach(question => question.classList.add('hidden'));
    setTimeout(() => {
        questions[index].classList.remove('hidden');
        questions[index].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
}

function updateProgress() {
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    progressFill.style.width = `${progress}%`;
}

function showResult() {
    questionsContainer.classList.add('hidden');
    progressContainer.classList.add('hidden');
    resultContainer.classList.remove('hidden');
    
    const storyParts = [
        getIntroText(),
        getQuestionOutcome(0, choices[0]),
        getQuestionOutcome(1, choices[1]),
        getQuestionOutcome(2, choices[2]),
        getQuestionOutcome(3, choices[3]),
        getQuestionOutcome(4, choices[4]),
        getConclusionText(choices)
    ];
    
    resultContent.innerHTML = storyParts.join('<br><br>');
    resultContainer.scrollIntoView({ behavior: 'smooth' });
}

function restartAdventure() {
    currentQuestion = 0;
    choices.length = 0;
    resultContainer.classList.add('hidden');
    intro.classList.remove('hidden');
    progressFill.style.width = '0%';
    
    setTimeout(() => {
        intro.scrollIntoView({ behavior: 'smooth' });
    }, 100);
}

function getIntroText() {
    const names = ['Alex Chen', 'Maya Patel', 'Sam Rivera', 'Jordan Kim', 'Riley Santos'];
    const ships = ['Endeavour', 'Voyager', 'Pioneer', 'Discovery', 'Horizon'];
    const missions = ['Kepler-442b', 'Proxima Centauri', 'TRAPPIST-1', 'Wolf 1061c', 'Gliese 667C'];
    
    return `<strong>Comandante ${names[Math.floor(Math.random() * names.length)]}</strong><br>
            Nave: <em>${ships[Math.floor(Math.random() * ships.length)]}</em><br>
            Destino: <em>${missions[Math.floor(Math.random() * missions.length)]}</em>`;
}

function getQuestionOutcome(index, choice) {
    const outcomes = {
        '1': [
            `Você decidiu investigar o sinal. A nave alienígena estava genuinamente em perigo - uma espécie pacífica que retribuiu sua ajuda com um módulo de energia avançado que se mostrou crucial mais tarde.`,
            `Os escudos defensivos protegeram completamente a nave durante a passagem pelo campo de asteroides. O alto consumo de energia foi compensado pela segurança total da missão.`,
            `Parando para executar reparos completos, você garantiu que todos os sistemas de suporte à vida funcionassem perfeitamente. O atraso de três dias no cronograma foi considerado aceitável pelos controladores da missão.`,
            `Você compartilhou informações limitadas sobre a Terra em troca de tecnologia de propulsão avançada. Este conhecimento revolucionaria futuras explorações espaciais da humanidade.`,
            `Usando todo o combustível restante, você completou com sucesso todos os objetivos científicos da missão. Ficou em órbita aguardando resgate por seis meses, mas os dados coletados eram inestimáveis.`
        ],
        '2': [
            `Mantendo o curso original, você evitou um encontro que mais tarde descobriu ser uma armadilha de piratas espaciais disfarçados. Sua cautela salvou a missão.`,
            `A navegação evasiva através do campo de asteroides foi arriscada. A nave sofreu danos menores no casco externo, mas você preservou energia vital para as fases finais da missão.`,
            `Acelerando para o destino com suporte de vida limitado foi perigoso. Dois tripulantes desenvolveram sintomas de hipóxia leve, mas você chegou a tempo de completar os objetivos primários.`,
            `Recusando negociar informações sobre a Terra, você protegeu a segurança da humanidade. A entidade alienígena partiu pacificamente, respeitando sua decisão.`,
            `Optando pelo retorno seguro à Terra, você preservou a nave e a tripulação. Embora os objetivos científicos não tenham sido totalmente cumpridos, a experiência adquirida foi valiosa para missões futuras.`
        ]
    };
    
    return outcomes[choice][index];
}

function getConclusionText(choices) {
    const riskCount = choices.filter(c => c === '1').length;
    
    if (riskCount === 0) {
        return `<strong>Avaliação Final:</strong> Sua abordagem conservadora resultou em uma missão segura e bem-sucedida. Você demonstrou excelente julgamento de risco e liderança responsável, retornando com a tripulação intacta e dados valiosos.`;
    } else if (riskCount === 5) {
        return `<strong>Avaliação Final:</strong> Sua disposição para assumir riscos calculados resultou em descobertas extraordinárias. Você expandiu significativamente os limites do conhecimento humano, estabelecendo novos padrões para exploração espacial.`;
    } else if (riskCount >= 3) {
        return `<strong>Avaliação Final:</strong> Equilibrando coragem e prudência, você conduziu uma missão exemplar. Suas decisões resultaram em avanços científicos importantes e estabeleceram você como um comandante respeitado na frota espacial.`;
    } else {
        return `<strong>Avaliação Final:</strong> Sua abordagem equilibrada entre segurança e exploração resultou em uma missão bem-sucedida. Você demonstrou maturidade no comando e trouxe importantes contribuições para o programa espacial.`;
    }
}

function createStarField() {
    const starsContainer = document.querySelector('.stars');
    starsContainer.innerHTML = '';
    
    for (let i = 0; i < 200; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        const size = Math.random() * 2 + 0.5;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 4}s`;
        star.style.animationDuration = `${3 + Math.random() * 2}s`;
        
        starsContainer.appendChild(star);
    }
}

// Inicializar
window.addEventListener('load', createStarField);