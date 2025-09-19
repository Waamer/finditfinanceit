'use client';

import { motion } from 'framer-motion';
import Footer from '@/components/footer';

const sections = [
	{
		title: 'Information Collection, Use, and Sharing',
		content: [
			'We are the **sole owners** of the information collected on this site. We only have access to/collect information that you **voluntarily give us** via email or other direct contacts from you. We will **not sell or rent** this information to anyone.',
			'We will use your information to **respond to you**, regarding the reason you contacted us. We will **not share** your information with any third party outside of our organization, other than as necessary to fulfill your request, e.g. to ship an order.',
			'The format of information may be reviewed by **Find if Finance it** for quality purposes by way of making refinements and improvements to the quality of our website.',
			'Unless you ask us not to, we may **contact you via email** in the future to tell you about specials, new products or services, or changes to this privacy policy.'
		]
	},
	{
		title: 'Your Access to and Control Over Information',
		content: [
			'You may **opt-out** of any future contacts from us at any time. You can do the following at any time by contacting us via the **email address** or **phone number** given on our website:',
		],
		list: [
			'See what data we have about you if any.',
			'Change/correct any data we have about you.',
			'Have us delete any data we have about you.',
			'Express any concern you have about our use of your data.'
		]
	},
	{
		title: 'Accountability',
		content: [
			'This web site and the information, software, products and services associated with it are provided **"as is."** Find if Finance it, and/or participating lenders, to the fullest extent on the law, disclaim any warranty of any kind, whether express or implied, as to any matter whatsoever relating to this web site and any information, software, products and services provided herein, including without limitation the implied warranties of **merchantability**, **fitness for a particular purpose**, **title**, and **noninfringement** of third party rights.',
			'Use of this web site and/or Find if Finance it services is **at your own risk**. Find if Finance it and/or participating lenders are **not liable** for any direct, indirect, punitive, incidental, special or consequential damages or other injury arising out of or in any way connected with the use of this web site and/or Find if Finance it\'s services or with the delay or inability to use this web site.',
			'This web site may contain **links to web sites** maintained by third parties or advertising for a third party. Such links or advertising are provided and/or created by the owners of the website and Find if Finance it **does not operate or control** in any respect any information, software, products or services available on such websites.',
			'This website contains information for and is designed for use in **Canada** and for that requiring **Canada vehicle information**. If you access this website outside of Canada, you will hold Find if Finance it harmless in the event that accessing information on the website is in violation of your local laws.'
		]
	},
	{
		title: 'Security',
		content: [
			'We take **precautions to protect** your information. When you submit sensitive information via the website, your information is **protected both online and offline**.',
			'Wherever we collect **sensitive information** (such as credit card data), that information is **encrypted** and transmitted to us in a secure way. You can verify this by looking for a **closed lock icon** at the bottom of your web browser, or looking for **"https"** at the beginning of the address of the web page.',
			'While we use encryption to protect sensitive information transmitted online, we also **protect your information offline**. Only employees who need the information to perform a specific job (for example, billing or customer service) are granted access to personally identifiable information. The computers/servers in which we store personally identifiable information are kept in a **secure environment**.',
			'If you feel that we are not abiding by this privacy policy, you should **contact us immediately** via telephone or via email.'
		]
	},
	{
		title: 'User Information for Those Under 18',
		content: [
			'You must be **at least 18 years old** to have our permission to use our credit application. To protect the interests of children, **no information should be submitted** to our web sites by children 18 years of age or under, without the **consent of a parent or guardian**.',
			'Find if Finance it **cannot be held liable** for information unknowingly given to us by any under-age user, but does not actively seek any demographic or preference information from children, nor will it ever knowingly disclose any personally identifying information regarding children to third parties.'
		]
	},
	{
		title: 'Indemnity',
		content: [
			'As a condition of use of this web site, credit application and/or Find if Finance it services, you agree to **indemnify** Find if Finance it and its suppliers, participating lenders, or real estate professionals from and against any and all **liabilities**, **expenses** (including attorneys\' fees) and **damages** arising out of claims resulting from your use of this web site and credit application, including without limitation of any claims alleging facts that if true would constitute a breach by you of this agreement.'
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

export default function PrivacyPolicyPage() {
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
						Privacy Policy
					</h1>
					<div className="bg-white dark:bg-neutral-900/90 rounded-2xl shadow-lg border border-slate-200 dark:border-neutral-800 p-8">
						<p className="text-lg text-muted-foreground leading-relaxed mb-8">
							This privacy notice discloses the privacy practices for <strong className="font-semibold text-primary dark:text-primary-foreground">Find if Finance it</strong>. 
							This privacy notice applies solely to information collected by this web site. It will notify you of the following:
						</p>
						<ul className="space-y-3 mb-8 pl-6">
							<li className="flex items-start">
								<div className="w-2 h-2 bg-primary rounded-full mt-2 mr-4 flex-shrink-0"></div>
								<span className="text-muted-foreground">What <strong className="font-semibold text-primary dark:text-primary-foreground">personally identifiable information</strong> is collected from you through the web site, how it is used and with whom it may be shared.</span>
							</li>
							<li className="flex items-start">
								<div className="w-2 h-2 bg-primary rounded-full mt-2 mr-4 flex-shrink-0"></div>
								<span className="text-muted-foreground">What <strong className="font-semibold text-primary dark:text-primary-foreground">choices are available</strong> to you regarding the use of your data.</span>
							</li>
							<li className="flex items-start">
								<div className="w-2 h-2 bg-primary rounded-full mt-2 mr-4 flex-shrink-0"></div>
								<span className="text-muted-foreground">The <strong className="font-semibold text-primary dark:text-primary-foreground">security procedures</strong> in place to protect the misuse of your information.</span>
							</li>
							<li className="flex items-start">
								<div className="w-2 h-2 bg-primary rounded-full mt-2 mr-4 flex-shrink-0"></div>
								<span className="text-muted-foreground">How you can <strong className="font-semibold text-primary dark:text-primary-foreground">correct any inaccuracies</strong> in the information.</span>
							</li>
						</ul>
					</div>
				</motion.div>

				<motion.div
					initial="hidden"
					whileInView="visible"
					variants={{
						hidden: {},
						visible: {
							transition: {
								staggerChildren: 0.1,
							},
						},
					}}
					viewport={{ once: true, margin: "-50px" }}
					className="w-full max-w-4xl space-y-8"
				>
					{sections.map((section) => (
						<motion.div
							key={section.title}
							variants={{
								hidden: { opacity: 0, y: 30 },
								visible: { opacity: 1, y: 0 },
							}}
							transition={{ duration: 0.4 }}
							className="bg-white dark:bg-neutral-900/90 rounded-2xl shadow-lg border border-slate-200 dark:border-neutral-800 p-6 sm:p-8 hover:shadow-xl transition-shadow duration-200"
						>
							<h2 className="text-xl md:text-2xl font-bold mb-6 text-primary dark:text-primary-foreground flex items-center">
								{section.title}
							</h2>
							<div className="space-y-4">
								{section.content.map((paragraph, pIndex) => (
									<p key={pIndex} className="text-muted-foreground leading-relaxed text-base">
										{formatText(paragraph)}
									</p>
								))}
								{section.list && (
									<ul className="space-y-2 mt-4 pl-6">
										{section.list.map((item, lIndex) => (
											<li key={lIndex} className="flex items-start">
												<div className="w-1.5 h-1.5 bg-primary rounded-full mt-2.5 mr-3 flex-shrink-0"></div>
												<span className="text-muted-foreground font-medium">{item}</span>
											</li>
										))}
									</ul>
								)}
							</div>
						</motion.div>
					))}
				</motion.div>

			</main>
			<Footer />
		</div>
	);
}
