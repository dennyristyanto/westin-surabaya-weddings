// Dialogs retain native focus trapping, Escape dismissal, and focus restoration.
const siteDialogs=[...document.querySelectorAll('.nye-promotion-popup,.capacity-chart-dialog')];
function syncPopupScroll(){document.documentElement.classList.toggle('site-popup-open',siteDialogs.some(d=>d.open));}
function showSiteDialog(dialog){if(!dialog||dialog.open)return;dialog.showModal();syncPopupScroll();}
siteDialogs.forEach(dialog=>{
 dialog.querySelectorAll('[data-close-dialog]').forEach(button=>button.addEventListener('click',()=>dialog.close()));
 dialog.addEventListener('close',syncPopupScroll);
 dialog.addEventListener('click',event=>{if(event.target!==dialog)return;const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();});
});
const nyePromotion=document.querySelector('#nye-promotion-popup');
if(nyePromotion){
 const seenKey='westin-nye-2027-promotion-seen';let seen=false;
 try{seen=sessionStorage.getItem(seenKey)==='1';}catch{}
 if(!seen){showSiteDialog(nyePromotion);try{sessionStorage.setItem(seenKey,'1');}catch{}}
 nyePromotion.querySelector('a').addEventListener('click',()=>nyePromotion.close());
}
const capacityDialog=document.querySelector('#capacity-chart-dialog');
if(capacityDialog){
 let zoom=100;
 const pages=capacityDialog.querySelector('.chart-pages');const label=capacityDialog.querySelector('#chart-zoom-label');
 function updateZoom(){pages.style.width=zoom+'%';label.textContent=zoom+'%';capacityDialog.querySelector('[data-chart-zoom="out"]').disabled=zoom<=100;capacityDialog.querySelector('[data-chart-zoom="in"]').disabled=zoom>=250;}
 document.querySelectorAll('[data-open-capacity]').forEach(button=>button.addEventListener('click',()=>{zoom=100;updateZoom();showSiteDialog(capacityDialog);}));
 capacityDialog.querySelectorAll('[data-chart-zoom]').forEach(button=>button.addEventListener('click',()=>{if(button.dataset.chartZoom==='fit')zoom=100;else zoom=Math.max(100,Math.min(250,zoom+(button.dataset.chartZoom==='in'?25:-25)));updateZoom();}));
 updateZoom();
}
