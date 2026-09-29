import { useEffect, useRef, useState } from "react";
import type { ReactNode, ElementType, RefObject, CSSProperties } from "react";
import { createPortal } from "react-dom";

import image1 from "../assets/image1.png";
import image2 from "../assets/image2.png";
import image3 from "../assets/image3.png";
import image4 from "../assets/image4.png";
import image5 from "../assets/image5.png";
import image6 from "../assets/image6.png";
import image7 from "../assets/image7.png";
import image8 from "../assets/image8.png";
import image9 from "../assets/image9.png";
import image10 from "../assets/image10.png";
import image11 from "../assets/image11.png";
import image12 from "../assets/image12.png";
import image13 from "../assets/image13.png";
import image14 from "../assets/image14.png";
import image15 from "../assets/image15.png";


const NOMBRE_NEGOCIO = "Rosa Dorada";
const WHATSAPP_NUMBER = "573001234567"; // reemplaza por el número real
const INSTAGRAM_HANDLE = "@rosadorada.nails";
const WHATSAPP_MSG = encodeURIComponent("¡Hola! Vi tu página y quiero agendar una cita 💅");
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`;

function useReveal(): [RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement | null>(null);
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

interface RevealProps {
  as?: ElementType;
  delay?: number;
  className?: string;
  children?: ReactNode;
  id?: string;
}

function Reveal({ as: Tag = "div", delay = 0, className = "", children, ...rest }: RevealProps) {
  const [ref, visible] = useReveal();
  return (
    <Tag
      ref={ref as never}
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

// GALERÍA — fotos reales del trabajo
interface GaleriaItem {
  nombre: string;
  img: string;
}

const GALERIA: GaleriaItem[] = [
  { nombre: "Diseño 1", img: image1 },
  { nombre: "Diseño 2", img: image2 },
  { nombre: "Diseño 3", img: image3 },
  { nombre: "Diseño 4", img: image4 },
  { nombre: "Diseño 5", img: image5 },
  { nombre: "Diseño 6", img: image6 },
  { nombre: "Diseño 7", img: image7 },
  { nombre: "Diseño 8", img: image8 },
  { nombre: "Diseño 9", img: image9 },
  { nombre: "Diseño 10", img: image10 },
  { nombre: "Diseño 11", img: image11 },
  { nombre: "Diseño 12", img: image12 },
  { nombre: "Diseño 13", img: image13 },
  { nombre: "Diseño 14", img: image14 },
  { nombre: "Diseño 15", img: image15 },
];

const TESTIMONIOS: { texto: string; autor: string }[] = [
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
  const [pausado, setPausado] = useState(false);
  // se reinicia en cada cambio de idx, así el clic en un punto reinicia el temporizador
  // y se detiene mientras el ratón está encima para poder leer con calma
  useEffect(() => {
    if (pausado) return;
    let fadeTimer: ReturnType<typeof setTimeout>;
    const t = setTimeout(() => {
      setFade(false);
      fadeTimer = setTimeout(() => {
        setIdx((i) => (i + 1) % TESTIMONIOS.length);
        setFade(true);
      }, 380);
    }, 4600);
    return () => {
      clearTimeout(t);
      clearTimeout(fadeTimer);
    };
  }, [idx, pausado]);
  const irA = (i: number) => {
    setIdx(i);
    setFade(true);
  };
  const actual = TESTIMONIOS[idx];
  return (
    <div className="testi-wrap">
      <div
        className={`testi-card ${fade ? "testi-in" : "testi-out"}`}
        onPointerEnter={(e) => {
          if (e.pointerType !== "mouse") return;
          setPausado(true);
          setFade(true); // por si entra justo a mitad del desvanecido
        }}
        onPointerLeave={(e) => e.pointerType === "mouse" && setPausado(false)}
      >
        <span className="testi-quote">“</span>
        <p className="testi-text">{actual.texto}</p>
        <p className="testi-autor">— {actual.autor}</p>
      </div>
      <div className="testi-dots">
        {TESTIMONIOS.map((_, i) => (
          <button
            type="button"
            key={i}
            className={`testi-dot ${i === idx ? "testi-dot-active" : ""}`}
            onClick={() => irA(i)}
            aria-label={`Ver testimonio ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

