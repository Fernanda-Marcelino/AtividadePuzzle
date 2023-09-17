// Faz a ligação do elemento canvas e da o seu o contexto para desenhar o quebra cabeça
const canvas = document.getElementById('puzzle');
        const ctx = canvas.getContext('2d');

        // Tamanho do quebra cabeça
        const puzzleT = 3; 
        const peçaT = canvas.width / puzzleT;
        
        //Adiciona a imagem do quebra cabeça
        const puzzleImage = new Image();
        puzzleImage.src = 'img/cat.jpg'; 

        const puzzle = [];
        // Posição inicial da peça em branco
        let peçaVazia = { row: puzzleT - 1, col: puzzleT - 1 };

        // Manipula a imagem
        puzzleImage.onload = () => {
            inicializaPuzzle();
            drawPuzzle();
        };

        // Interação do mouse com o jogador
        canvas.addEventListener('mouse', handleMouseDown);

        // Inicia o quebra cabeça
        function inicializaPuzzle() {
            for (let linha = 0; linha < puzzleT; linha++) {
                puzzle[linha] = [];
                for (let col = 0; col < puzzleT; col++) {
                    if (linha !== peçaVazia.row || col !== peçaVazia.col) {
                        puzzle[linha][col] = { row: linha, col };
                    }
                }
            }
            embaralharPuzzle();
        }

        // Embaralha as peças vizinhas do quebra cabeça aleatoriamente
        function embaralharPuzzle() {
            for (let i = 0; i < 1000; i++) {
                const vizinhas = getVizinha(peçaVazia.row, peçaVazia.col);
                const vizinhoRandom = vizinhas[Math.floor(Math.random() * vizinhas.length)];
                trocarPeças(peçaVazia, vizinhoRandom);
                peçaVazia = vizinhoRandom;
            }
        }

        // Desenha o quebra cabeça 
        function drawPuzzle() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let linha = 0; linha < puzzleT; linha++) {
                for (let col = 0; col < puzzleT; col++) {
                    const tile = puzzle[linha][col];
                    if (tile) {
                        ctx.drawImage(
                            puzzleImage,
                            tile.col * peçaT,
                            tile.row * peçaT,
                            peçaT,
                            peçaT,
                            col * peçaT,
                            linha * peçaT,
                            peçaT,
                            peçaT
                        );
                    }
                }
            }
        }

        // Relaciona o clique do jogador com o jogo
        function handleMouseDown(event) {
            const mouseX = event.clientX - canvas.getBoundingClientRect().left;
            const mouseY = event.clientY - canvas.getBoundingClientRect().top;
            const clickedRow = Math.floor(mouseY / peçaT);
            const clickedCol = Math.floor(mouseX / peçaT);

            if (isAdjacent(clickedRow, clickedCol, peçaVazia.row, peçaVazia.col)) {
                trocarPeças(peçaVazia, { row: clickedRow, col: clickedCol });
                peçaVazia = { row: clickedRow, col: clickedCol };
                drawPuzzle();
            }
        }

        // Verifica se as peças estão correntes 
        function isAdjacent(row1, col1, row2, col2) {
            return (
                Math.abs(row1 - row2) + Math.abs(col1 - col2) === 1
            );
        }
        
        //Posição das peças vizinhas
        function getVizinha(row, col) {
            const neighbors = [];
            if (row > 0) neighbors.push({ row: row - 1, col });
            if (row < puzzleT - 1) neighbors.push({ row: row + 1, col });
            if (col > 0) neighbors.push({ row, col: col - 1 });
            if (col < puzzleT - 1) neighbors.push({ row, col: col + 1 });
            return neighbors;
        }

        // Troca duas peças no quebra cabeça
        function trocarPeças(tile1, tile2) {
            const temp = puzzle[tile1.row][tile1.col];
            puzzle[tile1.row][tile1.col] = puzzle[tile2.row][tile2.col];
            puzzle[tile2.row][tile2.col] = temp;
        }
        
        // Botão que embaralha as peças novamente
        const btnrecomeçar = document.getElementById("btnRestart");
        btnrecomeçar.addEventListener('click',() => {
                    inicializaPuzzle();
                    embaralharPuzzle();
                    drawPuzzle();
        });

        
        