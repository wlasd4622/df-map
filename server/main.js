let axios = require('axios');
let list = [];
let fs = require('fs')
let ak = `WSf2NwqAoLrzbQiU3ZFzxtVWn1OQxQiH`;
async function main() {
    console.log(`>>>main`);
    await getList();
    console.log(list);
    for (let i = 0; i < list.length; i++) {
        try {
            let location = await getDetail(list[i].activity_id);
            list[i].location = location;
        } catch (err) {
            console.log(err);
        }
    }
    fs.writeFileSync('./web/src/assets/js/list.js', `module.exports = ${JSON.stringify(list)}`);
    console.log(`END`);
}

function sleep(ms = 300) {
    console.log(`>>>sleep`);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, ms);
    })
}

async function getDetail(activityId) {
    console.log(`>>>getDetail`);
    let url = `https://open.mishifeng.com/open/activity/detail?activity_id=${activityId}`
    console.log(url);
    return new Promise((resolve, reject) => {
        axios.get(url).then(res => {
            if (res.status === 200 && res.data.errmsg === 'success') {
                resolve({
                    lat: res.data.data.branch.lat,
                    lng: res.data.data.branch.lng,
                    address: res.data.data.branch.address,
                })
            } else {
                reject();
            }
        }).catch(err => {
            reject(err)
        })
    })
}
async function getList(pageIndex = 1) {
    console.log(`>>>getList`);
    console.log(pageIndex);
    let zone = {
        '北京': 10,
        '南京': 3201
    }
    let listUrl = `https://open.mishifeng.com/open/activity/list?category_id=0&lat=40.01234890407986&lng=116.5002937825521&page_limit=20&page_num=${pageIndex}&zone_id=${zone['南京']}`;
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

async function search(query, region = "北京") {
    console.log(`>>>search`);
    let url = `http://api.map.baidu.com/place/v2/search?query=${encodeURIComponent(query)}&region=${encodeURIComponent(region)}&output=json&ak=${ak}`;
    console.log(url);
    return new Promise((resolve, reject) => {
        axios.get(url).then(res => {
            console.log(res);
            if (res.status === 200 && res.data.status == 0 && res.data.results && res.data.results.length) {
                let list = res.data.results;
                resolve(list[0].location)
            } else {
                console.log('fail');
                reject();
            }
        }).catch(err => {
            console.log(err);
            reject()
        })
    })

}
main();