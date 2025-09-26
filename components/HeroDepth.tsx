"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

type HeroDepthProps = {
  imageSrc: string;
  depthSrc: string;
  fadeStart?: number;
  strength?: number;
  className?: string;
};

type UniformBundle = {
  u_tex: { value: THREE.Texture | null };
  u_depth: { value: THREE.Texture | null };
  u_mouse: { value: THREE.Vector2 };
  u_strength: { value: number };
  u_res: { value: THREE.Vector2 };
};

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;
  uniform sampler2D u_tex;
  uniform sampler2D u_depth;
  uniform vec2 u_mouse;
  uniform float u_strength;
  uniform vec2 u_res;

  void main() {
    vec2 uv = gl_FragCoord.xy / u_res;
    float d = texture2D(u_depth, uv).r;
    vec2 parallax = u_mouse * (d - 0.5) * u_strength;
    vec4 color = texture2D(u_tex, uv + parallax);
    gl_FragColor = color;
  }
`;

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export default function HeroDepth({
  imageSrc,
  depthSrc,
  fadeStart = 0.7,
  strength = 0.06,
  className
}: HeroDepthProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fallbackImageRef = useRef<HTMLImageElement | null>(null);
  const uniformsRef = useRef<UniformBundle | null>(null);
  const renderRef = useRef<(() => void) | null>(null);
  const [hasDepth, setHasDepth] = useState<boolean | null>(null);
  const [prefersReduced, setPrefersReduced] = useState(false);

  const fadeValue = clamp(fadeStart, 0.65, 0.85);

  useEffect(() => {
    let active = true;
    const depthImage = new Image();
    depthImage.src = depthSrc;
    depthImage.onload = () => {
      if (active) {
        setHasDepth(true);
      }
    };
    depthImage.onerror = () => {
      if (active) {
        setHasDepth(false);
      }
    };
    return () => {
      active = false;
    };
  }, [depthSrc]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReduced(mediaQuery.matches);
    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);
    return () => {
      mediaQuery.removeEventListener("change", updatePreference);
    };
  }, []);

  const shouldUseWebGL = !prefersReduced && hasDepth === true;

  useEffect(() => {
    if (!shouldUseWebGL) {
      uniformsRef.current = null;
      renderRef.current = null;
      return;
    }
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) {
      return;
    }

    let renderer: THREE.WebGLRenderer | null = null;
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const loader = new THREE.TextureLoader();
    const mouseVector = new THREE.Vector2();
    const uniforms: UniformBundle = {
      u_tex: { value: null },
      u_depth: { value: null },
      u_mouse: { value: mouseVector },
      u_strength: { value: strength },
      u_res: { value: new THREE.Vector2(1, 1) }
    };
    uniformsRef.current = uniforms;

    let frameId: number | null = null;
    const scheduleRender = () => {
      if (frameId !== null) return;
      frameId = window.requestAnimationFrame(() => {
        frameId = null;
        if (renderer) {
          renderer.render(scene, camera);
        }
      });
    };
    renderRef.current = scheduleRender;

    renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    let disposed = false;
    let mesh: THREE.Mesh | null = null;
    let material: THREE.ShaderMaterial | null = null;

    const resize = () => {
      if (!renderer || !container) return;
      const { width, height } = container.getBoundingClientRect();
      renderer.setSize(width, height, false);
      uniforms.u_res.value.set(width, height);
      scheduleRender();
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      mouseVector.set(x * 2 - 1, -(y * 2 - 1));
      scheduleRender();
    };

    const handlePointerLeave = () => {
      mouseVector.set(0, 0);
      scheduleRender();
    };

    const orientationHandler = (event: DeviceOrientationEvent) => {
      const beta = event.beta ?? 0;
      const gamma = event.gamma ?? 0;
      const x = THREE.MathUtils.clamp(gamma / 45, -1, 1);
      const y = THREE.MathUtils.clamp(beta / 45, -1, 1);
      mouseVector.set(x, -y);
      scheduleRender();
    };

    let orientationActive = false;
    const enableOrientation = () => {
      if (orientationActive) return;
      window.addEventListener("deviceorientation", orientationHandler, true);
      orientationActive = true;
    };

    let gestureHandler: (() => void) | null = null;
    if (typeof DeviceOrientationEvent !== "undefined") {
      const anyOrientationEvent = DeviceOrientationEvent as unknown as {
        requestPermission?: () => Promise<string>;
      };
      if (typeof anyOrientationEvent.requestPermission === "function") {
        gestureHandler = () => {
          anyOrientationEvent
            .requestPermission!()
            .then((state) => {
              if (state === "granted") {
                enableOrientation();
              }
            })
            .catch(() => {
              /* ignored */
            });
        };
        container.addEventListener("click", gestureHandler, { once: true });
        container.addEventListener("touchstart", gestureHandler, {
          once: true
        });
      } else {
        enableOrientation();
      }
    }

    const onResize = () => resize();

    container.addEventListener("pointermove", handlePointerMove);
    container.addEventListener("pointerleave", handlePointerLeave);
    container.addEventListener("pointerup", handlePointerLeave);
    window.addEventListener("resize", onResize);

    const loaderPromise = Promise.all([
      loader.loadAsync(imageSrc),
      loader.loadAsync(depthSrc)
    ]);

    loaderPromise
      .then(([colorTexture, depthTexture]) => {
        if (disposed) {
          colorTexture.dispose();
          depthTexture.dispose();
          return;
        }
        colorTexture.colorSpace = THREE.SRGBColorSpace;
        colorTexture.anisotropy = renderer!.capabilities.getMaxAnisotropy();
        depthTexture.minFilter = THREE.LinearFilter;
        depthTexture.magFilter = THREE.LinearFilter;
        uniforms.u_tex.value = colorTexture;
        uniforms.u_depth.value = depthTexture;

        material = new THREE.ShaderMaterial({
          vertexShader,
          fragmentShader,
          uniforms,
          depthTest: false,
          depthWrite: false
        });
        mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
        scene.add(mesh);
        resize();
        scheduleRender();
      })
      .catch(() => {
        setHasDepth(false);
      });

    return () => {
      disposed = true;
      uniformsRef.current = null;
      renderRef.current = null;
      if (frameId !== null) {
        cancelAnimationFrame(frameId);
      }
      window.removeEventListener("resize", onResize);
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerleave", handlePointerLeave);
      container.removeEventListener("pointerup", handlePointerLeave);
      if (gestureHandler) {
        container.removeEventListener("click", gestureHandler);
        container.removeEventListener("touchstart", gestureHandler);
      }
      if (orientationActive) {
        window.removeEventListener("deviceorientation", orientationHandler, true);
      }
      if (mesh) {
        scene.remove(mesh);
        mesh.geometry.dispose();
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((m) => m.dispose());
        } else {
          mesh.material.dispose();
        }
      }
      if (material) {
        material.dispose();
      }
      if (renderer) {
        renderer.dispose();
      }
      const tex = uniforms.u_tex.value;
      const depthTex = uniforms.u_depth.value;
      tex?.dispose();
      depthTex?.dispose();
    };
  }, [shouldUseWebGL, imageSrc, depthSrc]);

  useEffect(() => {
    if (!renderRef.current || !uniformsRef.current) return;
    uniformsRef.current.u_strength.value = strength;
    renderRef.current();
  }, [strength]);

  useEffect(() => {
    const container = containerRef.current;
    const fallbackImage = fallbackImageRef.current;
    if (!container || !fallbackImage) return;
    if (shouldUseWebGL || prefersReduced) {
      fallbackImage.style.transform = "translate3d(0px, 0px, 0) scale(1.05)";
      return;
    }

    let frameId: number | null = null;
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    const maxOffset = 20;

    const animate = () => {
      frameId = null;
      current.x += (target.x - current.x) * 0.15;
      current.y += (target.y - current.y) * 0.15;
      fallbackImage.style.transform = `translate3d(${current.x}px, ${current.y}px, 0) scale(1.05)`;
      if (Math.abs(current.x - target.x) > 0.1 || Math.abs(current.y - target.y) > 0.1) {
        frameId = requestAnimationFrame(animate);
      }
    };

    const schedule = () => {
      if (frameId === null) {
        frameId = requestAnimationFrame(animate);
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      target.x = (x * 2 - 1) * maxOffset;
      target.y = -(y * 2 - 1) * maxOffset;
      schedule();
    };

    const reset = () => {
      target.x = 0;
      target.y = 0;
      schedule();
    };

    const orientationHandler = (event: DeviceOrientationEvent) => {
      const beta = event.beta ?? 0;
      const gamma = event.gamma ?? 0;
      target.x = THREE.MathUtils.clamp(gamma / 45, -1, 1) * maxOffset;
      target.y = -THREE.MathUtils.clamp(beta / 45, -1, 1) * maxOffset;
      schedule();
    };

    let orientationActive = false;
    const enableOrientation = () => {
      if (orientationActive) return;
      window.addEventListener("deviceorientation", orientationHandler, true);
      orientationActive = true;
    };

    let gestureHandler: (() => void) | null = null;
    if (typeof DeviceOrientationEvent !== "undefined") {
      const anyOrientationEvent = DeviceOrientationEvent as unknown as {
        requestPermission?: () => Promise<string>;
      };
      if (typeof anyOrientationEvent.requestPermission === "function") {
        gestureHandler = () => {
          anyOrientationEvent
            .requestPermission!()
            .then((state) => {
              if (state === "granted") {
                enableOrientation();
              }
            })
            .catch(() => {
              /* ignored */
            });
        };
        container.addEventListener("click", gestureHandler, { once: true });
        container.addEventListener("touchstart", gestureHandler, {
          once: true
        });
      } else {
        enableOrientation();
      }
    }

    container.addEventListener("pointermove", handlePointerMove);
    container.addEventListener("pointerleave", reset);
    container.addEventListener("pointerup", reset);

    return () => {
      if (frameId !== null) {
        cancelAnimationFrame(frameId);
      }
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerleave", reset);
      container.removeEventListener("pointerup", reset);
      if (gestureHandler) {
        container.removeEventListener("click", gestureHandler);
        container.removeEventListener("touchstart", gestureHandler);
      }
      if (orientationActive) {
        window.removeEventListener("deviceorientation", orientationHandler, true);
      }
    };
  }, [shouldUseWebGL, prefersReduced]);

  return (
    <div
      ref={containerRef}
      className={["hero-depth", className].filter(Boolean).join(" ")}
      style={{ "--fade-start": `${fadeValue * 100}%` } as CSSProperties}
    >
      {shouldUseWebGL ? (
        <canvas ref={canvasRef} />
      ) : (
        <img
          ref={fallbackImageRef}
          src={imageSrc}
          alt="Paisaje de montañas"
          draggable={false}
          style={{ transform: "scale(1.05)" }}
        />
      )}
    </div>
  );
}
