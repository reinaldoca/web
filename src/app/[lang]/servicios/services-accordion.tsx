
'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Locale } from "@/dictionaries/i18n-config";
import { slugify } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

type AccordionService = {
  title: string;
  whatItIs: string;
  ourPerspective: {
    title: string;
    content: string;
  };
  ourProcess: {
    title: string;
    description: string;
  }[];
};

type ServicesAccordionProps = {
  lang: Locale;
  accordionServices: AccordionService[];
  ctaText: string;
};

export function ServicesAccordion({ lang, accordionServices, ctaText }: ServicesAccordionProps) {

  return (
    <Accordion type="single" collapsible className="w-full space-y-4">
      {accordionServices.map((service, index) => (
          <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg shadow-sm bg-card overflow-hidden">
            <AccordionTrigger className="text-xl hover:no-underline p-6 text-left">
                <span className="font-bold font-headline text-lg md:text-xl">{service.title}</span>
            </AccordionTrigger>
            <AccordionContent className="pt-0 p-6 border-t">
              <div className="space-y-8">
                
                <div>
                  <h3 className="font-bold text-lg mb-2 text-primary/90">EN QUÉ CONSISTE</h3>
                  <p className="text-foreground/80">{service.whatItIs}</p>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-2 text-primary/90">NUESTRA PERSPECTIVA</h3>
                  <Card className="border-primary/50 bg-primary/5">
                    <CardContent className="pt-6">
                      <p className="text-foreground/90 italic">{service.ourPerspective.content}</p>
                    </CardContent>
                  </Card>
                </div>
                
                <div>
                  <h3 className="font-bold text-lg mb-4 text-primary/90">NUESTRO PROCESO</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {service.ourProcess.map((step, stepIndex) => (
                      <Card key={stepIndex} className="flex flex-col">
                        <CardContent className="pt-6 flex-1 flex flex-col">
                          <span className="text-4xl font-bold text-primary/20">0{stepIndex + 1}</span>
                          <h4 className="font-bold mt-2 mb-2 text-base">{step.title}</h4>
                          <p className="text-muted-foreground text-sm flex-1">{step.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                <div className="text-right mt-6">
                    <Button asChild variant="link" className="text-primary">
                       <Link href={`/${lang}/servicios/${slugify(service.title)}`}>
                            Ver detalle <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>

              </div>
            </AccordionContent>
          </AccordionItem>
        )
      )}
    </Accordion>
  );
}
