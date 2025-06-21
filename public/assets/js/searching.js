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

function closeAllListsInSidebar() {
    let sublists = document.querySelectorAll('.sidebar-sublist');
    sublists.forEach(function(item) {
        item.style.display = 'none';
    });
}

document.querySelector('.backMenu')?.addEventListener('click', function(e) {
    if (this.getAttribute('href').trim() === '') {
        e.preventDefault();
        window.history.back();
    }
})