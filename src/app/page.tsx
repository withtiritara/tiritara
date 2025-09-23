import Image from "next/image";
import { PlaceHolderImages, type ImagePlaceholder } from "@/lib/placeholder-images";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { DestinationCard } from "@/components/destination-card";
import { BookingForm } from "@/components/booking-form";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

type Destination = {
  id: string;
  name: string;
  description: string;
  image: ImagePlaceholder;
};

const destinations: Destination[] = [
  {
    id: 'paris',
    name: 'Paris, France',
    description: 'Discover the city of love, with its iconic landmarks, charming streets, and world-class cuisine. A romantic getaway awaits.',
    image: PlaceHolderImages.find(img => img.id === 'paris_hero')!,
  },
  {
    id: 'maldives',
    name: 'The Maldives',
    description: 'Escape to paradise in the Maldives, where crystal-clear waters, overwater bungalows, and vibrant coral reefs await.',
    image: PlaceHolderImages.find(img => img.id === 'maldives_hero')!,
  },
];

export default function Home() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'main_hero');

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section id="hero" className="relative w-full h-[80vh] md:h-[90vh] text-white">
          <Image
            src={heroImage?.imageUrl!}
            alt={heroImage?.description!}
            fill
            className="object-cover"
            priority
            data-ai-hint={heroImage?.imageHint!}
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-headline font-bold tracking-tight">
              Welcome to TravelWise
            </h1>
            <p className="mt-4 max-w-2xl text-lg md:text-xl text-gray-200">
              Your wise choice for dream destinations. Let us plan your next adventure.
            </p>
            <Button asChild size="lg" className="mt-8 bg-accent hover:bg-accent/90 text-accent-foreground font-bold">
              <a href="#booking">
                Book Your Trip
                <ArrowDown className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>
        </section>

        <section id="destinations" className="bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-headline font-bold">Featured Destinations</h2>
              <p className="mt-2 text-lg text-muted-foreground">
                Explore our handpicked selection of beautiful places to visit.
              </p>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:gap-12">
              {destinations.map((destination) => (
                <a key={destination.id} href="#booking">
                  <DestinationCard destination={destination} />
                </a>
              ))}
            </div>
          </div>
        </section>

        <section id="booking" className="bg-secondary">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-headline font-bold">Plan Your Adventure</h2>
                <p className="mt-2 text-lg text-muted-foreground">
                  Fill out the form below to start your journey.
                </p>
              </div>
              <BookingForm destinations={destinations} />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
