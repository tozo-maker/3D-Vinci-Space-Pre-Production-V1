import React from 'react';

export default function FooterSection() {
  return (
    <footer className="bg-brand-surface border-t border-brand-border">
      <div className="max-w-[1800px] mx-auto px-4 md:px-6 py-24 md:py-32 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-8">
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tighter text-brand-text mb-6">Signature Objects.</h2>
            <p className="text-brand-muted max-w-sm text-lg leading-relaxed mb-12">
              Symphony of Form. State-of-the-art biopolymer objects designed to elevate your living environment.
            </p>
          </div>
          <p className="font-mono text-[9px] uppercase tracking-widest text-brand-muted/50">
            © {new Date().getFullYear()} Signature Objects. All rights reserved.
          </p>
        </div>

        <div className="lg:col-span-3 flex flex-col gap-6">
           <h4 className="font-mono text-[11px] font-bold uppercase tracking-widest text-brand-text mb-4">Exhibition</h4>
           <a href="#" className="text-brand-muted hover:text-brand-text transition-colors text-lg">Current Collection</a>
           <a href="#" className="text-brand-muted hover:text-brand-text transition-colors text-lg">Past Campaigns</a>
           <a href="#" className="text-brand-muted hover:text-brand-text transition-colors text-lg">Bespoke Commissions</a>
           <a href="#" className="text-brand-muted hover:text-brand-text transition-colors text-lg">Studio Locator</a>
        </div>

        <div className="lg:col-span-4 flex flex-col gap-8">
          <h4 className="font-mono text-[11px] font-bold uppercase tracking-widest text-brand-text mb-2">The Journal</h4>
          <p className="text-brand-muted text-lg">Subscribe for private viewings and new object releases.</p>
          <form className="flex border-b border-brand-text pb-4" onSubmit={(e) => e.preventDefault()}>
             <label htmlFor="newsletter-email" className="sr-only">Email address for newsletter</label>
             <input id="newsletter-email" type="email" placeholder="Email address" required className="w-full bg-transparent outline-none placeholder:text-brand-muted text-brand-text text-lg focus:ring-0" />
             <button type="submit" className="text-brand-text font-mono text-[11px] uppercase tracking-widest font-bold hover:opacity-50 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-text/50 rounded px-2">Submit</button>
          </form>
        </div>
      </div>
    </footer>
  );
}
