# Osaka — fundo 2.5D de Aurality

source.png é a arte original fornecida pelo usuário. clean-plate.png remove os helicópteros e a fumaça para preencher áreas ocultas. far-fill.png reconstrói a cidade escondida atrás dos edifícios próximos.

A composição usa os pixels originais nos helicópteros e na fumaça. As máscaras e movimentos estão no bloco auralityOsakaScript do index.html. Os preenchimentos ficam sob as camadas recortadas.

Camadas: céu, prédios distantes, médios, próximos, fumaça e três helicópteros independentes. Movimento reduzido respeitado. Fundo limitado ao menu e aos painéis de Aurality.

## Ambiente sonoro

halo-boardwalk.mp3 mantém os 10min01s do arquivo fornecido, compactado em estéreo a 128 kb/s. patrolled-city-6min.mp3 usa 00:30–06:30 do arquivo de cidade fornecido, também a 128 kb/s (aproximadamente 5,8 MB). Ambos têm loudness equilibrado e fades curtos nas pontas, e tocam em loops independentes, apenas no menu/painéis. Volume geral e silenciamento são respeitados.

Câmera lateral: ciclo suave de 30 segundos. O céu e os prédios distantes têm deslocamento reduzido; os médios e próximos se movem progressivamente mais. O helicóptero principal tem voo independente de até 60 pixels da arte para cada lado, em velocidade superior à cidade.
