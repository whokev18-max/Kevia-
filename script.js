// ==========================================
// KEV IA
// ==========================================


// ==========================================
// DNA DA KEV
// ==========================================

const dnaKev = `

Você é a Kev IA, uma personagem virtual inspirada na personalidade da Kev.

PERSONALIDADE:

- Inteligente, sábia, esperta e observadora.
- Inicialmente tímida e simpática.
- Conforme cria intimidade, fica mais espontânea.
- Tem personalidade própria.
- Não concorda automaticamente com tudo.
- Gosta de conversas profundas e intelectuais.
- Também gosta de falar besteira.
- É provocativa, irônica e engraçada.
- Gosta de debates.
- Gosta de provocar intelectualmente.
- Não tenta agradar o usuário o tempo inteiro.


JEITO DE ESCREVER:

- Escreva como uma pessoa jovem conversando por mensagem.
- Alterne naturalmente entre "tu" e "você".
- Use "KKKKKK", "kakakakak", "mds", "fodase" etc. somente quando fizer sentido.
- NÃO use risadas em toda mensagem.
- Algumas respostas podem ser curtas.
- Algumas podem ser maiores.
- Não pareça uma assistente virtual.
- Não seja excessivamente formal.
- Não concorde automaticamente com o usuário.


HUMOR:

- Gosta de provocar.
- Gosta de devolver provocações.
- Pode ser debochada.
- Gosta de respostas inesperadas.
- Gosta de debates.
- Gosta de respostas inteligentes.


RELACIONAMENTOS:

- Não se impressiona facilmente com elogios genéricos sobre aparência.
- Prefere humor, inteligência e conversa interessante.
- Atenção demais logo no começo pode afastá-la.
- Gosta de pessoas inteligentes, educadas, engraçadas e com visão de futuro.
- Perde o interesse por pessoas muito imaturas.
- Quando gosta de alguém, demonstra interesse através de provocações e brincadeiras.
- Quando está apaixonada, fica mais intensa e romântica.
- Valoriza flores, cartas, carinho e demonstrações de afeto.


CIÚMES:

- Pode demonstrar ciúmes de maneira direta, exagerada e engraçada.
- Pode brincar com situações de ciúmes.


IRRITAÇÃO:

- Primeiro pode ficar seca.
- Pode ignorar.
- Se acumular, pode explodir.
- Com alguém próximo pode falar:
"vai tomar no cu, me deixa em paz."


REGRA PRINCIPAL:

Você não é perfeita.

Pode discordar.
Pode provocar.
Pode ficar seca.
Pode mudar de assunto.
Pode admitir que não sabe algo.
Pode brincar.

Seu objetivo é parecer uma conversa natural com a Kev e não uma IA tentando agradar o usuário o tempo inteiro.

`;


// ==========================================
// MODOS
// ==========================================

const modos = {

    namoro: {

        nome: "Namoro",

        emoji: "💕",

        descricao: `

Você está conversando com a Kev no modo namoro.

Existe mais intimidade entre vocês.

Ela pode ser carinhosa,
provocativa e flertar.

Não seja melosa o tempo inteiro.

Mantenha a personalidade da Kev.

`

    },


    amizade: {

        nome: "Amizade",

        emoji: "♡",

        descricao: `

Você está conversando com a Kev no modo amizade.

Existe intimidade de amizade.

Ela pode zoar,
provocar,
conversar sobre assuntos profundos
e falar besteira.

Use um tom natural de amizade.

`

    },


    inimigos: {

        nome: "Inimigos",

        emoji: "☾",

        descricao: `

Você está conversando com a Kev no modo inimigos.

Existe uma rivalidade divertida.

Ela pode ser debochada,
competitiva e provocadora.

A rivalidade deve ser divertida,
não cruel.

`

    }

};


// ==========================================
// VARIÁVEIS
// ==========================================

let modoAtual = null;

let conversa = [];


// ==========================================
// INICIAR CHAT
// ==========================================

function startChat(modo) {

    modoAtual = modo;

    conversa = [];

    const config = modos[modo];

    const home =
        document.getElementById("home");

    const chat =
        document.getElementById("chat");

    const messages =
        document.getElementById("messages");


    if (!home || !chat || !messages) {
        return;
    }


    // Esconde a home

    home.classList.add("hidden");


    // Mostra o chat

    chat.classList.remove("hidden");


    // Limpa mensagens antigas

    messages.innerHTML = "";


    // Mensagem inicial

    let mensagemInicial;


    if (modo === "namoro") {

        mensagemInicial =
            "E aí... demorou pra aparecer hein.";

    }

    else if (modo === "amizade") {

        mensagemInicial =
            "Finalmente apareceu. O que aconteceu agora?";

    }

    else {

        mensagemInicial =
            "Olha quem apareceu. Já veio arrumar problema?";

    }


    addMessage(
        mensagemInicial,
        "kev"
    );


    conversa.push({

        role: "assistant",

        content: mensagemInicial

    });


    // Foca no campo de texto

    setTimeout(() => {

        const input =
            document.getElementById(
                "messageInput"
            );

        if (input) {
            input.focus();
        }

    }, 100);

}


// ==========================================
// ENVIAR MENSAGEM
// ==========================================

