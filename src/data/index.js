// Clash Royale characters - SVG-animated pixel art sprites
export const CR_CHARACTERS = {
  'web-info':  { name: 'Wizard',       rarity: 'epic',      elixir: 5,  tagline: 'Master of web enchantment',   col:'#00C9FF', glowCol:'rgba(0,201,255, 0.7)' },
  'ecommerce': { name: 'Goblin',       rarity: 'common',    elixir: 2,  tagline: 'Swift commerce raider',        col:'#4FFFB0', glowCol:'rgba(79,255,176, 0.7)' },
  'android':   { name: 'Barbarian',    rarity: 'common',    elixir: 3,  tagline: 'Brute-force native power',     col:'#3FC380', glowCol:'rgba(63,195,128, 0.7)' },
  'ios':       { name: 'Archer Queen', rarity: 'legendary', elixir: 0,  tagline: 'Precision iOS craftsmanship',  col:'#FC5C7D', glowCol:'rgba(252,92,125, 0.7)' },
  'hybrid':    { name: 'Grand Warden', rarity: 'legendary', elixir: 0,  tagline: 'Guardian of both realms',     col:'#7c3aed', glowCol:'rgba(124,58,237, 0.7)' },
  'digital':   { name: 'Bowler',       rarity: 'epic',      elixir: 5,  tagline: 'Rolls over the competition',  col:'#F7971E', glowCol:'rgba(247,151,30, 0.7)' },
  'payment':   { name: 'Bomber',       rarity: 'common',    elixir: 2,  tagline: 'Blast through payment walls', col:'#FF9F43', glowCol:'rgba(255,159,67, 0.7)'  },
  'blog':      { name: 'Goblin King',  rarity: 'rare',      elixir: 3,  tagline: 'Ruler of content kingdoms',   col:'#FFD700', glowCol:'rgba(255,215,0, 0.7)'   },
};

