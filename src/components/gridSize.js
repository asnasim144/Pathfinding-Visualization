export function getGridSize(){
    const gridSize = { row: 15, col: 50, startNode: { row: 7, col: 5}, endNode: { row: 7, col: 44}}
    const windowWidth = window.innerWidth
    const windowHeight = window.innerHeight
    // console.log("🚀 ~ file: gridSize.js:4 ~ getGridSize ~ window.windowHeight", window.innerHeight)
    if(windowWidth <= 1920 && windowWidth >= 1600){
        gridSize.col = Math.floor((windowWidth-100)/ 25)-3
    }
    if(windowWidth <= 1600 && windowWidth >= 1000){
        gridSize.col = Math.floor((windowWidth-100)/ 25)-1
    }
    if(windowWidth <= 1000 && windowWidth >= 600){
        gridSize.col = Math.floor((windowWidth-75)/ 25)
    }
    if(windowWidth < 600){
        gridSize.col = Math.floor((windowWidth-50)/ 25)
    }
    if(windowWidth < 350){
        gridSize.col = Math.floor((windowWidth-20)/ 25)
    }
    if(windowHeight <=700){
        gridSize.row = Math.floor((windowHeight-200)/ 25)-4
    }
    if(windowHeight <= 1100 && windowHeight >700){
        // console.log("🚀 ~ file: gridSize.js:13 ~ getGridSize ~ windowHeight", windowHeight)
        gridSize.row = Math.floor((windowHeight-200)/ 25) -7
    }
    if(gridSize.col > 20 && gridSize.col < 40){
        gridSize.startNode.col = 7
        gridSize.endNode.col = gridSize.col-8
    }else if(gridSize.col >= 40){
        gridSize.startNode.col = 12
        gridSize.endNode.col = gridSize.col-13
    }else{
        gridSize.startNode.col = 1
        gridSize.endNode.col = gridSize.col-2
    }
    // if(gridSize.startNode.row > 14){
        gridSize.startNode.row = Math.floor(gridSize.row/2)-1
        gridSize.endNode.row = Math.floor(gridSize.row/2)-1
    //     gridSize.endNode.row = 7
    // }else{
    //     gridSize.startNode.row = 3
    //     gridSize.endNode.row = 3
    // } 

    // console.log(gridSize.col,'gridSize')
    // console.log(gridSize.row,'row')
    return gridSize
}