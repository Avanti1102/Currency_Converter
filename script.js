let Base_URL = "https://v6.exchangerate-api.com/v6/f45d505ae268de40090bb5f2/pair";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button"); //button in form 
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for(let select of dropdowns){
    for (currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name = "from" && currCode === "USD"){
            currCode = "USD";
        }
        else if(select.name = "to" && currCode === "INR"){
            currCode = "INR";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) =>{
        updateFlag(evt.target);
    });
}

const updateFlag = (element) =>{
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src = newSrc;
};

btn.addEventListener("click", async(evt) =>{
   evt.preventDefault();
   let amount = document.querySelector(".amount input");
   let amtVal = amount.value;
   if(amtVal === "" || amtVal< 1){
      amtVal = 1;
      amtVal.value ="1";
   }
   
   const URL = `${Base_URL}/${fromCurr.value}/${toCurr.value}`;
   let response = await fetch(URL);
   let data = await response.json();
   let rate = data["conversion_rate"];

   let finalAmount = amtVal * rate;
   msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
   
});