export const SERVICES = [
  {
    id: 'web-info', icon: '🌐', title: 'Informative Websites',
    short: 'SEO-optimised, blazing-fast corporate & portfolio sites', col: '#00C9FF',
    hero: "Build your brand's digital home -- websites that rank, load in under 2s, and convert visitors into loyal customers.",
    feats: ['Custom responsive design','PageSpeed 95+ guaranteed','On-page SEO & schema markup','CMS integration (Sanity/Contentful)','WCAG 2.1 Accessibility','CDN & edge caching','Google Analytics setup','Contact forms & lead capture','Blog & news sections','Open Graph previews'],
    tech: ['Next.js 14','React','TypeScript','TailwindCSS','Sanity CMS','Vercel','Cloudflare'],
    proc: ['Discovery','Wireframes','Design','Development','QA','Launch'],
    stats: [{n:'95+',l:'PageSpeed'},{n:'3x',l:'Traffic Boost'},{n:'48h',l:'Prototype'},{n:'100%',l:'Mobile-First'}],
  },
  {
    id: 'ecommerce', icon: '🛒', title: 'E-Commerce Solutions',
    short: 'Full-featured stores engineered to sell at scale', col: '#4FFFB0',
    hero: 'Launch your store with a conversion-optimised platform covering catalogue, checkout, inventory, and analytics.',
    feats: ['Custom storefront design','Advanced inventory management','Multi-currency & language','Abandoned cart recovery','Algolia product search','Shipping zones & tax engine','Real-time order tracking','Coupon & discount engine','Wishlist, reviews & comparisons','B2B wholesale support'],
    tech: ['Next.js','Shopify','WooCommerce','Stripe','PayPal','Algolia','Redis','MongoDB'],
    proc: ['Strategy','UX Architecture','Design','Backend','Payments','Launch'],
    stats: [{n:'2x',l:'Conversions'},{n:'50k+',l:'Products'},{n:'99.9%',l:'Uptime'},{n:'<1s',l:'Checkout'}],
  },
  {
    id: 'android', icon: '🤖', title: 'Android App Development',
    short: 'Native Kotlin apps with Material You design', col: '#3FC380',
    hero: 'High-performance Android apps -- Kotlin, Jetpack Compose, Material You, offline-first architecture.',
    feats: ['Native Kotlin & Jetpack Compose','Material You design system','Offline-first Room Database','Push notifications (FCM)','Google In-App Purchases','Maps & geofencing','Biometric authentication','Play Store ASO','Dark mode support','Widget & shortcut support'],
    tech: ['Kotlin','Jetpack Compose','Room DB','Retrofit','Hilt DI','Firebase','Google Play','WorkManager'],
    proc: ['Requirements','Prototype','UI Design','Development','QA & UAT','Play Store'],
    stats: [{n:'4.8★',l:'Play Rating'},{n:'<48ms',l:'Frame Time'},{n:'API 24+',l:'Coverage'},{n:'100%',l:'Policy OK'}],
  },
  {
    id: 'ios', icon: '🍎', title: 'iOS App Development',
    short: 'Swift & SwiftUI with deep Apple ecosystem integration', col: '#FC5C7D',
    hero: 'Beautifully crafted iPhone & iPad apps -- Swift, SwiftUI, and the full Apple ecosystem.',
    feats: ['Swift & SwiftUI development','Human Interface Guidelines','Core Data & CloudKit','Apple Pay integration','Sign in with Apple','HealthKit & ARKit','TestFlight distribution','App Store Connect & ASO','Haptic feedback','Siri & Shortcuts'],
    tech: ['Swift','SwiftUI','UIKit','Core Data','CloudKit','Firebase','Xcode','App Store Connect'],
    proc: ['Discovery','Wireframes','Design','Development','TestFlight','App Store'],
    stats: [{n:'4.9★',l:'App Store'},{n:'iOS 15+',l:'Coverage'},{n:'60fps',l:'UI'},{n:'100%',l:'HIG'}],
  },
  {
    id: 'hybrid', icon: '⚡', title: 'Hybrid App Development',
    short: 'React Native & Flutter -- one codebase, two platforms', col: '#7c3aed',
    hero: 'Ship iOS and Android simultaneously -- React Native and Flutter at 40% less cost.',
    feats: ['React Native or Flutter','Shared iOS + Android code','OTA updates via Expo EAS','Native module bridges','Offline data sync','Firebase & AWS Amplify','Both store launches','Deep linking & push notifications','Biometric auth','Platform UI adapters'],
    tech: ['React Native','Flutter','Expo EAS','Dart','TypeScript','Firebase','Redux Toolkit','React Navigation'],
    proc: ['Tech Choice','Architecture','Design','Development','Device QA','Dual Launch'],
    stats: [{n:'40%',l:'Cost Saving'},{n:'1 Code',l:'2 Platforms'},{n:'6 Wks',l:'Avg MVP'},{n:'95%',l:'Native Parity'}],
  },
  {
    id: 'digital', icon: '📈', title: 'Digital Marketing',
    short: 'Data-driven SEO, PPC & content that converts', col: '#F7971E',
    hero: 'Grow with measurable, ROI-focused strategies -- SEO, paid ads, content marketing, and CRO.',
    feats: ['Technical & content SEO','Google Ads (Search/PMax)','Meta & Instagram Ads','LinkedIn B2B campaigns','Content strategy','Email automation','CRO & A/B testing','Competitor analysis','Google Analytics 4 setup','Monthly KPI dashboards'],
    tech: ['Google Analytics 4','Search Console','SEMrush','Ahrefs','Google Ads','Meta Business','HubSpot','Klaviyo'],
    proc: ['Audit','Strategy','Campaign Build','Launch','Optimise','Report & Scale'],
    stats: [{n:'5x',l:'Avg ROI'},{n:'3x',l:'Organic Traffic'},{n:'40%',l:'Lower CPC'},{n:'100%',l:'Transparent'}],
  },
  {
    id: 'payment', icon: '💳', title: 'Payment Integration',
    short: 'Secure multi-gateway flows for any business model', col: '#FF9F43',
    hero: 'Accept payments globally -- Stripe, PayPal, and cards with PCI-DSS compliance and fraud prevention.',
    feats: ['Stripe complete integration','PayPal & Pay Later','Recurring subscriptions','One-click checkout','3D Secure & fraud detection','Invoice automation','Webhook handling','Split payments & escrow','Multi-currency support','Refund management'],
    tech: ['Stripe','PayPal','Razorpay','Node.js','Webhooks','PostgreSQL','Redis','AWS Lambda'],
    proc: ['Audit','Gateway Choice','Integration','Security Test','Compliance','Go Live'],
    stats: [{n:'135+',l:'Currencies'},{n:'99.99%',l:'Uptime'},{n:'<2%',l:'Chargeback'},{n:'PCI',l:'Compliant'}],
  },
  {
    id: 'blog', icon: '✍️', title: 'Blog & Content Platforms',
    short: 'Dynamic publishing built for reach & revenue', col: '#FFD700',
    hero: 'Build a content engine that attracts audiences at scale -- editorial tools, monetisation, and SEO built-in.',
    feats: ['Rich text editor','Multi-author with roles','Comment & discussion threads','Newsletter integration','Content paywall','Social sharing widgets','RSS feeds','Related posts','Image CDN','Content analytics'],
    tech: ['Next.js','Ghost CMS','Sanity','MongoDB','SendGrid','Algolia','Cloudinary','Vercel'],
    proc: ['Strategy','Architecture','Design','CMS Setup','Migration','Launch'],
    stats: [{n:'5x',l:'SEO Traffic'},{n:'2min',l:'Publish Post'},{n:'unlimited',l:'Articles'},{n:'99%',l:'Delivery'}],
  },
];

