'use client';

import { motion } from 'framer-motion';
import Footer from '@/components/footer';
import { MapPin, Phone } from 'lucide-react';

const sections = [
	{
		title: 'Overview',
		content: [
			'This website is operated by **Find if Finance it**. Throughout the site, the terms **"we"**, **"us"** and **"our"** refer to Find if Finance it. Find if Finance it offers this website, including all information, tools and services available from this site to you, the user, conditioned upon your **acceptance of all terms**, conditions, policies and notices stated here.',
			'By **visiting our site** and/or contacting us you engage in our "Service" and agree to be bound by the following terms and conditions ("Terms of Service", "Terms"), including those additional terms and conditions and policies referenced herein and/or available by hyperlink.',
			'Please **read these Terms of Service carefully** before accessing or using our website. By accessing or using any part of the site, you agree to be bound by these Terms of Service. If you do not agree to all the terms and conditions of this agreement, then you **may not access** the website or use any services.',
			'Any **new features or tools** which are added to the current website shall also be subject to the Terms of Service. We reserve the right to **update, change or replace** any part of these Terms of Service by posting updates and/or changes to our website.'
		]
	},
	{
		title: 'Website Terms',
		content: [
			'By agreeing to these Terms of Service, you represent that you are **at least the age of majority** in your state or province of residence, or that you are the age of majority in your state or province of residence and you have given us your consent to allow any of your minor dependents to use this site.',
			'You may **not use our products** for any **illegal or unauthorized purpose** nor may you, in the use of the Service, violate any laws in your jurisdiction (including but not limited to copyright laws).',
			'You must **not transmit any viruses** or any code of a destructive nature. A **breach or violation** of any of the Terms will result in an **immediate termination** of your Services.'
		]
	},
	{
		title: 'General Conditions',
		content: [
			'We reserve the right to **refuse service to anyone** for any reason at any time.',
			'You understand that your content (not including credit card information), may be **transferred unencrypted** and involve (a) transmissions over various networks; and (b) changes to conform and adapt to technical requirements of connecting networks or devices. If reserving a vehicle or ordering parts or service thru e-commerce functions, **credit card information is always encrypted** during transfer over networks.',
			'You agree **not to reproduce, duplicate, copy, sell, resell or exploit** any portion of the Service, use of the Service, or access to the Service or any contact on the website through which the service is provided, without **express written permission** by us.'
		]
	},
	{
		title: 'Accuracy, Completeness and Timeliness of Information',
		content: [
			'We are **not responsible** if information made available on this site is **not accurate, complete or current**. The material on this site is provided for **general information only** and should not be relied upon or used as the sole basis for making decisions without consulting primary, more accurate, more complete or more timely sources of information.',
			'Any **reliance on the material** on this site is **at your own risk**.',
			'This site may contain certain **historical information**. Historical information, necessarily, is not current and is provided for your reference only. We reserve the right to **modify the contents** of this site at any time, but we have **no obligation to update** any information on our site.'
		]
	},
	{
		title: 'Modifications to the Service and Prices',
		content: [
			'**Prices for our products** are subject to **change without notice**.',
			'We reserve the right at any time to **modify or discontinue** the Service (or any part or content thereof) without notice at any time. We shall **not be liable** to you or to any third-party for any modification, price change, suspension or discontinuance of the Service.'
		]
	},
	{
		title: 'Products or Services',
		content: [
			'We have made every effort to **display as accurately as possible** the colours, images, and trim levels of vehicles available. We **cannot guarantee** that your computer monitor\'s display of any color will be accurate.',
			'We reserve the right, but are not obligated, to **limit the sales** of our products or Services to any person, geographic region or jurisdiction. We may exercise this right on a **case-by-case basis**.',
			'All descriptions of products or product pricing are **subject to change** at anytime without notice, at the sole discretion of us. We reserve the right to **discontinue any product** at any time.',
			'We do **not warrant** that the quality of any products, services, information, or other material purchased or obtained by you will **meet your expectations**, or that any errors in the Service will be corrected.'
		]
	},
	{
		title: 'Accuracy of Billing and Account Information',
		content: [
			'If ordering parts or reserving a vehicle, we reserve the right to **refuse any order** you place with us. We may, in our sole discretion, **limit or cancel quantities** purchased per person, per household or per order.',
			'You agree to provide **current, complete and accurate** purchase and account information for all purchases made at our dealership. You agree to **promptly update** your account and other information, including your email address and credit card numbers and expiration dates, so that we can complete your transactions and contact you as needed.'
		]
	},
	{
		title: 'Optional Tools',
		content: [
			'We may provide you with access to **third-party tools** over which we neither monitor nor have any control nor input.',
			'You acknowledge and agree that we provide access to such tools **"as is"** and **"as available"** without any warranties, representations or conditions of any kind and without any endorsement.',
			'Any use by you of optional tools offered through the site is entirely **at your own risk** and discretion and you should ensure that you are familiar with and approve of the terms on which tools are provided by the relevant third-party provider(s).'
		]
	},
	{
		title: 'Third-Party Links',
		content: [
			'Certain content, products and services available via our Service may include **materials from third-parties**.',
			'Third-party links on this site may direct you to **third-party websites** that are **not affiliated with us**. We are **not responsible** for examining or evaluating the content or accuracy and we do not warrant and will not have any liability or responsibility for any third-party materials or websites.',
			'We are **not liable** for any harm or damages related to the purchase or use of goods, services, resources, content, or any other transactions made in connection with any third-party websites.'
		]
	},
	{
		title: 'User Comments, Feedback and Other Submissions',
		content: [
			'If, at our request, you send certain specific submissions or without a request from us you send creative ideas, suggestions, proposals, plans, or other materials (collectively, **"comments"**), you agree that we may, at any time, **without restriction**, edit, copy, publish, distribute, translate and otherwise use in any medium any comments that you forward to us.',
			'We may, but have no obligation to, **monitor, edit or remove content** that we determine in our sole discretion are unlawful, offensive, threatening, libelous, defamatory, pornographic, obscene or otherwise objectionable.',
			'You agree that your comments will **not violate any right** of any third-party, including copyright, trademark, privacy, personality or other personal or proprietary right. You are **solely responsible** for any comments you make and their accuracy.'
		]
	},
	{
		title: 'Personal Information',
		content: [
			'Your submission of **personal information** through the website is governed by our **Privacy Policy**.'
		]
	},
	{
		title: 'Errors, Inaccuracies and Omissions',
		content: [
			'Occasionally there may be information on our site or in the Service that contains **typographical errors, inaccuracies or omissions** that may relate to product descriptions, pricing, promotions, offers, product shipping charges, transit times and availability.',
			'We reserve the right to **correct any errors**, inaccuracies or omissions, and to **change or update information** or cancel orders if any information in the Service or on any related website is inaccurate at any time **without prior notice**.',
			'We undertake **no obligation to update**, amend or clarify information in the Service or on any related website, including without limitation, pricing information, except as required by law.'
		]
	},
	{
		title: 'Prohibited Uses',
		content: [
			'In addition to other prohibitions as set forth in the Terms of Service, you are **prohibited from using** the site or its content for:'
		],
		list: [
			'Any **unlawful purpose**',
			'To **solicit others** to perform or participate in any unlawful acts',
			'To **violate any international, federal, provincial or state** regulations, rules, laws, or local ordinances',
			'To **infringe upon or violate** our intellectual property rights or the intellectual property rights of others',
			'To **harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate** based on gender, sexual orientation, religion, ethnicity, race, age, national origin, or disability',
			'To **submit false or misleading information**',
			'To **upload or transmit viruses** or any other type of malicious code',
			'To **collect or track** the personal information of others',
			'To **spam, phish, pharm, pretext, spider, crawl, or scrape**',
			'For any **obscene or immoral purpose**',
			'To **interfere with or circumvent** the security features of the Service'
		]
	},
	{
		title: 'Disclaimer of Warranties; Limitation of Liability',
		content: [
			'We do **not guarantee, represent or warrant** that your use of our service will be **uninterrupted, timely, secure or error-free**.',
			'You expressly agree that your use of, or inability to use, the service is **at your sole risk**. The service and all products and services delivered to you through the service are provided **"as is"** and **"as available"** for your use.',
			'In **no case** shall Find if Finance it, our directors, officers, employees, affiliates, agents, contractors, interns, suppliers, service providers or licensors be **liable for any injury, loss, claim**, or any direct, indirect, incidental, punitive, special, or consequential damages of any kind, including, without limitation **lost profits, lost revenue, lost savings, loss of data, replacement costs**.'
		]
	},
	{
		title: 'Indemnification',
		content: [
			'You agree to **indemnify, defend and hold harmless** Find if Finance it and our parent, subsidiaries, affiliates, partners, officers, directors, agents, contractors, licensors, service providers, subcontractors, suppliers, interns and employees, harmless from any **claim or demand**, including **reasonable attorneys\' fees**, made by any third-party due to or arising out of your **breach of these Terms** of Service or your **violation of any law** or the rights of a third-party.'
		]
	},
	{
		title: 'Termination',
		content: [
			'These Terms of Service are **effective unless and until terminated** by either you or us. You may terminate these Terms of Service at any time by **notifying us** that you no longer wish to use our Services, or when you **cease using our site**.',
			'If in our sole judgment you **fail, or we suspect** that you have failed, to comply with any term or provision of these Terms of Service, we also may **terminate this agreement** at any time without notice and you will remain **liable for all amounts due** up to and including the date of termination.'
		]
	},
	{
		title: 'Governing Law',
		content: [
			'These Terms of Service and any separate agreements whereby we provide you Services shall be **governed by and construed** in accordance with the **laws of Canada**.'
		]
	}
];

