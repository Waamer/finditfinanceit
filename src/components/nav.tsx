"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  // SVG path variants for hamburger to X animation
  const topLineVariants = {
    closed: { d: "M 2 2.5 L 20 2.5" },
    open: { d: "M 3 16.5 L 17 2.5" }
  }

  const middleLineVariants = {
    closed: { opacity: 1 },
    open: { opacity: 0 }
  }

  const bottomLineVariants = {
    closed: { d: "M 2 16.346 L 20 16.346" },
    open: { d: "M 3 2.5 L 17 16.346" }
  }

  // Mobile menu variants
  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.2
      }
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.2
      }
    }
  }

  // Stagger animation for menu items
  const menuItemVariants = {
    closed: {
      x: -20,
      opacity: 0
    },
    open: {
      x: 0,
      opacity: 1
    }
  }

  const containerVariants = {
    closed: {
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: {
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.05
      }
    }
  }

  return (
    <motion.header
      className="bg-white border-b"
      initial={{ opacity: 0, y: -32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center">
            <Image src="/logo.png" alt="Logo" width={175} height={80} className="h-10 w-auto" />
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                    <Link href="/" className="hover:bg-black/[6%] transition-colors">Home</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="hover:bg-black/[6%] active:bg-black/[6%] transition-colors">Finance</NavigationMenuTrigger>
                  <NavigationMenuContent className="shadow-2xl">
                    <ul className="grid w-[400px] gap-3 p-4">
                      <li>
                        <NavigationMenuLink asChild>
                          <Link href="/finance-department" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-black/[6%] hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium leading-none">Before you apply for car financing</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Learn what you need to know before applying for car financing
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link href="/simple-car-loan" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-black/[6%] hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium leading-none">Simple Car Loans</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Get a simple and straightforward car loan solution
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                    <Link href="/reviews" className="hover:bg-black/[6%] transition-colors">Reviews</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                    <Link href="/FAQ" className="hover:bg-black/[6%] transition-colors">FAQ</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                    <Link href="/about" className="hover:bg-black/[6%] transition-colors">About Us</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            
            {/* Desktop Apply Button */}
            <Link href="/survey">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground ml-4">
                APPLY NOW
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
            onClick={toggleMenu}
            whileTap={{ scale: 0.95 }}
          >
            <svg width="22" height="18" viewBox="0 0 22 18" className="text-foreground">
              <motion.path
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                variants={topLineVariants}
                animate={isOpen ? "open" : "closed"}
              />
              <motion.path
                d="M 2 9.423 L 20 9.423"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                variants={middleLineVariants}
                animate={isOpen ? "open" : "closed"}
              />
              <motion.path
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                variants={bottomLineVariants}
                animate={isOpen ? "open" : "closed"}
              />
            </svg>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="md:hidden overflow-hidden"
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <motion.nav
                className="py-4 border-t"
                variants={containerVariants}
                initial="closed"
                animate="open"
                exit="closed"
              >
                <div className="flex flex-col space-y-1">
                  <motion.div variants={menuItemVariants}>
                    <Link 
                      href="/" 
                      className="block px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-gray-100 rounded-lg transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      Home
                    </Link>
                  </motion.div>
                  
                  {/* Mobile Finance Dropdown */}
                  <motion.div variants={menuItemVariants} className="px-4">
                    <div className="py-2 text-muted-foreground font-medium">Finance</div>
                    <div className="ml-4 space-y-1">
                      <Link 
                        href="/finance-department" 
                        className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-gray-100 rounded-lg transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        Before you apply for car financing
                      </Link>
                      <Link 
                        href="/simple-car-loan" 
                        className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-gray-100 rounded-lg transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        Simple Car Loans
                      </Link>
                    </div>
                  </motion.div>
                  
                  <motion.div variants={menuItemVariants}>
                    <Link 
                      href="/reviews" 
                      className="block px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-gray-100 rounded-lg transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      Reviews
                    </Link>
                  </motion.div>
                  
                  <motion.div variants={menuItemVariants}>
                    <Link 
                      href="/FAQ" 
                      className="block px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-gray-100 rounded-lg transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      FAQ
                    </Link>
                  </motion.div>
                  
                  <motion.div variants={menuItemVariants}>
                    <Link 
                      href="/about" 
                      className="block px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-gray-100 rounded-lg transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      About Us
                    </Link>
                  </motion.div>
                  
                  {/* Mobile Apply Button */}
                  <motion.div variants={menuItemVariants} className="px-4 pt-2">
                    <Link href="/survey" onClick={() => setIsOpen(false)}>
                      <Button className="w-full bg-primary hover:bg-primary/80 text-primary-foreground">
                        APPLY NOW
                      </Button>
                    </Link>
                  </motion.div>
                </div>
              </motion.nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}