export const PORTFOLIO = [
  { title:'TrueOdds', cat:'Web App', tech:'Next.js · Node.js · MongoDB', em:'🎯', col:'#FF9F43', link:'https://trueodds.ca', desc:'Canadian sports analytics -- real-time odds comparison & value bet detection across all major leagues.', res:['50k+ monthly users','20+ books real-time','Sub-200ms loads'] },
  { title:'UrbanNest', cat:'E-Commerce', tech:'Next.js · Stripe · MongoDB', em:'🏠', col:'#00C9FF', desc:'Luxury real-estate marketplace with virtual tours and Stripe subscription billing for premium listings.', res:['$2M+ properties listed','300% conversion lift','Stripe billing'] },
  { title:'Pulsify Health', cat:'Web App', tech:'React · Node.js · PostgreSQL', em:'💊', col:'#4FFFB0', desc:'Healthcare SaaS with real-time vitals monitoring, appointment booking, and HIPAA-compliant storage.', res:['10k+ patients','HIPAA compliant','Real-time vitals'] },
  { title:'GoDeliver', cat:'Hybrid App', tech:'React Native · Firebase', em:'🚚', col:'#FF6584', desc:'Food-delivery app -- 50k+ daily orders across 12 cities with live GPS tracking and in-app payments.', res:['50k+ daily orders','12 cities','4.8★ rating'] },
  { title:'CryptoLens', cat:'Web + Android', tech:'Flutter · Web3.js · Node.js', em:'📊', col:'#7c3aed', desc:'Multi-chain DeFi tracker with live feeds, biometric security, and automated tax reporting.', res:['135+ tokens tracked','Biometric auth','Tax reports'] },
  { title:'LiteLMS', cat:'E-Learning', tech:'Next.js · Stripe · AWS', em:'📚', col:'#FC5C7D', desc:'Course marketplace with live streaming, AI-graded quizzes, certificate generation, and PayPal billing.', res:['5k+ courses hosted','Stripe & PayPal','AI grading'] },
  { title:'NomadPR', cat:'Digital Marketing', tech:'WordPress · SEO · Meta Ads', em:'🌍', col:'#3FC380', desc:'Travel SEO + Meta retargeting -- 2k to 80k monthly organic visitors in 6 months.', res:['40x organic growth','80k/month','620% ROI'] },
];

