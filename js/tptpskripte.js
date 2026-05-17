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
                    kartica.style.display = "flex"; // Popravljeno na flex kako bi se zadržao tvoj CSS layout
                } else {
                    kartica.style.display = "none";
                }
            });

            // Sakrivanje naslova (npr. "Ekonomska klasa") ako gledamo samo jednu kategoriju
            sviNasloviKategorija.forEach(naslov => {
                if (kategorija === 'sve') {
                    naslov.style.display = "block";
                } else {
                    // Ako naslov sadrži ime kategorije, ostavi ga vidljivim, ostale sakrij
                    if (naslov.textContent.toLowerCase().includes(kategorija)) {
                        naslov.style.display = "block";
                    } else {
                        naslov.style.display = "none";
                    }
                }
            });
        };

        btnEko.addEventListener('click', () => filtrirajVozila('ekonomska'));
        btnSrednja.addEventListener('click', () => filtrirajVozila('srednja'));
        btnLuksuzna.addEventListener('click', () => filtrirajVozila('luksuzna'));
        btnSve.addEventListener('click', () => filtrirajVozila('sve'));
    }

    // --- NOVO: 2.5 REZERVACIJSKI MODAL I UŽIVO RAČUNANJE CIJENE ---
    const modal = document.getElementById('rezervacija-modal');
    const zatvoriBtn = document.querySelector('.zatvori-modal');
    
    const modalNaziv = document.getElementById('modal-naziv-auta');
    const modalCijena = document.getElementById('modal-cijena-auta');
    const modalUkupno = document.getElementById('modal-ukupna-cijena');
    const formaZaNarudzbu = document.getElementById('forma-za-narudzbu');
    const inputDani = document.getElementById('broj-dana');

    let cijenaPoDanu = 0;

    // Funkcija koja računa i ispisuje cijenu na ekranu u realnom vremenu
    function racunajUkupnuCijenu() {
        const dani = parseInt(inputDani.value) || 1;
        if (dani < 1) {
            inputDani.value = 1;
        }
        const ukupno = cijenaPoDanu * (parseInt(inputDani.value) || 1);
        modalUkupno.textContent = ukupno;
    }

    // Dodavanje event listenera na sve kartice za otvaranje modala
    sveKartice.forEach(kartica => {
        const dugme = kartica.querySelector('.btn-rezervisi');
        if (dugme) {
            dugme.addEventListener('click', () => {
                const nazivAuta = kartica.getAttribute('data-name');
                cijenaPoDanu = parseInt(kartica.getAttribute('data-price')) || 0;
                
                modalNaziv.textContent = nazivAuta;
                modalCijena.textContent = cijenaPoDanu;
                inputDani.value = 1; // Reset na 1 dan pri otvaranju
                
                racunajUkupnuCijenu();
                modal.style.display = 'block';
            });
        }
    });

    // Osluškivanje unosa dana za promjenu cijene uživo
    if (inputDani) {
        inputDani.addEventListener('input', racunajUkupnuCijenu);
    }

    // Zatvaranje modala na X
    if (zatvoriBtn) {
        zatvoriBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    // Zatvaranje modala klikom van njega
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Obrada forme unutar modala
    if (formaZaNarudzbu) {
        formaZaNarudzbu.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const imeKupca = document.getElementById('kupac-ime').value;
            const telefonKupca = document.getElementById('kupac-telefon').value;
            const daniNajma = inputDani.value;
            const auto = modalNaziv.textContent;
            const konacnaCijena = modalUkupno.textContent;
            
            alert(`Uspješna rezervacija!\n\nKlijent: ${imeKupca}\nVozilo: ${auto}\nBroj dana: ${daniNajma}\nUkupna cijena: ${konacnaCijena} KM\nTelefon: ${telefonKupca}\n\nUskoro će Vas kontaktirati neko od naših agenata (Tarik, Fatmir ili Faris)!`);
            
            formaZaNarudzbu.reset();
            modal.style.display = 'none';
        });
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

// --- 5. VALIDACIJA KONTAKT FORME (Zaseban blok, ostao netaknut) ---
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
                uspjehTekst.innerText = `Hvala Vam, ${ime.value}! Vaš upit je uspješno poslan.`;
                uspjehKontejner.style.display = "block";
                
                forma.reset(); // Očisti polja
                forma.style.display = "none"; // Sakrij formu nakon slanja
                
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });

        // Reset dugme
        forma.addEventListener("reset", function() {
            ocistiGreske();
            uspjehKontejner.style.display = "none";
            forma.style.display = "block";
        });
    }

    // Pomoćne funkcije za validaciju kontakt forme
    function prikaziGresku(id, poruka) {
        const polje = document.querySelector(`[name="${id}"]`) || document.getElementById(id);
        const errorSpan = document.getElementById(`error-${id}`);
        
        if (polje) polje.classList.add("input-error");
        if (errorSpan) errorSpan.innerText = poruka;
    }

    function ocistiGreske() {
        const greske = document.querySelectorAll(".error-poruka");
        greske.forEach(g => g.innerText = "");
        
        const errorInputs = document.querySelectorAll(".input-error");
        errorInputs.forEach(i => i.classList.remove("input-error"));
    }
});
