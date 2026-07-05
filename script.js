
const hamburger = document.getElementById('hamburger');
const nav       = document.getElementById('nav');

hamburger.addEventListener('click', function () {
  nav.classList.toggle('open');
  hamburger.classList.toggle('active');
});

nav.querySelectorAll('a').forEach(function (link) {
  link.addEventListener('click', function () {
    nav.classList.remove('open');
    hamburger.classList.remove('active');
  });
});


const yearEl = document.querySelector('.site-footer');
const yearPortada = document.querySelector('.portada-text');
if (yearEl) {
  const currentYear = new Date().getFullYear();
  yearEl.innerHTML = yearEl.innerHTML.replace('year', currentYear);
  yearPortada.innerHTML = yearPortada.innerHTML.replace('year', currentYear);
}

document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});


const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav a');

window.addEventListener('scroll', function () {
  let current = '';
  sections.forEach(function (section) {
    const sectionTop = section.offsetTop - 80;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(function (link) {
    link.style.color = '';
    if (link.getAttribute('href') === '#' + current) {
      link.style.color = '#39A900';
    }
  });
});


//SWITCH FIGURA

function mostrarOcultarFigura(e) {
  ocultarPoligonos();
  const selection = e.target.value;
  if (selection=='div-irregular') {
    document.getElementById('div-explicacion-arquimedes').classList.remove('oculto'); 
  } else {
    document.getElementById('div-explicacion-arquimedes').classList.add('oculto'); 
  }
  document.getElementById(selection).classList.remove('oculto');  

}

function ocultarPoligonos() {
  const divs = document.querySelectorAll('.div-calcular');

  divs.forEach(div => {
    div.classList.add('oculto');
  });
}


//CALCULAR POLIGONOS

/*function calcular(){
  const figura = document.getElementById('select-calcular').value
  const resultadoPerimetro = document.getElementById('resultado-perimetro');
  const resultadoArea = document.getElementById('resultado-area');
  const resultadoVolumen = document.getElementById('resultado-volumen');
  let valorArea;
  let valorPerimetro;
  if (figura == 'div-circulo') {
    const radio = document.getElementById('input-radio').value;
    valorArea = areaCirculo(radio);
    valorPerimetro = perimetroCirculo(radio);   
  } else if (figura == "div-cuadrado") {
    const lado = document.getElementById('input-lado').value;
    valorArea = areaCuadrado(lado);
    valorPerimetro = perimetroCuadrado(lado); 
  } 
  console.log(resultadoArea)
  resultadoArea.innerText = valorArea;
  resultadoPerimetro.innerText = valorPerimetro;  

}*/

function calcular(){
  const figura = document.getElementById('select-calcular').value
  const resultadoPerimetro = document.getElementById(figura).querySelector('.resultado-perimetro');
  const resultadoArea = document.getElementById(figura).querySelector('.resultado-area')
  const resultadoVolumen = document.getElementById(figura).querySelector('.resultado-volumen');
  if (figura == 'div-circulo') {
    const radio = document.getElementById('input-radio').value;
    resultadoArea.innerText = areaCirculo(radio);
    resultadoPerimetro.innerText = perimetroCirculo(radio);   
  } else if (figura == "div-cuadrado") {
    const lado = document.getElementById('input-lado').value;
    resultadoArea.innerText = areaCuadrilatero(lado, lado);
    resultadoPerimetro.innerText = perimetroCuadrilatero(lado, lado); 
  } else if (figura == "div-rectangulo") {
    const a = document.getElementById('input-alto').value;
    const b = document.getElementById('input-ancho').value;
    resultadoArea.innerText = areaCuadrilatero(a, b);
    resultadoPerimetro.innerText = perimetroCuadrilatero(a, b); 
  } else if (figura == "div-triangulo") {
    const x = document.getElementById('input-alto-triangulo').value;
    const y = document.getElementById('input-base').value;
    const z = document.getElementById('input-hipote').value;
    resultadoArea.innerText = areaTriangulo(x, y);
    resultadoPerimetro.innerText = perimetroTriangulo(x, y, z); 
  } else if (figura == "div-paralelo") {
    const h = document.getElementById('input-alto-paralelo').value;
    const c = document.getElementById('input-base-paralelo').value;
    const b = document.getElementById('input-hipote-paralelo').value;
    resultadoArea.innerText = areaCuadrilatero(c, h);
    resultadoPerimetro.innerText = perimetroParalelo(c, b); 
  } else if (figura == "div-cubo") {
    const l = document.getElementById('input-lado-cubo').value;
    resultadoArea.innerText = areaPrisma(l,l,l);
    resultadoVolumen.innerText = volumenPrisma(l,l,l); 
    
  } else if (figura == "div-prisma") {
    const largo = document.getElementById('input-largo-prisma').value;
    const ancho = document.getElementById('input-ancho-prisma').value;
    const alto = document.getElementById('input-alto-prisma').value;
    resultadoArea.innerText = areaPrisma(ancho,alto,largo);
    resultadoVolumen.innerText = volumenPrisma(ancho,alto,largo); 
    
  } else if (figura == "div-esfera") {
    const radio = document.getElementById('input-radio-esfera').value;
    resultadoArea.innerText = areaEsfera(radio);
    resultadoVolumen.innerText = volumenEsfera(radio); 
  } else if (figura == "div-cilindro") {
    const radio = document.getElementById('input-radio-cilindro').value;
    const altura = document.getElementById('input-altura-cilindro').value;
    resultadoArea.innerText = areaCilindro(radio,altura);
    resultadoVolumen.innerText = volumenCilindro(radio,altura); 
  } else if (figura == "div-cono") {
    const radio = document.getElementById('input-radio-cono').value;
    const altura = document.getElementById('input-altura-cono').value;
    const inclinada = document.getElementById('input-altura-inclinada-cono').value;
    resultadoArea.innerText = areaCono(radio,altura,inclinada);
    resultadoVolumen.innerText = volumenCono(radio,altura,inclinada); 
  } 
  else if (figura == "div-irregular") {
    const radio = document.getElementById('input-radio-irregular').value;
    const alturaInicial = document.getElementById('input-alturai-irregular').value;
    const alturaFinal = document.getElementById('input-alturaf-irregular').value;
    if (alturaFinal<alturaInicial) {
      alert("El Nivel final debe ser mayor al Nivel inicial");
      return
    }
    resultadoVolumen.innerText = volumenCilindro(radio,alturaFinal*1-alturaInicial*1);
  } 
}

function areaCirculo(radio) {
  const pi = Math.PI;
  const area = pi*radio*radio;
  return  Number(area.toFixed(2)); 
}

function perimetroCirculo(radio) {
  const pi = Math.PI;
  const peri = pi*2*radio;
  return Number(peri.toFixed(2));
}

function areaCuadrilatero(a, b) {
  const area = a*b;
  return  Number(area.toFixed(2)); 
}

function perimetroCuadrilatero(a, b) {
  const peri = 2*a + 2*b;
  return Number(peri.toFixed(2));
}

function areaTriangulo(a, b) {
  const area = a*b/2;
  return  Number(area.toFixed(2)); 
}

function perimetroTriangulo(a, b, c) {
  const peri = a*1 + b*1 + c*1;
  return Number(peri.toFixed(2));
}

function perimetroParalelo(b, c) {
  const peri = 2*b + 2*c;
  return Number(peri.toFixed(2));
}

function areaPrisma(ancho, altura, largo) {
  const area = 2*(ancho*altura + ancho*largo + largo*altura);
  return Number(area.toFixed(2));
}

function volumenPrisma(ancho, altura, largo) {
  const vol = ancho*largo*altura;
  return Number(vol.toFixed(2));
}

function areaEsfera(radio) {
  const pi = Math.PI;
  const area = 4*pi*radio*radio;
  return  Number(area.toFixed(2)); 
}

function volumenEsfera(radio) {
  const pi = Math.PI;
  const vol = (4/3)*pi*radio*radio*radio;
  return Number(vol.toFixed(2));
}

function areaCilindro(radio, altura) {
  const pi = Math.PI;
  const area = 2*pi*radio*(1*radio+1*altura);
  return  Number(area.toFixed(2)); 
}

function volumenCilindro(radio, altura) {
  const pi = Math.PI;
  const vol = pi*radio*radio*altura;
  return Number(vol.toFixed(2));
}

function areaCono(radio, altura, inclinada) {
  const pi = Math.PI;
  const area = pi*radio*radio + pi*radio*inclinada;
  return  Number(area.toFixed(2)); 
}

function volumenCono(radio, altura) {
  const pi = Math.PI;
  const vol = (1/3)*pi*radio*radio*altura;
  return Number(vol.toFixed(2));
}
