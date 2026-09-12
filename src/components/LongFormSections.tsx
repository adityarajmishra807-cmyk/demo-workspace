import type { ClientConfig } from '@/types/client';
import { ArrowDownRight, ArrowRight, MapPin, Sparkles } from 'lucide-react';

function Media({ src, alt, className = '' }: { src?: string; alt: string; className?: string }) {
  if (!src) {
    return (
      <div className={`flex h-full w-full items-center justify-center bg-[var(--brand-surface)] ${className}`}>
        <Sparkles className="opacity-20" size={28} />
      </div>
    );
  }
  return <img src={src} alt={alt} loading="lazy" className={`h-full w-full object-cover ${className}`} />;
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.25em]" style={{ color: 'var(--brand-accent)' }}>
      <span className="h-px w-8" style={{ background: 'var(--brand-accent)' }} />
      {children}
    </div>
  );
}

export default function LongFormSections({ client }: { client: ClientConfig }) {
  const services = client.services ?? [];
  const features = client.features ?? [];
  const gallery = client.galleryImages ?? [];
  const location = [client.location?.city, client.location?.region].filter(Boolean).join(', ');
  const images = gallery.map((g) => g.url).filter(Boolean) as string[];
  const spotlight = services.find((service) => service.image)?.image || images[0];
  const secondImage = images[1] || images[0];
  const thirdImage = images[2] || images[0];

  return (
    <>
      <section className="longform-facts border-y py-8" style={{ borderColor: 'rgba(var(--brand-text-rgb),.09)' }}>
        <div className="container-base grid grid-cols-2 gap-6 md:grid-cols-4">
          <div><p className="text-3xl font-semibold tracking-tight">{String(services.length).padStart(2, '0')}</p><p className="mt-1 text-[11px] uppercase tracking-[.18em]" style={{ color: 'var(--brand-muted)' }}>Services</p></div>
          <div><p className="text-3xl font-semibold tracking-tight">{String(gallery.length).padStart(2, '0')}</p><p className="mt-1 text-[11px] uppercase tracking-[.18em]" style={{ color: 'var(--brand-muted)' }}>Visuals</p></div>
          <div><p className="text-3xl font-semibold tracking-tight">{features.length ? String(features.length).padStart(2, '0') : '—'}</p><p className="mt-1 text-[11px] uppercase tracking-[.18em]" style={{ color: 'var(--brand-muted)' }}>Highlights</p></div>
          <div><p className="truncate text-lg font-semibold tracking-tight">{location || 'Local'}</p><p className="mt-1 text-[11px] uppercase tracking-[.18em]" style={{ color: 'var(--brand-muted)' }}>Location</p></div>
        </div>
      </section>

      <section className="border-b py-24 md:py-32" style={{ borderColor: 'rgba(var(--brand-text-rgb),.08)' }}>
        <div className="container-base grid gap-12 lg:grid-cols-[1fr_1.25fr] lg:items-end lg:gap-20">
          <div className="max-w-xl">
            <Eyebrow>More to discover</Eyebrow>
            <h2 className="mt-6 text-4xl font-semibold leading-[1.04] tracking-[-.045em] md:text-6xl">A closer look at what makes {client.businessName} distinct.</h2>
            <p className="mt-7 text-base leading-8 md:text-lg" style={{ color: 'var(--brand-muted)' }}>{client.description || client.about?.body?.[0] || `Explore the services, details and visual identity of ${client.businessName}.`}</p>
            <a href="#services" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold" style={{ color: 'var(--brand-accent)' }}>Explore the offering <ArrowRight size={16} /></a>
          </div>
          <div className="grid grid-cols-[1.2fr_.8fr] gap-3 md:gap-5">
            <div className="aspect-[4/5] overflow-hidden rounded-[1.5rem]"><Media src={spotlight || client.heroImage} alt={`${client.businessName} feature`} /></div>
            <div className="mt-12 aspect-[3/4] overflow-hidden rounded-[1.5rem] md:mt-24"><Media src={secondImage || client.about?.image} alt={`${client.businessName} detail`} /></div>
          </div>
        </div>
      </section>

      {services.length > 0 && (
        <section className="border-b py-24 md:py-32" style={{ borderColor: 'rgba(var(--brand-text-rgb),.08)', background: 'rgba(var(--brand-text-rgb),.02)' }}>
          <div className="container-base">
            <div className="grid gap-12 lg:grid-cols-[.55fr_1.45fr]">
              <div><Eyebrow>Selected offering</Eyebrow><h2 className="mt-6 text-4xl font-semibold tracking-[-.04em] md:text-5xl">Start with what matters most.</h2></div>
              <div className="divide-y" style={{ borderColor: 'rgba(var(--brand-text-rgb),.1)' }}>
                {services.slice(0, 4).map((service, index) => (
                  <div key={`${service.name}-${index}`} className="group grid gap-6 py-7 md:grid-cols-[48px_1fr_1.1fr] md:items-center">
                    <span className="text-xs font-semibold" style={{ color: 'var(--brand-accent)' }}>{String(index + 1).padStart(2, '0')}</span>
                    <div><h3 className="text-2xl font-semibold transition-transform duration-300 group-hover:translate-x-1 md:text-3xl">{service.name}</h3></div>
                    <p className="text-sm leading-7" style={{ color: 'var(--brand-muted)' }}>{service.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {images.length > 0 && (
        <section className="py-24 md:py-32">
          <div className="container-base">
            <div className="mb-12 flex items-end justify-between gap-8"><div><Eyebrow>Visual language</Eyebrow><h2 className="mt-6 max-w-3xl text-4xl font-semibold tracking-[-.045em] md:text-6xl">See the world around {client.businessName}.</h2></div><ArrowDownRight className="hidden md:block" style={{ color: 'var(--brand-accent)' }} /></div>
            <div className="grid gap-3 md:grid-cols-12 md:items-end md:gap-5">
              <div className="aspect-[4/5] overflow-hidden rounded-[1.5rem] md:col-span-5"><Media src={images[0]} alt={gallery[0]?.alt || client.businessName} className="transition-transform duration-700 hover:scale-105" /></div>
              <div className="aspect-[16/10] overflow-hidden rounded-[1.5rem] md:col-span-7"><Media src={thirdImage} alt={gallery[2]?.alt || client.businessName} className="transition-transform duration-700 hover:scale-105" /></div>
              {images.length > 3 && <div className="aspect-[16/9] overflow-hidden rounded-[1.5rem] md:col-span-8"><Media src={images[3]} alt={gallery[3]?.alt || client.businessName} className="transition-transform duration-700 hover:scale-105" /></div>}
              {images.length > 4 && <div className="aspect-[3/4] overflow-hidden rounded-[1.5rem] md:col-span-4"><Media src={images[4]} alt={gallery[4]?.alt || client.businessName} className="transition-transform duration-700 hover:scale-105" /></div>}
            </div>
          </div>
        </section>
      )}

      <section className="border-y py-24 md:py-32" style={{ borderColor: 'rgba(var(--brand-text-rgb),.08)', background: 'var(--brand-secondary)' }}>
        <div className="container-base grid gap-12 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
          <div><Eyebrow>The experience</Eyebrow><h2 className="mt-6 max-w-4xl text-4xl font-semibold leading-[1.02] tracking-[-.05em] md:text-6xl">Take your time. Explore every detail.</h2><p className="mt-7 max-w-2xl text-base leading-8" style={{ color: 'var(--brand-muted)' }}>A better website should give visitors enough context to understand the brand, discover what is available and know exactly what to do next.</p></div>
          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            {['Discover', 'Explore', 'Connect'].map((step, index) => <div key={step} className="border-t py-5" style={{ borderColor: 'rgba(var(--brand-text-rgb),.12)' }}><div className="flex items-center justify-between"><span className="text-xs" style={{ color: 'var(--brand-accent)' }}>0{index + 1}</span><ArrowRight size={16} style={{ color: 'var(--brand-muted)' }} /></div><p className="mt-3 text-lg font-semibold">{step}</p></div>)}
          </div>
        </div>
      </section>

      {location && (
        <section className="border-b py-20 md:py-28" style={{ borderColor: 'rgba(var(--brand-text-rgb),.08)' }}>
          <div className="container-base flex flex-col justify-between gap-8 md:flex-row md:items-center"><div><Eyebrow>Find us</Eyebrow><h2 className="mt-5 text-3xl font-semibold tracking-[-.035em] md:text-5xl">{location}</h2>{client.location?.address && <p className="mt-3 max-w-xl text-sm leading-7" style={{ color: 'var(--brand-muted)' }}>{client.location.address}</p>}</div><div className="flex h-14 w-14 items-center justify-center rounded-full border" style={{ borderColor: 'rgba(var(--brand-text-rgb),.14)' }}><MapPin size={20} /></div></div>
        </section>
      )}
    </>
  );
}
