document.addEventListener('DOMContentLoaded', () => {

    // --- 1. DINAMIČKI POZDRAV (Index stranica) ---
    const naslovDobrodoslice = document.querySelector('#o-nama h2');
    if (naslovDobrodoslice) {
        const trenutniSat = new Date().getHours();
        let pozdrav = "Dobrodošli";

        if (trenutniSat >= 5 && trenutniSat < 12) {
            pozdrav = "Dobro jutro i dobrodošli";
        } else if (trenutniSat >= 12 && trenutniSat < 18) {
            pozdrav = "Dobar dan, dobrodošli";
        } else {
            pozdrav = "Dobro veče, dobrodošli";
        }
        naslovDobrodoslice.textContent = `${pozdrav} u Elite Rent A Car`;
    }

    // --- 2. FILTRIRANJE VOZILA (Sadržaj stranica) ---
    const btnEko = document.getElementById('btn-ekonomska');
    const btnSrednja = document.getElementById('btn-srednja');
    const btnLuksuzna = document.getElementById('btn-luksuzna');
    const btnSve = document.getElementById('id-sve');
    const sveKartice = document.querySelectorAll('.car-card');
    const kategorijeNaslovi = document.querySelectorAll('.kategorija-naslov');

    if (btnSve && sveKartice.length > 0) {
        const filtriraj = (klasa) => {
            sveKartice.forEach(kartica => {
                kartica.style.display = (klasa === 'sve' || kartica.classList.contains(klasa)) ? 'block' : 'none';
            });
            kategorijeNaslovi.forEach(naslov => {
                naslov.style.display = (klasa === 'sve') ? 'block' : 'none';
            });
        };

        btnEko.addEventListener('click', () => filtriraj('ekonomska'));
        btnSrednja.addEventListener('click', () => filtriraj('srednja'));
        btnLuksuzna.addEventListener('click', () => filtriraj('luksuzna'));
        btnSve.addEventListener('click', () => filtriraj('sve'));
    }

    // --- 3. VALIDACIJA KONTAKT FORME (Kontakt stranica) ---
    const kontaktForma = document.querySelector('.kontakt-forma form');
    if (kontaktForma) {
        kontaktForma.addEventListener('submit', (e) => {
            let greska = false;
            const ime = document.getElementById('ime');
            const email = document.getElementById('email');
            const poruka = document.getElementById('poruka');
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (ime.value.trim().length < 3) {
                alert("Ime mora imati barem 3 karaktera.");
                greska = true;
            } else if (!emailRegex.test(email.value)) {
                alert("Molimo unesite ispravnu email adresu.");
                greska = true;
            } else if (poruka.value.trim().length < 10) {
                alert("Poruka mora imati barem 10 karaktera.");
                greska = true;
            }

            if (greska) {
                e.preventDefault();
            } else {
                alert("Hvala Vam! Vaša poruka je uspješno poslana.");
            }
        });
    }

    // --- 4. DARK MODE (Na klik logotipa) ---
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

    // --- 5. SMOOTH SCROLL (Sve stranice) ---
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
