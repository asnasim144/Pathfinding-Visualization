/*
This component visualizes the DFS algorithm
*/

// Array of visited node in order
export function DFS(grid, startNode, finishNode) { 
    const stack = []; 
    const visited = [];
    startNode = grid[startNode.row][startNode.col]
    finishNode = grid[finishNode.row][finishNode.col]
    stack.push(startNode);
    visited.push(startNode)
    // Untill the stack is empty
    while (stack.length > 0) {
        const currentNode = stack.pop(); 
        if (currentNode === finishNode) {
            visited.push(currentNode)
            return visited;
        } 

        // Get a neighbor of the current node
        const neighbors =  getUnvisitedNeighbor(currentNode, grid) 

        // Push it to the visited array if it's available
        if(neighbors){
            let neighbor = grid[neighbors.row][neighbors.col]
            if(visited.includes(neighbor)) continue 
            if (neighbor.isWall) continue;
            if ( !neighbor.isVisited) {
                stack.push(neighbor);
                visited.push(neighbor)
                visited.push(neighbor)
                neighbor.isVisited = true;
            }
            if(!visited.includes(neighbor))visited.push(neighbor)
            if(neighbor.previousNode === null) neighbor.previousNode= currentNode
        }
    }
    return visited;

}

// Find a neighbors of current node
function getUnvisitedNeighbor(node, grid){
    const neighbors = []
    const {col, row }= node 
    if(row > 0 ) neighbors.push(grid[row-1][col])
    if(col> 0) neighbors.push(grid[row][col-1])
    if(col <grid[0].length) neighbors.push(grid[row][col+1])
    if(row< grid.length-1) neighbors.push(grid[row+1][col])
    let unvisitedNeighbors =neighbors.filter((neighbors) => {
        return neighbors !== undefined 
    })
    unvisitedNeighbors = unvisitedNeighbors.filter((neighbors) => !neighbors.isWall)
    unvisitedNeighbors = unvisitedNeighbors.filter((neighbors) => !neighbors.isStart)
    unvisitedNeighbors = unvisitedNeighbors.filter((neighbors) => {
        return !neighbors.isVisited 
    })
    const finishNode = unvisitedNeighbors.filter(node => node.isFinish )
    if(finishNode.length>0){
        unvisitedNeighbors = unvisitedNeighbors.filter((neighbors) => neighbors.isFinish === true)
    }
    return unvisitedNeighbors.pop()
} 

// Backtracks from the finishNode to find the shortest path. 
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


