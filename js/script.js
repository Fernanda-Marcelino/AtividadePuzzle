// Faz a ligação do elemento canvas e da o seu o contexto para desenhar o quebra cabeça
const canvas = document.getElementById('puzzle');
        const ctx = canvas.getContext('2d');

        // Tamanho do quebra cabeça
        const puzzleSize = 3; 
        const tileSize = canvas.width / puzzleSize;
        
        //Adiciona a imagem do quebra cabeça
        const puzzleImage = new Image();
        puzzleImage.src = 'img/cat.jpg'; 

        const puzzle = [];
        // Posição inicial da peça em branco
        let emptyTile = { row: puzzleSize - 1, col: puzzleSize - 1 };

        // Manipula a imagem
        puzzleImage.onload = () => {
            initializePuzzle();
            drawPuzzle();
        };

        // Interação do mouse com o jogador
        canvas.addEventListener('mousedown', handleMouseDown);

        // Inicia o quebra cabeça
        function initializePuzzle() {
            for (let row = 0; row < puzzleSize; row++) {
                puzzle[row] = [];
                for (let col = 0; col < puzzleSize; col++) {
                    if (row !== emptyTile.row || col !== emptyTile.col) {
                        puzzle[row][col] = { row, col };
                    }
                }
            }
            shufflePuzzle();
        }

        // Embaralha as peças do quebra cabeça aleatoriamente
        function shufflePuzzle() {
            for (let i = 0; i < 1000; i++) {
                const neighbors = getNeighbors(emptyTile.row, emptyTile.col);
                const randomNeighbor = neighbors[Math.floor(Math.random() * neighbors.length)];
                swapTiles(emptyTile, randomNeighbor);
                emptyTile = randomNeighbor;
            }
        }

        // Desenha o quebra cabeça 
        function drawPuzzle() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let row = 0; row < puzzleSize; row++) {
                for (let col = 0; col < puzzleSize; col++) {
                    const tile = puzzle[row][col];
                    if (tile) {
                        ctx.drawImage(
                            puzzleImage,
                            tile.col * tileSize,
                            tile.row * tileSize,
                            tileSize,
                            tileSize,
                            col * tileSize,
                            row * tileSize,
                            tileSize,
                            tileSize
                        );
                    }
                }
            }
        }

        // Relaciona o clique do jogador com o jogo
        function handleMouseDown(event) {
            const mouseX = event.clientX - canvas.getBoundingClientRect().left;
            const mouseY = event.clientY - canvas.getBoundingClientRect().top;
            const clickedRow = Math.floor(mouseY / tileSize);
            const clickedCol = Math.floor(mouseX / tileSize);

            if (isAdjacent(clickedRow, clickedCol, emptyTile.row, emptyTile.col)) {
                swapTiles(emptyTile, { row: clickedRow, col: clickedCol });
                emptyTile = { row: clickedRow, col: clickedCol };
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
        function getNeighbors(row, col) {
            const neighbors = [];
            if (row > 0) neighbors.push({ row: row - 1, col });
            if (row < puzzleSize - 1) neighbors.push({ row: row + 1, col });
            if (col > 0) neighbors.push({ row, col: col - 1 });
            if (col < puzzleSize - 1) neighbors.push({ row, col: col + 1 });
            return neighbors;
        }

        // Troca duas peças no quebra cabeça
        function swapTiles(tile1, tile2) {
            const temp = puzzle[tile1.row][tile1.col];
            puzzle[tile1.row][tile1.col] = puzzle[tile2.row][tile2.col];
            puzzle[tile2.row][tile2.col] = temp;
        }
        
        // Botão que embaralha as peças novamente
        const btnrecomeçar = document.getElementById("btnRestart");
        btnrecomeçar.addEventListener('click',() => {
                    initializePuzzle();
                    shufflePuzzle();
                    drawPuzzle();
        });

        
        