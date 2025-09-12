"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Phone, Shield, DollarSign, Award, Timer, Car, DollarSignIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import TextRotate from "@/components/fancy/text/text-rotate"
import Footer from "@/components/footer"
import { motion } from "motion/react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const reviews = [
	{
		name: 'Dawn Mueller',
		text: `Ashley and Kal at FiFi went above and beyond when helping my daughter with her first car purchase. They were patient and at every inquiry they approached with care and consideration. They want their clients happy and go out of their way to accomplish this. I would recommend them to anyone for future car purchases.`,
	},
	{
		name: 'Julie Gibbons',
		text: `My girlfriend and I purchased a 2015 ram eco diesel from FiFi. The sales staff was friendly. This truck is beautiful. The truck did have some faults after picking it up and Ed and I are working at having the issues resolved as quickly as possible. For the most part they have been pretty good about the whole thing.`,
	},
	{
		name: 'Canute Roberts',
		text: `The current market for used cars is crazy in 2022. Despite that, these guys got me a good deal and got me driving a good car in no time. As a recent immigrant with almost no credit history I would recommend them. Talk to Ashlee she can help and her customer service is first class.`,
	},
	{
		name: 'Lawrence Onu',
		text: `Ashley is the absolute best! She is very professional and has helped me with the last two vehicles I have bought. Ashley always makes my car needs her priority.`,
	},
];