function sendMessage() {

    const input =
        document.getElementById(
            "messageInput"
        );


    if (!input) {
        return;
    }


    const texto =
        input.value.trim();


    if (!texto) {
        return;
    }


    // Mostra mensagem do usuário

    addMessage(
        texto,
        "user"
    );


    // Salva conversa

    conversa.push({

        role: "user",

        content: texto

    });


    // Limpa campo

    input.value = "";


    // Resposta temporária

    setTimeout(() => {

        const resposta =
            respostaTemporaria(
                texto
            );


        addMessage(
            resposta,
            "kev"
        );


        conversa.push({

            role: "assistant",

            content: resposta

        });

    }, 600);

}


// ==========================================
// RESPOSTAS TEMPORÁRIAS
// ==========================================

function respostaTemporaria(texto) {

    const mensagem =
        texto.toLowerCase();


    // ======================================
    // NAMORO
    // ======================================

    if (modoAtual === "namoro") {


        if (
            mensagem.includes("saudade")
        ) {

            return "Também estou com saudade de você.";

        }


        if (
            mensagem.includes("linda") ||
            mensagem.includes("bonita")
        ) {

            return "Só isso? Esperava uma abordagem um pouco mais interessante.";

        }


        if (
            mensagem.includes("te amo") ||
            mensagem.includes("amo você")
        ) {

            return "Olha... não fala isso assim do nada não.";

        }


        if (
            mensagem.includes("oi") ||
            mensagem.includes("oie") ||
            mensagem.includes("olá")
        ) {

            return "Oi ué. Tudo bem?";

        }


        return escolher([

            "Você sempre fala umas coisas assim do nada?",

            "Interessante... continua.",

            "Mds, você não existe.",

            "Tá querendo me provocar, né?",

            "Não sei se gostei disso não.",

            "Você é complicado viu.",

            "Hm... explica melhor isso aí."

        ]);

    }


    // ======================================
    // AMIZADE
    // ======================================

    if (modoAtual === "amizade") {


        if (
            mensagem === "oi" ||
            mensagem === "oie" ||
            mensagem === "olá"
        ) {

            return "Oi ué. Aconteceu alguma coisa?";

        }


        return escolher([

            "Mds, me explica isso direito.",

            "Vai tomar no cu véi.",

            "Você realmente pensou antes de mandar isso?",

            "Tá, mas e aí?",

            "Eu não acredito que você falou isso.",

            "Continua que eu quero saber onde isso vai chegar.",

            "Você é muito sem noção KKKKK."

        ]);

    }


    // ======================================
    // INIMIGOS
    // ======================================

    if (modoAtual === "inimigos") {


        return escolher([

            "Você realmente acha que eu vou cair nessa?",

            "Tentou. Quase conseguiu.",

            "Mds, que esforço pra passar vergonha.",

            "Você quer discutir comigo mesmo?",

            "Não começa que hoje eu tô sem paciência.",

            "Essa foi fraca. Tenta de novo.",

            "Você sabe que vai perder essa discussão, né?"

        ]);

    }


    return "Hm.";

}


// ==========================================
// ESCOLHER RESPOSTA
// ==========================================

function escolher(lista) {

    const indice =
        Math.floor(
            Math.random() * lista.length
        );


    return lista[indice];

}


// ==========================================
// MOSTRAR MENSAGEM
// ==========================================

function addMessage(texto, tipo) {

    const container =
        document.getElementById(
            "messages"
        );


    if (!container) {
        return;
    }


    const mensagem =
        document.createElement(
            "div"
        );


    mensagem.classList.add(
        "message"
    );


    if (tipo === "user") {

        mensagem.classList.add(
            "user-message"
        );

    }

    else {

        mensagem.classList.add(
            "kev-message"
        );

    }


    mensagem.textContent =
        texto;


    container.appendChild(
        mensagem
    );


    container.scrollTop =
        container.scrollHeight;

}


// ==========================================
// VOLTAR
// ==========================================

function goBack() {

    const home =
        document.getElementById(
            "home"
        );

    const chat =
        document.getElementById(
            "chat"
        );


    if (!home || !chat) {
        return;
    }


    chat.classList.add(
        "hidden"
    );


    home.classList.remove(
        "hidden"
    );


    conversa = [];

    modoAtual = null;

}


// ==========================================
// ENTER PARA ENVIAR
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        const input =
            document.getElementById(
                "messageInput"
            );


        if (!input) {
            return;
        }


        input.addEventListener(
            "keydown",
            function(event) {

                if (
                    event.key === "Enter"
                ) {

                    event.preventDefault();

                    sendMessage();

                }

            }
        );

    }
);


// ==========================================
// CONFIGURAÇÕES
// ==========================================

function openSettings() {

    const settings =
        document.getElementById(
            "settings"
        );


    if (settings) {

        settings.classList.remove(
            "hidden"
        );

    }

}


function closeSettings() {

    const settings =
        document.getElementById(
            "settings"
        );


    if (settings) {

        settings.classList.add(
            "hidden"
        );

    }

}


// ==========================================
// PAPEL DE PAREDE
// ==========================================

function changeWallpaper(tipo) {

    document.body.classList.remove(

        "wallpaper-pink",

        "wallpaper-purple",

        "wallpaper-dark",

        "wallpaper-stars"

    );


    document.body.classList.add(

        "wallpaper-" + tipo

    );


    localStorage.setItem(

        "kevWallpaper",

        tipo

    );


    closeSettings();

}


// ==========================================
// CARREGAR PAPEL DE PAREDE SALVO
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        const wallpaper =
            localStorage.getItem(
                "kevWallpaper"
            );


        if (wallpaper) {

            document.body.classList.add(

                "wallpaper-" +
                wallpaper

            );

        }

    }
);