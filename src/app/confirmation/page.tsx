import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, User, Mail, Phone, Plane, Hash, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { notFound } from "next/navigation";

const destinations = [
  { id: 'paris', name: 'Paris, France' },
  { id: 'maldives', name: 'The Maldives' },
];

export default function ConfirmationPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { name, email, phone, destination, paymentId, status } = searchParams;
  const heroImage = PlaceHolderImages.find(img => img.id === 'confirmation_hero');
  const destinationName = destinations.find(d => d.id === destination)?.name || "the selected destination";

  if (!name || !email || !phone || !destination || !paymentId || status !== 'success') {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-secondary">
      <Header />
      <main className="flex-1">
        <section className="relative w-full py-20 md:py-32 lg:py-40 text-white">
          <div className="absolute inset-0 bg-primary" />
          {heroImage &&
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              className="object-cover opacity-10"
              data-ai-hint={heroImage.imageHint}
            />
          }
          <div className="container mx-auto px-4 relative z-10 text-center">
            <CheckCircle2 className="mx-auto h-16 w-16 text-accent" />
            <h1 className="mt-4 text-4xl md:text-5xl font-headline font-bold">
              Booking Confirmed!
            </h1>
            <p className="mt-2 max-w-2xl mx-auto text-lg md:text-xl text-primary-foreground/80">
              Thank you, {name}! Your trip to {destinationName} is booked.
            </p>
          </div>
        </section>

        <section className="-mt-16 md:-mt-24 pb-12 md:pb-24">
          <div className="container mx-auto px-4">
            <Card className="max-w-2xl mx-auto shadow-2xl">
              <CardHeader>
                <CardTitle className="font-headline text-2xl">Your Booking Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 text-base">
                <div className="flex items-center gap-4">
                  <User className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium">Name:</span>
                  <span className="text-muted-foreground ml-auto">{name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium">Email:</span>
                  <span className="text-muted-foreground ml-auto">{email}</span>
                </div>
                <div className="flex items-center gap-4">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium">Phone:</span>
                  <span className="text-muted-foreground ml-auto">{phone}</span>
                </div>
                <div className="flex items-center gap-4">
                  <Plane className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium">Destination:</span>
                  <span className="text-muted-foreground ml-auto">{destinationName}</span>
                </div>
                <div className="border-t my-4" />
                <div className="flex items-center gap-4">
                  <Hash className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium">Payment ID:</span>
                  <span className="text-muted-foreground font-mono text-sm ml-auto">{paymentId}</span>
                </div>
                <div className="flex items-center gap-4">
                  <BadgeCheck className="h-5 w-5 text-green-500" />
                  <span className="font-medium">Payment Status:</span>
                  <span className="capitalize text-green-600 font-semibold ml-auto">{status}</span>
                </div>
                <p className="text-sm text-muted-foreground pt-4">A confirmation email with all your travel documents has been sent to {email}. Please check your inbox (and spam folder). For any questions, please contact our support team.</p>
                
                <Button asChild size="lg" className="w-full mt-6">
                  <Link href="/">Back to Home</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
