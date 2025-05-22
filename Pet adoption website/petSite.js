function getCurrentDate(){
    let now = new Date();

    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let weekday = weekdays[now.getDay()];

    let day = now.getDate();

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let month = months[now.getMonth()];

    let year = now.getFullYear();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    if(seconds<10){
        seconds = "0"+seconds;
    }
    if(minutes<10){
        minutes = "0"+minutes;
    }
    if(hours<10){
        hours = "0"+hours;
    }
    
    document.getElementById("date").innerHTML = weekday+", "+month+" "+day+", "+year+"<br>"+hours+": "+minutes+": "+seconds;
    
}

function checkFieldsAdopt(e){
    //string for easier error message
    let err="";

    //checking animals radio button
   let animalsCHecked = document.getElementsByName("Animal");
   let isAChecked = false;
   for(let i=0;i<animalsCHecked.length;i++) {
        if (animalsCHecked[i].checked) {
            isAChecked = true;
            break;
        }
    }

    //checking breed checkboxes
    let breedCHecked = document.querySelectorAll(".breed");
    let isBChecked = false;
    for(let i=0;i<breedCHecked.length;i++) {
        if (breedCHecked[i].checked) {
            isBChecked = true;
            break;
        }
    }

    //checking gender radio button
   let genderCHecked = document.getElementsByName("Gender");
   let isGChecked = false;
   for(let i=0; i < genderCHecked.length; i++) {
        if (genderCHecked[i].checked) {
            isGChecked = true;
            break;
        }
    }

    //checking behavior checkboxes
    let niceCHecked = document.querySelectorAll(".niceOrnot");
    let isNChecked = false;
    for(let i=0;i<niceCHecked.length;i++) {
        if (niceCHecked[i].checked) {
            isNChecked = true;
            break;
        }
    }

    if (!isAChecked)
    {
        err += "You didn't select an animal type!\n";
    }
    if(!isBChecked)
    {
        err += "You need to select at least one breed!\n";
    }
    if(!isGChecked)
    {
        err += "You didn't select a gender!\n";
    }
    if(!isNChecked)
    {
        err += "You need to select at least one behavior need!";
    }
    if(err){
        //prevents the page from refreshing
        e.preventDefault();

        window.alert(err);
    }

    return true;
}

function checkFieldsGive(e){
    //string for easier error message
    let err="";

    //checking animals radio button
   let animalsCHecked = document.getElementsByName("Animal");
   let isAChecked = false;
   for(let i=0;i<animalsCHecked.length;i++) {
        if (animalsCHecked[i].checked) {
            isAChecked = true;
            break;
        }
    }

    //checking breed text box
    let breed = document.getElementById("breed");
    let isBChecked = false;
    if(breed.value && /[\w\s]/.test(breed.value)) {
        isBChecked = true;
    }

    //checking age selection in case it was left at default
   let ageCheck = document.getElementById("age");
   let isAgeChecked = false;
   if (ageCheck.value != "default") isAgeChecked = true;

   //checking gender radio button
   let genderCHecked = document.getElementsByName("Gender");
   let isGChecked = false;
   for(let i=0; i < genderCHecked.length; i++) {
        if (genderCHecked[i].checked) {
            isGChecked = true;
            break;
        }
    }

    //checking behavior checkboxes
    let niceCHecked = document.querySelectorAll(".niceOrnot");
    let isNChecked = false;
    for(let i=0;i<niceCHecked.length;i++) {
        if (niceCHecked[i].checked) {
            isNChecked = true;
            break;
        }
    }

    //Checking for a description
    let description = document.getElementById("petDescription");
    let isDChecked = false;
    if(description.value) {
        isDChecked = true;
    }

    //checking the person's name text box
    let name = document.getElementById("Name");
    let isNameChecked = false;
    if(name.value && /[\w\s']/.test(name.value)) {
        isNameChecked = true;
    }

    //checking the email
    let email = document.getElementById("email");
    let isEChecked = false;
    if(email.value && /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.value)) isEChecked = true;

    if (!isAChecked)
    {
        err += "You didn't select an animal type.\n";
    }
    if(!isBChecked)
    {
        err += "The breed you entered is invalid.\n";
    }
    if(!isAgeChecked)
    {
        err += "Please select the age range of the pet from the dropdown menu\n";
    }
    if(!isGChecked)
    {
        err += "You didn't select a gender.\n";
    }
    if(!isNChecked)
    {
        err += "You didn't specify at least one of the good behaviors.\n";
    }
    if(!isDChecked)
    {
        err += "Please say at least a few words about the animal you are giving away. It will really help!\n";
    }
    if(!isNameChecked)
    {
        err += "Don't forget to give us your name! If you did add it and this is appearing please try without special characters.\n";
    }
    if(!isEChecked)
    {
        err += "The email you input is invalid.";
    }
    if(err){
        //prevents the page from refreshing
        e.preventDefault();

        window.alert(err);
    }

    return true;
}

setInterval(getCurrentDate,1000);