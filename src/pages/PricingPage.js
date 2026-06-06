import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal } from '../components/index.js';

// ── Currency rates (approximate) ──────────────────────────
const CURRENCIES = {
  USD: { symbol: '$',   label: 'USD', flag: '🇺🇸', rate: 1 },
  CAD: { symbol: 'CA$', label: 'CAD', flag: '🇨🇦', rate: 1.36 },
  AUD: { symbol: 'A$',  label: 'AUD', flag: '🇦🇺', rate: 1.53 },
  NZD: { symbol: 'NZ$', label: 'NZD', flag: '🇳🇿', rate: 1.64 },
  AED: { symbol: 'د.إ', label: 'AED', flag: '🇦🇪', rate: 3.67 },
  GBP: { symbol: '£',   label: 'GBP', flag: '🇬🇧', rate: 0.79 },
};

// ── All service pricing data ───────────────────────────────
const SERVICES = [
  {
    id: 'web-info', label: 'Informative Websites', icon: '🌐', col: '#00C9FF',
    plans: [
      { name: 'Launch', price: 499, popular: false, period: 'project',
        features: ['Up to 5 pages','Responsive design','Basic SEO setup','Contact form','Google Analytics','1 revision round','2-week delivery','Mobile optimised','SSL certificate','Social media links'] },
      { name: 'Growth', price: 999, popular: true, period: 'project',
        features: ['Up to 12 pages','Custom design system','Advanced on-page SEO','Blog/news section','CMS integration','Speed optimisation','3 revision rounds','4-week delivery','Schema markup','OG tags & previews'] },
      { name: 'Scale', price: 1999, popular: false, period: 'project',
        features: ['Unlimited pages','Full custom design','Enterprise SEO','E-commerce ready','Headless CMS','CDN & edge caching','Unlimited revisions','6-week delivery','WCAG accessibility','Priority support'] },
      { name: 'Custom', price: null, popular: false, period: 'quote',
        features: ['Bespoke scope','Dedicated team','Custom integrations','SLA guarantee','White-label option','Ongoing retainer','Strategy workshops','Analytics dashboard','Training sessions','24/7 support'] },
    ]
  },
  {
    id: 'ecommerce', label: 'E-Commerce', icon: '🛒', col: '#4FFFB0',
    plans: [
      { name: 'Launch Store', price: 999, popular: false, period: 'project',
        features: ['Up to 50 products','Shopify/WooCommerce','Stripe/PayPal integration','Mobile checkout','Basic inventory','Order notifications','1 revision round','3-week delivery','Product search','Returns management'] },
      { name: 'Growth Store', price: 2499, popular: true, period: 'project',
        features: ['Up to 500 products','Custom storefront','Multi-gateway payments','Abandoned cart recovery','Advanced inventory','Discount/coupon engine','3 revision rounds','5-week delivery','Wishlist & reviews','Analytics dashboard'] },
      { name: 'Scale Store', price: 4999, popular: false, period: 'project',
        features: ['Unlimited products','Headless commerce','Multi-currency','B2B wholesale','Split payments','Algolia search','Unlimited revisions','8-week delivery','Tax automation','Priority support'] },
      { name: 'Custom', price: null, popular: false, period: 'quote',
        features: ['Marketplace builds','Custom checkout flows','ERP integration','Subscription billing','White-label solution','Dedicated team','Performance SLA','Custom analytics','Training & handover','24/7 support'] },
    ]
  },
  {
    id: 'android', label: 'Android App', icon: '🤖', col: '#3FC380',
    plans: [
      { name: 'MVP', price: 1999, popular: false, period: 'project',
        features: ['Core feature set','Kotlin + Jetpack Compose','Basic UI/UX design','Firebase integration','Push notifications','Play Store submission','2 revision rounds','6-week delivery','Crash reporting','Basic analytics'] },
      { name: 'Startup', price: 4999, popular: true, period: 'project',
        features: ['Full feature app','Material You design','Custom animations','Offline-first (Room DB)','In-app purchases','Maps & geofencing','3 revision rounds','10-week delivery','Biometric auth','ASO optimisation'] },
      { name: 'Business', price: 9999, popular: false, period: 'project',
        features: ['Enterprise features','Advanced UX research','Admin dashboard','REST + GraphQL API','Background sync','Deep linking','Unlimited revisions','16-week delivery','Security audit','1 year support'] },
      { name: 'Custom', price: null, popular: false, period: 'quote',
        features: ['Multi-app suite','Custom hardware integration','IoT connectivity','AR/VR features','White-label solution','Dedicated team','SLA guarantee','Custom analytics','Training','24/7 support'] },
    ]
  },
  {
    id: 'ios', label: 'iOS App', icon: '🍎', col: '#FC5C7D',
    plans: [
      { name: 'MVP', price: 2499, popular: false, period: 'project',
        features: ['Core features','Swift + SwiftUI','HIG-compliant design','CloudKit integration','Push notifications','App Store submission','2 revision rounds','7-week delivery','TestFlight setup','Basic analytics'] },
      { name: 'Startup', price: 5999, popular: true, period: 'project',
        features: ['Full feature app','Custom UI components','Apple Pay integration','Core Data + CloudKit','HealthKit/ARKit ready','Sign in with Apple','3 revision rounds','12-week delivery','Biometric auth','ASO optimisation'] },
      { name: 'Business', price: 11999, popular: false, period: 'project',
        features: ['Enterprise app','UX research & testing','Apple Business Manager','Advanced animations','Siri & Shortcuts','Widget & Live Activity','Unlimited revisions','18-week delivery','Security audit','1 year support'] },
      { name: 'Custom', price: null, popular: false, period: 'quote',
        features: ['iPad/Mac Catalyst','visionOS ready','Enterprise MDM','Custom hardware','White-label solution','Dedicated team','SLA guarantee','Training','App analytics','24/7 support'] },
    ]
  },
  {
    id: 'hybrid', label: 'Hybrid App', icon: '⚡', col: '#7c3aed',
    plans: [
      { name: 'MVP', price: 2499, popular: false, period: 'project',
        features: ['iOS + Android','React Native or Flutter','Shared codebase','Firebase backend','Push notifications','Both store submissions','2 revision rounds','7-week delivery','OTA updates','Basic analytics'] },
      { name: 'Startup', price: 5999, popular: true, period: 'project',
        features: ['Full feature app','Platform-native UI','Expo EAS build','In-app purchases','Offline sync','Deep linking','3 revision rounds','12-week delivery','Biometric auth','Performance tuning'] },
      { name: 'Scale', price: 11999, popular: false, period: 'project',
        features: ['Enterprise features','Native module bridges','Custom animations','Complex state (Redux)','Multi-language','Background services','Unlimited revisions','18-week delivery','Security audit','1 year support'] },
      { name: 'Custom', price: null, popular: false, period: 'quote',
        features: ['Web + Mobile combo','Desktop app (Electron)','IoT integration','AR features','White-label','Dedicated team','SLA guarantee','Custom analytics','Training','24/7 support'] },
    ]
  },
  {
    id: 'digital', label: 'Digital Marketing', icon: '📈', col: '#F7971E',
    plans: [
      { name: 'Launch', price: 399, popular: false, period: 'mo',
        features: ['Technical SEO audit','3 content pieces/mo','Google Analytics 4 setup','Basic keyword research','On-page optimisation','Monthly report','Email support','Google Search Console','Meta Pixel setup','Competitor analysis'] },
      { name: 'Growth', price: 799, popular: true, period: 'mo',
        features: ['Full SEO strategy','8 content pieces/mo','Google Ads (Search)','Advanced keyword tracking','Link building (5/mo)','Bi-weekly reports','Slack support','CRO recommendations','Social media strategy','A/B testing'] },
      { name: 'Scale', price: 1999, popular: false, period: 'mo',
        features: ['Multichannel strategy','20 content pieces/mo','Google + Meta Ads','PPC management','Link building (20/mo)','Weekly reports','Dedicated manager','Full funnel CRO','PR & outreach','ROI dashboard'] },
      { name: 'Custom', price: null, popular: false, period: 'quote',
        features: ['Enterprise SEO','Programmatic ads','Influencer campaigns','Full agency team','Custom KPI dashboard','Daily reporting','Strategy workshops','Brand positioning','Market research','24/7 support'] },
    ]
  },
  {
    id: 'payment', label: 'Payment Integration', icon: '💳', col: '#FF9F43',
    plans: [
      { name: 'Basic', price: 199, popular: false, period: 'project',
        features: ['Stripe or PayPal','One-time payments','Basic webhook setup','Payment confirmation emails','Test mode setup','1 revision round','1-week delivery','SSL/HTTPS check','Basic error handling','Documentation'] },
      { name: 'Professional', price: 499, popular: true, period: 'project',
        features: ['Multi-gateway (3)','Subscriptions + one-time','Advanced webhooks','Invoice automation','Refund management','3D Secure & fraud tools','3 revision rounds','2-week delivery','Multi-currency','Audit logging'] },
      { name: 'Enterprise', price: 999, popular: false, period: 'project',
        features: ['All gateways','Split payments & escrow','Custom checkout flow','PCI-DSS compliance review','Chargeback management','Fraud ML scoring','Unlimited revisions','3-week delivery','135+ currencies','Priority support'] },
      { name: 'Custom', price: null, popular: false, period: 'quote',
        features: ['Custom gateway build','Marketplace payouts','Crypto payments','White-label solution','Regulatory compliance','Dedicated team','SLA guarantee','Financial reporting','Training','24/7 support'] },
    ]
  },
  {
    id: 'blog', label: 'Blog & CMS', icon: '✍️', col: '#FFD700',
    plans: [
      { name: 'Starter', price: 599, popular: false, period: 'project',
        features: ['Up to 5 content types','Sanity or Contentful','Rich text editor','Image CDN','RSS feed','Basic SEO fields','1 revision round','3-week delivery','Author management','Preview mode'] },
      { name: 'Professional', price: 1499, popular: true, period: 'project',
        features: ['Unlimited content types','Custom CMS UI','Newsletter integration','Comment system','Content scheduling','Advanced SEO','3 revision rounds','5-week delivery','Analytics integration','Paywall option'] },
      { name: 'Publisher', price: 2999, popular: false, period: 'project',
        features: ['Multi-site CMS','Headless + API','Subscription paywall','Ad management','Content analytics','Multi-author workflow','Unlimited revisions','8-week delivery','CDN & caching','Priority support'] },
      { name: 'Custom', price: null, popular: false, period: 'quote',
        features: ['News portal scale','Custom editorial tools','Media management','Monetisation engine','White-label','Dedicated team','SLA guarantee','Training','Migration support','24/7 support'] },
    ]
  },
  {
    id: 'ml-ai', label: 'ML & AI', icon: '🧠', col: '#a855f7',
    plans: [
      { name: 'Prototype', price: 2999, popular: false, period: 'project',
        features: ['1 ML use case','Data preprocessing','Model training (scikit-learn)','REST API endpoint','Basic dashboard','Python codebase','2 revision rounds','4-week delivery','Model documentation','Deployment guide'] },
      { name: 'Growth AI', price: 7499, popular: true, period: 'project',
        features: ['3 ML models','Full data pipeline','Deep learning (PyTorch)','Real-time inference API','Monitoring dashboard','Docker deployment','3 revision rounds','10-week delivery','Model versioning','MLOps setup'] },
      { name: 'Enterprise AI', price: 19999, popular: false, period: 'project',
        features: ['Unlimited models','Custom neural architectures','AWS SageMaker MLOps','Edge deployment','Explainable AI','A/B model testing','Unlimited revisions','20-week delivery','Security audit','1 year support'] },
      { name: 'Custom', price: null, popular: false, period: 'quote',
        features: ['Foundation model fine-tuning','Proprietary data pipelines','Real-time ML at scale','Custom hardware','Research partnerships','Dedicated AI team','SLA guarantee','IP ownership','Training','24/7 support'] },
    ]
  },
  {
    id: 'saas', label: 'SaaS Development', icon: '☁️', col: '#06b6d4',
    plans: [
      { name: 'MVP', price: 4999, popular: false, period: 'project',
        features: ['Core SaaS features','Auth + multi-tenancy','Stripe billing','Basic dashboard','REST API','PostgreSQL','2 revision rounds','8-week delivery','Onboarding flow','Deployment'] },
      { name: 'Startup', price: 14999, popular: true, period: 'project',
        features: ['Full feature SaaS','Team collaboration','Usage metering','Admin panel','Webhook ecosystem','Role-based access','3 revision rounds','16-week delivery','Analytics','SOC2 prep'] },
      { name: 'Scale', price: 29999, popular: false, period: 'project',
        features: ['Enterprise SaaS','White-label option','Custom domains','Audit logs','Advanced billing','99.9% SLA infra','Unlimited revisions','24-week delivery','Security audit','1 year support'] },
      { name: 'Custom', price: null, popular: false, period: 'quote',
        features: ['Platform builds','Marketplace model','Enterprise SSO/SAML','Compliance (SOC2/HIPAA)','Custom infrastructure','Dedicated team','SLA guarantee','IP transfer','Training','24/7 support'] },
    ]
  },
  {
    id: 'telegram-bot', label: 'Telegram Bot', icon: '✈️', col: '#0ea5e9',
    plans: [
      { name: 'Starter Bot', price: 499, popular: false, period: 'project',
        features: ['Up to 10 commands','Inline keyboards','User registration','MongoDB storage','Basic admin panel','Webhook mode','1 revision round','1-week delivery','Error handling','Documentation'] },
      { name: 'Business Bot', price: 1499, popular: true, period: 'project',
        features: ['Unlimited commands','Payment integration','Broadcast messaging','Analytics dashboard','Multi-language','Group/channel support','3 revision rounds','2-week delivery','Referral system','Mini App'] },
      { name: 'Enterprise Bot', price: 3999, popular: false, period: 'project',
        features: ['Custom bot framework','CRM integration','AI/GPT responses','Advanced analytics','White-label','Load balancing','Unlimited revisions','4-week delivery','Security audit','Priority support'] },
      { name: 'Custom', price: null, popular: false, period: 'quote',
        features: ['Bot network','Custom AI model','Payment gateway build','Enterprise scale','Dedicated team','SLA guarantee','Full IP ownership','Training','Migration','24/7 support'] },
    ]
  },
  {
    id: 'ai-chatbot', label: 'AI Chatbot', icon: '💬', col: '#10b981',
    plans: [
      { name: 'Basic AI', price: 999, popular: false, period: 'project',
        features: ['GPT-4 integration','Up to 50 FAQ pairs','Website chat widget','Basic lead capture','Conversation history','1 revision round','1-week delivery','Simple analytics','Email handoff','Documentation'] },
      { name: 'Business AI', price: 3999, popular: true, period: 'project',
        features: ['Custom knowledge base RAG','Unlimited Q&A pairs','Multi-channel deploy','CRM integration','Human handoff flow','3 revision rounds','3-week delivery','Conversation analytics','Multi-language','Custom persona'] },
      { name: 'Enterprise AI', price: 9999, popular: false, period: 'project',
        features: ['Fine-tuned LLM','Private data ingestion','WhatsApp + Telegram + Web','Salesforce integration','Advanced analytics','Unlimited revisions','6-week delivery','Security audit','99.9% SLA','1 year support'] },
      { name: 'Custom', price: null, popular: false, period: 'quote',
        features: ['Proprietary LLM','Multi-agent system','Voice interface','Custom training pipeline','White-label','Dedicated team','SLA guarantee','IP ownership','Training','24/7 support'] },
    ]
  },
];