function StarRow() {
	return (
		<div className="flex items-center gap-1 mb-2">
			{[...Array(5)].map((_, i) => (
				<svg key={i} width="20" height="20" viewBox="0 0 20 20" fill="currentColor" className="text-yellow-400">
					<path d="M10 15.27L16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z" />
				</svg>
			))}
		</div>
	);
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">

      {/* Hero Section */}
      <section className="bg-gradient-to-t from-destructive/50 to-destructive/80 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-4 bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30">
                CAR LOANS SIMPLIFIED
              </Badge>
            </motion.div>
            <motion.h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance tracking-[-2px]" {...fadeInUp}>
              Buy a Vehicle
              <br />
              <span className="inline-flex items-center">
                From Your&nbsp;
                <TextRotate
                  texts={["Phone", "Laptop", "Desktop", "Tablet"]}
                  mainClassName="text-white text-3xl md:text-5xl px-2 sm:px-2 md:px-3 bg-[#000000]/10 overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
                  staggerFrom="last"
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-120%" }}
                  staggerDuration={0.025}
                  splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                  transition={{ type: "spring", damping: 30, stiffness: 400 }}
                  rotationInterval={2000}
                />
              </span>
            </motion.h1>
            <motion.p
              className="text-xl mb-8 text-primary-foreground/90 max-w-2xl mx-auto text-pretty"
              {...fadeInUp}
              transition={{ delay: 0.2 }}
            >
              Find It. Finance It.
            </motion.p>
            <motion.div {...fadeInUp} transition={{ delay: 0.4 }}>
              <Link href="/survey">
                <Button className="bg-primary-foreground text-xl sm:text-2xl sm:py-6.5 sm:px-5.5 text-primary hover:bg-primary-foreground/85">
                  GET PRE-APPROVED
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Car Images */}
          <motion.div
            className="flex justify-center items-end space-x-4 md:space-x-8"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="w-full">
              <Image src="/cars1.png" alt="Red Sedan" width={1000} height={400} className="w-full h-auto" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-neutral-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-16" {...fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">How It Works?</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
              Get approved by filling out our instant pre-qualification form
            </p>
          </motion.div>

          <motion.div
            className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInUp} className="flex flex-col">
              <div className="mb-5 flex size-16 items-center justify-center rounded-full bg-primary/[6%]">
                <Timer className="w-16 h-16 text-primary p-3" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Simple Process</h3>
              <p className="text-muted-foreground">
                Quick and easy assessment with instant results and recommendations.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="flex flex-col">
              <div className="mb-5 flex size-16 items-center justify-center rounded-full bg-primary/[6%]">
                <Car className="w-16 h-16 text-primary p-3" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Expert Guidance</h3>
              <p className="text-muted-foreground">
                Professional automotive advice tailored to your specific situation.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="flex flex-col">
              <div className="mb-5 flex size-16 items-center justify-center rounded-full bg-primary/[6%]">
                <DollarSignIcon className="w-16 h-16 text-primary p-3" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Best Options</h3>
              <p className="text-muted-foreground">
                Our finance managers will make sure you are getting the best possible deal in a vehicle that you will love!
              </p>
            </motion.div>

            

          </motion.div>
        </div>
      </section>

      {/* Confidence Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeInUp}>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance">SHOP FOR A CAR WITH CONFIDENCE</h2>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <span className="text-muted-foreground">
                    Apply for financing without using our simple application
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <span className="text-muted-foreground">Get pre-approved in minutes - no dealer visits required</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <span className="text-muted-foreground">Options you are pre-approved for</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <span className="text-muted-foreground">
                    Pick the car you want and drive away for more control, the more options
                  </span>
                </li>
              </ul>
              <Link href="/survey">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">GET PRE-APPROVED</Button>
              </Link>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Image
                src="/car.jpg"
                alt="White Jeep in Desert"
                className="w-full h-auto rounded-lg"
                width={657}
                height={438}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-neutral-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-16" {...fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Why Choose Us?</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
              From start to finish there&apos;s no better and more transparent way to buy a car
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInUp}>
              <Card className="text-center p-6 h-full">
                <CardContent className="pt-6">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Shield className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">Shop From Anywhere</h3>
                  <p className="text-muted-foreground text-pretty">
                    Choose if you want to buy from your phone or come on in to shop
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="text-center p-6 h-full">
                <CardContent className="pt-6">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <DollarSign className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">Low Payments</h3>
                  <p className="text-muted-foreground text-pretty">
                    With one of the largest dealer networks, we get you deals like you can&apos;t
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="text-center p-6 h-full">
                <CardContent className="pt-6">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Award className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">Safe and Secure</h3>
                  <p className="text-muted-foreground text-pretty">
                    All of your information is secured via high level encryption
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-16" {...fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">What Our Clients Say</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
              Find out why so many Canadians choose us to find their vehicle
            </p>
          </motion.div>

          <motion.div
            className="flex justify-center"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              plugins={[
                Autoplay({
                  delay: 4000,
                }),
              ]}
              className="w-full max-w-5xl"
            >
              <CarouselContent>
                {reviews.map((review, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    <motion.div
                      variants={{
                        hidden: { opacity: 0, y: 40 },
                        visible: { opacity: 1, y: 0 },
                      }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                      className="p-2 h-full"
                    >
                      <div className="relative bg-white dark:bg-neutral-900/90 rounded-xl shadow-lg border border-slate-200 dark:border-neutral-800 p-7 flex flex-col h-full">
                        <div className="flex items-center justify-between mb-2">
                          <StarRow />
                          <Image src='/logos/GoogleLogo.png' alt='Google Logo' width={28} height={28} className='ml-2' />
                        </div>
                        <div className="text-lg font-semibold mb-1 dark:text-white">{review.name}</div>
                        <div className="text-muted-foreground text-base mb-2 flex-1">{review.text}</div>
                      </div>
                    </motion.div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex" />
              <CarouselNext className="hidden md:flex" />
            </Carousel>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div {...fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance">
              Uncertain about which car suits you best?
            </h2>
            <p className="text-xl mb-8 text-white/90 text-pretty">
              Let our expert team guide you through the perfect purchase tailored to your needs.
            </p>
            <div className="flex items-center justify-center gap-2">
              <Phone className="w-5 h-5" />
              <span className="text-2xl font-bold">(519) 668-7111</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-neutral-warm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div {...fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance">Find Your Car Deal Today</h2>
            <p className="text-lg mb-8 text-muted-foreground max-w-2xl mx-auto text-pretty">
              From start to finish there&apos;s no better and more transparent way to buy a car. Find out if you qualify in
              under 60 seconds.
            </p>
            <Link href="/survey">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                APPLY NOW
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
