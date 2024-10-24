const apiFetch = async () => {
    try{
        const apiData= await fetch("https://api.currencyapi.com/v3/latest?apikey=cur_live_9uj45gDd8hgZdzPzEkBWpiTBf3Vq2uPyOotK06Ik");
        const fetchedData = await apiData.json();
        return fetchedData.data;
    }catch{
        console.error("unable to fetch data");
    }
}

//making the options using api fetched data in html

const displayChanger = async () => {
    const rates = await apiFetch();

    if (!rates) return; // Check if rates are fetched successfully

    const fromCurrency = document.getElementById("from-currency");
    const toCurrency = document.getElementById("to-currency");  // Fixed 'to-currency' element

    for (const currency in rates) {
        // Create options for both fromCurrency and toCurrency
        const option1 = document.createElement("option");
        const option2 = document.createElement("option");

        option1.value = option2.value = currency;
        option1.textContent = option2.textContent = currency;

        fromCurrency.appendChild(option1);
        toCurrency.appendChild(option2);
    }
};

// Call the function to populate the dropdowns
displayChanger();


const currencyConverter = async () => {

    const rates= await apiFetch();

    const amount=parseFloat(document.getElementById("amount").value);
    const fromCurrency=document.getElementById('from-currency').value;
    const toCurrency=document.getElementById('to-currency').value;

    if(!amount || !fromCurrency || !toCurrency){
        //vibrate effect
        alert("missing value")
    }

    const fromrate=rates[fromCurrency].value;
    const torate=rates[toCurrency].value;
    const convertedCurrency= ((amount/fromrate) * torate).toFixed(2);

    //displaying the result
    document.getElementById("result-text").innerHTML=convertedCurrency+" "+toCurrency;
}


document.getElementById("covert_button").addEventListener("click",()=>{
    currencyConverter();
    document.querySelector('.output-value-container').style.visibility="visible";
})

displayChanger();




//theme changer

document.getElementById("theme-selection").addEventListener('change',()=>{
    themeChanger(document.getElementById("theme-selection").value);
})

function themeChanger(theme){
    const root = document.documentElement;
    if(theme==='green'){
        root.style.setProperty('--primary-color', '#003135');
        root.style.setProperty('--secondary-color', '#024950');
        root.style.setProperty('--highlight-color', '#964734');
        root.style.setProperty('--accent-color', '#0FA4AF');
        root.style.setProperty('--light-accent-color', '#AFDDE5');
        root.style.setProperty('--font-color', '#FFFFFF');
        root.style.setProperty('--convertButton-color', '#28A745');
        root.style.setProperty('--convertButton-hover-color', '#218838');
    }else if(theme==='dark'){
        root.style.setProperty('--primary-color', '#1e1e1e');
        root.style.setProperty('--secondary-color', '#2c2c2c');
        root.style.setProperty('--highlight-color', '#ff5c5c');
        root.style.setProperty('--accent-color', '#4a90e2');
        root.style.setProperty('--light-accent-color', '#4a4a4a');
        root.style.setProperty('--font-color', 'white');
        root.style.setProperty('--convertButton-color', '#1E90FF');
        root.style.setProperty('--convertButton-hover-color', '#1C86EE');
    }else{
        root.style.setProperty('--primary-color', '#f0f0f0');
        root.style.setProperty('--secondary-color', '#ffffff');
        root.style.setProperty('--highlight-color', '#ff6f61');
        root.style.setProperty('--accent-color', '#00aaff');
        root.style.setProperty('--light-accent-color', '#f8f8f8');
        root.style.setProperty('--font-color', '#333333');
        root.style.setProperty('--convertButton-color', '#007BFF');
        root.style.setProperty('--convertButton-hover-color', '#0056b3');
    }
}