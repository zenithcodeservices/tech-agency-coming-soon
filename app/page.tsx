"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import {
  ArrowRight,
  Code,
  Database,
  Github,
  Linkedin,
  Mail,
  Menu,
  Server,
  Twitter,
  X,
  Globe,
  Rocket,
  Zap,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

export default function Home() {
  const { toast } = useToast()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [name, setName] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !message || !name) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Message sent!",
      description: "We'll get back to you within 24 hours.",
    })

    setEmail("")
    setMessage("")
    setName("")
    setIsSubmitting(false)
  }

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (mobileMenuOpen && !target.closest(".mobile-menu") && !target.closest(".menu-button")) {
        setMobileMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [mobileMenuOpen])

  const services = [
    {
      icon: <Code className="h-10 w-10" />,
      title: "Web Applications",
      description:
        "Custom web apps built with React, Next.js, Node.js, and TypeScript for maximum performance and scalability.",
    },
    {
      icon: <Server className="h-10 w-10" />,
      title: "API Development",
      description: "RESTful & GraphQL APIs with proper authentication, rate limiting, and comprehensive documentation.",
    },
    {
      icon: <Database className="h-10 w-10" />,
      title: "SaaS Platforms",
      description: "Multi-tenant architecture with subscription management, analytics, and seamless integrations.",
    },
    {
      icon: <Globe className="h-10 w-10" />,
      title: "E-Commerce Solutions",
      description: "High-performance online stores with payment processing, inventory management, and analytics.",
    },
    {
      icon: <Rocket className="h-10 w-10" />,
      title: "Cloud Infrastructure",
      description: "Scalable AWS architecture, CI/CD pipelines, containerization with Docker, and monitoring systems.",
    },
    {
      icon: <Zap className="h-10 w-10" />,
      title: "AI & Automation",
      description: "OpenAI integration, ML models, and automated workflows to enhance your applications.",
    },
  ]

  const processSteps = [
    {
      number: "01",
      title: "Discover",
      description:
        "We dive deep into your vision, understanding your goals, audience, and unique challenges to create a solid foundation.",
    },
    {
      number: "02",
      title: "Architect & Develop",
      description:
        "Our expert developers craft robust, scalable, and efficient solutions using cutting-edge technologies.",
    },
    {
      number: "03",
      title: "Deploy & Scale",
      description: "We build with precision, test thoroughly, and launch with confidence—ensuring your product exceeds expectations.",
    },
  ]

  const technologies = [
    "Next.js",
    "React",
    "TypeScript",
    "Node.js",
    "GraphQL",
    "AWS",
    "Docker",
    "PostgreSQL",
    "Python",
    "TailwindCSS",
    "CI/CD",
    "Framer Motion",
  ]

  const clients = [
    { name: "AWS", logo: "/companies/aws.avif" },
    { name: "Bank of America", logo: "/companies/bank of america.webp" },
    { name: "Beatport", logo: "/companies/Beatport-Black.png" },
    { name: "Evora", logo: "/companies/Evora-Main-Logo-1.webp" },
    { name: "Longevity Partners", logo: "/companies/partner-longevity-partners-1-scaled.png" },
    { name: "Recycling Alternative", logo: "/companies/RecyclingAlternative-Logo.avif" },
  ]

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-5">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold tracking-tight">
                <span className="bg-gradient-to-r from-[#0000ff] to-[#4d4dff] bg-clip-text text-transparent">OPUS</span>{" "}
                <span className="text-black">CREATIVES</span>
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#services" className="text-sm font-semibold text-gray-700 hover:text-[#0000ff] transition-colors">
                Services
              </a>
              <a href="#about" className="text-sm font-semibold text-gray-700 hover:text-[#0000ff] transition-colors">
                About
              </a>
              <a href="#process" className="text-sm font-semibold text-gray-700 hover:text-[#0000ff] transition-colors">
                Process
              </a>
              <a href="#contact" className="text-sm font-semibold text-gray-700 hover:text-[#0000ff] transition-colors">
                Contact
              </a>
              <a
                href="https://calendly.com/zenithcodeservices/30min?month=2025-10"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#0000ff] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#0000cc] hover:shadow-xl hover:-translate-y-0.5 transition-all"
              >
                Book a Call
              </a>
            </nav>

            {/* Mobile Menu Button */}
            <button className="md:hidden menu-button text-black" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white pt-20 mobile-menu">
          <nav className="flex flex-col items-center space-y-6 p-8">
            <a
              href="#services"
              className="text-lg font-semibold hover:text-[#0000ff] transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Services
            </a>
            <a
              href="#about"
              className="text-lg font-semibold hover:text-[#0000ff] transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </a>
            <a
              href="#process"
              className="text-lg font-semibold hover:text-[#0000ff] transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Process
            </a>
            <a
              href="#contact"
              className="text-lg font-semibold hover:text-[#0000ff] transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </a>
            <a
              href="https://calendly.com/zenithcodeservices/30min?month=2025-10"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#0000ff] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#0000cc] transition-all w-full text-center mt-4"
            >
              Book a Call
            </a>
          </nav>
        </div>
      )}

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Background Image with Overlays */}
        <div className="absolute inset-0 z-0">
          {/* Animated gradient overlay */}
          <motion.div
            className="absolute inset-0 z-10"
            animate={{
              background: [
                "linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,255,0.3) 100%)",
                "linear-gradient(135deg, rgba(0,0,255,0.3) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.6) 100%)",
                "linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,255,0.3) 100%)",
              ],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Static background image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url(/hero-bg.jpg)",
              filter: "brightness(0.7) contrast(1.1)",
            }}
          />

          {/* Animated color accent overlays */}
          <motion.div
            className="absolute top-0 right-0 w-1/3 h-1/3 rounded-full filter blur-[100px] opacity-30"
            style={{
              background: "radial-gradient(circle, rgba(77,158,255,0.6) 0%, transparent 70%)",
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
              x: [0, 50, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.div
            className="absolute bottom-0 left-0 w-1/3 h-1/3 rounded-full filter blur-[100px] opacity-30"
            style={{
              background: "radial-gradient(circle, rgba(0,0,255,0.5) 0%, transparent 70%)",
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.35, 0.2],
              x: [0, -50, 0],
              y: [0, 50, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
        </div>

        <motion.div style={{ opacity, scale }} className="container mx-auto px-4 z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto"
            style={{
              textShadow: "0 4px 20px rgba(0,0,0,0.5)",
            }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold tracking-tight mb-8 leading-[1.1]">
              <span className="block text-white drop-shadow-2xl">WEB</span>
              <span className="block text-white drop-shadow-2xl">DEVELOPMENT</span>
              <span className="block text-[#4d9eff] drop-shadow-2xl">AGENCY</span>
            </h1>

            <p className="mt-8 text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
              We build powerful web applications and digital platforms that scale.{" "}
              <span className="font-semibold text-white">A technology-driven agency delivering robust, high-performance solutions.</span>
            </p>

            <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://calendly.com/zenithcodeservices/30min?month=2025-10"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-[#0000ff] text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#0000cc] transition-all hover:shadow-xl hover:-translate-y-1 inline-block text-center"
              >
                Start Your Project
                <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </a>
              <a
                href="#services"
                className="border-2 border-white/50 bg-white/10 backdrop-blur-sm px-8 py-4 rounded-lg text-lg font-semibold text-white hover:bg-white/20 hover:border-white transition-all inline-block text-center"
              >
                View Our Services
              </a>
            </div>

            <div className="mt-16 flex justify-center">
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="cursor-pointer"
                onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
              >
                <ArrowRight className="h-8 w-8 rotate-90 text-white/70" />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Client Logos Section */}
      <section className="py-24 bg-[#1a1a1a] text-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif tracking-tight text-gray-300 mb-4">
              Our clients
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-12 items-center">
            {clients.map((client, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
              >
                <Image
                  src={client.logo}
                  alt={client.name}
                  width={150}
                  height={80}
                  className="w-full h-auto max-h-20 object-contain filter brightness-0 invert"
                  style={{ mixBlendMode: "lighten" }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 bg-gradient-to-br from-[#0000ff] via-[#0000ee] to-[#0000dd]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <p className="text-white/70 text-sm font-semibold uppercase tracking-wider mb-6">What We Build</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-white leading-tight">
              <span className="block mb-2">WEB APPS</span>
              <span className="block mb-2">SAAS PLATFORMS</span>
              <span className="block">API SOLUTIONS</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-sm border border-white/20 p-10 rounded-2xl hover:bg-white/20 hover:border-white/30 transition-all duration-300 cursor-pointer group"
              >
                <div className="space-y-6">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center group-hover:bg-white/30 transition-colors text-white">
                    {service.icon}
                  </div>

                  <h3 className="text-2xl font-bold tracking-tight text-white">{service.title}</h3>
                  <p className="text-white/70 leading-relaxed text-base">{service.description}</p>

                  <div className="flex items-center gap-2 text-white font-semibold opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all pt-2">
                    <span className="text-sm">Learn more</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-20 text-center">
            <a
              href="https://calendly.com/zenithcodeservices/30min?month=2025-10"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-[#0000ff] px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 hover:shadow-xl transition-all"
            >
              Start Your Project
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-start max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-5xl md:text-6xl font-bold tracking-tighter text-black mb-8">ABOUT</h2>

              <div className="space-y-8 text-lg leading-relaxed">
                <p className="text-gray-700">
                  We specialize in building scalable web applications and digital platforms using modern technologies.
                  From startups to enterprises, we help businesses transform their ideas into powerful, high-performance
                  software solutions.
                </p>

                <p className="text-gray-700">
                  Whether you're building from scratch or looking to scale, we architect solutions that grow with your
                  business. Our approach combines clean code, best practices, and cutting-edge technology stacks.
                </p>

                <p className="font-semibold text-xl text-black">
                  Delivering enterprise-grade solutions with startup agility.
                </p>
              </div>

              <div className="pt-12">
                <h3 className="text-sm font-bold mb-6 tracking-wider text-black">CLIENT TESTIMONIAL</h3>
                <blockquote className="border-l-4 border-[#0000ff] pl-6 italic text-lg text-gray-700">
                  "Opus Creatives built our entire platform from the ground up. Their technical expertise and attention to
                  scalability gave us a robust foundation that handles thousands of users seamlessly. Outstanding
                  development team."
                </blockquote>
                <p className="mt-4 font-semibold text-black">— Sarah Johnson, CTO at TechStart</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-12 space-y-10 border border-gray-100">
                <h3 className="text-3xl font-bold text-black">TECHNOLOGY STACK</h3>
                <p className="text-gray-700 text-lg font-medium">
                  We work with modern, battle-tested technologies that scale as your business grows.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {technologies.map((tech, index) => (
                    <motion.div
                      key={tech}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.05 }}
                      viewport={{ once: true }}
                      className="bg-white border-2 border-gray-200 rounded-xl p-6 text-center font-semibold min-h-[80px] flex items-center justify-center text-gray-800 text-base"
                    >
                      <span>{tech}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#0000ff] to-[#0000dd] text-white rounded-2xl p-12 space-y-6 shadow-2xl">
                <h3 className="text-4xl font-bold leading-tight">MAKE YOUR BRAND UNFORGETTABLE.</h3>
                <p className="text-xl text-white/90">Let's build something remarkable together.</p>
                <div className="flex flex-col sm:flex-row gap-4 mt-6">
                  <a
                    href="https://calendly.com/zenithcodeservices/30min?month=2025-10"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-white text-[#0000ff] px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 hover:shadow-xl transition-all text-center"
                  >
                    Book a Meeting
                  </a>
                  <a
                    href="#contact"
                    className="inline-block border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-[#0000ff] transition-all text-center"
                  >
                    Send a Message
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-32 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20 max-w-4xl mx-auto">
            <p className="text-sm font-semibold text-[#0000ff] uppercase tracking-wider mb-6">Our Approach</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black">How We Work</h2>
            <p className="text-xl text-gray-700 font-medium">
              A systematic approach to developing web applications that deliver real business value.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-10 rounded-2xl shadow-lg hover:-translate-y-2 transition-all duration-300 group cursor-default"
              >
                <div className="w-12 h-12 bg-[#0000ff] text-white flex items-center justify-center text-2xl font-bold mb-6 group-hover:scale-110 transition-transform rounded-xl">
                  {index + 1}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-black">{step.title}</h3>
                <p className="text-gray-700 leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-black tracking-tight">GET IN TOUCH</h2>
              <p className="text-xl text-gray-700 mb-8 font-medium">
                Ready to start your project? Fill out the form and we'll get back to you within 24 hours.
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="bg-[#0000ff]/10 p-3 rounded-full">
                    <Mail className="h-5 w-5 text-[#0000ff]" />
                  </div>
                  <a
                    href="mailto:4Thegreat@gmail.com"
                    className="text-gray-700 hover:text-[#0000ff] transition-colors font-medium"
                  >
                    4Thegreat@gmail.com
                  </a>
                </div>

                <div className="flex gap-4 mt-8">
                  <a
                    href="#"
                    className="bg-gray-100 hover:bg-[#0000ff] hover:text-white p-3 rounded-full transition-all"
                    aria-label="Twitter"
                  >
                    <Twitter className="h-5 w-5" />
                  </a>

                  <a
                    href="#"
                    className="bg-gray-100 hover:bg-[#0000ff] hover:text-white p-3 rounded-full transition-all"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>

                  <a
                    href="#"
                    className="bg-gray-100 hover:bg-[#0000ff] hover:text-white p-3 rounded-full transition-all"
                    aria-label="GitHub"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <form onSubmit={handleSubmit} className="bg-white border-2 border-gray-200 p-10 rounded-2xl shadow-lg">
                <h3 className="text-2xl font-bold mb-8 text-black">Send us a message</h3>

                <div className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold mb-2 text-gray-900">
                      Name
                    </label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-gray-50 border-2 border-gray-300 focus:border-[#0000ff] focus:ring-[#0000ff] text-gray-900"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold mb-2 text-gray-900">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-gray-50 border-2 border-gray-300 focus:border-[#0000ff] focus:ring-[#0000ff] text-gray-900"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold mb-2 text-gray-900">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="bg-gray-50 border-2 border-gray-300 focus:border-[#0000ff] focus:ring-[#0000ff] min-h-[120px] text-gray-900"
                      placeholder="Tell us about your project..."
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className={cn(
                      "w-full bg-[#0000ff] hover:bg-[#0000cc] text-white font-semibold py-6 text-lg",
                      isSubmitting && "opacity-70 cursor-not-allowed"
                    )}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </div>
              </form>

              <div className="mt-8 text-center">
                <p className="text-gray-700 font-medium mb-4">Or</p>
                <a
                  href="https://calendly.com/zenithcodeservices/30min?month=2025-10"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block border-2 border-[#0000ff] text-[#0000ff] px-8 py-4 text-lg font-semibold hover:bg-[#0000ff] hover:text-white transition-all rounded-lg"
                >
                  Book a 30-Min Discovery Call
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 bg-[#0000ff] text-white border-t border-white/10">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid md:grid-cols-2 gap-16 mb-16">
            <div className="space-y-8">
              <h3 className="text-4xl font-bold tracking-tight">OPUS CREATIVES</h3>
              <p className="text-xl text-white/80 leading-relaxed">
                Building powerful web applications that drive business growth.
              </p>
            </div>

            <div className="space-y-8">
              <h4 className="text-sm font-bold tracking-wider">CONNECT</h4>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#"
                  className="border-2 border-white px-6 py-3 hover:bg-white hover:text-[#0000ff] transition-all font-medium rounded-lg"
                >
                  Twitter
                </a>
                <a
                  href="#"
                  className="border-2 border-white px-6 py-3 hover:bg-white hover:text-[#0000ff] transition-all font-medium rounded-lg"
                >
                  LinkedIn
                </a>
                <a
                  href="#"
                  className="border-2 border-white px-6 py-3 hover:bg-white hover:text-[#0000ff] transition-all font-medium rounded-lg"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/20 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col md:flex-row gap-6 text-sm">
              <p>© 2025 OPUS CREATIVES LTD</p>
              <div className="flex gap-6">
                <a href="/privacy" className="hover:underline">
                  Privacy Policy
                </a>
                <a href="/terms" className="hover:underline">
                  Terms of Service
                </a>
              </div>
            </div>

            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all"
              aria-label="Back to top"
            >
              <ArrowRight className="h-5 w-5 -rotate-90" />
            </button>
          </div>
        </div>
      </footer>

      <Toaster />
    </div>
  )
}
