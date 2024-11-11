const button = document.getElementById('button')
const amount = document.getElementById('amount')
const term = document.getElementById('term')
const rate = document.getElementById('rate')
const amountWarning = document.getElementById('amount-warning')
const termWarning = document.getElementById('term-warning')
const rateWarning = document.getElementById('rate-warning')
const amountContainer = document.getElementById('amount-container')
const poundSign = document.getElementById('pound-sign')
const termContainer = document.getElementById('term-container')
const years = document.getElementById('years')
const rateContainer = document.getElementById('rate-container')
const percent = document.getElementById('percent')
const result = document.getElementById('result')

document.addEventListener('keypress', () => {
    document.querySelectorAll('.warning-text').forEach(element => {
        element.style.display = 'none'
    })
    amountContainer.classList.remove('warning')
    termContainer.classList.remove('warning')
    rateContainer.classList.remove('warning')
    years.classList.remove('warning-sign')
    poundSign.classList.remove('warning-sign')
    percent.classList.remove('warning-sign')
})

button.addEventListener('click', calculate)

function calculate() {
    const type = document.querySelector('input[name="type"]:checked').value;
    const pricipleLoanAmount = parseFloat(amount.value);
    const monthlyRate = parseFloat(rate.value) / 1200;
    const numberOfPayments = parseInt(term.value) * 12;

    if (isNaN(pricipleLoanAmount) || isNaN(monthlyRate) || isNaN(numberOfPayments)) {
        result.innerHTML = "<p>Please enter valid numeric values.</p>";
        return;
    }

    const factor = Math.pow(1 + monthlyRate, numberOfPayments);
    const payment = pricipleLoanAmount * (monthlyRate * factor) / (factor - 1);
    
    let totalRepayment = 0;
    let fixedPayment = 0;

    if (type === 'repayment') {
        fixedPayment = payment;
        totalRepayment = fixedPayment * numberOfPayments;
    } else {
        fixedPayment = pricipleLoanAmount * monthlyRate;
        totalRepayment = (pricipleLoanAmount * monthlyRate) + pricipleLoanAmount;
    }

    // Display the results with formatted values
    result.innerHTML = `
         <div class="result-after">
            <h2>Your Results</h2>
            <p class="result-text">
                Your results are shown below based on the information you provided. 
                To adjust the results, edit the form and click "calculate repayments" again.
            </p>
            <div class="bil">
                <p class="bil-title">Your monthly repayments</p>
                <p class="bil-price">£${Number(fixedPayment.toFixed(2)).toLocaleString('en-US')}</p>
                <p class="bil-title">Total you'll repay over the term</p>
                <h2>£${Number(totalRepayment.toFixed(2)).toLocaleString('en-US')}</h2>
            </div>
        </div>
    `;

    // Warnings for empty fields
    if (!amount.value) {
        amountWarning.style.display = 'block';
        amountContainer.classList.add('warning');
        poundSign.classList.add('warning-sign');
    }

    if (!term.value) {
        termWarning.style.display = 'block';
        termContainer.classList.add('warning');
        years.classList.add('warning-sign');
    }

    if (!rate.value) {
        rateWarning.style.display = 'block';
        rateContainer.classList.add('warning');
        percent.classList.add('warning-sign');
    }
}
