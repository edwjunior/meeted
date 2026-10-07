"use client";

import { useEffect, useRef, useState } from "react";

const codeSnippet = `public class Engineer {

  String name = "Eduard Puig";
  String role = "DX Engineer";
  String company = "NTT DATA";

  // 3+ years enterprise dev

  @Agile
  void lead() {
    sprint.plan();
    team.coordinate();
    client.engage();
  }

  @AI
  Bot buildChatbot() {
    return new RAGBot(
      llm: AzureOpenAI,
      data: enterpriseDB
    );
  }

  @Java
  Portal buildPortal() {
    return Liferay.DXP
      .withComponents()
      .deploy();
  }
}`;

export default function ProfileWritter() {
    const [displayedText, setDisplayedText] = useState("");
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    // 1. Detectar cuando el componente entra en el viewport
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect(); // Dejamos de observar para que no se reinicie
                }
            },
            { threshold: 0.5 } // Se activa cuando el 50% del bloque es visible
        );

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    // 2. Efecto de escritura progresiva
    useEffect(() => {
        // Si aún no se ve en pantalla, no hacemos nada
        if (!isVisible) return;

        // Con movimiento reducido, el primer tick escribe el bloque entero
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduceMotion) {
            const timeout = setTimeout(() => setDisplayedText(codeSnippet), 0);
            return () => clearTimeout(timeout);
        }

        let currentIndex = 0;

        const typingInterval = setInterval(() => {
            if (currentIndex < codeSnippet.length) {
                // Revelamos hasta el carácter actual
                setDisplayedText(codeSnippet.slice(0, currentIndex + 1));
                currentIndex++;
            } else {
                // Limpiamos el intervalo cuando termina de escribir
                clearInterval(typingInterval);
            }
        }, 7); // Velocidad en milisegundos (menor = más rápido)

        return () => clearInterval(typingInterval);
    }, [isVisible]);

    return (
        <div ref={sectionRef} className="relative max-w-sm mx-auto lg:mx-0 w-full">
            {/* Botones estilo ventana de macOS (opcional, para darle aspecto de terminal) */}
            <div className="flex gap-2 mb-4" aria-hidden="true">
                <div className="w-3 h-3 rounded-full bg-accent/80"></div>
                <div className="w-3 h-3 rounded-full bg-white/20"></div>
                <div className="w-3 h-3 rounded-full bg-cool/80"></div>
            </div>
            <div className="relative rounded-xl overflow-hidden bg-surface-raised border border-cool/15 aspect-[4/5]">
                <pre
                    className="absolute inset-0 text-xs text-white/20 overflow-hidden p-6 leading-relaxed select-none font-mono"
                    aria-hidden="true">
                    <code>{displayedText}</code>
                </pre>
                <div className="absolute inset-0 bg-gradient-to-t from-surface-raised/70 via-transparent to-transparent" />
                {/* Dual-color bottom bar — blue left, warm right */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cool to-accent" />
            </div>

            {/* Experience badge */}
            <div className="absolute -bottom-5 -right-5 bg-accent text-white p-4 rounded-xl shadow-2xl shadow-accent/30 text-center">
                <span className="block font-heading text-4xl font-bold leading-none tabular-nums">3+</span>
                <span className="block text-xs font-medium mt-1.5 leading-tight">
                    years of
                    <br />
                    experience
                </span>
            </div>
        </div>
    );
}