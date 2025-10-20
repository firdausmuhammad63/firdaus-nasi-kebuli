// ================================
// MOBILE MENU TOGGLE
// ================================
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const hamburgerLine1 = document.getElementById('hamburger-line-1');
const hamburgerLine2 = document.getElementById('hamburger-line-2');
const hamburgerLine3 = document.getElementById('hamburger-line-3');

let isMenuOpen = false;

const toggleMobileMenu = () => {
  isMenuOpen = !isMenuOpen;

  // Toggle menu expand
  if (isMenuOpen) {
    mobileMenu.style.maxHeight = mobileMenu.scrollHeight + "px";
    mobileMenu.classList.remove('opacity-0');
    mobileMenu.classList.add('opacity-100');
    mobileMenuBtn.classList.add('open'); // ✅ TAMBAH INI
  } else {
    mobileMenu.style.maxHeight = "0px";
    mobileMenu.classList.remove('opacity-100');
    mobileMenu.classList.add('opacity-0');
    mobileMenuBtn.classList.remove('open'); // ✅ TAMBAH INI
  }

  mobileMenuBtn.setAttribute('aria-expanded', isMenuOpen);
};

// Event
mobileMenuBtn.addEventListener('click', toggleMobileMenu);

// Klik di luar untuk menutup
document.addEventListener('click', (e) => {
  if (
    isMenuOpen &&
    !mobileMenuBtn.contains(e.target) &&
    !mobileMenu.contains(e.target)
  ) {
    toggleMobileMenu();
  }
});

  // ================================
  // SMOOTH SCROLL WITH OFFSET
  // ================================
  function scrollToSection(sectionId){
    const target = document.getElementById(sectionId);
    if(!target) return;
    const navHeight = document.querySelector('nav').offsetHeight;
    const topPos = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
    window.scrollTo({top: topPos, behavior:'smooth'});
    if(isMenuOpen) toggleMobileMenu();
  }

  document.querySelectorAll('a[href^="#"], button[data-scroll]').forEach(el => {
    el.addEventListener('click', e => {
      const targetId = el.getAttribute('href')?.substring(1) || el.dataset.scroll;
      if(!targetId) return;
      e.preventDefault();
      scrollToSection(targetId);
    });
  });

  // ================================
  // DATETIME UPDATE
  // ================================
  function updateDateTime(){
    const now = new Date();
    const options = { weekday:'short', year:'numeric', month:'short', day:'numeric', hour:'2-digit', minute:'2-digit' };
    const dtElem = document.getElementById('datetime');
    if(dtElem) dtElem.textContent = now.toLocaleDateString('id-ID',options);
  }
  updateDateTime();
  setInterval(updateDateTime,60000);

  // ================================
  // SLIDER
  // ================================
  const slides = document.querySelectorAll('.slide');
  let currentSlide = 0;
  const showSlide = index => slides.forEach((s,i)=> s.style.opacity=i===index?'1':'0');
  const nextSlide = ()=>{currentSlide=(currentSlide+1)%slides.length; showSlide(currentSlide);}
  if(slides.length) setInterval(nextSlide,4000);

  // ================================
  // MENU DETAILS & MODAL
  // ================================
