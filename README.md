# Tableverse

Plataforma de RPG para o grupo, com interface e regras próprias de Aurality: Segunda Rocha.

[Site online](https://soggypoiuytr.github.io/tableverse/)

## Versão de 29/10/2026

- Interface da mesa com ícones individuais, chat compartilhado e sons de mensagens.
- Dados físicos 3D, incluindo d100 com dois d10, múltiplos lançamentos, atributos e câmera de acompanhamento.
- Mapas com painel horizontal de prévias, ajustes individuais, grade, iluminação e revelação/ocultação de áreas.
- Tokens vinculados às fichas, barras de vida e concentração, controle de NPCs e peças do Acervo restritas ao mapa de origem.
- Inventário, equipamentos, consumíveis, descarte, coleta e sons posicionais.
- Criação de NPCs com inventário vazio por padrão, escolha visual de itens e quantidades iniciais.
- Acervo com pastas, exclusão confirmada e restauração.

A publicação não inclui controles de debug. A prévia local mantém os testes.

## Hospedagem e serviços

GitHub Pages serve a pasta docs/ da branch main. Firebase fornece autenticação e sincronização; database.rules.json registra as regras aplicadas ao projeto. O servidor privado de primeiro cadastro Discord fica em server/ e depende de configuração e disponibilidade próprias; nenhum túnel é iniciado pela publicação do site. Contas já cadastradas usam o acesso Firebase.

Credenciais, chaves privadas, arquivos .env e dependências do servidor não acompanham a publicação. Configure o servidor usando server/.env.example em ambiente privado.

Imagens, áudios e fontes de terceiros mantêm seus respectivos direitos. O código não concede licença adicional sobre esses materiais.

### Correções de coleta e visibilidade

Validações de referências opcionais corrigidas para a coleta de pentes e o uso de amplificadores por jogadores. Coleta tolera cache local inicialmente vazio. Máscara de revelação usa limites explícitos do mapa ao alterar zoom. Testes com dois clientes temporários autenticados verificaram uso, coleta, descarte, atualização compartilhada, isolamento de inventários e disputa por um mesmo item; os dados temporários foram removidos.
