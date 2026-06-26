let canvas = document.getElementById('canvas');//1
let context = canvas.getContext('2d');//1
let navbarTimer; // variabel untuk menyimpan timer
const createnode = document.getElementById('createnode');//4
const navbar = document.getElementById('navbar');
let connect = document.getElementById('connect');


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



let nodeX, nodeY; // variabel global,4

canvas.addEventListener('dblclick', function(e) {
    nodeX = e.clientX;
    nodeY = e.clientY;
    createnode.style.left = nodeX + 'px';
    createnode.style.top = nodeY + 'px';
    createnode.style.display = 'block';
    document.getElementById('create').value = ''// tampilkan form di sini,4

    // reset timer setiap kali form muncul
    clearTimeout(createnodeTimer);
    createnodeTimer = setTimeout(function() {
        createnode.style.display = 'none';
    }, 5000);//6

})

// struktur data node,4
const nodes = []

// Saat mouse masuk ke createNode → batalkan timer, 6
createnode.addEventListener('mouseenter', function() {
    clearTimeout(createnodeTimer);
});

// Saat mouse keluar dari createnode → mulai timer 5 detik, 6
createnode.addEventListener('mouseleave', function() {
    createnodeTimer = setTimeout(function() {
        createnode.style.display = 'none';
    }, 5000);
});

document.getElementById('create').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        createNode();
    }
})

// saat create diklik,4
function createNode() {
   
    const label = document.getElementById('create').value
    
    nodes.push({
        id: nodes.length + 1,
        label: label,
        x: nodeX,
        y: nodeY
    })
    
    createnode.style.display = 'none';// sembunyikan form,4
    // render ulang canvas
    render();//5

   
    
    // Mulai timer 5 detik
    createnodeTimer = setTimeout(function() {
        // Setelah 5 detik → sembunyikan createnode,
        createnode.style.display = 'none';
    }, 5000); // 5000 = 5 detik 
}



//5,
function buatNode(node){
    context.beginPath();
    context.arc(node.x, node.y, 50, 0, 2 * Math.PI);

    // cek dulu apakah node ini dipilih,7
    if (selectedNode && selectedNode.id === node.id) {
        context.strokeStyle = 'red';
    } else {
        context.strokeStyle = 'black';
    }

    context.fillStyle = 'white';
    context.fill();
    context.stroke();
    context.textAlign = 'center';
    context.textBaseline = 'middle';

     if (selectedNode && selectedNode.id === node.id) {//7
        context.fillStyle = 'red'; // teks merah
    } else {
        context.fillStyle = 'black'; // teks hitam
    }
    context.fillText(node.label, node.x, node.y)

    
}

 
function render() {//5
    // clearRect dulu
    context.clearRect(0, 0, canvas.width, canvas.height)
    // panggil bgGrid()
    bgGrid();//1
    // loop nodes → panggil gambarNode() tiap node
    nodes.forEach(function(node) {
    buatNode(node);
})
}

let selectedNode = null;//7



canvas.addEventListener('click', function(e) {//7
    const klikX = e.clientX;
    const klikY = e.clientY;
    
    selectedNode = null; // reset dulu
    
    nodes.forEach(function(node) {
        const jarak = Math.sqrt((klikX - node.x) ** 2 + (klikY - node.y) ** 2);
        if (jarak < 50) { // 50 = radius node
            selectedNode = node;
        }
    });

    if (selectedNode) {
    document.getElementById('connect').classList.remove('disabled');//8
    
} else {
    document.getElementById('connect').classList.add('disabled');//8
    
}
    
    render(); // gambar ulang dengan warna baru
})

let connectMode = false;

document.getElementById('connect').addEventListener('click', function() {
    connectMode = true;
    this.style.color = 'red';
    // tampilkan label "Choose Target Node"
})

let isDragging = false;
let dragNode = null;

// MOUSEDOWN - deteksi apakah klik mengenai node
canvas.addEventListener('mousedown', function(e) {
    const klikX = e.clientX;
    const klikY = e.clientY;
    
    // cek setiap node, apakah kursor ada di dalamnya
    nodes.forEach(function(node) {
        const jarak = Math.sqrt((klikX - node.x) ** 2 + (klikY - node.y) ** 2);
        if (jarak < 50) { // 50 = radius
            dragNode = node;     // simpan node yang mau digeser
            isDragging = true;   // aktifkan mode drag
        }
    });
});

// MOUSEMOVE - geser node mengikuti kursor
canvas.addEventListener('mousemove', function(e) {
    if (isDragging && dragNode) {
        dragNode.x = e.clientX;  // update posisi x node
        dragNode.y = e.clientY;  // update posisi y node
        render();                 // gambar ulang
    }
});

// MOUSEUP - lepas node, hentikan drag
canvas.addEventListener('mouseup', function() {
    isDragging = false;
    dragNode = null;
});

render();