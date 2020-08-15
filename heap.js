class BinHeap
{
    constructor()
    {
        this.heap=[];
    }
     size()
    {
        return this.heap.length;
    }
     isEmpty()
    {
        return (this.size()==0);
    }
     insert(data)
    {
        console.log(data);
        this.heap.push(data);
        this.bubbleUp();  //bringing last entered element to its correct position
    }
     bubbleUp()
    {
        let index = this.size() - 1;

        while (index > 0) {
            let element = this.heap[index],
                parentIndex = Math.floor((index - 1) / 2),
                parent = this.heap[parentIndex];

            if (parent[0] >= element[0]) break;
            this.heap[index] = parent;
            this.heap[parentIndex] = element;
            index = parentIndex
        }
    }
    
     maxElement()
    {
        let max = this.heap[0];
        let temp = this.heap.pop();
        if(this.isEmpty()==false)
            {
                this.heap[0] = temp;
                this.heapify(0);
            }
        return max;
    }
     heapify(index)
    {
        let left = 2*index+1;
        let right = 2*index+2;
        const sz = this.size();
        let largest = index;
        if(left<sz && this.heap[left][0]>this.heap[largest][0])
            largest = left;
        if(right<sz && this.heap[right][0]>this.heap[largest][0])
            largest = right;
        if(largest!==index)
            {
                let temp = this.heap[largest];
                this.heap[largest] = this.heap[index];
                this.heap[index] = temp;
                this.heapify(largest);
            }
    }
}
