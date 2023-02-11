
export function BFS(grid, startNode, finishNode) { 
    const queue= []
    let neighbors = [] 
    const visited = []
    queue.push(grid[startNode.row][startNode.col]) 
    visited.push(grid[startNode.row][startNode.col])
    while(queue.length>0){ 
        // console.log(queue.length)
        let node= queue[0]
        queue.shift() 
        neighbors = getUnvisitedNeighbors(node, grid) 
        for(let neighbor of neighbors){ 
            if(!visited.includes(neighbor))visited.push(neighbor)
            neighbor.isVisited = true;
            if (neighbor.isWall) continue;

            if(neighbor.previousNode ===null)neighbor.previousNode = node 
            queue.push(neighbor) 
            if(neighbor === grid[finishNode.row][finishNode.col]){
                return visited
            }
        }
    } 
    return visited


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


