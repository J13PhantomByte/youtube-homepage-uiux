const videos = [
  {title:"Belajar HTML & CSS dari Nol — Bikin Website Pertamamu",channel:"Code Indonesia",views:"128 rb x ditonton",age:"2 hari yang lalu",duration:"18:42",category:"Teknologi",avatar:"CI",color:"#386c91",image:"https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=900&q=85"},
  {title:"Playlist Santai untuk Menemani Waktu Produktif",channel:"Ruang Musik",views:"2,1 jt x ditonton",age:"1 minggu yang lalu",duration:"45:12",category:"Musik",avatar:"RM",color:"#8a5b83",image:"https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=900&q=85"},
  {title:"Setup Meja Kerja Minimalis untuk Programmer",channel:"Tech Corner",views:"86 rb x ditonton",age:"3 hari yang lalu",duration:"12:08",category:"Teknologi",avatar:"TC",color:"#547c6b",image:"https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=900&q=85"},
  {title:"Petualangan Dunia Terbuka yang Wajib Kamu Coba",channel:"Playground",views:"540 rb x ditonton",age:"5 hari yang lalu",duration:"24:36",category:"Gaming",avatar:"P",color:"#9b6b45",image:"https://images.unsplash.com/photo-1542751371-adc38448a05e?w=900&q=85"},
  {title:"Cara Mengatur Waktu Belajar agar Lebih Fokus",channel:"Belajar Bareng",views:"72 rb x ditonton",age:"1 hari yang lalu",duration:"09:51",category:"Edukasi",avatar:"BB",color:"#477b87",image:"https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=900&q=85"},
  {title:"Obrolan Sore: Kreativitas dan Dunia Digital",channel:"Cerita Kita",views:"210 rb x ditonton",age:"6 hari yang lalu",duration:"38:20",category:"Podcast",avatar:"CK",color:"#806b9b",image:"https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=900&q=85"},
  {title:"Di Balik Proses Membuat Animasi Digital",channel:"Motion Lab",views:"95 rb x ditonton",age:"4 hari yang lalu",duration:"16:03",category:"Animasi",avatar:"ML",color:"#a05b5b",image:"https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=900&q=85"},
  {title:"Highlight Pertandingan Minggu Ini",channel:"Arena Update",views:"1,4 jt x ditonton",age:"12 jam yang lalu",duration:"11:27",category:"Hiburan",avatar:"AU",color:"#557d55",image:"https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=900&q=85"},
  {title:"Teknologi Masa Depan yang Mulai Hadir Hari Ini",channel:"Sains Sederhana",views:"310 rb x ditonton",age:"2 minggu yang lalu",duration:"20:14",category:"Teknologi",avatar:"SS",color:"#51728f",image:"https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&q=85"},
  {title:"Rekomendasi Game untuk Mengisi Akhir Pekan",channel:"Main Terus",views:"420 rb x ditonton",age:"8 hari yang lalu",duration:"14:44",category:"Gaming",avatar:"MT",color:"#8b704d",image:"https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=900&q=85"},
  {title:"Belajar Desain Presentasi yang Menarik",channel:"Kelas Kreatif",views:"64 rb x ditonton",age:"3 minggu yang lalu",duration:"13:19",category:"Edukasi",avatar:"KK",color:"#8b6c83",image:"https://images.unsplash.com/photo-1455390582262-044cdead277a?w=900&q=85"},
  {title:"Kabar Teknologi dan Inovasi Terbaru",channel:"Info Hari Ini",views:"188 rb x ditonton",age:"1 hari yang lalu",duration:"07:58",category:"Berita",avatar:"IH",color:"#6d7888",image:"https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=900&q=85"}
];

const grid = document.getElementById("videoGrid");
const searchInput = document.getElementById("searchInput");
const resultCount = document.getElementById("resultCount");
const emptyState = document.getElementById("emptyState");
const toast = document.getElementById("toast");
let selectedCategory = "Semua";
let searchTerm = "";
let toastTimer;

