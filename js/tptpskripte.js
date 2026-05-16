document.addEventListener('DOMContentLoaded', () => {

    // --- 1. DINAMIČKI POZDRAV ---
    const naslovDobrodoslice = document.querySelector('#o-nama h2');
    if (naslovDobrodoslice) {
        const trenutniSat = new Date().getHours();
        let pozdrav = "Dobrodošli";
        if (trenutniSat >= 5 && trenutniSat < 12) pozdrav = "Dobro jutro i dobrodošli";
        else if (trenutniSat >= 12 && trenutniSat < 18) pozdrav = "Dobar dan, dobrodošli";
        else pozdrav = "Dobro veče, dobrodošli";
        
        naslovDobrodoslice.textContent = `${pozdrav} u Elite Rent A Car`;
    }

    // --- 2. FILTRIRANJE VOZILA (Sadržaj stranica) ---
    const btnEko = document.getElementById('btn-ekonomska');
    const btnSrednja = document.getElementById('btn-srednja');
    const btnLuksuzna = document.getElementById('btn-luksuzna');
    const btnSve = document.getElementById('id-sve');
    
    const sveKartice = document.querySelectorAll('.car-card');
    const sviNasloviKategorija = document.querySelectorAll('.kategorija-naslov');

    if (btnSve && sveKartice.length > 0) {
        const filtrirajVozila = (kategorija) => {
            // Filtriranje kartica automobila
            sveKartice.forEach(kartica => {
                if (kategorija === 'sve' || kartica.classList.contains(kategorija)) {
                    kartica.style.display = "block";
                } else {
                    kartica.style.display = "none";
                }
            });

            // Sakrivanje naslova (npr. "Ekonomska klasa") ako gledamo samo jednu kategoriju
            sviNasloviKategorija.forEach(naslov => {
                if (kategorija === 'sve') {
                    naslov.style.display = "block";
                } else {
                    naslov.style.display = "none";
                }
            });
        };

        btnEko.addEventListener('click', () => filtrirajVozila('ekonomska'));
        btnSrednja.addEventListener('click', () => filtrirajVozila('srednja'));
        btnLuksuzna.addEventListener('click', () => filtrirajVozila('luksuzna'));
        btnSve.addEventListener('click', () => filtrirajVozila('sve'));
    }

    // --- 3. DARK MODE (Na klik logotipa) ---
    const logoImg = document.querySelector('.logo-box img');
    if (logoImg) {
        if (localStorage.getItem('tema') === 'dark') {
            document.body.classList.add('dark-mode');
        }
        logoImg.style.cursor = 'pointer';
        logoImg.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            localStorage.setItem('tema', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
        });
    }

    // --- 4. SMOOTH SCROLL ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const cilj = document.querySelector(this.getAttribute('href'));
            if (cilj) {
                cilj.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const forma = document.getElementById("forma-za-upit");
    const uspjehKontejner = document.getElementById("uspjeh-kontejner");
    const uspjehTekst = document.getElementById("uspjeh-tekst");

    if (forma) {
        forma.addEventListener("submit", function(e) {
            e.preventDefault(); // Zaustavi slanje forme

            // Resetuj prethodne greške
            ocistiGreske();

            let ispravno = true;

            // 1. Validacija Imena
            const ime = document.getElementById("ime");
            if (ime.value.trim() === "") {
                prikaziGresku("ime", "Ime je obavezno.");
                ispravno = false;
            }

            // 2. Validacija Prezimena
            const prezime = document.getElementById("prezime");
            if (prezime.value.trim() === "") {
                prikaziGresku("prezime", "Prezime je obavezno.");
                ispravno = false;
            }

            // 3. Validacija Emaila (Regex)
            const email = document.getElementById("email-adresa");
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value)) {
                prikaziGresku("email", "Unesite ispravnu e-mail adresu.");
                ispravno = false;
            }

            // 4. Validacija Telefona (Regex - samo cifre, razmaci, crtice)
            const telefon = document.getElementById("telefon");
            const telRegex = /^[0-9\s\-]+$/;
            if (telefon.value.trim() === "" || !telRegex.test(telefon.value)) {
                prikaziGresku("telefon", "Unesite ispravan broj (samo cifre, razmak ili crtica).");
                ispravno = false;
            }

            // 5. Validacija Dropdown-a
            const upit = document.getElementById("vrsta-upita");
            if (upit.value === "") {
                prikaziGresku("upit", "Molimo odaberite temu upita.");
                ispravno = false;
            }

            // 6. Validacija Poruke
            const poruka = document.getElementById("poruka");
            if (poruka.value.trim().length < 10) {
                prikaziGresku("poruka-text", "Poruka mora imati barem 10 karaktera.");
                ispravno = false;
            }

            // AKO JE SVE ISPRAVNO
            if (ispravno) {
                // Personalizovana poruka koristeći uneseno ime
                uspjehTekst.innerText = `Hvala Vam, ${ime.value}! Vaš upit je uspješno poslan.`;
                uspjehKontejner.style.display = "block";
                
                forma.reset(); // Očisti polja
                forma.style.display = "none"; // Sakrij formu nakon slanja (opcionalno)
                
                // Skroluj na vrh do poruke uspjeha
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });

        // Reset dugme - čisti i crvene okvire i tekstove grešaka
        forma.addEventListener("reset", function() {
            ocistiGreske();
            uspjehKontejner.style.display = "none";
            forma.style.display = "block";
        });
    }

    // Pomoćne funkcije
    function prikaziGresku(id, poruka) {
        const polje = document.querySelector(`[name="${id}"]`) || document.getElementById(id);
        const errorSpan = document.getElementById(`error-${id}`);
        
        if (polje) polje.classList.add("input-error"); // Vizuelna oznaka (crveni okvir)
        if (errorSpan) errorSpan.innerText = poruka;  // Tekst greške
    }

    function ocistiGreske() {
        const greske = document.querySelectorAll(".error-poruka");
        greske.forEach(g => g.innerText = "");
        
        const errorInputs = document.querySelectorAll(".input-error");
        errorInputs.forEach(i => i.classList.remove("input-error"));
    }
});
