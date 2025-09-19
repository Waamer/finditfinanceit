'use client';

import { motion } from 'framer-motion';
import Footer from '@/components/footer';
import Link from 'next/link';
import { 
	Home, 
	User, 
	Star, 
	HelpCircle, 
	FileText, 
	CreditCard, 
	Car, 
	DollarSign,
	ClipboardList,
	Shield,
	Scale,
	Map,
	ExternalLink,
	ChevronRight
} from 'lucide-react';

const sitePages = [
	{
		category: 'Main Pages',
		icon: Home,
		description: 'Core pages of our website',
		pages: [
			{
				title: 'Home',
				path: '/',
				description: 'Welcome to Find if Finance it - Your trusted car financing partner',
				icon: Home
			},
			{
				title: 'About Us',
				path: '/about',
				description: 'Learn more about our company and mission',
				icon: User
			},
			{
				title: 'Reviews',
				path: '/reviews',
				description: 'See what our customers are saying about us',
				icon: Star
			},
			{
				title: 'FAQ',
				path: '/FAQ',
				description: 'Frequently asked questions and answers',
				icon: HelpCircle
			}
		]
	},
	{
		category: 'Finance & Services',
		icon: CreditCard,
		description: 'Our financing services and information',
		pages: [
			{
				title: 'Finance Department',
				path: '/finance-department',
				description: 'What to consider BEFORE you apply for car financing',
				icon: DollarSign
			},
			{
				title: 'Simple Car Loan',
				path: '/simple-car-loan',
				description: 'How a simple car loan can improve your car, your credit, and your life',
				icon: Car
			},
			{
				title: 'Credit Application Survey',
				path: '/survey',
				description: 'Apply for financing with our comprehensive survey',
				icon: ClipboardList
			}
		]
	},
	{
		category: 'Legal & Policies',
		icon: Scale,
		description: 'Important legal information and policies',
		pages: [
			{
				title: 'Privacy Policy',
				path: '/privacy-policy',
				description: 'How we collect, use, and protect your personal information',
				icon: Shield
			},
			{
				title: 'Terms & Conditions',
				path: '/terms-conditions',
				description: 'Terms of service and website usage conditions',
				icon: FileText
			},
			{
				title: 'Site Map',
				path: '/site-map',
				description: 'Complete overview of all pages on our website',
				icon: Map
			}
		]
	}
];

const containerVariants = {
	hidden: {},
	visible: {
		transition: {
			staggerChildren: 0.1,
		},
	},
};

const categoryVariants = {
	hidden: { opacity: 0, y: 30 },
	visible: { opacity: 1, y: 0 },
};

const pageVariants = {
	hidden: { opacity: 0, x: -20 },
	visible: { opacity: 1, x: 0 },
};

