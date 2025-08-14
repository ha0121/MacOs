// script.js
// Hiệu ứng gạch ngang khi click vào sticky note
document.querySelectorAll('.sticky-note li').forEach(function(item){
  item.addEventListener('click', function(){
    item.classList.toggle('done');
  });
});

// Drag & drop cho các icon desktop
let draggedIcon = null;
let offsetX = 0, offsetY = 0;

document.querySelectorAll('.icon').forEach(function(icon) {
  icon.addEventListener('mousedown', function(e) {
    draggedIcon = icon;
    // Tính vị trí chuột so với góc trên trái của icon
    offsetX = e.clientX - icon.offsetLeft;
    offsetY = e.clientY - icon.offsetTop;
    icon.style.zIndex = 1000;
    document.body.style.userSelect = 'none';
  });
});

// Đặt vị trí ngẫu nhiên cho các icon khi tải trang
window.addEventListener('DOMContentLoaded', function() {
});

document.addEventListener('mousemove', function(e) {
  if (draggedIcon) {
    draggedIcon.style.left = (e.clientX - offsetX) + 'px';
    draggedIcon.style.top = (e.clientY - offsetY) + 'px';
    draggedIcon.style.right = '';
  }
});

document.addEventListener('mouseup', function(e) {
  if (draggedIcon) {
    draggedIcon.style.zIndex = 2;
    draggedIcon = null;
    document.body.style.userSelect = '';
  }
});

// Thêm sự kiện click cho icon Resume
const resumeIcon = document.querySelector('.icon.file img[alt="Resume"]');
if (resumeIcon) {
  resumeIcon.addEventListener('click', function(e) {
    window.open('https://drive.google.com/file/d/1e2FY9Wx6pgZzLSLoNuh5LDAbMNZ0wBGI/view', '_blank');
    e.stopPropagation();
  });
}