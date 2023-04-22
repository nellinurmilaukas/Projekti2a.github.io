
//luodaan päivämäärä finnkinon xml linkkejä varten
var today = new Date();
var dd = today.getDate(); //päivä
var mm = today.getMonth()+1; //kuukaudet Alkaa nollasta (Tammikuu)
var yyyy = today.getFullYear(); //vuosi
if(dd<10) {
    dd = '0'+dd
}
if(mm<10) {
    mm = '0'+mm
}
today = dd + '.' + mm + '.' + yyyy;

function dropdown(){ //"valitse teatteri" nappulan painallus näyttää teatteri listan
    document.getElementById("naytokset").classList.toggle("show");
   
    var helsinki = document.getElementById("helsinki");
    helsinki.onclick = function() {
      Elokuvat(1002); // Vaihtaa elokuvan nimen tunnistettavaksi numeroksi
    }
    
    var tennis = document.getElementById("tennis");
    tennis.onclick = function() {
      Elokuvat(1038);
    }
    var itis = document.getElementById("itis");
    itis.onclick = function() {
      Elokuvat(1045);
    }
    var kinopalatsi = document.getElementById("kinopalatsi");
    kinopalatsi.onclick = function() {
      Elokuvat(1034);
    }
    var sello = document.getElementById("sello");
    sello.onclick = function() {
      Elokuvat(1038);
    }
    var iso = document.getElementById("iso-omena");
    iso.onclick = function() {
      Elokuvat(1039);
    }
    var flamingo = document.getElementById("flamingo");
    flamingo.onclick = function() {
      Elokuvat(1013);
    }
    var maxim = document.getElementById("maxim");
    maxim.onclick = function() {
      Elokuvat(1032);
    }
}



var id; //id joka käytetään xml linkkiin

function Elokuvat(id){ //ajax funktio
    document.getElementById("naytokset").classList.toggle("show"); //teatterilistan pois näkyvistä
    var xmlhttp, xmlDoc;
        xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", "https://www.finnkino.fi/xml/Schedule/?area=" + id + "&dt=" + today ,true); // lisätään päivämäärä ja id linkkiin
        xmlhttp.send();
        

        xmlhttp.onreadystatechange=function() { // tarkastetaan status koodi (200), XML on responssiivinen
            if(xmlhttp.readyState==4 && xmlhttp.status==200){
                xmlDoc = xmlhttp.responseXML;
                var x = xmlDoc.getElementsByTagName("Show"); //hakee tiedot Show tagin alta
                table=""; // luodaan taulukko kuvalle ja tiedoille
                  for (i = 0; i <x.length; i++) {  //käydään kaikki läpi ja kerätään tiedot
                      table += "<div class='asdDiv' id='asdDiv'>";
                      table += "<div class='myDiv'>";
                      table += "<img src='" + x[i].getElementsByTagName("EventMediumImagePortrait")[0].childNodes[0].nodeValue + "'/>"; //noudetaan elokuvan kansikuva
                      table += "</br>";
                      table += "<div class='textDiv'>"; //luodaan teksti div
                      table += x[i].getElementsByTagName("Title")[0].childNodes[0].nodeValue; //saadaan title elokuvalle
                      table += "</br>";
                      var alkuaika = x[i].getElementsByTagName("dttmShowStart")[0].childNodes[0].nodeValue; // alkamisaika
                      var klo = alkuaika.slice(-8); // muokataan kellonaika järkevämpään muotoon
                      var time = klo.slice(0,-3);
                      table += "Elokuva alkaa klo "+time;
                      table += "</br>";
                      var loppumisaika = x[i].getElementsByTagName("dttmShowEnd")[0].childNodes[0].nodeValue; // loppumisaika
                      var loppuklo = loppumisaika.slice(-8); // muokataan kellonaika järkevämpään muotoon
                      var alkutime = loppuklo.slice(0,-3);
                      table += "Elokuva loppuu klo "+alkutime;
                      table += "</br>";
                      var kesto = x[i].getElementsByTagName("LengthInMinutes")[0].childNodes[0].nodeValue; //elokuvan pituus
                      table += "Kesto "+kesto+" minuuttia";
                      table += "</br>";
                      var paikka = x[i].getElementsByTagName("Theatre")[0].childNodes[0].nodeValue; //selvennykseksi myös paikka, jos satutaan hakemaan kaikki helsingin näytökset
                      var sali = x[i].getElementsByTagName("TheatreAuditorium")[0].childNodes[0].nodeValue; //sali numero
                      table += sali + ',' + paikka;
                      table += "</br>";
                      var Rating = x[i].getElementsByTagName("Rating")[0].childNodes[0].nodeValue; //haetaan suositusikä
                      table += "Suositusikä: " +Rating;
                      table += "</div>";
                      table += "</div>";
                      table += "</div>";
                    }
                 document.getElementById("naytosDiv").innerHTML = table; //lisätään table näytösdiviin
                 
                  

            }
        }
}
