"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Icons as SVG components
const ArrowRight = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

const Check = () => (
  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const Terminal = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const Cloud = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
  </svg>
);

const Cog = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const Shield = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const Rocket = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const Lock = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

const CreditCard = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
  </svg>
);

const Mail = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const WhatsApp = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

// Logo de MercadoPago
const MercadoPagoLogo = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" rx="8" fill="#00BCFF"/>
    <path d="M24 12C17.373 12 12 17.373 12 24C12 30.627 17.373 36 24 36C30.627 36 36 30.627 36 24C36 17.373 30.627 12 24 12ZM28.8 28.8H19.2V19.2H28.8V28.8Z" fill="white"/>
  </svg>
);

const Loader = () => (
  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

export default function Home() {
  const [hours, setHours] = useState<number>(1);
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);

  const PRICE_PER_HOUR = 15;
  const totalPrice = hours * PRICE_PER_HOUR;

  // Marcar como montado y verificar status de pago
  useEffect(() => {
    setIsMounted(true);

    // Verificar si hay un status de pago en la URL
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get("status");
    if (status) {
      setPaymentStatus(status);
      // Limpiar la URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const handleHoursChange = (value: string) => {
    const numValue = parseInt(value) || 0;
    if (numValue >= 0 && numValue <= 999) {
      setHours(numValue);
    }
  };

  const incrementHours = () => {
    if (hours < 999) setHours(hours + 1);
  };

  const decrementHours = () => {
    if (hours > 1) setHours(hours - 1);
  };

  const handleMercadoPagoPayment = async () => {
    if (hours < 1) return;

    setIsLoading(true);

    try {
      const response = await fetch("/api/mercadopago", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          hours,
          totalPrice,
        }),
      });

      const data = await response.json();

      if (data.init_point) {
        // Redirigir al checkout de MercadoPago
        window.location.href = data.init_point;
      } else if (data.sandbox_init_point) {
        // En desarrollo, usar sandbox
        window.location.href = data.sandbox_init_point;
      } else {
        throw new Error("No se pudo generar el enlace de pago");
      }
    } catch (error) {
      console.error("Error al procesar el pago:", error);
      alert("Error al procesar el pago. Por favor intenta de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleContactWhatsApp = () => {
    const message = `Hola, quiero contratar ${hours} hora(s) de servicio DevOps por un total de $${totalPrice} USD.`;
    window.open(`https://wa.me/573114366027?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <main className="min-h-screen bg-background grid-bg relative">

      {/* Payment Status Notification */}
      {paymentStatus && (
        <div className={`fixed top-20 left-1/2 -translate-x-1/2 z-50 px-6 py-4 rounded-xl shadow-lg ${
          paymentStatus === "success"
            ? "bg-green-500/90 text-white"
            : paymentStatus === "pending"
            ? "bg-yellow-500/90 text-white"
            : "bg-red-500/90 text-white"
        }`}>
          <div className="flex items-center gap-3">
            {paymentStatus === "success" && <Check />}
            <span className="font-medium">
              {paymentStatus === "success" && "Pago realizado con exito. Te contactaremos pronto."}
              {paymentStatus === "pending" && "Tu pago esta pendiente de confirmacion."}
              {paymentStatus === "failure" && "El pago no pudo ser procesado. Intenta de nuevo."}
            </span>
            <button
              onClick={() => setPaymentStatus(null)}
              className="ml-4 hover:opacity-70"
            >
              X
            </button>
          </div>
        </div>
      )}

      {/* Background Orbs */}
      <div className="gradient-orb orb-cyan w-[600px] h-[600px] -top-48 -left-48 fixed animate-pulse-glow" />
      <div className="gradient-orb orb-blue w-[500px] h-[500px] top-1/3 -right-48 fixed animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
      <div className="gradient-orb orb-cyan w-[400px] h-[400px] bottom-0 left-1/4 fixed animate-pulse-glow" style={{ animationDelay: '3s' }} />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center">
              <Terminal />
            </div>
            <span className="text-xl font-bold tracking-tight">DevOps<span className="text-primary">Pro</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#servicios" className="text-muted-foreground hover:text-foreground transition-colors">Servicios</a>
            <a href="#planes" className="text-muted-foreground hover:text-foreground transition-colors">Planes</a>
            <a href="#pago" className="text-muted-foreground hover:text-foreground transition-colors">Pago</a>
          </div>
          <Button
            className="btn-primary text-primary-foreground font-semibold px-6"
            onClick={() => window.open('https://wa.me/573114366027?text=Hola%2C%20estoy%20interesado%20en%20los%20servicios%20DevOps', '_blank')}
          >
            Contactar
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 px-6">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 px-4 py-2 text-sm font-medium">
            Infraestructura Cloud de Nueva Generacion
          </Badge>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-6 leading-[1.1]">
            Escalabilidad
            <br />
            <span className="text-gradient-cyan">sin fricciones</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
            Automatizamos tu infraestructura para que tu equipo se enfoque en lo que importa:
            <span className="text-foreground font-medium"> construir productos excepcionales.</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="btn-primary text-primary-foreground font-semibold px-8 py-6 text-lg group"
              onClick={() => document.getElementById('planes')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Comenzar Ahora
              <ArrowRight />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-border/50 hover:bg-secondary/50 px-8 py-6 text-lg"
              onClick={() => document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Ver Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-20 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-gradient-cyan">99.9%</div>
              <div className="text-muted-foreground mt-2">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-gradient-cyan">50+</div>
              <div className="text-muted-foreground mt-2">Clientes</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-gradient-cyan">24/7</div>
              <div className="text-muted-foreground mt-2">Soporte</div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground">
          <span className="text-sm">Scroll</span>
          <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-primary rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="section-divider max-w-4xl mx-auto" />

      {/* Services Section */}
      <section id="servicios" className="py-32 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-secondary text-foreground">Nuestros Servicios</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Soluciones DevOps <span className="text-gradient-cyan">Integrales</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Desde la estrategia hasta la implementacion, cubrimos todo el ciclo de vida de tu infraestructura.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Service 1: Consultoría y Estrategia */}
            <Card className="service-card animated-border p-8 bg-card/50 backdrop-blur-sm">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-blue-500/20 flex items-center justify-center mb-6 text-primary">
                <Cog />
              </div>
              <h3 className="text-2xl font-bold mb-4">Consultoria y Estrategia</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Analizamos tu infraestructura actual y disenamos una hoja de ruta personalizada para alcanzar tus objetivos de negocio con eficiencia maxima.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <Check />
                  <span className="text-sm">Auditoria de infraestructura</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check />
                  <span className="text-sm">Roadmap de transformacion</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check />
                  <span className="text-sm">Optimizacion de costos cloud</span>
                </li>
              </ul>
            </Card>

            {/* Service 2: Automatización CI/CD */}
            <Card className="service-card animated-border p-8 bg-card/50 backdrop-blur-sm">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-blue-500/20 flex items-center justify-center mb-6 text-primary">
                <Rocket />
              </div>
              <h3 className="text-2xl font-bold mb-4">Automatizacion CI/CD</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Implementamos pipelines robustos que aceleran tu ciclo de desarrollo. Despliega con confianza, multiples veces al dia.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <Check />
                  <span className="text-sm">Jenkins, GitLab CI, GitHub Actions</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check />
                  <span className="text-sm">Testing automatizado</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check />
                  <span className="text-sm">Rollbacks automaticos</span>
                </li>
              </ul>
            </Card>

            {/* Service 3: Infraestructura como Código */}
            <Card className="service-card animated-border p-8 bg-card/50 backdrop-blur-sm">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-blue-500/20 flex items-center justify-center mb-6 text-primary">
                <Cloud />
              </div>
              <h3 className="text-2xl font-bold mb-4">Infraestructura & Cloud</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Define tu infraestructura como codigo. Replicable, versionable y escalable. Terraform, Kubernetes y mas.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <Check />
                  <span className="text-sm">Terraform & Pulumi</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check />
                  <span className="text-sm">Kubernetes & Docker</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check />
                  <span className="text-sm">AWS, GCP, Azure</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="section-divider max-w-4xl mx-auto" />

      {/* Pricing Section - SISTEMA POR HORA CON MERCADOPAGO */}
      <section id="planes" className="py-32 px-6 relative">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-secondary text-foreground">Precio por Hora</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Paga solo por las <span className="text-gradient-cyan">Horas que Necesitas</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Sin suscripciones ni compromisos. Selecciona las horas de servicio DevOps que requieres y paga unicamente por ellas.
            </p>
          </div>

          {/* Single Pricing Card */}
          <Card className="pricing-card featured p-10 relative overflow-hidden glow-cyan max-w-xl mx-auto">
            <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">
              Flexible
            </Badge>

            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">Servicio DevOps por Hora</h3>
              <p className="text-muted-foreground">Consultoria, CI/CD, Infraestructura Cloud y mas</p>
            </div>

            {/* Price Display */}
            <div className="text-center mb-8">
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-6xl font-bold text-gradient-cyan">${PRICE_PER_HOUR}</span>
                <span className="text-2xl text-muted-foreground">USD/hora</span>
              </div>
            </div>

            {/* Hours Selector */}
            <div className="mb-8">
              <Label htmlFor="hours" className="text-center block mb-4 text-lg font-medium">
                ¿Cuantas horas necesitas?
              </Label>
              <div className="flex items-center justify-center gap-4">
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  className="w-14 h-14 text-2xl font-bold border-border/50 hover:bg-secondary/50"
                  onClick={decrementHours}
                  disabled={hours <= 1}
                >
                  -
                </Button>
                <Input
                  id="hours"
                  type="number"
                  min="1"
                  max="999"
                  value={hours}
                  onChange={(e) => handleHoursChange(e.target.value)}
                  className="w-28 h-14 text-center text-2xl font-bold bg-background border-border/50 focus:border-primary"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  className="w-14 h-14 text-2xl font-bold border-border/50 hover:bg-secondary/50"
                  onClick={incrementHours}
                  disabled={hours >= 999}
                >
                  +
                </Button>
              </div>
            </div>

            {/* Total Calculation */}
            <div className="bg-secondary/30 rounded-xl p-6 mb-8">
              <div className="flex justify-between items-center text-lg">
                <span className="text-muted-foreground">{hours} hora(s) x ${PRICE_PER_HOUR} USD</span>
                <span className="text-2xl font-bold text-gradient-cyan">${totalPrice} USD</span>
              </div>
            </div>

            {/* What's Included */}
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <Check />
                <span>Consultoria DevOps especializada</span>
              </li>
              <li className="flex items-start gap-3">
                <Check />
                <span>Setup y configuracion CI/CD</span>
              </li>
              <li className="flex items-start gap-3">
                <Check />
                <span>Infraestructura como codigo</span>
              </li>
              <li className="flex items-start gap-3">
                <Check />
                <span>Kubernetes, Docker, Terraform</span>
              </li>
              <li className="flex items-start gap-3">
                <Check />
                <span>AWS, GCP, Azure</span>
              </li>
              <li className="flex items-start gap-3">
                <Check />
                <span>Soporte durante el servicio</span>
              </li>
            </ul>

            {/* MercadoPago Payment Button */}
            <div className="space-y-4">
              <Button
                className="w-full bg-[#00BCFF] hover:bg-[#00A8E8] text-white py-6 text-lg font-semibold flex items-center justify-center gap-3 transition-all"
                onClick={handleMercadoPagoPayment}
                disabled={hours < 1 || isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader />
                    Procesando...
                  </>
                ) : (
                  <>
                    <MercadoPagoLogo className="w-6 h-6" />
                    Pagar con Mercado Pago
                  </>
                )}
              </Button>

              <div className="flex items-center gap-2 justify-center">
                <span className="text-xs text-muted-foreground">o</span>
              </div>

              <Button
                variant="outline"
                className="w-full border-[#25D366] text-[#25D366] hover:bg-[#25D366]/10 py-5 text-base font-semibold flex items-center justify-center gap-3"
                onClick={handleContactWhatsApp}
              >
                <WhatsApp />
                Consultar por WhatsApp
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                Pago 100% seguro con Mercado Pago. Acepta tarjetas de credito, debito y mas.
              </p>
            </div>
          </Card>

          {/* Quick Select Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            <span className="text-muted-foreground self-center mr-2">Seleccion rapida:</span>
            {[5, 10, 20, 40].map((h) => (
              <Button
                key={h}
                variant="outline"
                size="sm"
                className={`border-border/50 hover:bg-secondary/50 ${hours === h ? 'bg-primary/20 border-primary' : ''}`}
                onClick={() => setHours(h)}
              >
                {h} horas
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="section-divider max-w-4xl mx-auto" />

      {/* Payment Section */}
      <section id="pago" className="py-32 px-6 relative">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-secondary text-foreground">Pago Seguro</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Proceso de <span className="text-gradient-cyan">Pago con Mercado Pago</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Pago rapido y seguro con la plataforma de pagos lider en Latinoamerica.
            </p>
          </div>

          <Card className="animated-border p-10 bg-card/50 backdrop-blur-sm">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Left: Process Steps */}
              <div>
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <CreditCard />
                  Flujo de Pago
                </h3>

                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold shrink-0">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Selecciona las horas</h4>
                      <p className="text-sm text-muted-foreground">Elige cuantas horas de servicio DevOps necesitas.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold shrink-0">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Paga con Mercado Pago</h4>
                      <p className="text-sm text-muted-foreground">Usa tarjeta, transferencia, efectivo o tu saldo de Mercado Pago.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold shrink-0">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Confirmacion inmediata</h4>
                      <p className="text-sm text-muted-foreground">Recibe confirmacion instantanea de tu pago.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold shrink-0">
                      4
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Comenzamos a trabajar</h4>
                      <p className="text-sm text-muted-foreground">Te contactamos para iniciar tu proyecto DevOps.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Security Info */}
              <div className="bg-secondary/30 rounded-2xl p-8">
                <div className="text-primary mb-6">
                  <Lock />
                </div>
                <h3 className="text-2xl font-bold mb-4">Pago 100% Seguro</h3>
                <p className="text-muted-foreground mb-6">
                  Mercado Pago es la plataforma de pagos mas segura de Latinoamerica.
                  Tu informacion esta protegida con los mas altos estandares de seguridad.
                </p>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Shield />
                    <span className="text-sm">Encriptacion SSL de 256 bits</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Shield />
                    <span className="text-sm">Proteccion al comprador</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Shield />
                    <span className="text-sm">Multiples metodos de pago</span>
                  </div>
                </div>

                {/* MercadoPago Badge */}
                <div className="mt-8 p-4 bg-background/50 rounded-xl">
                  <div className="flex items-center justify-center gap-4 mb-3">
                    <MercadoPagoLogo className="w-12 h-12" />
                    <span className="text-xl font-bold">Mercado Pago</span>
                  </div>
                  <p className="text-sm text-muted-foreground text-center">Tarjetas, transferencias, efectivo y mas</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Section Divider */}
      <div className="section-divider max-w-4xl mx-auto" />

      {/* CTA Section */}
      <section className="py-24 px-6 relative">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            ¿Listo para <span className="text-gradient-cyan">transformar</span> tu infraestructura?
          </h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Agenda una llamada gratuita de 30 minutos y descubre como podemos acelerar tu negocio.
          </p>
          <Button
            className="btn-primary text-primary-foreground font-semibold px-10 py-6 text-lg"
            onClick={() => window.open('https://wa.me/573114366027?text=Hola%2C%20me%20gustar%C3%ADa%20agendar%20una%20llamada%20gratuita%20para%20conocer%20m%C3%A1s%20sobre%20sus%20servicios%20DevOps', '_blank')}
          >
            <Mail />
            Agendar Llamada Gratis
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center">
                <Terminal />
              </div>
              <span className="text-lg font-bold">DevOps<span className="text-primary">Pro</span></span>
            </div>
            <div className="flex items-center gap-8 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Terminos</a>
              <a href="#" className="hover:text-foreground transition-colors">Privacidad</a>
              <a
                href="#"
                className="hover:text-foreground transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  window.open('https://wa.me/573114366027', '_blank');
                }}
              >
                Contacto
              </a>
            </div>
            <p className="text-sm text-muted-foreground">
              2026 DevOpsPro. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
