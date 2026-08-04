'use client';

import {
  Camera,
  Mesh,
  Plane,
  Program,
  Renderer,
  Texture,
  Transform
} from 'ogl';

import { useEffect, useRef } from 'react';

import './CircularGallery.css';

function debounce(func, wait) {
  let timeout;

  return function (...args) {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      func.apply(this, args);
    }, wait);
  };
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

async function loadGoogleFont(fontUrl) {
  try {
    const response = await fetch(fontUrl);

    if (!response.ok) {
      throw new Error(`Font request failed: ${response.status}`);
    }

    const css = await response.text();

    const fontFaces = css.match(/@font-face\s*{[^}]*}/g) || [];

    for (const block of fontFaces) {
      const familyMatch = block.match(/font-family:\s*['"]?([^;'"]+)['"]?/);
      const urlMatch = block.match(/url\(\s*['"]?([^'")]+)['"]?\s*\)/);

      if (!familyMatch || !urlMatch) {
        continue;
      }

      const family = familyMatch[1].trim();
      const fontFace = new FontFace(family, `url(${urlMatch[1]})`);

      await fontFace.load();
      document.fonts.add(fontFace);
    }
  } catch (error) {
    console.warn('CircularGallery: font loading failed.', error);
  }
}

class Media {
  constructor({
    geometry,
    gl,
    image,
    index,
    length,
    scene,
    screen,
    text,
    viewport,
    bend,
    textColor,
  }) {
    this.geometry = geometry;
    this.gl = gl;
    this.image = image;
    this.index = index;
    this.length = length;
    this.scene = scene;
    this.screen = screen;
    this.text = text || '';
    this.viewport = viewport;
    this.bend = bend;
    this.textColor = textColor;

    this.extra = 0;

    this.createShader();
    this.createMesh();
    this.onResize();
  }

  createShader() {
    const texture = new Texture(this.gl, {
      generateMipmaps: false,
      minFilter: this.gl.LINEAR,
      magFilter: this.gl.LINEAR
    });

    this.texture = texture;

    this.program = new Program(this.gl, {
      depthTest: false,
      depthWrite: false,

      vertex: `
        precision highp float;

        attribute vec3 position;
        attribute vec2 uv;

        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;

        uniform float uTime;
        uniform float uSpeed;

        varying vec2 vUv;

        void main() {
          vUv = uv;
          vec3 p = position;
          p.z = (sin(p.x * 4.0 + uTime) * 1.5 + cos(p.y * 2.0 + uTime) * 1.5) * (0.1 + uSpeed * 0.5);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }
      `,
      // Simply output the texture. Canvas transparency handles the rounded corners & external text
      fragment: `
        precision highp float;

        uniform sampler2D tMap;
        varying vec2 vUv;

        void main() {
          vec4 color = texture2D(tMap, vUv);
          gl_FragColor = color;
        }
      `,

      uniforms: {
        tMap: { value: texture },
        uSpeed: { value: 0 },
        uTime: { value: 100 * Math.random() }
      },

      transparent: true
    });

    const img = new Image();

    img.crossOrigin = 'anonymous';

    img.onload = () => {
      this.createCardTexture(img, texture);
    };

    img.onerror = error => {
      console.error('[CircularGallery] Image failed:', this.image, error);
    };

    img.src = this.image;
  }

  createCardTexture(img, texture) {
    const canvas = document.createElement('canvas');

    const canvasWidth = 800;
    const canvasHeight = 1100; // Extended height to make room for the text at the bottom
    const cardHeight = 850;    // The actual card container height

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    const ctx = canvas.getContext('2d');

    if (!ctx) {
      console.error('[CircularGallery] Canvas context unavailable.');
      return;
    }

    // Clear everything to ensure transparent background outside the card
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // 1. Draw the rounded card background
    ctx.save();
    this.roundRect(ctx, 0, 0, canvasWidth, cardHeight, 45);
    ctx.clip();
    
    ctx.fillStyle = '#242424';
    ctx.fill();

    // 2. Draw the image (smaller with padding inside the card)
    const padding = 150; // Padding to ensure the image doesn't touch the card borders
    const boxWidth = canvasWidth - padding * 2;
    const boxHeight = cardHeight - padding * 2;

    const naturalWidth = img.naturalWidth || 512;
    const naturalHeight = img.naturalHeight || 512;
    const imageRatio = naturalWidth / naturalHeight;
    const boxRatio = boxWidth / boxHeight;

    let drawWidth;
    let drawHeight;

    // Preserve aspect ratio while fitting within padded bounds
    if (imageRatio > boxRatio) {
      drawWidth = boxWidth;
      drawHeight = drawWidth / imageRatio;
    } else {
      drawHeight = boxHeight;
      drawWidth = drawHeight * imageRatio;
    }

    // Center the image within the padded box area
    const drawX = padding + (boxWidth - drawWidth) / 2;
    const drawY = padding + (boxHeight - drawHeight) / 2;

    ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
    
    // Restore context so text drawing isn't constrained by card's rounded clipping mask
    ctx.restore();

    // 3. Draw text outside of the card container
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillStyle = this.textColor || '#ffffff';
    ctx.font = '600 52px "Plus Jakarta Sans", Arial, sans-serif';
    ctx.fillText(this.text, canvasWidth / 2, cardHeight + 50);

    texture.image = canvas;
    texture.needsUpdate = true;
  }

  roundRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  }

  createMesh() {
    this.plane = new Mesh(this.gl, {
      geometry: this.geometry,
      program: this.program
    });

    this.plane.setParent(this.scene);
  }

  update(scroll, direction) {
    this.plane.position.x = this.x - scroll.current - this.extra;

    const x = this.plane.position.x;
    const H = this.viewport.width / 2;

    if (this.bend === 0) {
      this.plane.position.y = 0;
      this.plane.rotation.z = 0;
    } else {
      const bendAbs = Math.abs(this.bend);
      const R = (H * H + bendAbs * bendAbs) / (2 * bendAbs);
      const effectiveX = Math.min(Math.abs(x), H);
      const inside = Math.max(R * R - effectiveX * effectiveX, 0);
      const arc = R - Math.sqrt(inside);

      if (this.bend > 0) {
        this.plane.position.y = -arc;
        this.plane.rotation.z = -Math.sign(x) * Math.asin(effectiveX / R);
      } else {
        this.plane.position.y = arc;
        this.plane.rotation.z = Math.sign(x) * Math.asin(effectiveX / R);
      }
    }

    this.speed = scroll.current - scroll.last;
    this.program.uniforms.uTime.value += 0.04;
    this.program.uniforms.uSpeed.value = this.speed;

    const planeOffset = this.plane.scale.x / 2;
    const viewportOffset = this.viewport.width / 2;

    this.isBefore = this.plane.position.x + planeOffset < -viewportOffset;
    this.isAfter = this.plane.position.x - planeOffset > viewportOffset;

    if (direction === 'right' && this.isBefore) {
      this.extra -= this.widthTotal;
      this.isBefore = false;
      this.isAfter = false;
    }

    if (direction === 'left' && this.isAfter) {
      this.extra += this.widthTotal;
      this.isBefore = false;
      this.isAfter = false;
    }
  }

  onResize({ screen, viewport } = {}) {
    if (screen) {
      this.screen = screen;
    }

    if (viewport) {
      this.viewport = viewport;
    }

    this.scale = this.screen.height / 1500;

    // Adjusted scaling ratio to match the new 800x1100 canvas size
    this.plane.scale.y = (this.viewport.height * (960 * this.scale)) / this.screen.height;
    this.plane.scale.x = (this.viewport.width * (700 * this.scale)) / this.screen.width;

    this.padding = 2;
    this.width = this.plane.scale.x + this.padding;
    this.widthTotal = this.width * this.length;
    this.x = this.width * this.index;
  }
}

class App {
  constructor(
    container,
    { items, bend = 2, textColor = '#ffffff', scrollSpeed = 1.5, scrollEase = 0.04 } = {}
  ) {
    this.container = container;
    this.scrollSpeed = scrollSpeed;

    this.scroll = {
      ease: scrollEase,
      current: 0,
      target: 0,
      last: 0
    };

    this.onCheckDebounce = debounce(this.onCheck.bind(this), 200);

    this.createRenderer();
    this.createCamera();
    this.createScene();

    this.onResize();

    this.createGeometry();
    this.createMedias(items, bend, textColor);

    this.update();
    this.addEventListeners();
  }

  createRenderer() {
    this.renderer = new Renderer({
      alpha: true,
      antialias: true,
      dpr: Math.min(window.devicePixelRatio || 1, 2)
    });

    this.gl = this.renderer.gl;
    this.gl.clearColor(0, 0, 0, 0);

    this.container.appendChild(this.gl.canvas);
  }

  createCamera() {
    this.camera = new Camera(this.gl);
    this.camera.fov = 45;
    this.camera.position.z = 20;
  }

  createScene() {
    this.scene = new Transform();
  }

