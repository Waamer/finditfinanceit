"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Star, Phone, Shield, DollarSign, Award, Timer, Car, DollarSignIcon } from "lucide-react"
import Link from "next/link"
import Nav from "@/components/nav"
import Image from "next/image"

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
            <motion.h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance" {...fadeInUp}>
              Buy a Vehicle
              <br />
              From Your Phone
            </motion.h1>
            <motion.p
              className="text-xl mb-8 text-primary-foreground/90 max-w-2xl mx-auto text-pretty"
              {...fadeInUp}
              transition={{ delay: 0.2 }}
            >
              Find It. Finance It.
            </motion.p>
            <motion.div {...fadeInUp} transition={{ delay: 0.4 }}>
              <Link href="/quiz">
                <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/85">
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
            transition={{ duration: 0.8, delay: 0.6 }}
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
            className="grid md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInUp} className="text-center bg-destructive/10 shadow-lg py-10 rounded-2xl">
              <div className="flex items-center justify-center mx-auto mb-6">
                <Timer className="w-16 h-16 text-primary" />
              </div>
              <h3 className="text-3xl font-bold mb-2">Simple Process</h3>
              <p className="text-pretty text-lg px-8">
                Quick and easy assessment with instant results and recommendations.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="text-center bg-destructive/20 shadow-lg py-10 rounded-2xl">
              <div className="flex items-center justify-center mx-auto mb-5">
                <Car className="w-16 h-16 text-primary" />
              </div>
              <h3 className="text-3xl font-bold mb-2">Expert Guidance</h3>
              <p className="text-pretty text-lg px-8">
                Professional automotive advice tailored to your specific situation.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="text-center bg-destructive/40 shadow-lg py-10 rounded-2xl">
              <div className="flex items-center justify-center mx-auto mb-6">
                <DollarSignIcon className="w-16 h-16 text-primary" />
              </div>
              <h3 className="text-3xl font-bold mb-2">Best Options</h3>
              <p className="text-pretty text-lg px-8">
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
              <Link href="/quiz">
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
              <img
                src="/professional-man-with-white-car-automotive-financi.png"
                alt="Professional with car"
                className="w-full h-auto rounded-lg"
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
            className="grid md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInUp}>
              <Card className="p-6 h-full">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-muted-foreground">Google</span>
                  </div>
                  <h4 className="font-semibold mb-2">Sarah Mitchell</h4>
                  <p className="text-muted-foreground text-sm text-pretty">
                    &quot;Ashley was full of 1st class advice and beyond what I expected with her first car purchase. They
                    made the whole process smooth and stress-free. I couldn&apos;t be happier with their service and I
                    respect...&quot;
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="p-6 h-full">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-muted-foreground">Google</span>
                  </div>
                  <h4 className="font-semibold mb-2">John Williams</h4>
                  <p className="text-muted-foreground text-sm text-pretty">
                    &quot;My girlfriend and I purchased a 2021 ram was about from it. The whole staff was friendly,
                    knowledgeable and professional. They really offer picking it up and it was in very working of
                    training the dealer requested on...&quot;
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="p-6 h-full">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-muted-foreground">Google</span>
                  </div>
                  <h4 className="font-semibold mb-2">Emily Johnson</h4>
                  <p className="text-muted-foreground text-sm text-pretty">
                    &quot;The current market for used cars is crazy in 2022 despite that. The whole staff was friendly and
                    professional. They really offer picking it up and it was in very working of training the dealer
                    requested on...&quot;
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-neutral-cool text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div {...fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance">
              Uncertain about which car suits you best?
            </h2>
            <p className="text-xl mb-8 text-white/90 text-pretty">
              Let our expert team guide you through the perfect purchase tailored to your needs.
            </p>
            <div className="flex items-center justify-center gap-2 mb-8">
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
            <Link href="/quiz">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                APPLY NOW
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">AutoFinance Pro</h3>
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                  <span className="text-white text-sm font-bold">f</span>
                </div>
                <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center">
                  <span className="text-white text-sm font-bold">G</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Finance
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Important Links</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Customer Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Terms of Use
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Hours of Operation</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between">
                  <span>Monday</span>
                  <span>9:00 AM to 7:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Tuesday</span>
                  <span>9:00 AM to 7:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Wednesday</span>
                  <span>9:00 AM to 7:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Thursday</span>
                  <span>9:00 AM to 6:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Friday</span>
                  <span>9:00 AM to 6:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Saturday</span>
                  <span>9:00 AM to 5:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Sunday</span>
                  <span>Closed</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-background/20 mt-8 pt-8 text-center text-sm">
            <p>
              &copy; 2024 AutoFinance Pro • All rights reserved • Privacy Policy | Terms & Conditions | Site Map |
              Powered by v0
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
