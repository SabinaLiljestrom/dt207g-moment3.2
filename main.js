const API_URL = "http://localhost:3010/workexperience";  

document.addEventListener("DOMContentLoaded", function() {
    // Kontrollera om vi är på sidan med formuläret
    const form = document.getElementById('workexperience-form');
    if (form) {
        form.addEventListener('submit', addExperience);
    }

    // Kontrollera om vi är på sidan med listan över arbetserfarenheter
    if (document.getElementById('list')) {
        fetchExperiences();
    }
});

// Funktion för att hämta och visa arbetserfarenheter
async function fetchExperiences() {
    const response = await fetch(API_URL);
    const workexperiences = await response.json();  

    console.log(workexperiences);  // Kontrollera vad API:et returnerar

    const list = document.getElementById('list');
    list.innerHTML = ''; // Rensa listan

    workexperiences.forEach(workexperience => {
        const li = document.createElement('li');
        li.innerHTML = `
        ${workexperience.companyname} - ${workexperience.jobtitle}<br>
        ${workexperience.description}<br>
        ${workexperience.location}<br>
        ${workexperience.startdate} - ${workexperience.enddate || "Pågående"}
      `;

        // Skapa raderingsknappen
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Radera';
        deleteButton.style.marginLeft = '10px';

        // Lägg till en eventlistener för att radera arbetserfarenheten
        deleteButton.addEventListener('click', async () => {
            if (confirm(`Är du säker på att du vill radera ${workexperience.companyname}?`)) {
                await deleteExperience(workexperience._id);  
                fetchExperiences(); 
            }
        });

        // Lägg till knappen i listobjektet
        li.appendChild(deleteButton);
        list.appendChild(li);
    });
}

// Funktion för att lägga till ny arbetserfarenhet
async function addExperience(event) {
    event.preventDefault();

    // Rensa tidigare felmeddelanden
    const errorList = document.getElementById('error-messages');
    if (errorList) {
        errorList.innerHTML = '';
    }

    const formData = new FormData(event.target);
    const experienceData = Object.fromEntries(formData);

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(experienceData)
        });

        if (response.ok) {
            fetchExperiences(); // Uppdatera listan efter tillägg
            event.target.reset(); // Rensa formuläret
        } else {
            // Hantera valideringsfel
            const result = await response.json();
            if (result.errors) {
                displayErrors(result.errors);
            } else {
                console.error('Något gick fel:', result.error);
            }
        }
    } catch (error) {
        console.error('Fel vid anslutning till API:', error);
    }
}

// Funktion för att visa felmeddelanden på sidan
function displayErrors(errors) {
    let errorList = document.getElementById('error-messages');
    if (!errorList) {
        const form = document.getElementById('workexperience-form');
        errorList = document.createElement('ul');
        errorList.id = 'error-messages';
        errorList.style.color = 'red';
        form.parentNode.insertBefore(errorList, form);
    }

    errorList.innerHTML = ''; // Rensa gamla felmeddelanden

    // Lägg till varje felmeddelande till listan
    errors.forEach(error => {
        const li = document.createElement('li');
        li.textContent = error.msg;
        errorList.appendChild(li);
    });
}

// Funktion för att radera arbetserfarenhet
async function deleteExperience(id) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        console.log('Experience deleted successfully');
    } else {
        console.error('Failed to delete experience');
    }
}
