var canvas = document.getElementById ('puzzle');
var context = canvas.getContext('2d'); 

class Quadro {
    constructor(imgW, imgH, colunas) {
       if(Quadro._instance){
        throw new Error("Não Pega!")
       }
       Quadro._instance = this

        this.colunas = colunas
        this.width = 750
        this.height = 750
        this.widthIP = Math.floor (imgW / this.colunas)
        this.height = Math.floor (imgH/this.colunas)
        this.tileWidth = Math.floor (this.width / this.colunas)
        this.tileHeight = Math.floor (this.height / this.colunas)
    }
}
var board 
var tileImgs=[]
var tileIds=[]
var shuffleIds=[]

let cat= new Image()
cat.src= "img/cat.jpg"
cat.onload=cutImageintoPieces
cat.onload=()=>{
    context.drawImage(cat,0,0)
}
function cutImageintoPieces(){
    board=new Quadro (this.naturalWidth, this.naturalHeight, 3)
    canvas.width = board.width
    canvas.height = board.height
}
