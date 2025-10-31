'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Server, Cloud, GitBranch, Blocks, ShieldCheck, ArrowRight, Router } from 'lucide-react';
import { AwsIcon, DevOpsIcon } from '@/components/icons';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { AnimatedSection } from '@/components/animations/animated-section';
import { motion } from 'framer-motion';
import type { Dictionary } from '@/dictionaries/dictionaries';
import { Locale } from '@/dictionaries/i18n-config';

const heroImage = PlaceHolderImages.find(p => p.id === 'hero-image-1');
const whyUsImage = PlaceHolderImages.find(p => p.id === 'why-us-image');

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut'
    },
  },
};

const cardHoverEffect = {
  scale: 1.05,
  transition: { duration: 0.3 }
};

const serviceIcons: { [key: string]: JSX.Element } = {
  "Soporte Técnico": <Server className="h-8 w-8 text-primary" />,
  "Technical Support": <Server className="h-8 w-8 text-primary" />,
  "Migración a AWS": <Cloud className="h-8 w-8 text-primary" />,
  "AWS Migration": <Cloud className="h-8 w-8 text-primary" />,
  "Consultoría DevOps": <GitBranch className="h-8 w-8 text-primary" />,
  "DevOps Consulting": <GitBranch className="h-8 w-8 text-primary" />,
  "Ingeniería Cloud": <Blocks className="h-8 w-8 text-primary" />,
  "Cloud Engineering": <Blocks className="h-8 w-8 text-primary" />,
  "Seguridad Avanzada": <ShieldCheck className="h-8 w-8 text-primary" />,
  "Advanced Security": <ShieldCheck className="h-8 w-8 text-primary" />,
  "Redes y Networking": <Router className="h-8 w-8 text-primary" />,
  "Networks & Networking": <Router className="h-8 w-8 text-primary" />,
};

type HomeClientProps = {
  lang: Locale;
  t: Dictionary['home'];
};

export default function HomeClient({ lang, t }: HomeClientProps) {
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-background/80">
        <AnimatedSection>
          <motion.div
            className="container px-4 md:px-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <motion.div variants={itemVariants} className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none font-headline">
                    {t.hero.title}
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    {t.hero.subtitle}
                  </p>
                </motion.div>
                <motion.div variants={itemVariants} className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg">
                    <Link href={`/${lang}/contacto`}>{t.hero.cta}</Link>
                  </Button>
                </motion.div>
              </div>
              {heroImage && (
                <motion.div variants={itemVariants}>
                  <Image
                    src={heroImage.imageUrl}
                    width={600}
                    height={400}
                    alt={heroImage.description}
                    data-ai-hint={heroImage.imageHint}
                    className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full"
                    priority
                  />
                </motion.div>
              )}
            </div>
          </motion.div>
        </AnimatedSection>
      </section>

      {/* Services Section */}
      <section id="servicios" className="w-full py-12 md:py-24 lg:py-32">
        <AnimatedSection>
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <motion.div variants={itemVariants} className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">{t.services.title}</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {t.services.subtitle}
                </p>
              </motion.div>
            </div>
            <motion.div
              className="mx-auto grid max-w-5xl items-start gap-6 py-12 sm:grid-cols-2 md:grid-cols-3 lg:gap-12"
              variants={containerVariants}
            >
              {t.services.items.map((service) => (
                <motion.div key={service.title} variants={itemVariants} whileHover={cardHoverEffect}>
                  <Card className="h-full transition-shadow duration-300">
                    <CardHeader className="flex flex-col items-center text-center">
                      {serviceIcons[service.title]}
                      <CardTitle className="mt-4">{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center text-muted-foreground">
                      <p>{service.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
            <motion.div variants={itemVariants} className="flex justify-center">
               <Button asChild variant="outline">
                  <Link href={`/${lang}/servicios`}>
                    {t.services.seeAll} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
            </motion.div>
          </div>
        </AnimatedSection>
      </section>

      {/* Why Choose Us Section */}
      <section id="porque-nosotros" className="w-full py-12 md:py-24 lg:py-32 bg-secondary/30">
        <AnimatedSection>
          <motion.div
            className="container px-4 md:px-6"
            variants={containerVariants}
          >
            <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-4">
                <motion.div variants={itemVariants} className="inline-block rounded-lg bg-primary text-primary-foreground px-3 py-1 text-sm">{t.whyUs.tag}</motion.div>
                <motion.h2 variants={itemVariants} className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">{t.whyUs.title}</motion.h2>
                <motion.p variants={itemVariants} className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {t.whyUs.subtitle}
                </motion.p>
                <ul className="grid gap-4">
                  {t.whyUs.points.map(point => (
                    <motion.li key={point.title} variants={itemVariants} className="flex items-start gap-4">
                      <div className="bg-primary rounded-full p-2 text-primary-foreground flex-shrink-0 mt-1">
                         {point.title.includes("Certificaciones") || point.title.includes("Experience") ? <AwsIcon className="h-6 w-6" /> : <DevOpsIcon className="h-6 w-6" />}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold">{point.title}</h3>
                        <p className="text-muted-foreground">{point.description}</p>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </div>
               <motion.div variants={itemVariants} className="flex justify-center">
                {whyUsImage && (
                  <Image
                    src={whyUsImage.imageUrl}
                    width={600}
                    height={600}
                    alt={whyUsImage.description}
                    data-ai-hint={whyUsImage.imageHint}
                    className="mx-auto aspect-square overflow-hidden rounded-xl object-cover"
                  />
                )}
              </motion.div>
            </div>
          </motion.div>
        </AnimatedSection>
      </section>

      {/* Testimonials Section */}
      <section id="casos-de-exito" className="w-full py-12 md:py-24 lg:py-32">
        <AnimatedSection>
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-5xl font-headline">{t.testimonials.title}</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl text-center mt-4">
              {t.testimonials.subtitle}
            </p>
          </motion.div>
          <motion.div className="grid gap-6 mt-12 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3" variants={containerVariants}>
            {t.testimonials.items.map((testimonial, index) => (
              <motion.div key={index} variants={itemVariants} whileHover={cardHoverEffect}>
                <Card className="h-full">
                  <CardContent className="pt-6">
                    <p className="text-lg font-medium">“{testimonial.text}”</p>
                    <div className="flex items-center gap-4 mt-4">
                      <Avatar>
                        <AvatarImage src={`https://picsum.photos/seed/avatar${index}/40/40`} />
                        <AvatarFallback>{testimonial.author.substring(0,2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{testimonial.author}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </AnimatedSection>
      </section>
    </main>
  );
}
