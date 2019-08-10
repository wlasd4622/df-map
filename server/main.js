let axios = require('axios');
let list = [];
let fs = require('fs')
async function main() {
    await getList();
    console.log(list);
    fs.writeFileSync('./web/src/assets/js/list.js', `module.exports = ${JSON.stringify(list)}`);
}

function sleep(ms = 300) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, ms);
    })
}


async function getList(pageIndex = 1) {
    console.log(pageIndex);
    let listUrl = `https://open.mishifeng.com/open/activity/list?category_id=0&lat=40.01234890407986&lng=116.5002937825521&page_limit=20&page_num=${pageIndex}`;
    console.log(listUrl);
    let result = await axios.get(listUrl);

    if (result.status === 200 && result.data.errmsg === 'success') {
        if (result.data.data.list && result.data.data.list.length === 0) {
            return false;
        }
        list = list.concat(result.data.data.list);
    } else {
        console.log(res.data.errmsg);
    }
    await sleep(1000)
    await getList(++pageIndex);
}
main();