"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface JourneyCardProps {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  stepsCount: number;
  estimatedTime: string;
  icon?: string;
}

export function JourneyCard({
  slug,
  title,
  description,
  stepsCount,
  estimatedTime,
}: JourneyCardProps) {
  return (
    <Card className="hover:shadow-lg transition-all duration-200">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-xl">{title}</CardTitle>
            <CardDescription className="mt-2">{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-2">
            <Badge variant="secondary">{stepsCount} etapas</Badge>
            <Badge variant="outline">{estimatedTime}</Badge>
          </div>
          <Button asChild className="w-full">
            <Link href={`/journeys/${slug}`}>
              Iniciar Jornada
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
