
export function DFS(grid, startNode, finishNode) { 
    const stack = [];
    const v= []
    const visited = [];
    startNode = grid[startNode.row][startNode.col]
    finishNode = grid[finishNode.row][finishNode.col]
    stack.push(startNode);
    v.push(startNode)
    // visited[startNode] = true;
    // visited[startNode.row][startNode.col]= false
    while (stack.length > 0) {
        const currentNode = stack.pop();
        // console.log("🚀 ~ file: DFS.js:10 ~ BFS ~ currentNode", currentNode)
        if (currentNode === finishNode) {
            v.push(currentNode)
            return v;
        }
        const neighbors =  getUnvisitedNeighbor(currentNode, grid)
        console.log("🚀 ~ file: DFS.js:20 ~ DFS ~ neighbors", neighbors)
        if(neighbors !== undefined){
            let neighbor =  neighbors
            neighbor= grid[neighbor.row][neighbor.col]
            // for (const neighbor of neighbors) {
                if (neighbor.isWall) continue;
                if ( !neighbor.isVisited) {
                    stack.push(neighbor);
                    visited.push(neighbor)
                    v.push(neighbor)
                    neighbor.isVisited = true;
                }
                if(!visited.includes(neighbor))visited.push(neighbor)
                if(neighbor.previousNode === null) neighbor.previousNode= currentNode
        }
        // }
    }
    console.log("🚀 ~ file: DFS.js:9 ~ DFS ~ visited", visited)
    return v;


    // const stack= []
    // // let neighbors = [] 
    // let neighbor = {}
    // const visited = []
    // stack.push(grid[startNode.row][startNode.col])
    // visited.push(grid[startNode.row][startNode.col]) 
    // while(stack.length>0){ 
    //     console.log("🚀 ~ file: DFS.js:10 ~ BFS ~ stack.length", stack.length)
    //     // console.log("🚀 ~ file: DFS.js:10 ~ BFS ~ stack", stack)
    //     let node = stack[stack.length-1]
    //     console.log("🚀 ~ file: DFS.js:13 ~ BFS ~ node", node)
    //     neighbor = getUnvisitedNeighbor(node, grid)
    //     // console.log("🚀 ~ file: DFS.js:14 ~ BFS ~ neighbor", neighbor)
    //     if(neighbor  === undefined || neighbor === ''){
    //         stack.pop()
    //         continue
    //     }
    //     if(neighbor ===  finishNode){
    //         visited.push(finishNode)
    //         return visited
    //     } 
    //     // if(neighbor.isWall) continue
    //     if(!visited.includes(neighbor)) {
    //         visited.push(neighbor)
    //         neighbor.isVisited = true
    //         stack.push(neighbor)
    //     }
    //     if(neighbor.previousNode === null) neighbor.previousNode= node
    //     else  stack.pop()

    // } 
    // return visited


}
function getUnvisitedNeighbor(node, grid){
    const neighbors = []
    const {col, row }= node 
    if(row > 0 ) neighbors.push(grid[row-1][col])
    if(row< grid.length-1) neighbors.push(grid[row+1][col])
    if(col> 0) neighbors.push(grid[row][col-1])
    if(col <grid[0].length) neighbors.push(grid[row][col+1])
    const unvisitedNeighbors =neighbors.filter((neighbors) => {
        return !neighbors.isVisited 
    })
    console.log(neighbors.length)
    console.log("🚀 ~ file: DFS.js:49 ~ getUnvisitedNeighbor ~ neighbors", neighbors)
    // neighbors.filter((neighbor) => !neighbor.isVisited)
    return unvisitedNeighbors.shift()
} 
function getUnvisitedNeighbors(node, grid){
    const neighbors = []
    const {col, row }= node 
    if(row > 0 ) neighbors.push(grid[row-1][col])
    if(row< grid.length-1) neighbors.push(grid[row+1][col])
    if(col> 0) neighbors.push(grid[row][col-1])
    if(col <grid[0].length) neighbors.push(grid[row][col+1])
    return neighbors.filter((neighbors) => !neighbors.isVisited)
}

export function getNodesInShortestPath(finishNode , startNode){ 
    let currentNode = finishNode 
    let nodesInShortestPath= [] 
    while (currentNode !== startNode) {
        nodesInShortestPath.unshift(currentNode);
        if(currentNode!== currentNode.previousNode)
        currentNode = currentNode.previousNode;
    }
    nodesInShortestPath.unshift(currentNode);
    return nodesInShortestPath
}


