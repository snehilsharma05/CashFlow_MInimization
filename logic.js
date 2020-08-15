onload = function () {
    
    const genGraph = document.getElementById("gen-new");
    const container = document.getElementById("location");
    const container2 = document.getElementById("location2");
    const solve = document.getElementById("solve");
    const s = document.getElementById("s");
    const colu = document.getElementById("colu");
     
        const options = {
            edges: {
                arrows: {
                    to: true
                },
                labelHighlightBold: true,
                font: {
                    size: 20
                }
            },
            nodes: {
                font: '12px arial red',
                scaling: {
                    label: true
                },
                shape: 'icon',
                icon: {
                    face: 'FontAwesome',
                    code: '\uf183',
                    size: 50,
                    color: '#991133',
                }
            }
        };
    let currData;
    const network = new vis.Network(container);
    const network2 = new vis.Network(container2);
    
    network.setOptions(options);
    network2.setOptions(options);
    function createData()
    {
        
        const friends= ['Snehil','Mohit','Satvik','Dhruv','Sahil','Anmol','kartik','Keshav','Arun','Mridula'];
        let sz = Math.floor(Math.random()*friends.length)+2;
        let vertices= [];
        for(let i=1;i<=sz;i++)
            vertices.push({id:i,label:friends[i-1]});
        let edges = [];
        for(let i=1;i<=sz;i++)
            for(let j=i+1;j<=sz;j++)
            {
                if(Math.random()>0.5)
                    edges.push({from:i,to:j,label:String(Math.floor(Math.random()*100)+1)});
                else edges.push({from:j,to:i,label:String(Math.floor(Math.random()*100)+1)});
            }
        const data = {
          nodes:vertices,
          edges:edges
        };
        return data;
    }
    genGraph.onclick = function()
    {
        s.style.display="inline";
        container2.style.display="none";
        const data = createData();
        network.setData(data);
        currData  = data;
           
    }
    solve.onclick= function()
    {
        
        
         s.style.display="none";
         container2.style.display="inline";
        const data = solveData();
        network2.setData(data);
    }
    function solveData()
    {
        
        let data = currData;
        let sz = data['nodes'].length;
        let vals = Array(sz).fill(0);
        for(let i=0;i<data['edges'].length;i++){
            let currEdge = data['edges'][i];
            vals[currEdge['to']-1] += parseInt(currEdge['label']);
            vals[currEdge['from']-1] -= parseInt(currEdge['label']);
        }
        
        const positiveHeap = new BinHeap();
        const negativeHeap = new BinHeap();
        for(let i=0;i<sz;i++)
            {
                if(vals[i]>0)
                    positiveHeap.insert([vals[i],i]);
                else{
                    negativeHeap.insert([-vals[i],i]);
                    vals[i] *= -1;
                }
            }
        
        let newEdges = [];
        while(positiveHeap.isEmpty()==false && negativeHeap.isEmpty()==false )
            {
                let mx = positiveHeap.maxElement();
                let mn = negativeHeap.maxElement();
                
                let to = mx[1];
                let from = mn[1];
                let amt = Math.min(mx[0],mn[0]);
                newEdges.push({from: from+1,to: to+1,label:String(Math.abs(amt))});
                vals[to] -= amt;
                vals[from] -=amt;
                
                if(mx[0]>mn[0])
                    positiveHeap.insert([vals[to],to]);
                else if(mn[0]>mx[0])
                    negativeHeap.insert([vals[from],from]);
                
            }
        
        
        
        let newData ={
          nodes:currData['nodes'],
            edges:newEdges
        };
        console.log(newData);
        return newData;
    }
    
    genGraph.click();
};



