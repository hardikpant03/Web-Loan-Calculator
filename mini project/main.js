const amountinput = document.querySelector(".Loan-amount")
const interestinput = document.querySelector(".interest-rate")
const timeinput = document.querySelector(".Loan_time")

const loanEMI = document.querySelector(".loan-EMI .value")
const TotalInterest = document.querySelector(".Total-Interest .value") 
const  Totalamount = document.querySelector(".Total-Amount .value")

const calculatebutton = document.querySelector(".calculate-btn")
// let interest_rate = document.querySelector(".interest1 .value")

let amount = parseFloat(amountinput.value)
let interestrate = parseFloat(interestinput.value)
let time = parseFloat(timeinput.value)
let interest
interest = interestrate / 12 / 100
let interest2
let banksel = document.getElementById("bank-select")


interest = interest2 / 12 / 100
// console.log(interest);
 
function yesnoCheck(that) {
    if (that.value == "custom") {
        document.getElementById("ifYes").style.display = "block";
    } else {
        document.getElementById("ifYes").style.display = "none";
    }
}
// let interest = interestrate
// console.log(interest);
let myChart;

const displayChart = (totalinterestpaymable) => {
    const ctx = document.getElementById("myChart").getContext("2d");
    myChart = new Chart(ctx, {
      type: "pie",
      data: {
        labels: ["Total Interest", "Principal Loan Amount"],
        datasets: [
          {
            data: [totalinterestpaymable, amount],
            backgroundColor: ["#e63946", "#14213d"],
            borderWidth: 0,
          },
        ],
      },
    });
  };
const updatechart =(totalinterestpaymable) =>{
 myChart.data.datasets[0].data[0] =totalinterestpaymable ;
 myChart.data.datasets[0].data[1] = amount ;
 myChart.update();
};
const calculateEMI = ()=>{
    let emi = amount * interest * (Math.pow(1+interest,time)) / (Math.pow(1+interest,time)-1)
    return emi
};
const updatedata = (emi)=>{
    loanEMI.innerHTML = Math.round(emi)
    let totalamount1 = Math.round(time * emi)
    Totalamount.innerHTML = totalamount1

    let interestpaymable = Math.round(totalamount1 - amount)
    TotalInterest.innerHTML =interestpaymable;
   if(myChart){
    updatechart(interestpaymable)
   }else{
    displayChart(interestpaymable);
}
};
const updatevalue =()=>{
    amount = parseFloat(amountinput.value)
    interestrate = parseFloat(interestinput.value)
    time = parseFloat(timeinput.value)
   
    interest = interestrate / 12 / 100
   }
const init  = () =>{
    updatevalue()
    banksel.addEventListener('change', function bankselect(){
      console.log(this.value)
      switch(this.value){
      case "Sbi":
        interest2= 8.73;
        break;
      case "bob":
        interest2 = 9.69;
        break;
      case "hdfc":
        interest2 = 11;
        break;
      case "icic":
        interest2 = 10
        break;
      case "axis":
        interest2 = 13
        break;
      case "kotak":
        interest2 = 12
        break;
      case "indus":
        interest2 = 11.5
        break;
      case "yes":
        interest2 = 10.5
        break;
      case "punjab":
        interest2 = 10
        break;
      case "bank_of_india":
        interest2 = 9.5
        break;
      }
      interest = interest2 / 12 / 100 
      let emi = amount * interest * (Math.pow(1+interest,time)) / (Math.pow(1+interest,time)-1)
      updatedata(emi)
      // calculatebutton.addEventListener("click")
      })
    let emi = calculateEMI()
    updatedata(emi)
};

init();
calculatebutton.addEventListener("click", init)