export const BLOG_POSTS = [
  { title:'Why Next.js 14 Changes Everything for SEO', date:'May 28, 2025', cat:'Web Dev', read:'5 min', col:'#00C9FF', em:'💻', tags:['Next.js','SEO','Performance','React'], exc:'Server Components, streaming SSR, and the App Router dramatically improve Core Web Vitals and crawlability.', body:'Next.js 14 App Router and Server Components represent a fundamental shift in how we build for the web. By moving data fetching to the server, pages arrive pre-rendered -- Googlebot sees full HTML on the first request, dramatically improving indexation speed.\n\nStreaming SSR lets the browser progressively render content as it arrives, improving TTFB and LCP -- critical Core Web Vitals signals. In our tests across 20+ client sites, the App Router improved LCP by 42% and reduced JavaScript bundle size by 35%.\n\nThe Metadata API makes dynamic OG tags, canonical URLs, and JSON-LD structured data trivial without third-party libraries. Combined with built-in next/image and next/font, Next.js 14 is the closest thing to a guaranteed high PageSpeed score out of the box.\n\nFor e-commerce, RSC for product listings paired with Client Components for the cart creates both SEO-friendly server renders AND a snappy interactive checkout -- without compromise.' },
  { title:'React Native vs Flutter: 2025 Honest Comparison', date:'May 15, 2025', cat:'Mobile', read:'8 min', col:'#4FFFB0', em:'📱', tags:['React Native','Flutter','Mobile','Cross-Platform'], exc:'We shipped 12 apps in both frameworks. Here is what we learned about performance, DX, and hiring.', body:'After shipping 12 production apps in 2024 -- 7 in React Native and 5 in Flutter -- here are our findings.\n\nReact Native wins on team velocity. If your team knows JavaScript/TypeScript, the learning curve is minimal. The Expo ecosystem has matured enormously, and OTA updates via Expo EAS let you ship hotfixes without App Store review cycles.\n\nFlutter wins on visual consistency and animation fidelity. Dart compiles to native ARM code, and the Impeller rendering engine gives pixel-perfect, identical UI on iOS and Android. For complex custom animations, Flutter is genuinely superior.\n\nOur 2025 recommendation: React Native for B2B and data-heavy apps where velocity matters; Flutter for consumer apps where visual polish is paramount.' },
  { title:'Stripe vs PayPal: Which Should Your Store Use?', date:'May 2, 2025', cat:'Payments', read:'6 min', col:'#FF9F43', em:'💳', tags:['Stripe','PayPal','Payments','E-Commerce'], exc:'Fees, developer experience, fraud tools, and global coverage -- the 2025 breakdown.', body:'Both gateways are reliable, but they serve different customer profiles.\n\nStripe wins on developer experience. The API is clean, documentation is world-class, and Stripe Radar uses ML across billions of transactions for fraud prevention. For SaaS, subscriptions, and marketplaces, Stripe is the clear winner.\n\nPayPal wins on consumer trust for one-time purchases. 400M+ consumers have PayPal accounts and prefer it for checkout. Pay Later (BNPL) drives meaningful conversion lift for $30-$200 orders.\n\nOur recommendation: Integrate both. Use Stripe as primary, offer PayPal as an alternative checkout button. This captures 15-25% additional conversions from PayPal-preferring customers.' },
  { title:'The Anatomy of a Perfect Landing Page in 2025', date:'Apr 18, 2025', cat:'Design', read:'7 min', col:'#FC5C7D', em:'🎨', tags:['Landing Page','CRO','Design','Conversion'], exc:'Hero copy, social proof placement, CTA hierarchy -- backed by 200+ A/B tests.', body:'After 200+ A/B tests across industries, here is our clear conversion framework.\n\nThe hero is 80% of the battle. Your headline must answer what do I get and why now in under 8 words. Start My Free Trial outperforms Get Started by 23%. Outcome-specific CTAs beat generic ones by 41%.\n\nSocial proof placement: trust signals within the hero fold increase CTA clicks by 31% versus below the fold. Video testimonials in the hero section convert 22% better than text.\n\nMobile is non-negotiable: 65% of landing traffic is now mobile, and a 1-second delay reduces conversions by 7%.' },
  { title:'MongoDB Atlas vs PostgreSQL: When to Choose What', date:'Apr 5, 2025', cat:'Backend', read:'9 min', col:'#3FC380', em:'🗄️', tags:['MongoDB','PostgreSQL','Database','Backend'], exc:'Schema flexibility vs relational power -- a battle-tested breakdown for every project type.', body:'The most common architecture question from founders. Here is our honest answer.\n\nChoose MongoDB when: your data model is document-centric and evolves rapidly, you need complex nested data without painful JOINs, or you are building real-time features where horizontal sharding matters.\n\nChoose PostgreSQL when: you have strong relational integrity requirements, need ACID transactions across multiple tables, or run complex reporting queries. Postgres JSONB gives document flexibility when needed.\n\nOur 2025 default: PostgreSQL with Prisma for most SaaS products -- the strict schema prevents an entire class of runtime bugs.' },
  { title:'Digital Marketing on $500/Month: What Works', date:'Mar 22, 2025', cat:'Marketing', read:'6 min', col:'#F7971E', em:'📣', tags:['SEO','Meta Ads','Digital Marketing','ROI'], exc:'SEO content + retargeting is the 80/20 play -- the exact allocation for early-stage businesses.', body:'With $500/month, you cannot run every channel. Here is exactly how to allocate it:\n\n$200 to Content SEO: one 1800-word article per week targeting long-tail keywords with KD under 20 and volume 200-2000/month. This compounds -- articles you publish today earn traffic in month 18.\n\n$200 to Meta retargeting only: install the Meta Pixel, build 7-day and 30-day visitor audiences, and retarget with a strong offer. Retargeting CPMs are 60-70% lower than cold, conversion rates 5-10x higher.\n\n$100 to email list building via a lead magnet. Even 50 emails/month compounds to 600 engaged subscribers by year-end.\n\nThis mix consistently generates 3-8x ROI within 90 days for early-stage clients.' },
];

