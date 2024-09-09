#Moment 3.2 del 2 i kursen DT207g

##Sammanfattning
En front-end applikation som är utvecklad med NodeJS och parcel. Applikationen är uppbyggd av javascript, html och css. Den består av tre undersidor. En för sparade arbetserfarenheter, en med ett formulär för att spara fler arbetserfaraenheter och en OM sida. 

##Installation av databas
För att installera se till att API och server på backend webbtjänsten är igång. Se till att API URL matchar URL för backend servern. Så om det är en annan port än 3010, uppdatera den här delen i koden:
const API_URL = "http://localhost:3010/workexperience";


##Användning 
När applikationen körs kommer sparade objekt hämtas från API och visas på första sidan där det även finns en knapp efter varje för att tabort ett objekt. På formulär sidan kan man spara nya objekt och om ett fält inte fylls i kommer ett felmeddelande visas. Förutom om man lämnar slutdatum tomt, då kommer texten "pågående" att visas. När mna klickar på spara kommer informationen sparas på förstasidan. 

###Utvecklad av
Sabina Liljeström