function formatText(text: string) {
	// Split by ** markers and apply bold formatting
	const parts = text.split('**');
	return parts.map((part, index) => {
		if (index % 2 === 1) {
			return <strong key={index} className="font-semibold text-primary dark:text-primary-foreground">{part}</strong>;
		}
		return part;
	});
}

export default function TermsConditionsPage() {
	return (
		<div className="min-h-screen flex flex-col bg-gradient-to-br from-white to-slate-200 dark:from-neutral-900 dark:to-neutral-950">
			<main className="flex-1 flex flex-col items-center px-4 py-10 md:py-16">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.4 }}
					viewport={{ once: true, margin: "-50px" }}
					className="w-full max-w-4xl mb-8"
				>
					<h1 className="text-3xl md:text-4xl font-bold mb-6 text-primary dark:text-primary-foreground text-center">
						Terms & Conditions
					</h1>
					<div className="bg-white dark:bg-neutral-900/90 rounded-2xl shadow-lg border border-slate-200 dark:border-neutral-800 p-8">
						<p className="text-lg text-muted-foreground leading-relaxed mb-4">
							These Terms of Service apply to all users of the site, including without limitation users who are browsers, vendors, customers, merchants, and/or contributors of content.
						</p>
						<div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
							<div className="flex items-start">
								<svg className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
									<path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
								</svg>
								<div>
									<p className="text-amber-800 dark:text-amber-200 font-medium text-sm">
										<strong>Important:</strong> Please read these Terms of Service carefully before accessing or using our website. By using our services, you agree to be bound by these terms.
									</p>
								</div>
							</div>
						</div>
					</div>
				</motion.div>

				<motion.div
					initial="hidden"
					whileInView="visible"
					variants={{
						hidden: {},
						visible: {
							transition: {
								staggerChildren: 0.08,
							},
						},
					}}
					viewport={{ once: true, margin: "-50px" }}
					className="w-full max-w-4xl space-y-6"
				>
					{sections.map((section, index) => (
						<motion.div
							key={section.title}
							variants={{
								hidden: { opacity: 0, y: 30 },
								visible: { opacity: 1, y: 0 },
							}}
							transition={{ duration: 0.4 }}
							className="bg-white dark:bg-neutral-900/90 rounded-2xl shadow-lg border border-slate-200 dark:border-neutral-800 p-6 md:p-8 hover:shadow-xl transition-shadow duration-200"
						>
							<h2 className="text-lg md:text-xl font-bold mb-4 text-primary dark:text-primary-foreground flex items-center">
								Section {index + 1} – {section.title}
							</h2>
							<div className="space-y-3">
								{section.content.map((paragraph, pIndex) => (
									<p key={pIndex} className="text-muted-foreground leading-relaxed text-sm md:text-base">
										{formatText(paragraph)}
									</p>
								))}
								{section.list && (
									<ul className="space-y-2 mt-4 pl-4">
										{section.list.map((item, lIndex) => (
											<li key={lIndex} className="flex items-start">
												<div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
												<span className="text-muted-foreground text-sm md:text-base">{formatText(item)}</span>
											</li>
										))}
									</ul>
								)}
							</div>
						</motion.div>
					))}
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.4, delay: 0.2 }}
					viewport={{ once: true, margin: "-50px" }}
					className="w-full max-w-4xl mt-8"
				>
					<div className="bg-gradient-to-r from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 rounded-2xl border border-primary/20 p-8">
						<h3 className="text-xl font-bold mb-4 text-primary dark:text-primary-foreground text-center">
							Questions About Our Terms & Conditions?
						</h3>
						<p className="text-muted-foreground mb-6 text-center">
							If you have any questions about these Terms of Service, please contact us using the information below.
						</p>
						<div className="bg-white dark:bg-neutral-900/50 rounded-xl p-6 space-y-4">
							<div className="text-center">
								<h4 className="font-bold text-lg mb-3 text-primary dark:text-primary-foreground">Find if Finance it</h4>
								<div className="space-y-2 text-muted-foreground">
									<div className="flex items-center justify-center gap-2">
                                        <MapPin className='text-primary' />
										<span className="text-sm">55 Southdale Rd E, London, ON, N6C 4X5, Canada</span>
									</div>
									<div className="flex items-center justify-center gap-2">
										<Phone className='text-primary' />
										<span className="text-sm font-medium">Sales: (519) 668-7111</span>
									</div>
								</div>
							</div>
						</div>
						<div className="mt-6 text-center">
							<p className="text-xs text-muted-foreground">
								<strong>Last Updated:</strong> You can review the most current version of the Terms of Service at any time on this page.
							</p>
						</div>
					</div>
				</motion.div>
			</main>
			<Footer />
		</div>
	);
}
