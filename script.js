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

// ------------------- macOS-like login overlay behavior -------------------
(function(){
  const overlay = document.getElementById('login-overlay');
  const timeEl = overlay ? overlay.querySelector('.login-time') : null;
  const pwd = document.getElementById('login-password');
  const submit = document.getElementById('login-submit');

  function updateLoginTime(){
    if(!timeEl) return;
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2,'0');
    timeEl.textContent = `${hours}:${minutes}`;
  }

  // Show overlay on load (it's present in DOM and visible by default)
  window.addEventListener('DOMContentLoaded', function(){
    updateLoginTime();
    setInterval(updateLoginTime, 1000 * 30);
    if(pwd) pwd.focus();
  });

  function unlock(){
    // Simple behavior: require non-empty password to dismiss overlay
    if(!pwd) return hide();
    if(pwd.value.trim().length === 0) {
      // briefly shake input
      pwd.classList.remove('shake');
      void pwd.offsetWidth;
      pwd.classList.add('shake');
      return;
    }
    hide();
  }

  function hide(){
    if(!overlay) return;
    overlay.style.transition = 'opacity 300ms ease, visibility 300ms ease';
    overlay.style.opacity = '0';
    overlay.style.visibility = 'hidden';
    // return focus to body so keyboard shortcuts still work
    document.body.focus();
  }

  if(submit) submit.addEventListener('click', unlock);
  if(pwd) pwd.addEventListener('keydown', function(e){ if(e.key === 'Enter') unlock(); });

  // small CSS injection for shake animation (in case CSS not loaded yet)
  const style = document.createElement('style');
  style.textContent = `@keyframes shakeX{0%{transform:translateX(0)}25%{transform:translateX(-6px)}75%{transform:translateX(6px)}100%{transform:translateX(0)}} .shake{animation:shakeX 320ms ease}`;
  document.head.appendChild(style);
})();
