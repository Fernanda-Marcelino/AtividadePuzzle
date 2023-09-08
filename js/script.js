class Quadro {
    constructor(imgL, imgA, colunas){
        this.colunas = colunas
        this.width = 600
        this.height = 600
        this.widthIP = Math.floor(imgL / this.colunas)
        this.heightIP = Math.floor(imgA / this.colunas)
        this.tileWidth = Math.floor(this.width/this.colunas)
        this.tileHeight = Math.floor(this.height/this.colunas)
    }
}

var canvas = document.getElementById ('#canvas2');
const ctx = canvas.getContext ('2d'); 
var Quadro
var tileImgs = []
var tileIndx = []