const AUTOPLAY_MS = 3500;

function Carrusel({ items }: { items: GaleriaItem[] }) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);
  const [abierta, setAbierta] = useState<number | null>(null);
  const swipeX = useRef<number | null>(null);

  const fotoSiguiente = () => setAbierta((i) => (i === null ? i : (i + 1) % items.length));
  const fotoAnterior = () => setAbierta((i) => (i === null ? i : (i - 1 + items.length) % items.length));

  useEffect(() => {
    if (abierta === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAbierta(null);
      if (e.key === "ArrowRight") setAbierta((i) => (i === null ? i : (i + 1) % items.length));
      if (e.key === "ArrowLeft") setAbierta((i) => (i === null ? i : (i - 1 + items.length) % items.length));
    };
    const overflowPrevio = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflowPrevio;
      window.removeEventListener("keydown", onKey);
    };
  }, [abierta, items.length]);

  // scroll solo horizontal dentro del track (scrollIntoView movería también la página)
  const scrollToIndex = (i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[i] as HTMLElement | undefined;
    if (card) {
      const left = card.offsetLeft - (track.clientWidth - card.offsetWidth) / 2;
      track.scrollTo({ left, behavior: "smooth" });
    }
  };

  const next = () => scrollToIndex((active + 1) % items.length);
  const prev = () => scrollToIndex((active - 1 + items.length) % items.length);

  // AUTOPLAY — avanza solo mientras está en pantalla y nadie lo está usando
  const [hover, setHover] = useState(false);
  const [tocado, setTocado] = useState(false);
  const [enPantalla, setEnPantalla] = useState(false);
  const tocadoTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const reduceMotion =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const reproduciendo = enPantalla && !hover && !tocado && abierta === null && !reduceMotion;

  const onTouch = () => {
    setTocado(true);
    clearTimeout(tocadoTimer.current);
    tocadoTimer.current = setTimeout(() => setTocado(false), 6000);
  };

  useEffect(() => () => clearTimeout(tocadoTimer.current), []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const obs = new IntersectionObserver(([entry]) => setEnPantalla(entry.isIntersecting), {
      threshold: 0.4,
    });
    obs.observe(track);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!reproduciendo) return;
    const t = setTimeout(() => scrollToIndex((active + 1) % items.length), AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [active, reproduciendo, items.length]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const updateActive = () => {
      const children = Array.from(track.children) as HTMLElement[];
      if (children.length === 0) return;
      const trackRect = track.getBoundingClientRect();
      const center = trackRect.width / 2;
      let closest = 0;
      let min = Infinity;
      children.forEach((c, i) => {
        const rect = c.getBoundingClientRect();
        const cardCenter = rect.left - trackRect.left + rect.width / 2;
        const d = Math.abs(cardCenter - center);
        if (d < min) {
          min = d;
          closest = i;
        }
      });
      setActive(closest);
    };

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(updateActive);
    };
    track.addEventListener("scroll", onScroll, { passive: true });

    const ro = new ResizeObserver(() => updateActive());
    ro.observe(track);

    return () => {
      track.removeEventListener("scroll", onScroll);
      ro.disconnect();
    };
  }, []);

  return (
    <div
      className={`carrusel ${reproduciendo ? "carrusel-playing" : ""}`}
      // solo ratón real: en táctil el navegador simula mouseenter sin mouseleave y el carrusel quedaba pausado
      onPointerEnter={(e) => e.pointerType === "mouse" && setHover(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setHover(false)}
      onTouchStart={onTouch}
      style={{ "--autoplay-ms": `${AUTOPLAY_MS}ms` } as CSSProperties}
    >
      <button
        type="button"
        className="carrusel-arrow carrusel-arrow-left"
        onClick={prev}
        aria-label="Foto anterior"
      >
        ‹
      </button>

      <div className="carrusel-track" ref={trackRef}>
        {items.map((g, i) => (
          <button
            type="button"
            className={`swatch carrusel-item ${i === active ? "carrusel-item-active" : ""}`}
            key={g.nombre}
            onClick={() => setAbierta(i)}
            aria-label={`Ampliar ${g.nombre}`}
          >
            <img className="swatch-bg" src={g.img} alt={g.nombre} loading="lazy" />
            <div className="swatch-shine" />
            <div className="swatch-label">{g.nombre}</div>
          </button>
        ))}
      </div>

      <button
        type="button"
        className="carrusel-arrow carrusel-arrow-right"
        onClick={next}
        aria-label="Foto siguiente"
      >
        ›
      </button>

      <div className="carrusel-dots">
        {items.map((_, i) => (
          <button
            type="button"
            // la key cambia al pausar/reanudar para reiniciar la barra de progreso
            key={i === active ? `${i}-${reproduciendo}` : i}
            className={`carrusel-dot ${i === active ? "carrusel-dot-active" : ""}`}
            onClick={() => scrollToIndex(i)}
            aria-label={`Ir a la foto ${i + 1}`}
          />
        ))}
      </div>

      {abierta !== null && createPortal(
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={items[abierta].nombre}
          onClick={() => setAbierta(null)}
          onTouchStart={(e) => {
            swipeX.current = e.touches[0].clientX;
          }}
          onTouchEnd={(e) => {
            if (swipeX.current === null) return;
            const dx = e.changedTouches[0].clientX - swipeX.current;
            swipeX.current = null;
            if (dx < -50) fotoSiguiente();
            else if (dx > 50) fotoAnterior();
          }}
        >
          <img
            className="lightbox-img"
            src={items[abierta].img}
            alt={items[abierta].nombre}
            onClick={(e) => e.stopPropagation()}
          />
          <p className="lightbox-caption">
            {items[abierta].nombre} · {abierta + 1}/{items.length}
          </p>
          <button
            type="button"
            className="lightbox-nav lightbox-nav-left"
            onClick={(e) => {
              e.stopPropagation();
              fotoAnterior();
            }}
            aria-label="Foto anterior"
          >
            ‹
          </button>
          <button
            type="button"
            className="lightbox-nav lightbox-nav-right"
            onClick={(e) => {
              e.stopPropagation();
              fotoSiguiente();
            }}
            aria-label="Foto siguiente"
          >
            ›
          </button>
          <button type="button" className="lightbox-close" onClick={() => setAbierta(null)} aria-label="Cerrar">
            ×
          </button>
        </div>,
        document.body
      )}
    </div>
  );
}

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll(); // al recargar a mitad de página el navegador restaura el scroll sin disparar el evento
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="page">
      <style>{`
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

        /* contorno visible al navegar con teclado (Tab), no al hacer clic */
        a:focus-visible, button:focus-visible{
          outline: 2px solid var(--gold);
          outline-offset: 3px;
        }

        html{
          scroll-behavior: smooth;
        }
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
          text-decoration: none;
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
          -webkit-backdrop-filter: blur(6px);
          transition: transform 0.35s ease, background 0.35s ease, border-color 0.35s ease;
        }
        .btn-ghost:hover{ transform: translateY(-3px); background: rgba(255,255,255,0.7); border-color: var(--gold); }
        /* variante para fondos oscuros (sección de contacto) */
        .btn-ghost-dark{ color: var(--cream); border-color: rgba(251,243,232,0.4); background: rgba(255,255,255,0.08); }
        .btn-ghost-dark:hover{ background: rgba(255,255,255,0.18); }

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
          position: relative;
          --item-w: min(320px, 72vw);
          /* margen lateral para que la primera y la última foto también queden centradas */
          padding: 26px calc(50% - var(--item-w) / 2) 30px;
          /* las fotos se desvanecen hacia los bordes */
          -webkit-mask-image: linear-gradient(to right, transparent, #000 12%, #000 88%, transparent);
          mask-image: linear-gradient(to right, transparent, #000 12%, #000 88%, transparent);
        }
        .carrusel-track::-webkit-scrollbar{ display:none; }
        .carrusel-item{
          flex: 0 0 auto;
          width: var(--item-w);
          scroll-snap-align: center;
          transform: scale(0.84);
          opacity: 0.5;
          filter: saturate(0.7);
          transition: transform 0.7s cubic-bezier(.22,.68,.32,1), opacity 0.7s ease, filter 0.7s ease, box-shadow 0.7s ease;
        }
        .carrusel-item-active{
          transform: scale(1);
          opacity: 1;
          filter: none;
          box-shadow: 0 30px 50px -24px rgba(201,103,139,0.55), 0 0 0 2px rgba(233,200,116,0.65);
        }
        .carrusel-item-active .swatch-bg{ animation: kenburns 7s ease-in-out infinite alternate; }
        @keyframes kenburns{ from{ transform: scale(1); } to{ transform: scale(1.07); } }
        .carrusel-arrow{
          position:absolute; top:50%; transform:translateY(-50%);
          width:44px; height:44px; border-radius:50%; border:none;
          background: rgba(255,255,255,0.75);
          box-shadow: 0 10px 24px -14px rgba(62,37,48,0.4);
          color: var(--plum); font-size:1.5rem; line-height:1;
          display:flex; align-items:center; justify-content:center;
          cursor:pointer; z-index:3;
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          transition: background 0.3s ease, color 0.3s ease, transform 0.3s ease, opacity 0.3s ease;
        }
        .carrusel-arrow:hover:not(:disabled){ background: linear-gradient(120deg, var(--pink-deep), var(--gold)); color: var(--cream); transform: translateY(-50%) scale(1.06); }
        .carrusel-arrow:disabled{ opacity: 0.3; cursor: default; }
        .carrusel-arrow-left{ left: 0; }
        .carrusel-arrow-right{ right: 0; }
        .carrusel-dots{ display:flex; gap:8px; justify-content:center; align-items:center; flex-wrap:wrap; margin-top: 8px; }
        .carrusel-dot{
          width:8px; height:8px; border-radius:999px; padding:0; border:none;
          background: rgba(62,37,48,0.22); cursor:pointer;
          position: relative; overflow: hidden;
          transition: background 0.3s ease, width 0.4s ease;
        }
        .carrusel-dot-active{ width: 28px; background: var(--pink-deep); }
        /* mientras avanza solo, el punto activo se llena como barra de progreso */
        .carrusel-playing .carrusel-dot-active{ background: rgba(201,103,139,0.3); }
        .carrusel-playing .carrusel-dot-active::after{
          content:""; position:absolute; inset:0;
          background: linear-gradient(90deg, var(--pink-deep), var(--gold));
          transform-origin: left;
          animation: carruselProgreso var(--autoplay-ms) linear forwards;
        }
        @keyframes carruselProgreso{ from{ transform: scaleX(0); } to{ transform: scaleX(1); } }

        .swatch{
          position:relative; aspect-ratio: 1/1; border-radius: 18px; overflow:hidden;
          box-shadow: 0 18px 30px -20px rgba(62,37,48,0.4);
          cursor: pointer;
          padding: 0; border: none; background: none; font: inherit; display: block;
        }

        .lightbox{
          position: fixed; inset: 0; z-index: 100;
          display:flex; flex-direction:column; align-items:center; justify-content:center; gap: 14px;
          padding: 24px;
          font-family: 'Jost', sans-serif; /* va en un portal fuera de .page, no hereda la fuente */
          background: rgba(62,37,48,0.88);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          animation: lightboxIn 0.3s ease;
        }
        @keyframes lightboxIn{ from{ opacity:0; } to{ opacity:1; } }
        .lightbox-img{
          max-width: min(90vw, 720px); max-height: 80vh;
          border-radius: 18px; object-fit: contain;
          box-shadow: 0 30px 60px -20px rgba(0,0,0,0.6);
        }
        .lightbox-caption{ margin:0; color: var(--cream); font-size: 0.9rem; letter-spacing: 0.04em; }
        .lightbox-close{
          position:absolute; top: 18px; right: 18px;
          width:44px; height:44px; border-radius:50%; border:none;
          background: rgba(255,255,255,0.15); color: var(--cream);
          font-size: 1.6rem; line-height:1; cursor:pointer;
          transition: background 0.3s ease;
        }
        .lightbox-close:hover{ background: linear-gradient(120deg, var(--pink-deep), var(--gold)); }
        .lightbox-nav{
          position:absolute; top:50%; transform: translateY(-50%);
          width:48px; height:48px; border-radius:50%; border:none;
          background: rgba(255,255,255,0.15); color: var(--cream);
          font-size: 1.8rem; line-height:1; cursor:pointer;
          display:flex; align-items:center; justify-content:center;
          transition: background 0.3s ease;
        }
        .lightbox-nav:hover{ background: linear-gradient(120deg, var(--pink-deep), var(--gold)); }
        .lightbox-nav-left{ left: 16px; }
        .lightbox-nav-right{ right: 16px; }
        @media (max-width: 640px){
          .lightbox-img{ max-width: 100%; max-height: 70vh; }
          /* en el teléfono las flechas van abajo para no tapar la foto */
          .lightbox-nav{ top: auto; bottom: 22px; transform: none; }
          .lightbox-nav-left{ left: calc(50% - 64px); }
          .lightbox-nav-right{ right: calc(50% - 64px); }
          .lightbox{ padding-bottom: 90px; }
        }
        .swatch-bg{
          position:absolute; inset:0; width:100%; height:100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }
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
          -webkit-backdrop-filter: blur(4px);
          transition: opacity 0.4s ease, filter 0.4s ease, transform 0.4s ease;
        }
        .testi-in{ opacity:1; filter: blur(0); transform: translateY(0); }
        .testi-out{ opacity:0; filter: blur(6px); transform: translateY(6px); }
        .testi-quote{ font-family:'Playfair Display'; font-size:2.6rem; color: var(--gold); line-height:0; }
        .testi-text{ font-size: 1.08rem; color: var(--plum); line-height:1.7; margin: 10px 0 18px; }
        .testi-autor{ color: var(--pink-deep); font-size:0.9rem; letter-spacing:0.03em; margin:0; }
        .testi-dots{ display:flex; gap:8px; }
        .testi-dot{ width:7px; height:7px; border-radius:50%; padding:0; border:none; cursor:pointer; background: rgba(62,37,48,0.22); transition: background 0.3s ease, transform 0.3s ease; }
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
          .carrusel{ padding: 0 56px; }
          .carrusel-arrow{ width: 38px; height: 38px; font-size: 1.25rem; }
        }
        @media (max-width: 420px){
          .brand{ font-size: 1rem; }
          .nav-cta{ padding: 8px 13px; font-size: 0.66rem; }
          .eyebrow{ font-size: 0.68rem; letter-spacing: 0.16em; }
          .carrusel{ padding: 0 8px; }
          .carrusel-arrow{ display: none; }
          .carrusel-track{ --item-w: 78vw; }
        }
      `}</style>

      {/* NAV */}
      <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
        <a className="brand" href="#" title="Volver al inicio">
          {NOMBRE_NEGOCIO.split(" ")[0]} <b>{NOMBRE_NEGOCIO.split(" ").slice(1).join(" ")}</b>
        </a>
        <a className="nav-cta" href={WHATSAPP_URL} target="_blank" rel="noreferrer">
          Agendar cita
        </a>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-blob blob-1" aria-hidden="true" />
        <div className="hero-blob blob-2" aria-hidden="true" />
        <div className="hero-blob blob-3" aria-hidden="true" />
        {Array.from({ length: 14 }).map((_, i) => (
          <span
            key={i}
            className="sparkle"
            aria-hidden="true"
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
        <p className="eyebrow">Manicura &amp; nail art en {NOMBRE_NEGOCIO}</p>
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
      <section className="section" id="sobre">
        <div className="sobre">
          <Reveal className="sobre-visual">
            <span className="ring ring1" aria-hidden="true" />
            <span className="ring ring2" aria-hidden="true" />
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
          <p>Una muestra de estilos y acabados del trabajo terminado.</p>
        </Reveal>
        <Reveal>
          <Carrusel items={GALERIA} />
        </Reveal>
      </section>

      {/* TESTIMONIOS */}
      <section className="section" id="testimonios">
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
              className="btn-ghost btn-ghost-dark"
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