export const REVIEWS_1 = [
  {q:'Aquron delivered our e-commerce in 3 weeks -- sales doubled in month one.',n:'Rohan Mehta',r:'Founder, StyleLoop'},
  {q:'The Flutter app has 4.9 stars on App Store. Outstanding attention to detail.',n:'Sarah Thompson',r:'CTO, GoFit'},
  {q:'Organic traffic grew 5x in 6 months. Phenomenal SEO ROI.',n:'Mark Davidson',r:'CMO, Nomad Escapes'},
  {q:'Payment integration was flawless -- zero downtime since launch.',n:'Priscilla Wang',r:'CEO, CartFlow'},
  {q:'They turned complex data requirements into an elegant, fast app.',n:'Dev Anand',r:'Founder, DataPulse'},
  {q:'PageSpeed went from 54 to 97 after the Next.js migration.',n:'James O\'Brien',r:'CTO, MediaStack'},
  {q:'The Android app became our primary revenue channel.',n:'Aisha Khalid',r:'CEO, HealthNow'},
  {q:'SaaS redesign -- churn dropped 40% in 90 days.',n:'Tom Richards',r:'Founder, LearnFlow'},
  {q:'5-star experience from discovery to launch. True partners.',n:'Sofia Martinez',r:'CMO, BoldBrand'},
  {q:'Delivered exactly what was promised -- precisely on time.',n:'Lena Fischer',r:'Product Head, EcoShop'},
];
export const REVIEWS_2 = [
  {q:'TrueOdds performance after Aquron rebuilt it was night and day.',n:'Alex Chen',r:'CEO, TrueOdds.ca'},
  {q:'SEO: page 5 to page 1 for main keywords in 4 months.',n:'Ryan Park',r:'Marketing Director, LocalBiz'},
  {q:'React Native app ships weekly updates. Zero App Store delays.',n:'Hannah Mueller',r:'CTO, ShipFast'},
  {q:'Payment integration: subscriptions, trials, refunds -- perfect.',n:'Omar Farouk',r:'Founder, SubBox'},
  {q:'Blog handles 200k monthly readers without a hiccup.',n:'Isabella Rossi',r:'Editor, TechDaily'},
  {q:'App crossed 10k downloads in 3 months. Their ASO advice was gold.',n:'Lucas Oliveira',r:'Founder, FitPro'},
  {q:'Polished MVP in 6 weeks helped us close our seed round.',n:'Nia Johnson',r:'CEO, StartUpAI'},
  {q:'Most professional agency -- clear comms, zero surprises.',n:'Carl Weber',r:'CTO, EnterpriseCo'},
  {q:'Google Ads ROAS: 1.8x to 6.2x after they restructured campaigns.',n:'Mei Lin',r:'Growth Lead, CloudApp'},
  {q:'Conversion rate tripled after UX redesign. Outstanding.',n:'Patrick Durand',r:'CEO, FrenchBoutique'},
];