export default function SiteMapPage() {
	return (
		<div className="min-h-screen flex flex-col bg-gradient-to-br from-white to-slate-200 dark:from-neutral-900 dark:to-neutral-950">
			<main className="flex-1 flex flex-col items-center px-4 py-10 md:py-16">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.4 }}
					viewport={{ once: true, margin: "-50px" }}
					className="w-full max-w-5xl mb-8"
				>
					<h1 className="text-3xl md:text-4xl font-bold mb-6 text-primary dark:text-primary-foreground text-center">
						Site Map
					</h1>
					<div className="bg-white dark:bg-neutral-900/90 rounded-2xl shadow-lg border border-slate-200 dark:border-neutral-800 p-8">
						<div className="flex items-center gap-3 mb-6">
							<div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
								<Map className="w-6 h-6 text-primary" />
							</div>
							<div>
								<h2 className="text-xl font-bold text-primary dark:text-primary-foreground">
									Website Navigation
								</h2>
								<p className="text-muted-foreground">
									Complete overview of all pages and sections on our website
								</p>
							</div>
						</div>
						<div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
							<div className="flex items-start">
								<ExternalLink className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
								<div>
									<p className="text-blue-800 dark:text-blue-200 font-medium text-sm">
										<strong>Quick Navigation:</strong> Click on any page title below to navigate directly to that section of our website.
									</p>
								</div>
							</div>
						</div>
					</div>
				</motion.div>

				<motion.div
					initial="hidden"
					whileInView="visible"
					variants={containerVariants}
					viewport={{ once: true, margin: "-50px" }}
					className="w-full max-w-5xl space-y-8"
				>
					{sitePages.map((category) => (
						<motion.div
							key={category.category}
							variants={categoryVariants}
							transition={{ duration: 0.4 }}
							className="bg-white dark:bg-neutral-900/90 rounded-2xl shadow-lg border border-slate-200 dark:border-neutral-800 overflow-hidden hover:shadow-xl transition-shadow duration-200"
						>
							<div className="bg-gradient-to-r from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 p-6 border-b border-slate-200 dark:border-neutral-800">
								<div className="flex items-center gap-4">
									<div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white">
										<category.icon className="w-6 h-6" />
									</div>
									<div className="flex-1">
										<h2 className="text-xl font-bold text-primary dark:text-primary-foreground mb-1">
											{category.category}
										</h2>
										<p className="text-muted-foreground text-sm">
											{category.description}
										</p>
									</div>
									<div className="text-primary dark:text-primary-foreground font-bold text-lg">
										{category.pages.length}
									</div>
								</div>
							</div>

							<div className="p-6">
								<motion.div
									initial="hidden"
									animate="visible"
									variants={{
										hidden: {},
										visible: {
											transition: {
												staggerChildren: 0.05,
											},
										},
									}}
									className="grid grid-cols-1 md:grid-cols-2 gap-4"
								>
									{category.pages.map((page) => (
										<motion.div
											key={page.path}
											variants={pageVariants}
											transition={{ duration: 0.3, ease: 'easeOut' }}
										>
											<Link
												href={page.path}
												className="group block p-4 rounded-xl border border-slate-200 dark:border-neutral-700 hover:border-primary/30 dark:hover:border-primary/50 transition-all duration-200 hover:shadow-md bg-slate-50/50 dark:bg-neutral-800/30 hover:bg-white dark:hover:bg-neutral-800/60"
											>
												<div className="flex items-start gap-3">
													<div className="w-10 h-10 bg-primary/10 group-hover:bg-primary/20 rounded-lg flex items-center justify-center transition-colors duration-200 flex-shrink-0">
														<page.icon className="w-5 h-5 text-primary" />
													</div>
													<div className="flex-1 min-w-0">
														<div className="flex items-center gap-2 mb-1">
															<h3 className="font-semibold text-primary dark:text-primary-foreground group-hover:text-primary/90 transition-colors duration-200">
																{page.title}
															</h3>
															<ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-all duration-200 group-hover:translate-x-1" />
														</div>
														<p className="text-muted-foreground text-sm leading-snug">
															{page.description}
														</p>
														<div className="flex items-center gap-1 mt-2 text-xs font-medium text-primary/70 dark:text-primary-foreground/70">
															<span>Navigate to</span>
															<code className="bg-primary/10 px-2 py-0.5 rounded text-xs font-mono">
																{page.path === '/' ? '/home' : page.path}
															</code>
														</div>
													</div>
												</div>
											</Link>
										</motion.div>
									))}
								</motion.div>
							</div>
						</motion.div>
					))}
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.4, delay: 0.2 }}
					viewport={{ once: true, margin: "-50px" }}
					className="w-full max-w-5xl mt-8"
				>
					<div className="bg-gradient-to-r from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 rounded-2xl border border-primary/20 p-8">
						<div className="text-center">
							<h3 className="text-xl font-bold mb-4 text-primary dark:text-primary-foreground">
								Website Statistics
							</h3>
							<div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
								<div className="bg-white dark:bg-neutral-900/50 rounded-xl p-4 border border-slate-200 dark:border-neutral-700">
									<div className="text-2xl font-bold text-primary dark:text-primary-foreground mb-1">
										{sitePages.reduce((total, category) => total + category.pages.length, 0)}
									</div>
									<div className="text-sm text-muted-foreground">Total Pages</div>
								</div>
								<div className="bg-white dark:bg-neutral-900/50 rounded-xl p-4 border border-slate-200 dark:border-neutral-700">
									<div className="text-2xl font-bold text-primary dark:text-primary-foreground mb-1">
										{sitePages.length}
									</div>
									<div className="text-sm text-muted-foreground">Categories</div>
								</div>
								<div className="bg-white dark:bg-neutral-900/50 rounded-xl p-4 border border-slate-200 dark:border-neutral-700">
									<div className="text-2xl font-bold text-primary dark:text-primary-foreground mb-1">
										100%
									</div>
									<div className="text-sm text-muted-foreground">Mobile Responsive</div>
								</div>
							</div>
						</div>
					</div>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.4, delay: 0.3 }}
					viewport={{ once: true, margin: "-50px" }}
					className="w-full max-w-5xl mt-8"
				>
					<div className="bg-white dark:bg-neutral-900/90 rounded-2xl shadow-lg border border-slate-200 dark:border-neutral-800 p-8">
						<div className="text-center">
							<h3 className="text-xl font-bold mb-4 text-primary dark:text-primary-foreground">
								Need Help Finding Something?
							</h3>
							<p className="text-muted-foreground mb-6">
								Can&apos;t find what you&apos;re looking for? Our team is here to help you navigate our website and services.
							</p>
							<div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
								<Link
									href="/FAQ"
									className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-200 font-medium"
								>
									<HelpCircle className="w-4 h-4" />
									Visit Our FAQ
								</Link>
								<div className="flex items-center gap-2 text-muted-foreground">
									<span>or call us at</span>
									<strong className="text-primary dark:text-primary-foreground">(519) 668-7111</strong>
								</div>
							</div>
						</div>
					</div>
				</motion.div>
			</main>
			<Footer />
		</div>
	);
}
