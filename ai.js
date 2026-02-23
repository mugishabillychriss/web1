async function trainModel(sales){
    if(sales.length===0) return null;

    const xs = tf.tensor1d(sales.map((s,i)=>i));
    const ys = tf.tensor1d(sales.map(s=>s));

    const model = tf.sequential();
    model.add(tf.layers.dense({units:10,inputShape:[1],activation:'relu'}));
    model.add(tf.layers.dense({units:1}));

    model.compile({loss:'meanSquaredError', optimizer:'adam'});
    await model.fit(xs, ys, {epochs:100});
    return model;
}

async function predictNext(productId){
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const p = products.find(x=>x.id===productId);
    if(!p) return;

    const salesData = p.sales.map(s=>s.qty);
    if(salesData.length<3) return alert("Not enough sales data!");

    const model = await trainModel(salesData);
    const next = model.predict(tf.tensor2d([salesData.length],[1,1])).arraySync()[0][0];
    alert(`Predicted demand for next sale: ${Math.round(next)}`);
}
