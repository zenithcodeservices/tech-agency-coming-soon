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
  const [isMounted, setIsMounted] = useState(false)

  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95])

  // Generate fixed particle positions to avoid hydration mismatch
  const particlePositions = useRef(
    Array.from({ length: 20 }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 5 + Math.random() * 5,
    }))
  )

  useEffect(() => {
    setIsMounted(true)
  }, [])

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

    try {
      // Call the contact API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          message,
          recaptchaToken: '', // reCAPTCHA token will be added when configured
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message')
      }

      toast({
        title: "Message sent!",
        description: "We'll get back to you within 24 hours.",
      })

      setEmail("")
      setMessage("")
      setName("")
    } catch (error) {
      console.error('Error sending message:', error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send message. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
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
    { name: "Bank of America", logo: "/companies/bofa.png", url: "https://www.bankofamerica.com/" },
    { name: "AWS", logo: "/companies/my_aws.png", url: "https://aws.amazon.com/" },
    { name: "Beatport", logo: "/companies/Beatport-Black.png", url: "https://www.beatport.com/" },
    { name: "Evora", logo: "/companies/Evora-Main-Logo-1.webp", url: "https://evoraglobal.com/" },
    { name: "Longevity Partners", logo: "/companies/partner-longevity-partners-1-scaled.png", url: "https://longevity-partners.com/" },
    { name: "Recycling Alternative", logo: "/companies/RecyclingAlternative-Logo.avif", url: "https://recyclingalternative.com/" },
    { name: "Terrible Music Group", logo: "/companies/terrible.webp", url: "https://www.terrible.group/" },
  ]

  return (
    <div className="min-h-screen bg-white text-gray-900">
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
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center pt-32 md:pt-24 overflow-hidden">
        {/* Animated Grid Background */}
        <div className="absolute inset-0 z-0">
          {/* Gradient base */}
          <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0a0a1a] to-[#000033]" />
          
          {/* Animated grid pattern */}
          <motion.div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(rgba(0, 0, 255, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 0, 255, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: "50px 50px",
            }}
            animate={{
              backgroundPosition: ["0px 0px", "50px 50px"],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Glowing orbs */}
          <motion.div
            className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full filter blur-[120px]"
            style={{
              background: "radial-gradient(circle, rgba(0,0,255,0.4) 0%, transparent 70%)",
            }}
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.3, 0.6, 0.3],
              x: [0, 100, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.div
            className="absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full filter blur-[120px]"
            style={{
              background: "radial-gradient(circle, rgba(100,100,255,0.3) 0%, transparent 70%)",
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.5, 0.2],
              x: [0, -80, 0],
              y: [0, 80, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />

          {/* Floating particles */}
          {isMounted && particlePositions.current.map((particle, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        <motion.div style={{ opacity, scale }} className="container mx-auto px-4 z-10 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto"
          >
            {/* Glassmorphic badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block mb-8"
            >
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 text-sm font-semibold text-white/90">
                <span className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-blue-400" />
                  Enterprise-Grade Web Solutions
                </span>
              </div>
            </motion.div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tighter mb-10 leading-[0.95]">
              <motion.span
                className="block bg-gradient-to-r from-white via-white to-gray-300 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                BUILD
              </motion.span>
              <motion.span
                className="block bg-gradient-to-r from-white via-white to-gray-300 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                FASTER
              </motion.span>
              <motion.span
                className="block bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                SCALE
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-8 text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light"
            >
              We architect and build{" "}
              <span className="font-semibold text-white">high-performance web applications</span>{" "}
              that drive growth. From concept to deployment.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-12 flex flex-col sm:flex-row gap-4 justify-center"
            >
              <a
                href="https://calendly.com/zenithcodeservices/30min?month=2025-10"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative bg-blue-600 text-white px-10 py-5 rounded-xl text-lg font-bold hover:bg-blue-700 transition-all hover:shadow-2xl hover:shadow-blue-500/50 hover:-translate-y-1 inline-block text-center overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Start Your Project
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a
                href="#services"
                className="border-2 border-white/30 bg-white/5 backdrop-blur-md px-10 py-5 rounded-xl text-lg font-bold text-white hover:bg-white/10 hover:border-white/50 transition-all inline-block text-center"
              >
                Explore Services
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-20 grid grid-cols-3 gap-8 max-w-3xl mx-auto"
            >
              {[
                { number: "50+", label: "Projects" },
                { number: "7+", label: "Companies" },
                { number: "100%", label: "Success Rate" },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl md:text-4xl font-black text-white mb-2">{stat.number}</div>
                  <div className="text-sm text-gray-400 font-medium uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="mt-16 cursor-pointer"
              onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border-2 border-white/30 hover:border-white/60 transition-colors">
                <ArrowRight className="h-5 w-5 rotate-90 text-white/70" />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Companies Section */}
      <section className="py-32 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <div className="inline-block mb-6">
              <span className="text-blue-400 text-sm font-bold uppercase tracking-wider bg-blue-500/10 px-4 py-2 rounded-full border border-blue-500/20">
                Trusted By
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6">
              <span className="block text-white mb-2">Powering Innovation</span>
              <span className="block bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">
                Across Industries
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light">
              From startups to Fortune 500 companies
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8 items-center">
            {clients.map((client, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <a
                  href={client.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block relative"
                  aria-label={`Visit ${client.name} website`}
                >
                  {/* Glassmorphic container */}
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 flex items-center justify-center h-24 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group-hover:scale-105">
                    <Image
                      src={client.logo}
                      alt={client.name}
                      width={120}
                      height={60}
                      className="max-w-full h-auto max-h-12 object-contain filter brightness-0 invert opacity-60 group-hover:opacity-100 transition-opacity"
                      style={{ width: 'auto', height: 'auto' }}
                    />
                  </div>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 bg-white relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(0, 0, 0, 0.05) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 0, 0, 0.05) 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <div className="inline-block mb-6">
              <span className="text-blue-600 text-sm font-bold uppercase tracking-wider bg-blue-50 px-4 py-2 rounded-full">
                What We Build
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 text-gray-900 tracking-tight">
              Services That
              <span className="block bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                Drive Growth
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light">
              From concept to deployment, we build scalable solutions that power modern businesses
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative"
              >
                {/* Gradient border effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-blue-400 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur" />
                
                <div className="relative bg-white border-2 border-gray-100 p-8 rounded-2xl hover:border-transparent transition-all duration-300 h-full">
                  <div className="space-y-5">
                    {/* Icon with gradient background */}
                    <div className="relative inline-flex">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-400 rounded-xl opacity-10 group-hover:opacity-20 transition-opacity" />
                      <div className="relative w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-400 rounded-xl flex items-center justify-center text-white transform group-hover:scale-110 transition-transform duration-300">
                        {service.icon}
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {service.title}
                    </h3>
                    
                    <p className="text-gray-600 leading-relaxed">
                      {service.description}
                    </p>

                    <div className="flex items-center gap-2 text-blue-600 font-semibold opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all pt-2">
                      <span className="text-sm">Explore</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-20 text-center"
          >
            <a
              href="https://calendly.com/zenithcodeservices/30min?month=2025-10"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-10 py-5 rounded-xl text-lg font-bold hover:shadow-2xl hover:shadow-blue-500/50 hover:-translate-y-1 transition-all"
            >
              <span>Let's Build Together</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-100/50 rounded-full filter blur-[150px] -z-0" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-purple-100/50 rounded-full filter blur-[150px] -z-0" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-start max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-10"
            >
              <div>
                <div className="inline-block mb-6">
                  <span className="text-blue-600 text-sm font-bold uppercase tracking-wider bg-blue-50 px-4 py-2 rounded-full">
                    Who We Are
                  </span>
                </div>
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-gray-900 mb-8">
                  Building The
                  <span className="block bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                    Future
                  </span>
                </h2>
              </div>

              <div className="space-y-6 text-lg leading-relaxed">
                <p className="text-gray-700 font-light text-xl">
                  We specialize in building <span className="font-semibold text-gray-900">scalable web applications</span> and digital platforms using modern technologies.
                  From startups to enterprises, we help businesses transform their ideas into powerful, high-performance
                  software solutions.
                </p>

                <p className="text-gray-700 font-light text-xl">
                  Whether you're building from scratch or looking to scale, we architect solutions that grow with your
                  business. Our approach combines clean code, best practices, and cutting-edge technology stacks.
                </p>

                <div className="pt-6 pl-6 border-l-4 border-blue-600">
                  <p className="font-bold text-2xl text-gray-900">
                    Enterprise-grade solutions with startup agility.
                  </p>
                </div>
              </div>

              <div className="pt-8 bg-white rounded-2xl p-8 border border-gray-200 shadow-lg">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-400 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                    "
                  </div>
                  <div>
                    <blockquote className="text-lg text-gray-700 leading-relaxed mb-4">
                      Opus Creatives built our entire platform from the ground up. Their technical expertise and attention to
                      scalability gave us a robust foundation that handles thousands of users seamlessly.
                    </blockquote>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full" />
                      <div>
                        <p className="font-bold text-gray-900">Sarah Johnson</p>
                        <p className="text-sm text-gray-600">CTO at TechStart</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="bg-white rounded-3xl p-10 space-y-8 border-2 border-gray-200 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-400 rounded-lg" />
                  <h3 className="text-3xl font-black text-gray-900">Tech Stack</h3>
                </div>
                <p className="text-gray-600 text-lg">
                  Battle-tested technologies that scale with your business
                </p>

                <div className="grid grid-cols-2 gap-4">
                  {technologies.map((tech, index) => (
                    <motion.div
                      key={tech}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                      viewport={{ once: true }}
                      className="group relative"
                    >
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-blue-400 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity blur-sm" />
                      <div className="relative bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-xl p-4 text-center font-bold text-gray-800 hover:border-transparent transition-all min-h-[70px] flex items-center justify-center">
                        <span>{tech}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-600 via-blue-500 to-blue-600 text-white rounded-3xl p-10 space-y-6 shadow-2xl shadow-blue-500/50 relative overflow-hidden">
                {/* Decorative circles */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full" />
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full" />
                
                <div className="relative z-10">
                  <Rocket className="w-12 h-12 mb-4" />
                  <h3 className="text-4xl font-black leading-tight mb-4">
                    Ready to Scale?
                  </h3>
                  <p className="text-xl text-white/90 mb-8">
                    Let's transform your vision into reality
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a
                      href="https://calendly.com/zenithcodeservices/30min?month=2025-10"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 hover:shadow-xl transition-all"
                    >
                      <span>Book a Meeting</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </a>
                    <a
                      href="#contact"
                      className="inline-flex items-center justify-center gap-2 border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-blue-600 transition-all"
                    >
                      Send Message
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-32 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 opacity-10">
          <motion.div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: "50px 50px",
            }}
            animate={{
              backgroundPosition: ["0px 0px", "50px 50px"],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-20 max-w-4xl mx-auto"
          >
            <div className="inline-block mb-6">
              <span className="text-blue-400 text-sm font-bold uppercase tracking-wider bg-blue-500/10 px-4 py-2 rounded-full border border-blue-500/20">
                Our Process
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight">
              <span className="block mb-2">From Idea To</span>
              <span className="bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">
                Launch In 3 Steps
              </span>
            </h2>
            <p className="text-xl text-gray-300 font-light">
              A proven methodology that delivers results, every time
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="group relative"
              >
                {/* Connection line (except for last item) */}
                {index < processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-blue-500/50 to-transparent z-0" />
                )}

                {/* Card */}
                <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 p-8 rounded-2xl hover:bg-white/20 hover:border-white/30 hover:-translate-y-2 transition-all duration-300 h-full">
                  {/* Number badge */}
                  <div className="mb-6 relative inline-flex">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl blur-lg opacity-50 group-hover:opacity-100 transition-opacity" />
                    <div className="relative w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-3xl font-black rounded-2xl group-hover:scale-110 transition-transform">
                      {step.number}
                    </div>
                  </div>

                  <h3 className="text-2xl font-black mb-4 text-white">{step.title}</h3>
                  <p className="text-gray-300 leading-relaxed text-lg">{step.description}</p>

                  {/* Decorative element */}
                  <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-blue-500/10 rounded-full filter blur-2xl group-hover:bg-blue-500/20 transition-colors" />
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="text-center mt-20"
          >
            <p className="text-gray-400 mb-6 text-lg">Ready to get started?</p>
            <a
              href="https://calendly.com/zenithcodeservices/30min?month=2025-10"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-10 py-5 rounded-xl text-lg font-bold hover:shadow-2xl hover:shadow-blue-500/50 hover:-translate-y-1 transition-all"
            >
              <span>Schedule Discovery Call</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 bg-gradient-to-br from-white to-gray-50 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100/30 rounded-full filter blur-[150px]" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-100/30 rounded-full filter blur-[150px]" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-block mb-6">
              <span className="text-blue-600 text-sm font-bold uppercase tracking-wider bg-blue-50 px-4 py-2 rounded-full">
                Let's Talk
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-gray-900 tracking-tight">
              Start Your
              <span className="block bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                Next Project
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light">
              We typically respond within 24 hours
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-12 items-start max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="lg:col-span-2 space-y-8"
            >
              <div className="space-y-6">
                <div className="group">
                  <div className="flex items-start gap-4 p-6 bg-white rounded-2xl border-2 border-gray-200 hover:border-blue-500 transition-all">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-400 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Mail className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Email</p>
                      <a
                        href="mailto:zenithcodeservices@gmail.com"
                        className="text-gray-900 hover:text-blue-600 transition-colors font-semibold text-lg"
                      >
                        zenithcodeservices@gmail.com
                      </a>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 space-y-6">
                  <h3 className="text-xl font-bold text-gray-900">Follow Us</h3>
                  <div className="flex gap-3">
                    <a
                      href="https://x.com/timlehanetech"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group w-12 h-12 bg-gray-100 hover:bg-gradient-to-br hover:from-blue-600 hover:to-blue-400 rounded-xl flex items-center justify-center transition-all"
                      aria-label="Twitter"
                    >
                      <Twitter className="h-5 w-5 text-gray-600 group-hover:text-white transition-colors" />
                    </a>
                    <a
                      href="https://linkedin.com/in/tim-lehane"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group w-12 h-12 bg-gray-100 hover:bg-gradient-to-br hover:from-blue-600 hover:to-blue-400 rounded-xl flex items-center justify-center transition-all"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="h-5 w-5 text-gray-600 group-hover:text-white transition-colors" />
                    </a>
                    <a
                      href="https://github.com/zenithcodeservices"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group w-12 h-12 bg-gray-100 hover:bg-gradient-to-br hover:from-blue-600 hover:to-blue-400 rounded-xl flex items-center justify-center transition-all"
                      aria-label="GitHub"
                    >
                      <Github className="h-5 w-5 text-gray-600 group-hover:text-white transition-colors" />
                    </a>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-600 to-blue-500 rounded-2xl p-8 text-white">
                  <h3 className="text-2xl font-black mb-3">Prefer a Call?</h3>
                  <p className="text-blue-100 mb-6">
                    Schedule a 30-minute discovery call to discuss your project
                  </p>
                  <a
                    href="https://calendly.com/zenithcodeservices/30min?month=2025-10"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition-all"
                  >
                    <span>Book Now</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="lg:col-span-3"
            >
              <form onSubmit={handleSubmit} className="bg-white border-2 border-gray-200 p-8 md:p-10 rounded-3xl shadow-xl">
                <h3 className="text-2xl font-black mb-8 text-gray-900">Send us a message</h3>

                <div className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-bold mb-3 text-gray-900 uppercase tracking-wider">
                      Name *
                    </label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-gray-50 border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500 text-gray-900 h-14 rounded-xl"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-bold mb-3 text-gray-900 uppercase tracking-wider">
                      Email *
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-gray-50 border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500 text-gray-900 h-14 rounded-xl"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-bold mb-3 text-gray-900 uppercase tracking-wider">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="bg-gray-50 border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500 min-h-[150px] text-gray-900 rounded-xl"
                      placeholder="Tell us about your project..."
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className={cn(
                      "group w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-bold py-6 text-lg rounded-xl shadow-lg hover:shadow-2xl hover:shadow-blue-500/50 transition-all",
                      isSubmitting && "opacity-70 cursor-not-allowed"
                    )}
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        Send Message
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    )}
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden">
        {/* Animated grid background */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        {/* Glowing orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full filter blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full filter blur-[150px]" />

        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="py-20 border-b border-white/10">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
              <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-400 rounded-lg" />
                  <h3 className="text-3xl font-black tracking-tight">OPUS CREATIVES</h3>
                </div>
                <p className="text-lg text-gray-400 leading-relaxed max-w-md">
                  Building powerful web applications that drive business growth. Enterprise-grade solutions with startup agility.
                </p>
                <div className="flex gap-3 pt-4">
                  <a
                    href="https://x.com/timlehanetech"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group w-12 h-12 bg-white/5 hover:bg-gradient-to-br hover:from-blue-600 hover:to-blue-400 border border-white/10 hover:border-transparent rounded-xl flex items-center justify-center transition-all"
                    aria-label="Twitter"
                  >
                    <Twitter className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors" />
                  </a>
                  <a
                    href="https://linkedin.com/in/tim-lehane"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group w-12 h-12 bg-white/5 hover:bg-gradient-to-br hover:from-blue-600 hover:to-blue-400 border border-white/10 hover:border-transparent rounded-xl flex items-center justify-center transition-all"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors" />
                  </a>
                  <a
                    href="https://github.com/zenithcodeservices"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group w-12 h-12 bg-white/5 hover:bg-gradient-to-br hover:from-blue-600 hover:to-blue-400 border border-white/10 hover:border-transparent rounded-xl flex items-center justify-center transition-all"
                    aria-label="GitHub"
                  >
                    <Github className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors" />
                  </a>
                </div>
              </div>

              <div className="space-y-6">
                <h4 className="text-sm font-black uppercase tracking-wider text-gray-400">Quick Links</h4>
                <ul className="space-y-4">
                  <li>
                    <a href="#services" className="text-gray-300 hover:text-white transition-colors text-lg">
                      Services
                    </a>
                  </li>
                  <li>
                    <a href="#about" className="text-gray-300 hover:text-white transition-colors text-lg">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="#process" className="text-gray-300 hover:text-white transition-colors text-lg">
                      Process
                    </a>
                  </li>
                  <li>
                    <a href="#contact" className="text-gray-300 hover:text-white transition-colors text-lg">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>

              <div className="space-y-6">
                <h4 className="text-sm font-black uppercase tracking-wider text-gray-400">Get Started</h4>
                <div className="space-y-4">
                  <a
                    href="https://calendly.com/zenithcodeservices/30min?month=2025-10"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 px-6 py-3 rounded-xl font-bold transition-all"
                  >
                    <span>Book a Call</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                  <p className="text-sm text-gray-400">
                    <a href="mailto:zenithcodeservices@gmail.com" className="hover:text-white transition-colors">
                      zenithcodeservices@gmail.com
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="py-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col md:flex-row gap-6 text-sm text-gray-400">
              <p>© 2025 OPUS CREATIVES LTD. All rights reserved.</p>
              <div className="flex gap-6">
                <a href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
                <a href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </a>
              </div>
            </div>

            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="group w-12 h-12 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl flex items-center justify-center transition-all"
              aria-label="Back to top"
            >
              <ArrowRight className="h-5 w-5 -rotate-90 text-gray-400 group-hover:text-white transition-colors" />
            </button>
          </div>
        </div>
      </footer>

      <Toaster />
    </div>
  )
}
