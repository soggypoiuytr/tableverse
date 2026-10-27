# Tableverse

Plataforma de RPG em desenvolvimento para Aurality: Segunda Rocha, Clockworks, Árvore: Reiche der Welt e Reino das Bruxas.

## Prévia online

O site está em docs/, publicado por GitHub Pages. Inclui menu, áudio, animações, intros e salas provisórias.

Contas que já concluíram o vínculo com Discord e criaram e-mail/senha entram diretamente pelo Firebase. O primeiro vínculo Discord depende do serviço privado: GitHub Pages não executa o servidor. A configuração atual desse serviço é local. Para cadastro remoto, será necessário um endereço público seguro e configurar o retorno OAuth correspondente.

A presença de jogadores usa Firebase Realtime Database entre dispositivos, com remoção de sessões desconectadas e deduplicação por conta em cada universo. As regras em database.rules.json exigem autenticação e limitam a escrita às sessões da própria conta.

## Servidor de cadastro

Código em server/. Configure as variáveis de server/.env.example somente no ambiente privado. Nunca publique credenciais Firebase Admin, client secret Discord ou arquivos .env. Nenhuma credencial privada acompanha este repositório.

## Conteúdo

Imagens, fontes e áudios utilizados no protótipo foram fornecidos para este projeto; a disponibilização do código não concede licença de uso sobre conteúdo de terceiros.

## Cadastro remoto em teste

O frontend agora usa uma conexão HTTPS temporária do Cloudflare Tunnel para alcançar o serviço privado no computador do responsável. O retorno Discord aponta para essa conexão e volta a https://soggypoiuytr.github.io/tableverse/. O serviço permite somente as origens do GitHub Pages e da prévia local.

A conexão temporária só existe enquanto cloudflared e o servidor estiverem rodando; o endereço muda se o túnel for recriado. Para uso contínuo, configurar endereço fixo antes de reiniciar a conexão. O login por e-mail/senha permanece independente dessa conexão.

O controle de volume geral fica ao lado do botão de som e afeta músicas e efeitos; a preferência é salva no navegador. Santa Helena fica oculta durante a aproximação e a entrada em outro universo.

Jogadores no menu orbitam o olho; ao entrar em uma mesa, os avatares fazem uma transição até a órbita daquele universo. A presença no menu também é compartilhada pelo Firebase.

## Salas de RPG e menu Aurality

As salas iniciam em espera e o mestre pode exibir ou recolher o mapa compartilhado. Fichas básicas e informações do universo usam Firebase com permissões por conta e mestre. O menu do Aurality inclui cenário em camadas, helicópteros com luz independente, ambientes e música balanceados, e lista de presença com destaque para o mestre. Ferramentas locais de simulação não acompanham o site publicado.

## Sistema Neural do Aurality

A consulta de ficha abre um menu local em tela inteira, com fundo neural em três camadas, símbolo original, textos digitados e montagem rápida com leves glitches junto ao BIOS. O ambiente da ficha usa um trecho de seis minutos. A presença continua visível com efeitos de entrada e saída. Ao voltar à sala, o menu lateral repete sua animação e som. O mestre escolhe o mapa em painel próprio; a transição compartilhada usa carregamento com variações sonoras.

## Teste compartilhado de gameplay

O mapa do Aurality inclui tokens vinculados aos três jogadores de teste, movimento sincronizado com resposta local imediata, barras de vida ligadas à ficha salva do Sistema Neural e acesso direto à ficha pelo mapa. O mestre move todos os tokens; cada jogador move seu próprio personagem.

O grid é compartilhado e controlado pelo mestre. Quando ligado, alinha os tokens às casas; Alt permite movimento livre. Cursores dos outros jogadores mostram foto e moldura d20 na cor escolhida, com atualizações limitadas a cinco por segundo, limpeza ao desconectar e expiração visual por inatividade.

Nesta fase de testes, as três contas vinculadas estão no nível 5, com orçamento total de 15 pontos. Novas fichas também iniciam no nível 5 temporariamente. A publicação não inclui os controles de debug da prévia local. Chat, iniciativa e comandos de rolagem digitados permanecem ferramentas de conceito. As rolagens pelos botões de dados físicos são compartilhadas entre jogadores.

## Controles dos tokens e dados físicos

O botão direito abre um painel junto ao token. Jogadores podem espelhar seu próprio token; somente o mestre altera manualmente vida e concentração atuais. As duas barras refletem os máximos da ficha neural, permitem overheal sinalizado com + e preservam o excedente ao atualizar os atributos. Segurar o clique por um segundo, sem arrastar, publica um ping compartilhado.

Os botões de dados lançam de 1 a 6 sólidos físicos simultâneos (d4, d6, d8, d10, d12 e d20), com colisões e resultados lidos após a simulação. A rolagem compartilha o estado inicial e os resultados individuais; dados dos jogadores saem dos seus tokens, enquanto o mestre escolhe o ponto de lançamento na região visível do mapa. A força e a direção são definidas com o mouse. A cor acompanha a moldura do jogador. O 20 brilha em amarelo; o 1 usa vermelho e a fonte de Segunda Rocha. Ambos têm efeitos e sons próprios. Há um único som no primeiro impacto com a mesa por lançamento.

Renderização: Three.js 0.158.0. Física: cannon-es 0.20.0. Bibliotecas embarcadas na página para evitar dependência de CDN em execução; licenças e amostras de áudio em docs/assets/dice-physics/.

## Mapas, inventário e iluminação

O mestre pode alternar entre Beco urbano e Complexo abandonado com carregamento compartilhado. Dimensões do mapa, tamanho da grade e tamanho dos tokens são ajustáveis. Dados aceitam um atributo da ficha salva: o bônus aparece após a rolagem, com contagem animada e som sincronizado. As rolagens de diferentes jogadores podem acontecer ao mesmo tempo.

Cada personagem possui um inventário com peças organizáveis na grade e cinco slots de equipamento. Katana e Glock podem ser equipadas, movidas e giradas no token; a Glock possui três pentes de 17 balas. A lanterna usa o mesmo painel para equipar e guardar; quando equipada, clicar nela no token liga ou desliga a luz. Seu feixe acompanha a posição, rotação e espelhamento do personagem, com a revelação baseada na transparência da arte do feixe e bloqueada pelas paredes. Sons do mapa usam posicionamento espacial.

O mestre controla iluminação dinâmica, luzes estáticas e paredes retangulares ou segmentos por mapa. O painel permite ajustar alcance, brilho, cor, opacidade final, suavidade e escuridão. Jogadores controlam somente os próprios equipamentos; o mestre pode controlar todos. A versão publicada exclui ferramentas de debug e credenciais privadas.
