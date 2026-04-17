function node(param,value){
    if(value!==undefined){
        node[param]=value
        return node
    }
    return node[param]
}

async function get(url,type="text"){
    const promise = await fetch(url)
    const text = await promise[type]()
    return text
}

async function post(url,data,type="text"){
    const promise = await fetch(url,{
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(data)
        })
    const text = await promise[type]()
    return text
}