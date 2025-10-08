# OPUS CREATIVES - Tech Agency Website

A modern, high-performance web agency website built with Next.js 15, React 19, and TailwindCSS. Features Framer Motion animations and a clean, professional design focused on web development services.

## ✨ Design & Features

- **Modern Light Theme**: Light grey background (#f3f4f6) with electric blue accents (#0000ff)
- **High Contrast**: Excellent readability with dark text on light backgrounds
- **Smooth Animations**: Framer Motion for scroll-triggered and interactive animations
- **Hero Section**: Full-screen hero with animated background image and gradient overlays
- **Responsive Design**: Mobile-first approach with seamless breakpoints
- **Professional Components**: Built with shadcn/ui for consistency

## 🛠️ Tech Stack

- **Framework**: Next.js 15.2.4
- **UI Library**: React 19
- **Styling**: TailwindCSS v3.4
- **Animations**: Framer Motion
- **Component Library**: shadcn/ui (Radix UI)
- **Language**: TypeScript
- **Fonts**: Geist Sans & Geist Mono

## 📦 Installation & Setup

```bash
# Navigate to the project directory
cd tech-agency-coming-soon

# Install dependencies
pnpm install
# or
npm install

# Run development server
pnpm dev
# or
npm run dev

# Build for production
pnpm build
# or
npm run build

# Start production server
pnpm start
# or
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

## 🎯 Project Structure

```
tech-agency-coming-soon/
├── app/
│   ├── globals.css      # Global styles & animations
│   ├── layout.tsx        # Root layout with metadata
│   └── page.tsx          # Main page (all-in-one component)
├── components/
│   ├── ui/              # shadcn/ui components
│   └── theme-provider.tsx
├── hooks/
│   └── use-toast.ts     # Toast notifications hook
├── lib/
│   └── utils.ts         # Utility functions
├── public/
│   └── hero-bg.jpg      # Hero section background image
└── styles/
    └── globals.css
```

## 🎨 Sections Overview

### 1. **Hero Section**
- Full-screen hero with animated background image
- Oversized typography: "WEB DEVELOPMENT AGENCY"
- Animated gradient overlays and floating color accents
- Dual CTAs: "Start Your Project" (Calendly) and "View Our Services"
- Smooth scroll indicator

### 2. **Services Section**
- Electric blue gradient background (#0000ff)
- 6 service cards with hover animations:
  - Web Applications
  - API Development
  - SaaS Platforms
  - E-Commerce Solutions
  - Cloud Infrastructure
  - AI & Automation
- Glass morphism effects on cards
- "Learn more" arrows appear on hover

### 3. **About Section**
- Two-column layout
- Company description and approach
- Client testimonial with styled quote
- Technology stack showcase (12 technologies)
- Interactive tech boxes with hover effects
- Blue CTA card with dual action buttons

### 4. **Process Section**
- 3-step process cards:
  1. Discover
  2. Architect & Develop
  3. Deploy & Scale
- Numbered badges with hover animations
- Clean, professional layout

### 5. **Contact Section**
- Two-column layout
- Contact information with icons
- Social media links (Twitter, LinkedIn, GitHub)
- Professional contact form with validation
- Alternative Calendly CTA

### 6. **Footer**
- Blue background matching brand
- Two-column layout
- Social media buttons
- Legal links (Privacy Policy, Terms of Service)
- Back-to-top button
- Copyright information

## 🎨 Color Palette

- **Primary Blue**: `#0000ff`
- **Background**: `#f3f4f6` (light grey)
- **Foreground**: `#0a0a0a` (near black)
- **Card Background**: `#ffffff` (white)
- **Border**: `#e5e7eb` (light grey)
- **Text**: `#111827` (dark grey) and `#4b5563` (medium grey)

## ✨ Key Features

### 🎯 **Business Features**
- **Calendly Integration**: Multiple CTAs throughout for easy meeting scheduling
- **Lead Generation**: Professional contact form with validation and toast notifications
- **Email Link**: Direct email contact (zenithcodeservices@gmail.com)
- **Social Proof**: Client testimonials and technology showcase

### 🎨 **Design & Animations**
- **Scroll Animations**: Elements fade, slide, and scale into view
- **Hero Parallax**: Background image with animated gradient overlays
- **Interactive Cards**: Hover effects with scale transforms and color transitions
- **Glass Morphism**: Backdrop blur effects on service cards
- **Micro-interactions**: Smooth transitions on all interactive elements
- **Typography Animations**: Staggered reveals in hero section

### 💻 **Technical Features**
- **Smooth Scroll**: Framer Motion scroll-triggered animations
- **Responsive Navigation**: Mobile hamburger menu with smooth transitions
- **Form Validation**: Built-in validation with toast notifications
- **SEO Optimized**: Proper meta tags, keywords, and Open Graph
- **Accessibility**: Semantic HTML and ARIA labels
- **Performance**: Optimized with Next.js 15 features

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🎯 Customization

### Change Calendly Link
Search and replace `https://calendly.com/zenithcodeservices/30min?month=2025-10` with your own Calendly URL in `app/page.tsx`

### Change Email
Update `zenithcodeservices@gmail.com` in the Contact section

### Update Colors
Edit `app/globals.css`:
```css
:root {
  --primary: 0 0 255; /* Change electric blue */
  --background: 243 244 246; /* Change background */
}
```

Or update TailwindCSS classes directly in `app/page.tsx`:
- `bg-[#0000ff]` → your primary color
- `bg-gray-50` → your background color

### Update Content
All content is in `app/page.tsx`:
- Services array (line ~100)
- Process steps array (line ~150)
- Technologies array (line ~175)
- All text content throughout the component

### Add/Remove Sections
The page is a single component, so you can easily:
1. Comment out sections you don't need
2. Duplicate and modify existing sections
3. Reorder sections by moving JSX blocks

## 🚀 Deployment

This project is ready to deploy on:
- **Vercel** (recommended for Next.js) - Zero configuration
- **Netlify** - Add `next.config.mjs` build settings
- **Any Node.js hosting** - Run `npm run build && npm start`

### Vercel Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

## 📄 License

© 2025 OPUS CREATIVES LTD. All rights reserved.

## 🎨 Design Credits

Reskinned from a tech agency template to match the OPUS CREATIVES brand identity:
- Electric blue color scheme (#0000ff)
- Web development focused copy
- Light grey background for readability
- Professional, modern aesthetic
- High contrast for accessibility

Built with ❤️ by OPUS CREATIVES

---

## 📝 Recent Updates

### Latest Changes:
- ✅ **Complete Reskin**: Updated from NEURALUX AI agency to OPUS CREATIVES web development agency
- ✅ **Color Scheme**: Changed from purple/cyan gradient to electric blue (#0000ff)
- ✅ **Hero Image**: Added custom background image with animated overlays
- ✅ **Services**: Updated to web development services (Web Apps, APIs, SaaS, E-commerce, Cloud, AI)
- ✅ **Calendly Integration**: Multiple CTAs linking to booking page
- ✅ **Light Theme**: Changed to light grey background (#f3f4f6) for better readability
- ✅ **Copy Updates**: All text updated to focus on web development and software engineering
- ✅ **Metadata**: Updated SEO tags, title, and description
- ✅ **Footer**: Updated branding and social links

### Component Changes:
- Replaced AI-focused services with web development services
- Removed team section (can be re-added if needed)
- Simplified process from 6 steps to 3 steps
- Updated all branding from "NEURALUX" to "OPUS CREATIVES"
- Changed navigation items to match new structure
- Updated email and contact information

---

For questions or support, contact: zenithcodeservices@gmail.com

