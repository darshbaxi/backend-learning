// -------------------callback----------------------
//   setTimeout(()=>{console.log('d')},2000). //? callback







// --------------------PROMISIFIED--------------

// function set(t){
//     return new Promise((darsh,baxi)=>{
//         if(t<0){
//             baxi()
//         }
//         else darsh(t)
//     });
// }
// function yeh(t){
//     console.log("after  sec",t)
// }

// function errorwala(){
//     console.log('error')
// }

// set(-2).then(yeh).catch(errorwala)
// set(2).then(yeh).catch(errorwala)




function settimeoutcustom(t){
    return new Promise((resolve,reject)=>{
        setTimeout(resolve,t);
    });
}

// ------------------callback hell--------------------- //

// settimeoutcustom(1000).then(function () {
//     console.log("hi");

//     settimeoutcustom(3000).then(function () {
//         console.log("hello");

//         settimeoutcustom(5000).then(function () {
//             console.log('hi there');
//         });
//     });
// });


// --------------------promise chaining------------------
// settimeoutcustom(1000)
//   .then(function () {
//     console.log("hi");
//     return settimeoutcustom(3000);
//   })
//   .then(function () {
//     console.log("hello");
//     return settimeoutcustom(5000);
//   })
//   .then(function () {
//     console.log("hi there");
//   })
//   .catch(function (err) {
//     console.log("Error:", err);
//   });

async function solve(){
    await settimeoutcustom(1000);
    console.log("hi");
    await settimeoutcustom(1000);
    console.log("hii");
    await settimeoutcustom(1000);
    console.log("hii");
}

solve()





