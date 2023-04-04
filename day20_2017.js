// input from excel file

firstStar = (input) => {
    let inter = [].concat(input);
    for (let count = 0; count < 1000; count++) {
        inter.forEach((item) => {
            // update vel
            let pos = item["p"];
            let vel = item["v"];
            let acc = item["a"];
            vel = vel.map((v, i) => v + acc[i]);
            pos = pos.map((p, i) => p + vel[i]);
            item.p = [...pos];
            item.v = [...vel];
        })
    }
    let dist = inter.map(item => item.p.reduce((acc,curr) => acc+Math.abs(curr),0));
    console.log(dist.indexOf(Math.min(...dist)));

}

secondStar = (input) => {
    let inter = [].concat(input);
    let poses = {};
    inter = inter.map(item => ({...item, active: true}))
    for (let count = 0; count < 1000; count++) {
        poses = {};
        inter.forEach((item, index) => {
            let stringp = item['p'].join(',');
            if(poses[stringp]) {
                poses[stringp] = [...poses[stringp], index];
            } else {
                poses[stringp] = [index];
            }
        });
        let collided = Object.values(poses).filter(i => i.length>1).flatMap(i=>i);
        collided.forEach(item => inter[item].active = false);
        inter = inter.filter(item => item.active);
        inter.forEach((item, index, arr) => {
            let pos = item["p"];
            let vel = item["v"];
            let acc = item["a"];
            vel = vel.map((v, i) => v + acc[i]);
            pos = pos.map((p, i) => p + vel[i]);
            item.p = [...pos];
            item.v = [...vel];
            
        });
    }
    console.log(inter);
}