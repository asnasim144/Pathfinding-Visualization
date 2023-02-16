// 

export default function Elements({ name, item }) {
    return (
        <li>
            <div>
                {/* <img src={item} alt="" />  */}
                <ItemIconHandling />
            </div>
            <div>
                {name}
            </div>
        </li>
    );
    function ItemIconHandling() {
        if(name=== "Visited Node"){
            return (
                <div className="visited">
                </div>
            )
        }
        if(name=== "Unvisited Node"){
            return (
                <div className="unvisited">
                </div>
            )
        }
        if(name=== "Wall"){
            return (
                <div className="wall">
                </div>
            )
        }
        else{
            return (
                <img src={item} alt="" />  
            )
        }
        
    }
}
