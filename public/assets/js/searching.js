document.querySelector('.menu-icon').addEventListener('click', function() {
    document.getElementById('sidebar').classList.add('active');
    document.getElementById('sidebar-overlay').classList.add('active');
});

document.getElementById('close-sidebar').addEventListener('click', function() {
    document.getElementById('sidebar').classList.remove('active');
    document.getElementById('sidebar-overlay').classList.remove('active');
    closeAllListsInSidebar();
});
document.getElementById('sidebar-overlay').addEventListener('click', function() {
    document.getElementById('sidebar').classList.remove('active');
    document.getElementById('sidebar-overlay').classList.remove('active');
    closeAllListsInSidebar();
});

document.getElementById('algorithms-link').addEventListener('click', function(e) {
    e.preventDefault();
    const sublist = document.getElementById('algorithms-sublist');
    sublist.style.display = (sublist.style.display === 'block') ? 'none' : 'block';
});

document.getElementById('searching-link').addEventListener('click', function(e) {
    e.preventDefault();
    const sublist = document.getElementById('searching-sublist');
    sublist.style.display = (sublist.style.display === 'block') ? 'none' : 'block';
});

// document.querySelectorAll('.sidebar-sublink').forEach(function(link) {
//     link.addEventListener('click', function(e) {
//         e.preventDefault();
//         // Tìm phần tử cha (li) rồi tìm ul.sidebar-sublist bên trong nó
//         const sublist = this.parentElement.querySelector('.sidebar-sublist');
        
//         if (sublist) {
//             sublist.style.display = (sublist.style.display === 'block') ? 'none' : 'block';
//             console.log('Toggle sublist:', sublist.style.display);
//         }
//     });
// });

document.querySelector('.home-icon').addEventListener('click', function() {
    window.location.href = '/';
});

document.querySelector('.info-icon').addEventListener('click', function() {
    window.location.href = '/guide';
});

document.querySelector('.btn-play').addEventListener('click', function() {
    window.location.href = '/searching/menu';
});

function closeAllListsInSidebar() {
    let sublists = document.querySelectorAll('.sidebar-sublist');
    sublists.forEach(function(item) {
        item.style.display = 'none';
    });
}