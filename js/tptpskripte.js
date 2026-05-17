document.addEventListener('DOMContentLoaded', () => {

    //  DINAMIČKI POZDRAV 
    const naslovDobrodoslice = document.querySelector('#o-nama h2');
    if (naslovDobrodoslice) {
        const trenutniSat = new Date().getHours();
        let pozdrav = "Dobrodošli";
        if (trenutniSat >= 5 && trenutniSat < 12) pozdrav = "Dobro jutro i dobrodošli";
        else if (trenutniSat >= 12 && trenutniSat < 18) pozdrav = "Dobar dan, dobrodošli";
        else pozdrav = "Dobro veče, dobrodošli";
        
        naslovDobrodoslice.textContent = `${pozdrav} u Elite Rent A Car`;
    }

    //  FILTRIRANJE VOZILA 
    const btnEko = document.getElementById('btn-ekonomska');
    const btnSrednja = document.getElementById('btn-srednja');
    const btnLuksuzna = document.getElementById('btn-luksuzna');
    const btnSve = document.getElementById('id-sve');
    
    const sveKartice = document.querySelectorAll('.car-card');
    const sviNasloviKategorija = document.querySelectorAll('.kategorija-naslov');

    if (btnSve && sveKartice.length > 0) {
        const filtrirajVozila = (kategorija) => {
            sveKartice.forEach(kartica => {
                if (kategorija === 'sve' || kartica.classList.contains(kategorija)) {
                    kartica.classList.remove('sakrij');
                } else {
                    kartica.classList.add('sakrij');
                }
            });

            sviNasloviKategorija.forEach(naslov => {
                if (kategorija === 'sve') {
                    naslov.classList.remove('sakrij');
                } else {
                    naslov.classList.add('sakrij');
                }
            });
        };

        btnEko.addEventListener('click', () => filtrirajVozila('ekonomska'));
        btnSrednja.addEventListener('click', () => filtrirajVozila('srednja'));
        btnLuksuzna.addEventListener('click', () => filtrirajVozila('luksuzna'));
        btnSve.addEventListener('click', () => filtrirajVozila('sve'));
    }

    //  REZERVACIJA I RAČUNANJE CIJENE
    const modal = document.getElementById('rezervacija-modal');
    const zatvoriBtn = document.querySelector('.zatvori-modal');
    const modalNaziv = document.getElementById('modal-naziv-auta');
    const modalCijena = document.getElementById('modal-cijena-auta');
    const modalUkupno = document.getElementById('modal-ukupna-cijena');
    const inputDani = document.getElementById('broj-dana');

    let cijenaPoDanu = 0;

    // Sigurnosna provjera
    if (modal && modalNaziv && modalCijena && modalUkupno && inputDani && sveKartice.length > 0) {
        
        const racunajUkupnuCijenu = () => {
            let dani = parseInt(inputDani.value) || 1;
            if (dani < 1) {
                inputDani.value = 1;
                dani = 1;
            }
            modalUkupno.textContent = cijenaPoDanu * dani;
        };

        // Otvaranje modala na klik kartice
        sveKartice.forEach(kartica => {
            kartica.classList.add('klikabilno'); // CSS klasa za pointer kursor
            const dugme = kartica.querySelector('.btn-rezervisi');
            
            if (dugme) {
                dugme.addEventListener('click', () => {
                    const nazivAuta = kartica.getAttribute('data-name') || 'Vozilo';
                    cijenaPoDanu = parseInt(kartica.getAttribute('data-price')) || 0;
                    
                    modalNaziv.textContent = nazivAuta;
                    modalCijena.textContent = cijenaPoDanu;
                    inputDani.value = 1; 
                    
                    racunajUkupnuCijenu();
                    modal.classList.add('prikazi-blok'); // Umjesto style.display = 'block'
                });
            }
        });

        // Zatvaranje modala
        if (zatvoriBtn) {
            zatvoriBtn.addEventListener('click', () => {
                modal.classList.remove('prikazi-blok');
            });
        }

        // Osluškivanje unosa dana
        inputDani.addEventListener('input', racunajUkupnuCijenu);
    }

    //  DARK MODE 
    const logoImg = document.querySelector('.logo-box img');
    if (logoImg) {
        if (localStorage.getItem('tema') === 'dark') {
            document.body.classList.add('dark-mode');
        }
        logoImg.classList.add('klikabilno');
        logoImg.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            localStorage.setItem('tema', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
        });
    }

    // SMOOTH SCROLL
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

// VALIDACIJA UPITA
document.addEventListener("DOMContentLoaded", function() {
    const forma = document.getElementById("forma-za-upit");
    const uspjehKontejner = document.getElementById("uspjeh-kontejner");
    const uspjehTekst = document.getElementById("uspjeh-tekst");

    if (forma) {
        forma.addEventListener("submit", function(e) {
            e.preventDefault(); 
            ocistiGreske();

            let ispravno = true;

            const ime = document.getElementById("ime");
            if (ime.value.trim() === "") {
                prikaziGresku("ime", "Ime je obavezno.");
                ispravno = false;
            }

            const prezime = document.getElementById("prezime");
            if (prezime.value.trim() === "") {
                prikaziGresku("prezime", "Prezime je obavezno.");
                ispravno = false;
            }

            const email = document.getElementById("email-adresa");
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value)) {
                prikaziGresku("email", "Unesite ispravnu e-mail adresu.");
                ispravno = false;
            }

            const telefon = document.getElementById("telefon");
            const telRegex = /^[0-9\s\-]+$/;
            if (telefon.value.trim() === "" || !telRegex.test(telefon.value)) {
                prikaziGresku("telefon", "Unesite ispravan broj (samo cifre, razmak ili crtica).");
                ispravno = false;
            }

            const upit = document.getElementById("vrsta-upita");
            if (upit.value === "") {
                prikaziGresku("upit", "Molimo odaberite temu upita.");
                ispravno = false;
            }

            const poruka = document.getElementById("poruka");
            if (poruka.value.trim().length < 10) {
                prikaziGresku("poruka-text", "Poruka mora imati barem 10 karaktera.");
                ispravno = false;
            }

            if (ispravno) {
                uspjehTekst.innerText = `Hvala Vam, ${ime.value}! Vaš upit je uspješno poslan.`;
                uspjehKontejner.classList.add('prikazi-blok');
                forma.classList.add('sakrij');
                
                forma.reset(); 
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });

        forma.addEventListener("reset", function() {
            ocistiGreske();
            uspjehKontejner.classList.remove('prikazi-blok');
            forma.classList.remove('sakrij');
        });
    }

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
