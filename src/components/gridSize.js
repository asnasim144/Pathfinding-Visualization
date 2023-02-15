export function getGridSize(){
    const gridSize = { row: 15, col: 50, startNode: { row: 7, col: 5}, endNode: { row: 7, col: 44}}
    const windowWidth = window.innerWidth
    const windowHeight = window.innerHeight
    console.log("🚀 ~ file: gridSize.js:4 ~ getGridSize ~ window.windowHeight", window.innerHeight)
    if(windowWidth <= 1920 ){
        gridSize.col = Math.floor((windowWidth-100)/ 25)-3
    }
    if(windowHeight <=700){
        gridSize.row = Math.floor((windowHeight-200)/ 25)-4
    }
    if(windowHeight <= 1100 && windowHeight >700){
        console.log("🚀 ~ file: gridSize.js:13 ~ getGridSize ~ windowHeight", windowHeight)
        gridSize.row = Math.floor((windowHeight-200)/ 25) -7
    }
    if(gridSize.startNode.col > 20){
        gridSize.startNode.col = 5
        gridSize.endNode.col = gridSize.col-5
    }else{
        gridSize.startNode.col = 3
        gridSize.endNode.col = gridSize.col-3
    }
    // if(gridSize.startNode.row > 14){
        gridSize.startNode.row = Math.floor(gridSize.row/2)-1
        gridSize.endNode.row = Math.floor(gridSize.row/2)-1
    //     gridSize.endNode.row = 7
    // }else{
    //     gridSize.startNode.row = 3
    //     gridSize.endNode.row = 3
    // } 

    console.log(gridSize.col,'gridSize')
    console.log(gridSize.row,'row')
    return gridSize
}