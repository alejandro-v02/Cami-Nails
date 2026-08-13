import React, { useEffect, useRef, useState } from "react";


const NOMBRE_NEGOCIO = "Rosa Dorada";
const WHATSAPP_NUMBER = "573001234567"; // reemplaza por el número real
const INSTAGRAM_HANDLE = "@rosadorada.nails";
const WHATSAPP_MSG = encodeURIComponent("¡Hola! Vi tu página y quiero agendar una cita 💅");
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`;

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.18 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ as: Tag = "div", delay = 0, className = "", children, ...rest }) {
  const [ref, visible] = useReveal();
  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? "reveal-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

const SERVICIOS = [
  {
    titulo: "Manicura clásica",
    detalle: "Limado, cutícula y esmaltado tradicional para unas manos siempre impecables.",
    icono: "M",
  },
  {
    titulo: "Semipermanente",
    detalle: "Color de alta duración con acabado espejo que no pierde brillo por semanas.",
    icono: "S",
  },
  {
    titulo: "Uñas acrílicas",
    detalle: "Extensión y estructura a la medida, del largo natural al statement look.",
    icono: "A",
  },
  {
    titulo: "Nail art",
    detalle: "Diseños a mano alzada, encapsulados y detalles en dorado, uno por uno.",
    icono: "N",
  },
  {
    titulo: "Pedicura spa",
    detalle: "Ritual completo de exfoliación, masaje e hidratación para tus pies.",
    icono: "P",
  },
  {
    titulo: "Retoque express",
    detalle: "Mantenimiento rápido entre citas para llegar impecable a cualquier plan.",
    icono: "R",
  },
];

// GALERÍA — swatches ilustrativos (reemplaza por <img> con fotos reales cuando las tengas)
const GALERIA = [
  { nombre: "French dorado", bg: "linear-gradient(160deg,#fbf3e8 55%,#d9a94a 55% 100%)" },
  { nombre: "Rosé glossy", bg: "linear-gradient(135deg,#f3c7d8,#e59fb9)" },
  { nombre: "Marmoleado nude", bg: "radial-gradient(circle at 30% 30%,#fff,#e8c9d3 60%,#c98aa1)" },
  { nombre: "Glitter oro rosa", bg: "linear-gradient(150deg,#e9b7c8,#d9a94a,#e9b7c8)" },
  { nombre: "Minimal blush", bg: "linear-gradient(160deg,#fbf3e8,#f3d3de)" },
  { nombre: "Chrome dorado", bg: "linear-gradient(120deg,#d9a94a,#fbe6b3,#d9a94a)" },
];

const TESTIMONIOS = [
  {
    texto: "Cada vez que salgo de mis citas siento que llevo puestas obras de arte. El detalle en cada uña es impresionante.",
    autor: "Camila R.",
  },
  {
    texto: "La semipermanente me dura semanas sin despicarse. Ya no voy a otro lugar.",
    autor: "Valentina M.",
  },
  {
    texto: "El ambiente es tan cálido como el trabajo. Salgo relajada y con las manos hermosas.",
    autor: "Daniela P.",
  },
];

function Testimonios() {
  const [idx, setIdx] = useState(0);
  const [fade, setFade] = useState(true);
  useEffect(() => {
    const t = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIdx((i) => (i + 1) % TESTIMONIOS.length);
        setFade(true);
      }, 380);
    }, 4600);
    return () => clearInterval(t);
  }, []);
  const actual = TESTIMONIOS[idx];
  return (
    <div className="testi-wrap">
      <div className={`testi-card ${fade ? "testi-in" : "testi-out"}`}>
        <span className="testi-quote">“</span>
        <p className="testi-text">{actual.texto}</p>
        <p className="testi-autor">— {actual.autor}</p>
      </div>
      <div className="testi-dots">
        {TESTIMONIOS.map((_, i) => (
          <span key={i} className={`testi-dot ${i === idx ? "testi-dot-active" : ""}`} />
        ))}
      </div>
    </div>
  );
}

function Carrusel({ items }) {
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);

  const scrollToIndex = (i) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[i];
    if (card) {
      track.scrollTo({
        left: card.offsetLeft - track.offsetLeft,
        behavior: "smooth",
      });
    }
  };

  const next = () => scrollToIndex(Math.min(active + 1, items.length - 1));
  const prev = () => scrollToIndex(Math.max(active - 1, 0));

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let raf;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const children = Array.from(track.children);
        let closest = 0;
        let min = Infinity;
        children.forEach((c, i) => {
          const d = Math.abs(c.offsetLeft - track.scrollLeft);
          if (d < min) {
            min = d;
            closest = i;
          }
        });
        setActive(closest);
      });
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="carrusel">
      <button
        type="button"
        className="carrusel-arrow carrusel-arrow-left"
        onClick={prev}
        aria-label="Foto anterior"
        disabled={active === 0}
      >
        ‹
      </button>

      <div className="carrusel-track" ref={trackRef}>
        {items.map((g, i) => (
          <div className="swatch carrusel-item" key={g.nombre}>
            <div className="swatch-bg" style={{ background: g.bg }} />
            <div className="swatch-shine" />
            <div className="swatch-label">{g.nombre}</div>
          </div>
        ))}
      </div>

      <button
        type="button"
        className="carrusel-arrow carrusel-arrow-right"
        onClick={next}
        aria-label="Foto siguiente"
        disabled={active === items.length - 1}
      >
        ›
      </button>

      <div className="carrusel-dots">
        {items.map((_, i) => (
          <button
            type="button"
            key={i}
            className={`carrusel-dot ${i === active ? "carrusel-dot-active" : ""}`}
            onClick={() => scrollToIndex(i)}
            aria-label={`Ir a la foto ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;1,500&family=Jost:wght@300;400;500;600&display=swap');

        :root{
          --cream: #FBF3E8;
          --cream-deep: #F3E4CE;
          --pink-blush: #F6D3E0;
          --pink-rose: #E8A6BF;
          --pink-deep: #C9678B;
          --gold: #C9A24B;
          --gold-light: #E9C874;
          --plum: #3E2530;
          --plum-soft: #6b4a58;
        }

        *{ box-sizing: border-box; }

        html, body, #root{
          margin: 0; padding: 0; width: 100%; min-height: 100%;
          background: #FBF3E8;
        }

        .page{
          background: var(--cream);
          color: var(--plum);
          font-family: 'Jost', sans-serif;
          overflow-x: hidden;
          position: relative;
          min-height: 100vh;
        }

        h1,h2,h3, .display{
          font-family: 'Playfair Display', serif;
          font-weight: 600;
          letter-spacing: 0.01em;
        }

        .reveal{
          opacity: 0;
          transform: translateY(26px);
          transition: opacity 0.9s cubic-bezier(.22,.68,.32,1), transform 0.9s cubic-bezier(.22,.68,.32,1);
        }
        .reveal-visible{ opacity: 1; transform: translateY(0); }

        @media (prefers-reduced-motion: reduce){
          .reveal{ transition: none; opacity: 1; transform: none; }
          *{ animation: none !important; }
        }

        /* NAV */
        .nav{
          position: fixed; top:0; left:0; right:0; z-index: 50;
          display:flex; align-items:center; justify-content:space-between;
          padding: 22px 6vw;
          transition: background 0.4s ease, padding 0.4s ease, box-shadow 0.4s ease, backdrop-filter 0.4s ease;
        }
        .nav.scrolled{
          background: rgba(251,243,232,0.72);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          padding: 14px 6vw;
          box-shadow: 0 8px 30px -18px rgba(62,37,48,0.35);
        }
        .brand{
          font-family:'Playfair Display', serif;
          font-style: italic;
          font-size: 1.35rem;
          color: var(--plum);
          letter-spacing: 0.02em;
        }
        .brand b{ color: var(--pink-deep); font-style: normal; }
        .nav-cta{
          font-family:'Jost', sans-serif;
          font-size: 0.82rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--cream);
          background: linear-gradient(120deg, var(--pink-deep), var(--gold));
          padding: 11px 22px;
          border-radius: 999px;
          text-decoration:none;
          box-shadow: 0 10px 26px -12px rgba(201,103,139,0.55);
          transition: transform 0.35s ease, box-shadow 0.35s ease;
          white-space: nowrap;
        }
        .nav-cta:hover{ transform: translateY(-2px) scale(1.03); box-shadow: 0 14px 30px -10px rgba(201,103,139,0.65); }

        /* HERO */
        .hero{
          position: relative;
          min-height: 100vh;
          display:flex; flex-direction:column; align-items:center; justify-content:center;
          text-align:center;
          padding: 120px 6vw 80px;
        }
        .hero-blob{
          position:absolute; border-radius: 50%;
          filter: blur(60px);
          opacity: 0.55;
          pointer-events:none;
        }
        .blob-1{ width: 420px; height:420px; top:-120px; left:-120px; background: radial-gradient(circle, var(--pink-rose), transparent 70%); animation: float1 14s ease-in-out infinite; }
        .blob-2{ width: 360px; height:360px; bottom:-100px; right:-100px; background: radial-gradient(circle, var(--gold-light), transparent 70%); animation: float2 17s ease-in-out infinite; }
        .blob-3{ width: 260px; height:260px; top:40%; right:8%; background: radial-gradient(circle, var(--pink-blush), transparent 70%); animation: float1 12s ease-in-out infinite reverse; }

        @keyframes float1{ 0%,100%{ transform: translate(0,0);} 50%{ transform: translate(30px,40px);} }
        @keyframes float2{ 0%,100%{ transform: translate(0,0);} 50%{ transform: translate(-35px,-25px);} }

        .sparkle{
          position:absolute; border-radius:50%;
          background: radial-gradient(circle, var(--gold-light), rgba(233,200,116,0));
          filter: blur(0.5px);
          opacity: 0;
          animation: rise linear infinite;
        }
        @keyframes rise{
          0%{ transform: translateY(0) scale(0.6); opacity:0; }
          15%{ opacity: 0.9; }
          85%{ opacity: 0.5; }
          100%{ transform: translateY(-380px) scale(1); opacity:0; }
        }

        .eyebrow{
          position:relative; z-index:2;
          font-size: 0.78rem; letter-spacing: 0.22em; text-transform: uppercase;
          color: var(--pink-deep);
          margin-bottom: 22px;
        }
        .hero h1{
          position:relative; z-index:2;
          font-size: clamp(2.6rem, 7vw, 5.2rem);
          line-height: 1.04;
          margin: 0 0 22px;
          color: var(--plum);
        }
        .hero h1 em{
          font-style: italic;
          background: linear-gradient(100deg, var(--pink-deep), var(--gold) 55%, var(--pink-deep));
          background-size: 220% auto;
          -webkit-background-clip: text; background-clip: text; color: transparent;
          animation: shimmer 6s linear infinite;
        }
        @keyframes shimmer{ to{ background-position: -220% center; } }

        .hero p.sub{
          position:relative; z-index:2;
          max-width: 520px;
          font-size: 1.08rem;
          color: var(--plum-soft);
          margin: 0 0 38px;
        }
        .hero-ctas{ position:relative; z-index:2; display:flex; gap:16px; flex-wrap:wrap; justify-content:center; }

        .btn-primary{
          font-family:'Jost'; font-size:0.92rem; letter-spacing:0.04em;
          color: var(--cream);
          background: linear-gradient(120deg, var(--pink-deep), var(--gold));
          padding: 15px 34px; border-radius: 999px; text-decoration:none;
          position: relative; overflow:hidden;
          box-shadow: 0 16px 34px -16px rgba(201,103,139,0.6);
          transition: transform 0.35s ease, box-shadow 0.35s ease;
        }
        .btn-primary:hover{ transform: translateY(-3px); box-shadow: 0 20px 38px -14px rgba(201,103,139,0.7); }
        .btn-primary::after{
          content:""; position:absolute; top:0; left:-60%; width:40%; height:100%;
          background: linear-gradient(120deg, transparent, rgba(255,255,255,0.65), transparent);
          transform: skewX(-20deg);
          animation: sweep 3.2s ease-in-out infinite;
        }
        @keyframes sweep{ 0%{ left:-60%; } 55%{ left:130%; } 100%{ left:130%; } }

        .btn-ghost{
          font-family:'Jost'; font-size:0.92rem; letter-spacing:0.04em;
          color: var(--plum);
          background: rgba(255,255,255,0.4);
          border: 1px solid rgba(62,37,48,0.18);
          padding: 15px 30px; border-radius: 999px; text-decoration:none;
          backdrop-filter: blur(6px);
          transition: transform 0.35s ease, background 0.35s ease, border-color 0.35s ease;
        }
        .btn-ghost:hover{ transform: translateY(-3px); background: rgba(255,255,255,0.7); border-color: var(--gold); }

        /* SECTION shared */
        .section{ position:relative; padding: 110px 6vw; max-width: 1180px; margin: 0 auto; }
        .section-head{ text-align:center; max-width: 640px; margin: 0 auto 56px; }
        .section-head .eyebrow{ margin-bottom: 14px; }
        .section-head h2{ font-size: clamp(2rem, 4vw, 2.9rem); margin: 0 0 16px; }
        .section-head p{ color: var(--plum-soft); font-size: 1.02rem; margin:0; }

        /* SOBRE */
        .sobre{ display:grid; grid-template-columns: 0.9fr 1.1fr; gap: 64px; align-items:center; }
        .sobre-visual{
          position:relative; height: 360px; border-radius: 28px;
          background: linear-gradient(155deg, var(--pink-blush), var(--cream-deep));
          box-shadow: inset 0 0 0 1px rgba(255,255,255,0.5);
          overflow:hidden;
        }
        .sobre-visual::before{
          content:""; position:absolute; inset: -40%;
          background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.65), transparent 55%);
          animation: rotateGlow 10s linear infinite;
        }
        @keyframes rotateGlow{ to{ transform: rotate(360deg); } }
        .sobre-visual .ring{
          position:absolute; border-radius:50%; border: 1px solid rgba(201,162,75,0.5);
        }
        .sobre-visual .ring1{ width:200px; height:200px; top:30px; left:30px; }
        .sobre-visual .ring2{ width:130px; height:130px; bottom:36px; right:36px; border-color: rgba(201,103,139,0.5); }
        .sobre-text p{ color: var(--plum-soft); line-height:1.75; font-size:1.03rem; margin: 0 0 16px; }
        .sobre-text .firma{ font-family:'Playfair Display'; font-style:italic; color: var(--pink-deep); font-size:1.2rem; }

        /* SERVICIOS */
        .servicios-grid{ display:grid; grid-template-columns: repeat(3, 1fr); gap: 26px; }
        .servicio-card{
          position:relative; overflow:hidden;
          background: rgba(255,255,255,0.55);
          border: 1px solid rgba(201,162,75,0.25);
          border-radius: 20px; padding: 32px 26px;
          transition: transform 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease;
        }
        .servicio-card:hover{
          transform: translateY(-6px);
          box-shadow: 0 24px 40px -22px rgba(62,37,48,0.28);
          border-color: var(--gold);
        }
        .servicio-card::after{
          content:""; position:absolute; top:0; left:-75%; width:50%; height:100%;
          background: linear-gradient(115deg, transparent, rgba(255,255,255,0.55), transparent);
          transform: skewX(-20deg);
          transition: left 0.8s ease;
        }
        .servicio-card:hover::after{ left: 130%; }
        .servicio-icon{
          width: 46px; height:46px; border-radius:50%;
          display:flex; align-items:center; justify-content:center;
          font-family:'Playfair Display'; font-style:italic; font-size:1.1rem;
          background: linear-gradient(135deg, var(--pink-deep), var(--gold));
          color: var(--cream); margin-bottom: 18px;
        }
        .servicio-card h3{ font-size:1.18rem; margin: 0 0 10px; }
        .servicio-card p{ color: var(--plum-soft); font-size:0.94rem; line-height:1.6; margin:0; }

        /* GALERIA — carrusel */
        .carrusel{ position: relative; padding: 0 56px; }
        .carrusel-track{
          display:flex; gap: 20px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          padding: 4px 2px 10px;
        }
        .carrusel-track::-webkit-scrollbar{ display:none; }
        .carrusel-item{
          flex: 0 0 auto;
          width: min(320px, 72vw);
          scroll-snap-align: center;
        }
        .carrusel-arrow{
          position:absolute; top:50%; transform:translateY(-50%);
          width:44px; height:44px; border-radius:50%; border:none;
          background: rgba(255,255,255,0.75);
          box-shadow: 0 10px 24px -14px rgba(62,37,48,0.4);
          color: var(--plum); font-size:1.5rem; line-height:1;
          display:flex; align-items:center; justify-content:center;
          cursor:pointer; z-index:3;
          backdrop-filter: blur(6px);
          transition: background 0.3s ease, color 0.3s ease, transform 0.3s ease, opacity 0.3s ease;
        }
        .carrusel-arrow:hover:not(:disabled){ background: linear-gradient(120deg, var(--pink-deep), var(--gold)); color: var(--cream); transform: translateY(-50%) scale(1.06); }
        .carrusel-arrow:disabled{ opacity: 0.3; cursor: default; }
        .carrusel-arrow-left{ left: 0; }
        .carrusel-arrow-right{ right: 0; }
        .carrusel-dots{ display:flex; gap:8px; justify-content:center; margin-top: 18px; }
        .carrusel-dot{
          width:8px; height:8px; border-radius:50%; padding:0; border:none;
          background: rgba(62,37,48,0.22); cursor:pointer;
          transition: background 0.3s ease, transform 0.3s ease;
        }
        .carrusel-dot-active{ background: var(--pink-deep); transform: scale(1.35); }

        .swatch{
          position:relative; aspect-ratio: 1/1; border-radius: 18px; overflow:hidden;
          box-shadow: 0 18px 30px -20px rgba(62,37,48,0.4);
          cursor: default;
        }
        .swatch-bg{ position:absolute; inset:0; transition: transform 0.6s ease; }
        .swatch:hover .swatch-bg{ transform: scale(1.08); }
        .swatch-shine{
          position:absolute; top:0; left:-70%; width:45%; height:100%;
          background: linear-gradient(115deg, transparent, rgba(255,255,255,0.75), transparent);
          transform: skewX(-18deg);
          transition: left 0.9s ease;
        }
        .swatch:hover .swatch-shine{ left: 130%; }
        .swatch-label{
          position:absolute; left:0; right:0; bottom:0;
          padding: 14px 16px;
          font-size: 0.85rem; letter-spacing:0.03em; color: var(--cream);
          background: linear-gradient(to top, rgba(62,37,48,0.55), transparent);
        }

        /* TESTIMONIOS */
        .testi-wrap{ display:flex; flex-direction:column; align-items:center; gap: 26px; }
        .testi-card{
          max-width: 620px; text-align:center;
          background: rgba(255,255,255,0.5);
          border: 1px solid rgba(201,162,75,0.25);
          border-radius: 22px; padding: 46px 40px;
          backdrop-filter: blur(4px);
          transition: opacity 0.4s ease, filter 0.4s ease, transform 0.4s ease;
        }
        .testi-in{ opacity:1; filter: blur(0); transform: translateY(0); }
        .testi-out{ opacity:0; filter: blur(6px); transform: translateY(6px); }
        .testi-quote{ font-family:'Playfair Display'; font-size:2.6rem; color: var(--gold); line-height:0; }
        .testi-text{ font-size: 1.08rem; color: var(--plum); line-height:1.7; margin: 10px 0 18px; }
        .testi-autor{ color: var(--pink-deep); font-size:0.9rem; letter-spacing:0.03em; margin:0; }
        .testi-dots{ display:flex; gap:8px; }
        .testi-dot{ width:7px; height:7px; border-radius:50%; background: rgba(62,37,48,0.22); transition: background 0.3s ease, transform 0.3s ease; }
        .testi-dot-active{ background: var(--pink-deep); transform: scale(1.3); }

        /* CONTACTO */
        .contacto{
          position:relative;
          text-align:center;
          border-radius: 32px;
          padding: 80px 6vw;
          background: linear-gradient(155deg, var(--plum), #582f43);
          color: var(--cream);
          overflow:hidden;
        }
        .contacto::before{
          content:""; position:absolute; inset:-30%;
          background: radial-gradient(circle at 20% 20%, rgba(233,200,116,0.25), transparent 55%),
                      radial-gradient(circle at 80% 80%, rgba(232,166,191,0.25), transparent 55%);
          animation: rotateGlow 16s linear infinite;
        }
        .contacto h2{ position:relative; z-index:2; font-size: clamp(1.9rem,4vw,2.7rem); margin:0 0 16px; }
        .contacto p{ position:relative; z-index:2; color: rgba(251,243,232,0.78); max-width:480px; margin: 0 auto 34px; }
        .contacto-ctas{ position:relative; z-index:2; display:flex; gap:16px; justify-content:center; flex-wrap:wrap; }
        .contacto-info{ position:relative; z-index:2; margin-top: 40px; font-size:0.88rem; color: rgba(251,243,232,0.65); letter-spacing:0.02em; }
        .contacto-info span{ margin: 0 10px; }

        footer{
          text-align:center; padding: 30px 6vw 40px;
          font-size: 0.8rem; color: var(--plum-soft);
        }

        @media (max-width: 880px){
          .sobre{ grid-template-columns: 1fr; gap: 40px; }
          .servicios-grid{ grid-template-columns: repeat(2,1fr); }
          .section{ padding: 90px 6vw; }
        }
        @media (max-width: 640px){
          .servicios-grid{ grid-template-columns: 1fr; }
          .nav{ padding: 16px 5vw; }
          .brand{ font-size: 1.1rem; }
          .nav-cta{ padding: 9px 16px; font-size: 0.72rem; letter-spacing: 0.04em; }
          .hero{ padding: 108px 6vw 60px; min-height: unset; }
          .hero-ctas{ flex-direction: column; align-items: stretch; width: 100%; }
          .hero-ctas a{ text-align: center; }
          .section{ padding: 70px 6vw; }
          .section-head{ margin-bottom: 40px; }
          .sobre-visual{ height: 220px; }
          .servicio-card{ padding: 26px 22px; }
          .testi-card{ padding: 32px 24px; }
          .contacto{ padding: 56px 6vw; }
          .contacto-ctas{ flex-direction: column; align-items: stretch; }
          .contacto-ctas a{ text-align: center; }
          .carrusel{ padding: 0 44px; }
          .carrusel-arrow{ width: 38px; height: 38px; font-size: 1.25rem; }
        }
        @media (max-width: 420px){
          .brand{ font-size: 1rem; }
          .nav-cta{ padding: 8px 13px; font-size: 0.66rem; }
          .eyebrow{ font-size: 0.68rem; letter-spacing: 0.16em; }
          .carrusel{ padding: 0 8px; }
          .carrusel-arrow{ display: none; }
          .carrusel-item{ width: 82vw; }
        }
      `}</style>

      {/* NAV */}
      <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
        <span className="brand">
          Rosa <b>Dorada</b>
        </span>
        <a className="nav-cta" href={WHATSAPP_URL} target="_blank" rel="noreferrer">
          Agendar cita
        </a>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-blob blob-1" />
        <div className="hero-blob blob-2" />
        <div className="hero-blob blob-3" />
        {Array.from({ length: 14 }).map((_, i) => (
          <span
            key={i}
            className="sparkle"
            style={{
              width: `${4 + (i % 4) * 2}px`,
              height: `${4 + (i % 4) * 2}px`,
              left: `${(i * 7.3) % 100}%`,
              bottom: `${(i * 11) % 60}px`,
              animationDuration: `${8 + (i % 5) * 2}s`,
              animationDelay: `${i * 0.6}s`,
            }}
          />
        ))}
        <p className="eyebrow">Manicura &amp; nail art en {NOMBRE_NEGOCIO.split(" ")[0]} Dorada</p>
        <h1>
          Manos que <em>brillan</em>,
          <br /> historias que se notan
        </h1>
        <p className="sub">
          Cada set de uñas es una pieza hecha a mano: color, textura y detalle
          pensados para ti. Conoce el trabajo y agenda tu próxima cita.
        </p>
        <div className="hero-ctas">
          <a className="btn-primary" href={WHATSAPP_URL} target="_blank" rel="noreferrer">
            Reservar por WhatsApp
          </a>
          <a className="btn-ghost" href="#galeria">
            Ver el trabajo
          </a>
        </div>
      </section>

      {/* SOBRE */}
      <section className="section">
        <div className="sobre">
          <Reveal className="sobre-visual">
            <span className="ring ring1" />
            <span className="ring ring2" />
          </Reveal>
          <Reveal delay={120} className="sobre-text">
            <p className="eyebrow" style={{ marginBottom: 14 }}>
              Sobre el trabajo
            </p>
            <h2 style={{ marginTop: 0 }}>Precisión, calidez y mucho detalle</h2>
            <p>
              Detrás de cada diseño hay años de práctica y cariño por el
              oficio. Cada cita empieza escuchando lo que quieres lograr, y
              termina con un resultado duradero que se siente y se ve
              impecable.
            </p>
            <p>
              Uso productos de calidad, técnicas actualizadas y una atención
              a los detalles que se nota incluso en el uñero más pequeño.
            </p>
            <p className="firma">— siempre hecho a mano, siempre para ti</p>
          </Reveal>
        </div>
      </section>

      {/* SERVICIOS */}
      <section className="section" id="servicios">
        <Reveal as="div" className="section-head">
          <p className="eyebrow">Servicios</p>
          <h2>Todo lo que tus manos merecen</h2>
          <p>Elige el servicio que más te guste, o combínalos en una sola cita.</p>
        </Reveal>
        <div className="servicios-grid">
          {SERVICIOS.map((s, i) => (
            <Reveal key={s.titulo} delay={i * 90} className="servicio-card">
              <div className="servicio-icon">{s.icono}</div>
              <h3>{s.titulo}</h3>
              <p>{s.detalle}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* GALERIA */}
      <section className="section" id="galeria">
        <Reveal as="div" className="section-head">
          <p className="eyebrow">Galería</p>
          <h2>Algunos diseños recientes</h2>
          <p>
            Una muestra de estilos y acabados. Pronto con fotos reales del
            trabajo terminado.
          </p>
        </Reveal>
        <Reveal>
          <Carrusel items={GALERIA} />
        </Reveal>
      </section>

      {/* TESTIMONIOS */}
      <section className="section">
        <Reveal as="div" className="section-head">
          <p className="eyebrow">Clientas felices</p>
          <h2>Lo que dicen después de su cita</h2>
        </Reveal>
        <Testimonios />
      </section>

      {/* CONTACTO */}
      <section className="section">
        <Reveal className="contacto">
          <h2>Agenda tu próxima cita</h2>
          <p>
            Escríbeme por WhatsApp o Instagram y coordinamos el mejor horario
            para ti.
          </p>
          <div className="contacto-ctas">
            <a className="btn-primary" href={WHATSAPP_URL} target="_blank" rel="noreferrer">
              Escribir por WhatsApp
            </a>
            <a
              className="btn-ghost"
              style={{ color: "var(--cream)", borderColor: "rgba(251,243,232,0.4)", background: "rgba(255,255,255,0.08)" }}
              href={`https://instagram.com/${INSTAGRAM_HANDLE.replace("@", "")}`}
              target="_blank"
              rel="noreferrer"
            >
              {INSTAGRAM_HANDLE}
            </a>
          </div>
          <p className="contacto-info">
            Pitalito, Huila <span>·</span> Lunes a sábado <span>·</span> Citas
            previas
          </p>
        </Reveal>
      </section>

      <footer>
        © {new Date().getFullYear()} {NOMBRE_NEGOCIO} Nails — hecho con cariño para cada clienta.
      </footer>
    </div>
  );
}
