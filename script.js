let converter=document.querySelector("form button");
let amtin=document.querySelector(".amount input");
let from=document.querySelector(".from select");
let to=document.querySelector(".to select");
let msg=document.querySelector(".msg");

converter.addEventListener("click" , async(e)=>{
    e.preventDefault();
    let amount=amtin.value;
    let fromCurr=from.value;
    let toCurr=to.value;
    let URL =`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromCurr.toLowerCase()}.json`;
    let response=await fetch(URL);
    let obj=await response.json();
    let val= obj[fromCurr.toLowerCase()];
    let rate=val[toCurr.toLowerCase()]; 
    let newAmt=rate*amount;
    msg.innerText=`${amount} ${fromCurr} = ${newAmt} ${toCurr}`; 
});

let dropdowns=document.querySelectorAll("select");
for(let sel of dropdowns){
    for(let currCode in countryList){
        let opt=document.createElement("option");
        opt.value=currCode;
        opt.innerText=currCode;
        sel.appendChild(opt);
    }
}
function updateFlag(selectElement){
    let countryCode=countryList[selectElement.value];
    let par=selectElement.parentElement;
    let p=par.querySelector("img");
    p.src=`https://flagsapi.com/${countryCode}/flat/64.png`;
}
for(let sel of dropdowns){
    updateFlag(sel);
    sel.addEventListener("change",()=>{
        updateFlag(sel);
    });
}