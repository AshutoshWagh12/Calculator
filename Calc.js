
class Calulator{
    constructor(previousOperandText,currentOperandText){
        this.previousOperandText = previousOperandText;
        this.currentOperandText = currentOperandText;
        this.clear();
    }

    clear(){
        this.currentOperand='';
        this.previousOperand='';
        this.operation = undefined;
    }
    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0,-1);
    }
    appendNumber(number){
        if(number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString()+number.toString();
    }
    chooseOperation(operation){
        if(this.currentOperand === '')return
        if(this.previousOperand !== ''){
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand='';
    }
    compute(){
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if(isNaN(prev) || isNaN(current)) return;
        switch(this.operation){
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '/':
                computation = prev / current;
                break;
            default:
                return;
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand='';
    }
    getDisplayNumber(number){
        const stringNumber = number.toString();
        const integerDigit = parseFloat(stringNumber.split('.')[0])
        const decimalDigit = stringNumber.split('.')[1];
        let integerDisplay;
        if(isNaN(integerDigit)){
            integerDisplay='';
        }
        else{
            integerDisplay = integerDigit.toLocaleString('en',{
                maximumFractionDigits:0
            })
        }
        if(decimalDigit != null){
            return `${integerDisplay}.${decimalDigit}`
        }
        else{
            return integerDisplay;
        }
        
    }
    updateDisplay(){
        this.currentOperandText.innerText=
        this.getDisplayNumber(this.currentOperand);
        if(this.operation != null){
            this.previousOperandText.innerText=
            `${this.getDisplayNumber(this.previousOperand)} 
            ${this.operation}`
        }
        else{
            this.previousOperandText.innerText='';
        }
    }
}


const numberButtons = document.querySelectorAll('[data-Number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const AllClearButton = document.querySelector('[data-all-clear]')
const previousOperandText = document.querySelector('[data-Previous-operand]')
const currentOperandText = document.querySelector('[data-Current-operand]')



const calulator = new Calulator(previousOperandText,currentOperandText);

numberButtons.forEach(button =>{
    button.addEventListener('click',function(){
        calulator.appendNumber(button.innerText);
        calulator.updateDisplay();
    })
})
operationButtons.forEach(button =>{
    button.addEventListener('click',function(){
        calulator.chooseOperation(button.innerText);
        calulator.updateDisplay();
    })
})

equalsButton.addEventListener('click',button=>{
    calulator.compute();
    calulator.updateDisplay();
})
AllClearButton.addEventListener('click',button=>{
    calulator.clear();
    calulator.updateDisplay();
})
deleteButton.addEventListener('click',button=>{
    calulator.delete();
    calulator.updateDisplay();
})

console.log(a);