  createGeometry() {
    this.planeGeometry = new Plane(this.gl, {
      heightSegments: 50,
      widthSegments: 100
    });
  }

  createMedias(items, bend, textColor) {
    const defaultItems = [
      { image: 'https://picsum.photos/seed/1/800/600', text: 'Bridge' },
      { image: 'https://picsum.photos/seed/2/800/600', text: 'Desk Setup' },
      { image: 'https://picsum.photos/seed/3/800/600', text: 'Waterfall' }
    ];

    const galleryItems = items && items.length ? items : defaultItems;

    this.mediasImages = galleryItems.concat(galleryItems);

    this.medias = this.mediasImages.map((data, index) => {
      return new Media({
        geometry: this.planeGeometry,
        gl: this.gl,
        image: data.image,
        index,
        length: this.mediasImages.length,
        scene: this.scene,
        screen: this.screen,
        text: data.text,
        viewport: this.viewport,
        bend,
        textColor
      });
    });
  }

  onTouchDown(e) {
    this.isDown = true;
    this.scroll.position = this.scroll.current;
    this.start = e.touches ? e.touches[0].clientX : e.clientX;
  }

  onTouchMove(e) {
    if (!this.isDown) {
      return;
    }

    const x = e.touches ? e.touches[0].clientX : e.clientX;
    const distance = (this.start - x) * (this.scrollSpeed * 0.025);

    this.scroll.target = this.scroll.position + distance;
  }

  onTouchUp() {
    this.isDown = false;
    this.onCheck();
  }

  onWheel(e) {
    const delta = e.deltaY || e.wheelDelta || e.detail;
    this.scroll.target += (delta > 0 ? this.scrollSpeed : -this.scrollSpeed) * 0.2;
    this.onCheckDebounce();
  }

  onKeyDown(e) {
    switch (e.key) {
      case 'ArrowRight':
        e.preventDefault();
        this.scroll.target += this.scrollSpeed * 5;
        this.onCheckDebounce();
        break;

      case 'ArrowLeft':
        e.preventDefault();
        this.scroll.target -= this.scrollSpeed * 5;
        this.onCheckDebounce();
        break;

      case 'Home':
        e.preventDefault();
        this.scroll.target = 0;
        this.onCheckDebounce();
        break;

      default:
        break;
    }
  }

  onCheck() {
    if (!this.medias || !this.medias[0]) {
      return;
    }

    const width = this.medias[0].width;
    const itemIndex = Math.round(Math.abs(this.scroll.target) / width);
    const item = width * itemIndex;

    this.scroll.target = this.scroll.target < 0 ? -item : item;
  }

  onResize() {
    this.screen = {
      width: this.container.clientWidth,
      height: this.container.clientHeight
    };

    if (!this.screen.width || !this.screen.height) {
      return;
    }

    this.renderer.setSize(this.screen.width, this.screen.height);

    this.camera.perspective({
      aspect: this.screen.width / this.screen.height
    });

    const fov = (this.camera.fov * Math.PI) / 180;
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z;
    const width = height * this.camera.aspect;

    this.viewport = { width, height };

    if (this.medias) {
      this.medias.forEach(media => {
        media.onResize({ screen: this.screen, viewport: this.viewport });
      });
    }
  }

  update() {
    this.scroll.current = lerp(this.scroll.current, this.scroll.target, this.scroll.ease);

    const direction = this.scroll.current > this.scroll.last ? 'right' : 'left';

    if (this.medias) {
      this.medias.forEach(media => {
        media.update(this.scroll, direction);
      });
    }

    this.renderer.render({ scene: this.scene, camera: this.camera });

    this.scroll.last = this.scroll.current;

    this.raf = window.requestAnimationFrame(this.update.bind(this));
  }

  addEventListeners() {
    this.boundOnResize = this.onResize.bind(this);
    this.boundOnWheel = this.onWheel.bind(this);
    this.boundOnTouchDown = this.onTouchDown.bind(this);
    this.boundOnTouchMove = this.onTouchMove.bind(this);
    this.boundOnTouchUp = this.onTouchUp.bind(this);
    this.boundOnKeyDown = this.onKeyDown.bind(this);

    window.addEventListener('resize', this.boundOnResize);
    window.addEventListener('wheel', this.boundOnWheel, { passive: true });
    window.addEventListener('mousedown', this.boundOnTouchDown);
    window.addEventListener('mousemove', this.boundOnTouchMove);
    window.addEventListener('mouseup', this.boundOnTouchUp);
    window.addEventListener('touchstart', this.boundOnTouchDown, { passive: true });
    window.addEventListener('touchmove', this.boundOnTouchMove, { passive: true });
    window.addEventListener('touchend', this.boundOnTouchUp);

    this.container.addEventListener('keydown', this.boundOnKeyDown);
  }

