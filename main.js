let canvas = document.getElementById('canvas');//1
let context = canvas.getContext('2d');//1
let navbarTimer; // variabel untuk menyimpan timer


function bgGrid(){//1
canvas.width = window.innerWidth;
canvas.height = window.innerHeight


context.strokeStyle = '#ccc';
context.lineWidth = 0.5;
const jarak = 25;


for(i= -canvas.height; i < canvas.width; i+= jarak)
{
    context.beginPath();
    context.moveTo(i, 0);
    context.lineTo(i + canvas.height, canvas.height);
    context.stroke();
    
}

for(i=0; i < canvas.height + canvas.width; i+= jarak){
    context.beginPath();
    context.moveTo(i, 0);
    context.lineTo(i - canvas.height, canvas.height);
    context.stroke();
}
}

function showNavbar() {//2
    const navbar = document.getElementById('navbar');
    const opennav = document.getElementById('opennav');
    
    // Tampilkan navbar, sembunyikan segitiga
    navbar.style.display = 'flex';
    opennav.style.display = 'none';
    
    // Hapus timer lama kalau ada (supaya tidak tumpuk)
    clearTimeout(navbarTimer);
    
    // Mulai timer 5 detik
    navbarTimer = setTimeout(function() {
        // Setelah 5 detik → sembunyikan navbar, tampilkan segitiga lagi
        navbar.style.display = 'none';
        opennav.style.display = 'flex';
    }, 5000); // 5000 = 5 detik
}


// Saat mouse masuk ke navbar → batalkan timer, 3
navbar.addEventListener('mouseenter', function() {
    clearTimeout(navbarTimer);
});

// Saat mouse keluar dari navbar → mulai timer 5 detik, 3
navbar.addEventListener('mouseleave', function() {
    navbarTimer = setTimeout(function() {
        navbar.style.display = 'none';
        document.getElementById('opennav').style.display = 'flex';
    }, 5000);
});



bgGrid();//1



