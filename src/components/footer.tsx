import Link from "next/link";
import { Facebook, Instagram } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-foreground text-background py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h1 className="text-4xl font-bold mb-4">FiFi</h1>
              <div className="flex items-center space-x-4">
                <Link href="https://www.facebook.com/SouthWestAutoLondon/" target="_blank" className="hover:text-white/50 transition-colors" aria-label="Facebook">
                  <Facebook />
                </Link>
                <Link href="https://www.instagram.com/southwestautogroup/" target="_blank" className="hover:text-white/50 transition-colors" aria-label="Instagram">
                  <Instagram />
                </Link>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/about" className="hover:text-white/50 transition-colors">
                    About Us
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Important Links</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="hover:text-white/50 transition-colors">
                    Customer Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white/50 transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white/50 transition-colors">
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
              &copy; 2025 Find it Finance It • All rights reserved • Site Map
            </p>
          </div>
        </div>
      </footer>
    )
}