const SERVICE_GROUPS = [
  { label: 'Web & E-Commerce', ids: ['web-info','ecommerce'] },
  { label: 'Mobile Apps', ids: ['android','ios','hybrid'] },
  { label: 'AI & Automation', ids: ['ml-ai','ai-chatbot','telegram-bot'] },
  { label: 'Growth & Platforms', ids: ['digital','payment','blog','saas'] },
];


function PlanCard({ plan, col, currency, delay }) {
  return (
    <motion.div
      initial={{ opacity:0, y:24 }}
      animate={{ opacity:1, y:0 }}
      transition={{ delay, type:'spring', stiffness:180 }}
      style={{ position:'relative', borderRadius:12, overflow:'hidden',
        background: plan.popular
          ? `linear-gradient(155deg,rgba(6,10,30,0.99),${col}14)`
          : 'linear-gradient(155deg,rgba(4,6,20,0.98),rgba(8,10,26,0.98))',
        border: plan.popular ? `1px solid ${col}66` : `1px solid ${col}22`,
        boxShadow: plan.popular ? `0 0 0 1px ${col}33, 0 12px 40px ${col}22` : 'none',
        display:'flex', flexDirection:'column', height:'100%' }}>

      {/* Popular banner */}
      {plan.popular && (
        <div style={{ position:'absolute', top:0, left:0, right:0, height:2,
          background:`linear-gradient(90deg,transparent,${col},transparent)` }}/>
      )}
      {plan.popular && (
        <div style={{ position:'absolute', top:12, right:12, background:col,
          color:'#030412', fontFamily:'Orbitron,monospace', fontSize:8,
          fontWeight:900, padding:'3px 10px', borderRadius:4, letterSpacing:1.5 }}>
          POPULAR
        </div>
      )}

      {/* Corner brackets */}
      {[['top','left'],['top','right'],['bottom','left'],['bottom','right']].map(([v,h],i)=>(
        <div key={i} style={{ position:'absolute',[v]:6,[h]:6,width:10,height:10,
          borderTop:v==='top'?`1.5px solid ${col}${plan.popular?'88':'44'}`:'none',
          borderBottom:v==='bottom'?`1.5px solid ${col}${plan.popular?'88':'44'}`:'none',
          borderLeft:h==='left'?`1.5px solid ${col}${plan.popular?'88':'44'}`:'none',
          borderRight:h==='right'?`1.5px solid ${col}${plan.popular?'88':'44'}`:'none' }}/>
      ))}

      {/* Scan line */}
      <motion.div style={{ position:'absolute', left:0, right:0, height:1,
        background:`linear-gradient(90deg,transparent,${col}44,transparent)` }}
        animate={{ top:['0%','100%'] }} transition={{ duration:4, repeat:Infinity, ease:'linear', delay:delay }}/>

      <div style={{ padding:'24px 20px', flex:1, display:'flex', flexDirection:'column' }}>
        {/* Plan name */}
        <div style={{ fontFamily:'Orbitron,monospace', fontSize:13, fontWeight:900,
          color: plan.popular ? col : '#c8e8ff', letterSpacing:1, marginBottom:16,
          textShadow: plan.popular ? `0 0 14px ${col}` : 'none' }}>
          {plan.name.toUpperCase()}
        </div>

        {/* Price */}
        <div style={{ marginBottom:20 }}>
          {plan.price === null ? (
            <div>
              <span style={{ fontFamily:'Orbitron,monospace', fontSize:26, fontWeight:900,
                color:col, textShadow:`0 0 16px ${col}77` }}>CUSTOM</span>
              <p style={{ fontFamily:'Rajdhani,sans-serif', color:'rgba(148,200,240,0.5)',
                fontSize:12, marginTop:3 }}>Let's scope it together</p>
            </div>
          ) : (
            <div>
              <span style={{ fontFamily:'Orbitron,monospace', fontSize:'clamp(22px,2.5vw,30px)',
                fontWeight:900, color:col, textShadow:`0 0 20px ${col}66` }}>
                {CURRENCIES[currency].symbol}
                {Math.round(plan.price * CURRENCIES[currency].rate).toLocaleString()}
              </span>
              {plan.period !== 'project' && (
                <span style={{ fontFamily:'Rajdhani,sans-serif', color:`${col}88`, fontSize:13,
                  marginLeft:4 }}>/{plan.period}</span>
              )}
              <p style={{ fontFamily:'Rajdhani,sans-serif', color:'rgba(148,200,240,0.4)',
                fontSize:11, marginTop:4, letterSpacing:0.5 }}>
                {plan.period === 'project' ? 'ONE-TIME' : 'PER MONTH'}
              </p>
            </div>
          )}
        </div>

        {/* Divider */}
        <div style={{ height:1, background:`linear-gradient(90deg,${col}44,transparent)`, marginBottom:16 }}/>

        {/* Features */}
        <div style={{ flex:1, display:'flex', flexDirection:'column', gap:7, marginBottom:20 }}>
          {plan.features.map((f,i) => (
            <div key={i} style={{ display:'flex', gap:9, alignItems:'flex-start' }}>
              <span style={{ color:col, fontSize:12, flexShrink:0, fontFamily:'monospace',
                marginTop:1, opacity:0.8 }}>{'>'}</span>
              <span style={{ fontFamily:'Rajdhani,sans-serif', color:'rgba(180,215,255,0.65)',
                fontSize:13, lineHeight:1.45 }}>{f}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <motion.button
          style={{ width:'100%', padding:'11px', borderRadius:7,
            fontFamily:'Orbitron,monospace', fontSize:11, fontWeight:700,
            letterSpacing:1.5, cursor:'pointer', border:`1px solid ${col}55`,
            background: plan.popular ? col : `${col}12`,
            color: plan.popular ? '#030412' : col,
            boxShadow: plan.popular ? `0 6px 20px ${col}44` : 'none' }}
          whileHover={{ scale:1.03, boxShadow:`0 8px 24px ${col}55` }}
          whileTap={{ scale:0.97 }}>
          {plan.price === null ? 'GET QUOTE' : 'GET STARTED'}
        </motion.button>
      </div>
    </motion.div>
  );
}

export default function PricingPage({ go }) {
  const [currency, setCurrency] = useState('USD');
  const [activeGroup, setActiveGroup] = useState(0);
  const [activeService, setActiveService] = useState('web-info');

  const groupServices = SERVICES.filter(s =>
    SERVICE_GROUPS[activeGroup].ids.includes(s.id)
  );
  const currentService = SERVICES.find(s => s.id === activeService) || groupServices[0];

  return (
    <div style={{ paddingTop:88, overflowX:'hidden' }}>
      <div style={{ position:'fixed', inset:0, backgroundImage:'linear-gradient(rgba(0,201,255,0.015) 1px,transparent 1px),linear-gradient(90deg,rgba(0,201,255,0.015) 1px,transparent 1px)', backgroundSize:'60px 60px', pointerEvents:'none', zIndex:0 }}/>

      <section style={{ padding:'clamp(40px,6vw,72px) 0 80px', position:'relative', zIndex:1 }}>
        <div className="wrap">

          {/* Header */}
          <div style={{ textAlign:'center', marginBottom:40 }}>
            <p style={{ fontFamily:'Orbitron,monospace', color:'#00C9FF', fontSize:10,
              fontWeight:700, letterSpacing:3, textTransform:'uppercase', marginBottom:10 }}>
              PRICING MATRIX
            </p>
            <h1 style={{ fontFamily:'Orbitron,monospace', fontSize:'clamp(22px,4vw,44px)',
              fontWeight:900, color:'#fff', letterSpacing:1.5, marginBottom:12,
              textShadow:'0 0 30px rgba(0,201,255,0.25)' }}>
              TRANSPARENT PRICING
            </h1>
            <p style={{ fontFamily:'Rajdhani,sans-serif', color:'rgba(148,200,240,0.6)',
              fontSize:15, maxWidth:520, margin:'0 auto', lineHeight:1.7 }}>
              No hidden fees. No surprises. Pick your service, pick your plan.
            </p>
          </div>

          {/* Currency selector */}
          <div style={{ display:'flex', justifyContent:'center', marginBottom:36 }}>
            <div style={{ display:'flex', gap:6, flexWrap:'wrap', justifyContent:'center',
              background:'rgba(0,5,18,0.8)', border:'1px solid rgba(0,201,255,0.15)',
              borderRadius:10, padding:6 }}>
              {Object.entries(CURRENCIES).map(([key, cur]) => (
                <motion.button key={key} onClick={() => setCurrency(key)}
                  style={{ padding:'7px 14px', borderRadius:7, cursor:'pointer',
                    fontFamily:'Orbitron,monospace', fontSize:10, fontWeight:700,
                    letterSpacing:1, border: currency===key ? '1px solid rgba(0,201,255,0.5)' : '1px solid transparent',
                    background: currency===key ? 'rgba(0,201,255,0.12)' : 'transparent',
                    color: currency===key ? '#00C9FF' : 'rgba(148,200,240,0.45)',
                    transition:'all 0.2s', display:'flex', alignItems:'center', gap:5 }}
                  whileHover={{ scale:1.05 }} whileTap={{ scale:0.97 }}>
                  <span style={{ fontSize:14 }}>{cur.flag}</span>
                  {cur.label}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Service group tabs */}
          <div style={{ display:'flex', gap:8, flexWrap:'wrap', justifyContent:'center', marginBottom:20 }}>
            {SERVICE_GROUPS.map((g, gi) => (
              <motion.button key={g.label}
                onClick={() => { setActiveGroup(gi); setActiveService(SERVICE_GROUPS[gi].ids[0]); }}
                style={{ padding:'9px 18px', borderRadius:7, cursor:'pointer',
                  fontFamily:'Orbitron,monospace', fontSize:10, fontWeight:700, letterSpacing:1,
                  border: activeGroup===gi ? '1px solid #00C9FF' : '1px solid rgba(0,201,255,0.2)',
                  background: activeGroup===gi ? 'rgba(0,201,255,0.12)' : 'rgba(0,5,18,0.8)',
                  color: activeGroup===gi ? '#00C9FF' : 'rgba(148,200,240,0.45)',
                  transition:'all 0.2s' }}
                whileHover={{ scale:1.04 }} whileTap={{ scale:0.97 }}>
                {g.label.toUpperCase()}
              </motion.button>
            ))}
          </div>

          {/* Service selector within group */}
          <div style={{ display:'flex', gap:6, flexWrap:'wrap', justifyContent:'center', marginBottom:40 }}>
            {groupServices.map(s => (
              <motion.button key={s.id}
                onClick={() => setActiveService(s.id)}
                style={{ padding:'7px 14px', borderRadius:6, cursor:'pointer',
                  fontFamily:'Rajdhani,sans-serif', fontSize:13, fontWeight:700, letterSpacing:0.5,
                  border: activeService===s.id ? `1px solid ${s.col}77` : `1px solid ${s.col}22`,
                  background: activeService===s.id ? `${s.col}12` : 'transparent',
                  color: activeService===s.id ? s.col : `${s.col}66`,
                  transition:'all 0.2s', display:'flex', alignItems:'center', gap:6 }}
                whileHover={{ scale:1.04 }}>
                <span>{s.icon}</span>{s.label}
              </motion.button>
            ))}
          </div>

          {/* Plans grid */}
          <AnimatePresence mode="wait">
            <motion.div key={activeService}
              initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-10 }}
              transition={{ duration:0.3 }}>
              {/* Service header */}
              <div style={{ textAlign:'center', marginBottom:28 }}>
                <span style={{ fontFamily:'Orbitron,monospace', fontSize:10,
                  color:currentService.col, letterSpacing:2, fontWeight:700,
                  background:`${currentService.col}10`, border:`1px solid ${currentService.col}33`,
                  borderRadius:4, padding:'4px 14px' }}>
                  {currentService.icon} {currentService.label.toUpperCase()}
                </span>
              </div>

              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:16 }}>
                {currentService.plans.map((plan, i) => (
                  <PlanCard key={plan.name} plan={plan} col={currentService.col}
                    currency={currency} delay={i*0.07} />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Bottom note */}
          <Reveal>
            <div style={{ textAlign:'center', marginTop:48,
              background:'rgba(0,5,18,0.7)', border:'1px solid rgba(0,201,255,0.1)',
              borderRadius:10, padding:'20px 24px', maxWidth:700, margin:'48px auto 0' }}>
              <p style={{ fontFamily:'Orbitron,monospace', color:'rgba(0,201,255,0.7)',
                fontSize:10, letterSpacing:2, marginBottom:8 }}>
                ALL PLANS INCLUDE
              </p>
              <div style={{ display:'flex', flexWrap:'wrap', gap:10, justifyContent:'center' }}>
                {['Free consultation','NDA on request','Source code ownership','Post-launch support','Secure delivery'].map(t => (
                  <span key={t} style={{ fontFamily:'Rajdhani,sans-serif', fontSize:12,
                    color:'rgba(148,200,240,0.55)', background:'rgba(0,201,255,0.05)',
                    border:'1px solid rgba(0,201,255,0.12)', borderRadius:4,
                    padding:'4px 10px' }}>✓ {t}</span>
                ))}
              </div>
              <div style={{ marginTop:16 }}>
                <motion.button className="btn-gold"
                  onClick={() => go('contact')}
                  style={{ fontFamily:'Orbitron,monospace', fontSize:12, letterSpacing:1.5, padding:'12px 32px' }}
                  whileHover={{ scale:1.05 }}>
                  GET FREE CONSULTATION →
                </motion.button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
