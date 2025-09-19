"use client";

import { motion } from "framer-motion";
import Footer from "@/components/footer";
import { Car, Users, Shield, Award } from "lucide-react";

const aboutSections = [
	{
		title: "Our Mission",
		content: "At Find if Finance it, we believe that everyone deserves access to reliable transportation. Our mission is to simplify the car financing process and make vehicle ownership accessible to all Canadians, regardless of their credit history.",
		icon: Car,
	},
	{
		title: "Our Team",
		content: "Our experienced team of automotive finance specialists work tirelessly to connect you with the right vehicle and financing solution. With years of industry experience, we understand the challenges of car buying and are here to guide you every step of the way.",
		icon: Users,
	},
	{
		title: "Our Promise",
		content: "We are committed to transparency, honesty, and putting our customers first. Every recommendation we make is based on your unique needs and financial situation. We believe in building long-term relationships, not just closing deals.",
		icon: Shield,
	},
	{
		title: "Our Success",
		content: "As Ontario's leading auto approver, we've helped thousands of Canadians find their perfect vehicle. Our success is measured not just in transactions, but in the smiles of satisfied customers driving away in their dream cars.",
		icon: Award,
	},
];

export default function AboutPage() {
	return (
		<div className="min-h-screen flex flex-col bg-gradient-to-br from-white to-slate-200 dark:from-neutral-900 dark:to-neutral-950">
			<main className="flex-1 flex flex-col items-center px-4 py-10 md:py-16">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.4 }}
					className="text-center mb-12"
				>
					<h1 className="text-3xl md:text-4xl font-bold mb-4 text-primary dark:text-primary-foreground">
						About Find if Finance it
					</h1>
					<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
						Your trusted partner in automotive financing across Ontario
					</p>
				</motion.div>

				<motion.div
					initial="hidden"
					animate="visible"
					variants={{
						hidden: {},
						visible: {
							transition: {
								staggerChildren: 0.1,
							},
						},
					}}
					className="w-full max-w-4xl space-y-8"
				>
					{aboutSections.map((section) => (
						<motion.div
							key={section.title}
							variants={{
								hidden: { opacity: 0, y: 30 },
								visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
							}}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, margin: "-50px" }}
							className="bg-white dark:bg-neutral-900/90 rounded-2xl shadow-lg border border-slate-200 dark:border-neutral-800 p-6 sm:p-8"
						>
							<div className="flex items-start gap-6 flex-col md:flex-row">
								<div className="flex-shrink-0">
									<div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
										<section.icon className="w-8 h-8 text-primary" />
									</div>
								</div>
								<div className="flex-1">
									<h2 className="text-xl md:text-2xl font-bold mb-4 text-primary dark:text-primary-foreground">
										{section.title}
									</h2>
									<p className="text-muted-foreground leading-relaxed text-base md:text-lg">
										{section.content}
									</p>
								</div>
							</div>
						</motion.div>
					))}
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: "-50px" }}
					transition={{ duration: 0.4, delay: 0.2 }}
					className="w-full max-w-4xl mt-12"
				>
					<div className="bg-gradient-to-r from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 rounded-2xl border border-primary/20 p-6 sm:p-8 text-center">
						<h3 className="text-2xl font-bold mb-4 text-primary dark:text-primary-foreground">
							Ready to Get Started?
						</h3>
						<p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
							Join thousands of satisfied customers who have found their perfect vehicle through Find if Finance it. 
							Let us help you find yours today.
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
							<div className="flex items-center gap-2 text-muted-foreground">
								<span>Call us at</span>
								<strong className="text-primary dark:text-primary-foreground text-lg">(519) 668-7111</strong>
							</div>
							<div className="text-muted-foreground">or</div>
							<div className="text-muted-foreground">
								<strong className="text-primary dark:text-primary-foreground">Apply online</strong> for instant pre-approval
							</div>
						</div>
					</div>
				</motion.div>
			</main>
			<Footer />
		</div>
	);
}