function showToast(message){
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=>toast.classList.remove("show"),2300);
}
function escapeHTML(value){
  return String(value).replace(/[&<>"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[char]));
}
function renderVideos(){
  const filtered = videos.filter(video => {
    const categoryMatch = selectedCategory === "Semua" || video.category === selectedCategory;
    const haystack = `${video.title} ${video.channel} ${video.category}`.toLocaleLowerCase("id");
    return categoryMatch && haystack.includes(searchTerm.toLocaleLowerCase("id"));
  });
  grid.innerHTML = filtered.map((video,index)=>`
    <article class="video-card" style="animation-delay:${Math.min(index*35,250)}ms">
      <div class="thumbnail-wrap">
        <img class="thumbnail" src="${escapeHTML(video.image)}" alt="Thumbnail ${escapeHTML(video.title)}" loading="${index<3?"eager":"lazy"}">
        <span class="duration">${escapeHTML(video.duration)}</span>
      </div>
      <div class="video-info">
        <div class="channel-avatar" style="--avatar:${escapeHTML(video.color)}" aria-hidden="true">${escapeHTML(video.avatar)}</div>
        <div class="video-copy">
          <h2 class="video-title">${escapeHTML(video.title)}</h2>
          <div class="channel-name">${escapeHTML(video.channel)} <span class="verified" aria-label="Terverifikasi">●</span></div>
          <div class="video-meta">${escapeHTML(video.views)} · ${escapeHTML(video.age)}</div>
        </div>
        <button class="more-button" aria-label="Opsi video ${escapeHTML(video.title)}" data-title="${escapeHTML(video.title)}">⋮</button>
      </div>
    </article>`).join("");
  resultCount.textContent = `${filtered.length} video`;
  emptyState.classList.toggle("hidden",filtered.length!==0);
  grid.classList.toggle("hidden",filtered.length===0);
}
document.getElementById("searchForm").addEventListener("submit",event=>{
  event.preventDefault();
  searchTerm=searchInput.value.trim();
  renderVideos();
  if(searchTerm) showToast(`Hasil pencarian untuk “${searchTerm}”`);
});
searchInput.addEventListener("input",()=>{
  searchTerm=searchInput.value.trim();
  renderVideos();
});
document.getElementById("categoryBar").addEventListener("click",event=>{
  const chip=event.target.closest(".chip");
  if(!chip)return;
  document.querySelectorAll(".chip").forEach(item=>item.classList.toggle("active",item===chip));
  selectedCategory=chip.dataset.category;
  renderVideos();
});
document.getElementById("resetButton").addEventListener("click",()=>{
  searchInput.value="";searchTerm="";selectedCategory="Semua";
  document.querySelectorAll(".chip").forEach(item=>item.classList.toggle("active",item.dataset.category==="Semua"));
  renderVideos();
});
document.getElementById("menuToggle").addEventListener("click",()=>{
  const sidebar=document.getElementById("sidebar");
  const main=document.getElementById("mainContent");
  if(window.innerWidth<=760){sidebar.classList.toggle("mobile-open");}
  else{sidebar.classList.toggle("collapsed");main.classList.toggle("expanded");}
});
document.querySelector(".sidebar").addEventListener("click",event=>{
  const item=event.target.closest(".nav-item");
  if(!item)return;
  event.preventDefault();
  document.querySelectorAll(".nav-item").forEach(nav=>nav.classList.toggle("active",nav===item));
  showToast(`Menu ${item.dataset.nav} dipilih (simulasi)`);
  if(window.innerWidth<=760)document.getElementById("sidebar").classList.remove("mobile-open");
});
grid.addEventListener("click",event=>{
  const button=event.target.closest(".more-button");
  if(button)showToast(`Opsi untuk: ${button.dataset.title}`);
});
document.getElementById("createButton").addEventListener("click",()=>showToast("Fitur Buat masih berupa simulasi prototype."));
document.getElementById("notificationButton").addEventListener("click",()=>showToast("Belum ada notifikasi baru."));
document.getElementById("profileButton").addEventListener("click",()=>showToast("Menu profil (simulasi prototype)."));
window.addEventListener("resize",()=>{
  if(window.innerWidth>760)document.getElementById("sidebar").classList.remove("mobile-open");
});
renderVideos();