export const PRICING = [
  { name:'Starter', price:499, per:'project', col:'#4FFFB0', pop:false, inc:['5-Page Website','Responsive Design','Basic SEO','Contact Form','1 Revision','2-Week Delivery'], not:['E-Commerce','App Development','Digital Marketing'] },
  { name:'Growth', price:1499, per:'project', col:'#00C9FF', pop:true, inc:['Up to 15 Pages','Custom Design System','Advanced SEO','E-Commerce (100 products)','Payment Integration','Blog/CMS','3 Revisions','4-Week Delivery'], not:['App Development'] },
  { name:'Scale', price:3499, per:'project', col:'#7c3aed', pop:false, inc:['Unlimited Pages','Full Custom Design','Enterprise SEO','Full E-Commerce','Multi-Gateway Payments','iOS or Android App','Digital Marketing','Unlimited Revisions','8-Week Delivery'], not:[] },
  { name:'Agency', price:299, per:'month', col:'#FF9F43', pop:false, inc:['Monthly Retainer','Dedicated Developer','Ongoing SEO','Weekly Reports','Priority Support','Bug Fixes','Content Updates','Strategy Call'], not:[] },
];

export const TEAM = [
  { name:'Sayan Dhar', role:'CEO & Development Head', em:'👨‍💻', skills:'React · Next.js · Node.js · MongoDB · System Architecture', bio:'Full-stack architect and founder of Aquron with 5+ years building scalable digital products for 150+ clients across 30+ countries. Personally leads every major technical decision and client engagement.', crChar:'Barbarian King', crEmoji:'👑', col:'#FFD700' },
  { name:'Ankan Ghosh', role:'Operations Manager', em:'🎯', skills:'Project Management · Client Relations · Agile · Process Optimisation', bio:'The operational backbone of Aquron. Ensures every project ships on time, every client receives white-glove service, and no detail ever falls through the cracks.', crChar:'Grand Warden', crEmoji:'🗡️', col:'#00C9FF' },
];

export const CR_ARENA_CHARS = [
  { id:'web-info',  side:'blue', col:'#00C9FF' },
  { id:'ecommerce', side:'blue', col:'#4FFFB0' },
  { id:'android',   side:'blue', col:'#3FC380' },
  { id:'ios',       side:'blue', col:'#FC5C7D' },
  { id:'hybrid',    side:'red',  col:'#7c3aed' },
  { id:'digital',   side:'red',  col:'#F7971E' },
  { id:'payment',   side:'red',  col:'#FF9F43' },
  { id:'blog',      side:'red',  col:'#FFD700' },
];
