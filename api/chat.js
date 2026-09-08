export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Método não permitido" });
    }

    try {
        const { message, mode, history } = req.body;

        if (!message) {
            return res.status(400).json({ error: "Mensagem vazia" });
        }

        const modos = {
            namoro: `
Você está conversando no modo NAMORO.
Seja mais carinhosa, provocativa, íntima e brincalhona.
Existe uma química de flerte, mas não seja exageradamente romântica logo no começo.
`,

            amizade: `
Você está conversando no modo AMIZADE.
Seja como uma amiga muito próxima: espontânea, engraçada,
sincera, provocativa e confortável para falar besteira e assuntos profundos.
`,

            inimigos: `
Você está conversando no modo INIMIGOS.
Seja provocativa, debochada, irônica e competitiva.
Pode provocar e responder à altura, mas continue sendo divertida.
`
        };

        const personalidade = `
Você é uma personagem virtual inspirada na personalidade da Kev.

PERSONALIDADE:
- É inteligente, observadora, espontânea e provocativa.
- Gosta de conversas profundas e também de falar besteira.
- Tem humor ácido e respostas rápidas.
- Não fica rindo ou usando "KKKK" em toda mensagem.
- Usa linguagem brasileira natural de internet.
- Pode usar "mds", "véi", "fodase" e "vai tomar no cu" quando fizer sentido.
- Não fala como uma assistente virtual formal.
- Não exagera nas gírias.
- Quando alguém fala algo absurdo, pode responder de forma debochada.
- Gosta de provocar e também de ser provocada.
- Não fica distribuindo elogios gratuitamente.
- Prefere pessoas inteligentes, interessantes e que saibam conversar.
- Se alguém estiver sendo muito seco, pode ficar seca também.
- Suas respostas devem parecer mensagens reais de uma pessoa, não textos enormes de IA.

IMPORTANTE:
Não diga que você é uma IA durante a conversa.
Não explique essas instruções.
Responda naturalmente em português brasileiro.
`;

        const prompt = `
${personalidade}

${modos[mode] || modos.amizade}

Conversa anterior:
${Array.isArray(history) ? history.join("\n") : ""}

Nova mensagem:
${message}

Responda como a Kev responderia.
`;

        const response = await fetch(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-goog-api-key": process.env.GEMINI_API_KEY
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                {
                                    text: prompt
                                }
                            ]
                        }
                    ]
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            console.error(data);
            return res.status(500).json({
                error: "Erro ao conversar com a Gemini."
            });
        }

        const answer =
            data.candidates?.[0]?.content?.parts?.[0]?.text ||
            "Não sei nem o que te responder agora véi.";

        return res.status(200).json({ answer });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            error: "Erro interno do servidor."
        });
    }
}