const menuDetails = {
  ayam: {
    name: 'Nasi Kebuli Ayam Premium',
    price: 'Rp 35.000',
    image: 'https://static.promediateknologi.id/crop/0x765:1080x1582/750x500/webp/photo/p1/36/2025/07/17/Screenshot_2025-07-17-17-16-32-134_comgoogleandroidappsmaps-351288658.jpg',
    description: 'Nasi kebuli dengan ayam kampung empuk dan rempah tradisional yang meresap.',
    ingredients: ['Nasi basmati premium','Ayam kampung segar','Rempah tradisional','Kismis & almond'],
    features: ['✅ Halal & higienis','✅ Porsi mengenyangkan','✅ Siap cepat']
  },
  kambing: {
    name: 'Nasi Kebuli Kambing Premium',
    price: 'Rp 45.000',
    image: 'https://img.inews.co.id/media/822/files/inews_new/2020/08/28/resep_nasi_kebuli_daging_sapi.jpg',
    description: 'Nasi kebuli dengan daging kambing muda empuk dan rempah khas Timur Tengah.',
    ingredients: ['Nasi basmati premium','Daging kambing muda','Rempah kebuli pilihan','Kacang almond & pistachio'],
    features: ['✅ Daging kambing empuk tanpa prengus','✅ Rempah premium','✅ Slow cooking & higienis']
  },
  spesial: {
    name: 'Nasi Kebuli Spesial Premium',
    price: 'Rp 55.000',
    image: 'https://cdn-image.hipwee.com/wp-content/uploads/2020/08/hipwee-1d5bcd2e-b5f3-4a75-a085-8f4afdea2d5b.jpeg',
    description: 'Nasi kebuli dengan ayam kampung & kambing muda, dilengkapi telur rebus, acar, dan kerupuk udang.',
    ingredients: ['Nasi basmati double portion','Ayam kampung + Daging kambing','Telur rebus','Acar & kerupuk udang'],
    features: ['✅ Kombinasi protein lengkap','✅ Porsi jumbo','✅ Cocok untuk acara spesial']
  },
  seafood: {
    name: 'Nasi Kebuli Seafood Premium',
    price: 'Rp 65.000',
    image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi2hQ9XENAUgudNresgz1myvdJw7zq4aW-MoWO5KZHC8bpsQGR9z29QoaliBWb3Ssvh287kH3n1ang3KsFbMKzEHkVO87pb667j0GXHcLrF0RwkZDTg2GtxdwZPZL7o6V9HRaZoUHh265W_SnLCv945b-zNdBoanh8qIUroELz48u0Huzv20fYYWtRB/s1280/maxresdefault%20(1).jpg',
    description: 'Nasi kebuli tradisional berpadu seafood segar, udang jumbo & cumi dengan rempah premium.',
    ingredients: ['Nasi basmati saffron','Udang jumbo','Cumi-cumi','Rempah kebuli premium'],
    features: ['✅ Seafood segar','✅ Kaya protein','✅ Fusion modern']
  }
};
function openMenuDetail(menuKey) {
  const item = menuDetails[menuKey];
  if (!item) return;

  const modal = document.getElementById('menuModal');
  const modalContent = document.getElementById('modalContent');

  modalContent.innerHTML = `
    <div class="relative">
      <img src="${item.image}" alt="${item.name}" class="w-full h-64 object-cover" onerror="this.style.display='none'">
      <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
      </div>
    </div>
    
    <div class="p-6">
      <div class="mb-6">
        <h3 class="font-serif text-xl font-bold text-amber-800 mb-3">Deskripsi</h3>
        <p class="text-amber-700 leading-relaxed">${item.description}</p>
      </div>
      
      <div class="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <h3 class="font-serif text-xl font-bold text-amber-800 mb-3">Komposisi Premium</h3>
          <ul class="space-y-2">
            ${item.ingredients.map(ingredient => `
              <li class="flex items-start space-x-2 text-amber-700">
                <span class="text-amber-600 mt-1">•</span>
                <span>${ingredient}</span>
              </li>`).join('')}
          </ul>
        </div>
        
        <div>
          <h3 class="font-serif text-xl font-bold text-amber-800 mb-3">Keunggulan</h3>
          <ul class="space-y-2">
            ${item.features.map(feature => `<li class="text-amber-700">${feature}</li>`).join('')}
          </ul>
        </div>
      </div>

                    
                    <div class="bg-amber-50 rounded-xl p-4 mb-6">
                        <div class="flex items-center space-x-2 mb-2">
                            <span class="text-2xl">⏰</span>
                            <span class="font-semibold text-amber-800">Waktu Persiapan: 15-20 menit</span>
                        </div>
                        <div class="flex items-center space-x-2">
                            <span class="text-2xl">🚚</span>
                            <span class="font-semibold text-amber-800">Gratis ongkir untuk minimal 2 porsi</span>
                        </div>
                    </div>
                    
                    <div class="flex flex-col sm:flex-row gap-3">
                        <button onclick="orderWhatsApp('${menuKey}')" class="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-xl font-semibold flex items-center justify-center space-x-2 transition-colors">
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                            </svg>
                            <span>Pesan via WhatsApp</span>
                        </button>
                        <button onclick="closeMenuDetail()" class="sm:w-auto bg-amber-600 hover:bg-amber-700 text-white py-3 px-6 rounded-xl font-semibold transition-colors">
                            Tutup
                        </button>
                    </div>
                </div>
            `;

  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  modalContent.focus();

  // Hilangkan WA & Back to Top saat modal muncul
  if(whatsappBtn) whatsappBtn.style.display = 'none';
  if(backToTop) backToTop.style.display = 'none';
}

function closeMenuDetail() {
  const modal = document.getElementById('menuModal');
  modal?.classList.add('hidden');
  document.body.style.overflow='auto';
  document.getElementById('modalContent').innerHTML = '';

  // Tampilkan WA & Back to Top kembali
  if(whatsappBtn) whatsappBtn.style.display = 'flex'; // atau 'block' tergantung styling aslinya
  if(backToTop) backToTop.style.display = 'flex';
}

// Tutup modal saat klik di luar konten
document.getElementById('menuModal')?.addEventListener('click', e=>{
  if(e.target === e.currentTarget) closeMenuDetail();
});

// Event listener untuk tombol menu
document.querySelectorAll('[data-menu]').forEach(btn=>{
  btn.addEventListener('click',()=> openMenuDetail(btn.dataset.menu));
});

// Fungsi WA
function orderWhatsApp(menuName){
  const waNumber = '62895413263355'; // ganti nomor WA-mu
  const text = encodeURIComponent(`Assalamu'alaikum, saya ingin memesan Nasi Kebuli: ${menuName}`);
  window.open(`https://wa.me/${waNumber}?text=${text}`, '_blank');
}

  // ================================
  // NEWSLETTER SUBSCRIPTION
  // ================================
  function subscribeNewsletter(e){
    e.preventDefault();
    const emailInput=document.getElementById('emailInput');
    const email=emailInput?.value.trim()||'';
    if(!email) return alert('Mohon masukkan alamat email Anda');
    if(!email.includes('@')) return alert('Mohon masukkan alamat email yang valid');
    alert('Terima kasih! Anda telah berlangganan newsletter kami.');
    if(emailInput) emailInput.value='';
  }

  // ================================
  // WA & BACK TO TOP
  // ================================
  const whatsappBtn = document.getElementById('whatsappBtn');
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll',()=>{
    const y=window.scrollY;
    if(whatsappBtn) whatsappBtn.style.right = y>500?'20px':'24px';
    if(backToTop) backToTop.style.opacity = y>300?'1':'0';
  });

  backToTop?.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));





