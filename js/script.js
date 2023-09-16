const canvas = document.getElementById('puzzle');
        const ctx = canvas.getContext('2d');

        const puzzleSize = 3; // Tamanho do quebra-cabeça (4x4)
        const tileSize = canvas.width / puzzleSize;
        const puzzleImage = new Image();
        puzzleImage.src = 'img/cat.jpg'; // Substitua com o URL da sua imagem

        const puzzle = [];
        let emptyTile = { row: puzzleSize - 1, col: puzzleSize - 1 };

        puzzleImage.onload = () => {
            initializePuzzle();
            drawPuzzle();
        };

        canvas.addEventListener('mousedown', handleMouseDown);

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

        function shufflePuzzle() {
            for (let i = 0; i < 1000; i++) {
                const neighbors = getNeighbors(emptyTile.row, emptyTile.col);
                const randomNeighbor = neighbors[Math.floor(Math.random() * neighbors.length)];
                swapTiles(emptyTile, randomNeighbor);
                emptyTile = randomNeighbor;
            }
        }

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

        function isAdjacent(row1, col1, row2, col2) {
            return (
                Math.abs(row1 - row2) + Math.abs(col1 - col2) === 1
            );
        }

        function getNeighbors(row, col) {
            const neighbors = [];
            if (row > 0) neighbors.push({ row: row - 1, col });
            if (row < puzzleSize - 1) neighbors.push({ row: row + 1, col });
            if (col > 0) neighbors.push({ row, col: col - 1 });
            if (col < puzzleSize - 1) neighbors.push({ row, col: col + 1 });
            return neighbors;
        }

        function swapTiles(tile1, tile2) {
            const temp = puzzle[tile1.row][tile1.col];
            puzzle[tile1.row][tile1.col] = puzzle[tile2.row][tile2.col];
            puzzle[tile2.row][tile2.col] = temp;
        }