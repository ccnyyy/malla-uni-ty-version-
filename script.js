const ramos = document.querySelectorAll('.ramo');
const fill = document.getElementById('progress-fill');
const text = document.getElementById('progress-text');

let aprobados = JSON.parse(localStorage.getItem('aprobados')) || [];

ramos.forEach(ramo=>{
const id = ramo.dataset.id;
const prereq = ramo.dataset.prereq;

if(aprobados.includes(id)){
ramo.classList.add('approved');
}

if(prereq && !aprobados.includes(prereq)){
ramo.classList.add('locked');
}

ramo.addEventListener('click',()=>{
if(ramo.classList.contains('locked')) return;

ramo.classList.toggle('approved');

if(ramo.classList.contains('approved')){
aprobados.push(id);
}else{
aprobados = aprobados.filter(x=>x!==id);
}

localStorage.setItem('aprobados',JSON.stringify(aprobados));
location.reload();
});
});

function updateProgress(){
const total = ramos.length;
const done = document.querySelectorAll('.approved').length;
const percent = Math.round((done/total)*100);
fill.style.width = percent+'%';
text.textContent = `Avance total: ${percent}%`;
}
updateProgress();
