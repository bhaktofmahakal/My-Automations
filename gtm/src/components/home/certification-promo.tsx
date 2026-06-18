/**
 * Certification Promo Component
 * Show Level 1/2/3 badges preview, CTA to /certifications
 */

import Link from 'next/link';
import { ArrowRight, Award, Clock, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const certLevels = [
  {
    level: 1,
    name: 'Practitioner',
    color: '#22c55e',
    description: 'Master the fundamentals',
  },
  {
    level: 2,
    name: 'Professional',
    color: '#3b82f6',
    description: 'Advanced techniques',
  },
  {
    level: 3,
    name: 'Expert',
    color: '#a855f7',
    description: 'Community leader',
  },
];

const benefits = [
  'Free certification',
  '1 hour to complete',
  'LinkedIn badge',
  'Community recognition',
];

export function CertificationPromo() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-purple-500/5 via-transparent to-transparent border-y border-zinc-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Description */}
          <div>
            <Badge variant="outline" className="mb-4 border-purple-500/30 text-purple-400">
              <Award className="h-3 w-3 mr-1" />
              GTM Skills Certification
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Become a Certified<br />Agentic Sales Professional
            </h2>
            <p className="text-muted-foreground mb-6">
              Learn to leverage agentic workflows for sales. Free certification program
              with practical modules, assessments, and a badge you can share.
            </p>

            <div className="grid grid-cols-2 gap-3 mb-8">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-purple-400" />
                  <span className="text-sm text-zinc-300">{benefit}</span>
                </div>
              ))}
            </div>

            <Link href="/certifications">
              <Button className="gap-2 bg-purple-500 hover:bg-purple-600">
                Get Certified Free
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          {/* Right: Badge Preview */}
          <div className="relative">
            <div className="flex justify-center gap-6">
              {certLevels.map((cert) => (
                <div
                  key={cert.level}
                  className="text-center group"
                >
                  <div
                    className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-3 transition-transform group-hover:scale-110"
                    style={{
                      backgroundColor: `${cert.color}20`,
                      border: `3px solid ${cert.color}`,
                    }}
                  >
                    <span
                      className="text-3xl font-bold"
                      style={{ color: cert.color }}
                    >
                      {cert.level}
                    </span>
                  </div>
                  <div className="text-white font-semibold text-sm">{cert.name}</div>
                  <div className="text-zinc-500 text-xs">{cert.description}</div>
                </div>
              ))}
            </div>

            {/* Decorative elements */}
            <div className="absolute -inset-8 bg-gradient-to-r from-purple-500/10 via-violet-500/10 to-purple-500/10 rounded-xl blur-2xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