  destroy() {
    if (this.raf) {
      window.cancelAnimationFrame(this.raf);
    }

    window.removeEventListener('resize', this.boundOnResize);
    window.removeEventListener('wheel', this.boundOnWheel);
    window.removeEventListener('mousedown', this.boundOnTouchDown);
    window.removeEventListener('mousemove', this.boundOnTouchMove);
    window.removeEventListener('mouseup', this.boundOnTouchUp);
    window.removeEventListener('touchstart', this.boundOnTouchDown);
    window.removeEventListener('touchmove', this.boundOnTouchMove);
    window.removeEventListener('touchend', this.boundOnTouchUp);

    this.container.removeEventListener('keydown', this.boundOnKeyDown);

    if (this.renderer && this.renderer.gl && this.renderer.gl.canvas && this.renderer.gl.canvas.parentNode) {
      this.renderer.gl.canvas.parentNode.removeChild(this.renderer.gl.canvas);
    }
  }
}

export default function CircularGallery({
  items,
  bend = 2,
  textColor = '#ffffff',
  fontUrl,
  scrollSpeed = 1.5,
  scrollEase = 0.04
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    let app;
    let mounted = true;

    const initialize = async () => {
      if (fontUrl) {
        await loadGoogleFont(fontUrl);
      }

      if (!mounted || !containerRef.current) {
        return;
      }

      app = new App(containerRef.current, {
        items,
        bend,
        textColor,
        scrollSpeed,
        scrollEase
      });
    };

    initialize();

    return () => {
      mounted = false;

      if (app) {
        app.destroy();
      }
    };
  }, [items, bend, textColor, fontUrl, scrollSpeed, scrollEase]);

  return (
    <div
      className="circular-gallery"
      ref={containerRef}
      tabIndex={0}
      role="region"
      aria-label="Skills gallery"
    />
  );
}

const skills = [
  {
    image:
      'https://cdn.jsdelivr.net/npm/devicon@2.17.0/icons/nextjs/nextjs-original.svg',
    text: 'Next.js',
  },
  {
    image:
      'https://cdn.jsdelivr.net/npm/devicon@2.17.0/icons/react/react-original.svg',
    text: 'React',
  },
  {
    image:
      'https://cdn.jsdelivr.net/npm/devicon@2.17.0/icons/tailwindcss/tailwindcss-original.svg',
    text: 'Tailwind CSS',
  },
  {
    image:
      'https://cdn.jsdelivr.net/npm/devicon@2.17.0/icons/laravel/laravel-original.svg',
    text: 'Laravel',
  },
  {
    image:
      'https://cdn.jsdelivr.net/npm/devicon@2.17.0/icons/flutter/flutter-original.svg',
    text: 'Flutter',
  },
  {
    image:
      'https://cdn.jsdelivr.net/npm/devicon@2.17.0/icons/figma/figma-original.svg',
    text: 'Figma',
  }
];

export const Skills = () => {
  return (
    <section
      className="
        min-h-screen
        bg-[#1a1a1a]
        rounded-t-[40px]
        sm:rounded-t-[64px]
        flex
        flex-col
        items-center
        justify-center
        px-4
        py-16
        sm:px-6
        lg:px-8
      "
    >
      {/* HEADER */}

      <div
        className="
          text-center
          mb-10
          sm:mb-16
          max-w-2xl
        "
      >
        <h2
          className="
            text-3xl
            sm:text-4xl
            lg:text-6xl
            font-bold
            text-white
            mb-3
            tracking-tight
          "
        >
          Skills
        </h2>

        <div
          className="
            w-12
            h-[3px]
            bg-white
            mx-auto
            mb-4
          "
        />

        <p
          className="
            text-gray-400
            text-sm
            sm:text-base
            lg:text-lg
            font-light
            px-4
          "
        >
          Focused expertise in modern tools & frameworks
        </p>
      </div>

      {/* GALLERY */}

      <div
        className="
          w-full
          max-w-[1200px]
        "
        style={{
          height: '650px',
          position: 'relative'
        }}
      >
        <CircularGallery
          items={skills}
          bend={2}
          textColor="#f4f4f4"
          fontUrl="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600&display=swap"
          scrollSpeed={1.5}
          scrollEase={0.04}
        />
      </div>
    </section>
  );
};