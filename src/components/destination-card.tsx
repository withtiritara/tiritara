import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type Destination = {
  id: string;
  name: string;
  description: string;
  image: {
    imageUrl: string;
    description: string;
    imageHint: string;
  };
  dates: string;
};

interface DestinationCardProps {
  destination: Destination;
}

export function DestinationCard({ destination }: DestinationCardProps) {
  return (
    <Card className="overflow-hidden group transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-2 border-2 border-transparent hover:border-primary">
      <CardHeader className="p-0">
        <div className="relative h-60 w-full overflow-hidden">
          <Image
            src={destination.image.imageUrl}
            alt={destination.image.description}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            data-ai-hint={destination.image.imageHint}
          />
           <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
      </CardHeader>
      <CardContent className="p-6 relative -mt-16 z-10">
        <CardTitle className="text-2xl font-headline font-bold text-white group-hover:text-accent transition-colors">
          {destination.name}
        </CardTitle>
        <p className="mt-3 text-darkgray-300 text-sm leading-relaxed">{destination.description}</p>
        {destination.dates && (
          <Badge variant="secondary" className="mt-4 text-sm font-medium bg-slate-500/50 text-white border-transparent">
            <CalendarDays className="mr-2 h-4 w-4" />
            {destination.dates}
          </Badge>
        )}
      </CardContent>
    </Card>
  );
}
