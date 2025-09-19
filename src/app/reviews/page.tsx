
'use client';

import { motion } from 'framer-motion';
import Footer from '@/components/footer';
import Image from 'next/image';


const reviews = [
	{
		name: 'Dawn M',
		text: `Ashley and Kal at FiFi went above and beyond when helping my daughter with her first car purchase. They were patient and at every inquiry they approached with care and consideration. They want their clients happy and go out of their way to accomplish this. I was so happy with their service that I myself bought a car from them and they treated me with the same patience and enthusiasm. I would recommend them to anyone for future car purchases.`,
	},
	{
		name: 'Julie G',
		text: `My girlfriend and I purchased a 2015 ram eco diesel from FiFi. The sales staff was friendly. This truck is beautiful. The truck did have some faults after picking it up and Ed and I are working at having the issues resolved as quickly as possible. For the most part they have been pretty good about the whole thing.`,
	},
	{
		name: 'Canute R',
		text: `The current market for used cars is crazy in 2022. Despite that, these guys got me a good deal and got me driving a good car in no time. As a recent immigrant with almost no credit history I would recommend them. Talk to Ashlee she can help and her customer service is first class.`,
	},
	{
		name: 'Lawrence O',
		text: `Ashley is the absolute best! She is very professional and has helped me with the last two vehicles I have bought. Ashley always makes my car needs her priority.`,
	},
];

const hours = [
	{ day: 'Monday', hours: '9:00 AM to 7:00 PM' },
	{ day: 'Tuesday', hours: '9:00 AM to 7:00 PM' },
	{ day: 'Wednesday', hours: '9:00 AM to 7:00 PM' },
	{ day: 'Thursday', hours: '9:00 AM to 7:00 PM' },
	{ day: 'Friday', hours: '9:00 AM to 6:00 PM' },
	{ day: 'Saturday', hours: '9:00 AM to 5:00 PM' },
	{ day: 'Sunday', hours: 'Closed' },
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

export default function ReviewsPage() {
	return (
		<div className="min-h-screen flex flex-col bg-gradient-to-br from-white to-slate-200 dark:from-neutral-900 dark:to-neutral-950">
			<main className="flex-1 flex flex-col items-center px-4 py-10 md:py-16">
				<motion.h1
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: "-50px" }}
					transition={{ duration: 0.3, ease: "easeOut" }}
					className="text-3xl md:text-4xl font-bold mb-10 text-primary dark:text-primary-foreground text-center"
				>
					Reviews
				</motion.h1>
				<motion.div
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, margin: "-50px" }}
					variants={{
						hidden: {},
						visible: {
							transition: {
								staggerChildren: 0.05,
							},
						},
					}}
					className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 mb-8"
				>
					{reviews.map((review) => (
						<motion.div
							key={review.name}
							variants={{
								hidden: { opacity: 0, y: 20 },
								visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
							}}
							className="relative bg-white dark:bg-neutral-900/90 rounded-2xl shadow-lg border border-slate-200 dark:border-neutral-800 p-7 flex flex-col min-h-[220px] hover:shadow-xl transition-shadow duration-200"
							style={{ overflow: 'visible' }}
						>
							<div className="flex items-center justify-between mb-2">
								<StarRow />
								<Image src='/logos/GoogleLogo.png' alt='Google Logo' width={28} height={28} className='ml-2' />
							</div>
							<div className="text-lg font-semibold mb-1 dark:text-white">{review.name}</div>
							<div className="text-muted-foreground text-base mb-2">{review.text}</div>
						</motion.div>
					))}
				</motion.div>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: "-50px" }}
					transition={{ duration: 0.3, ease: "easeOut", delay: 0.1 }}
					className="w-full max-w-5xl flex flex-col md:flex-row gap-8"
				>
					<aside className="w-full md:w-80 flex-1 bg-white dark:bg-neutral-900/90 rounded-2xl shadow-lg p-6 border border-slate-200 dark:border-neutral-800">
						<div className="flex items-center gap-2 mb-4">
							<svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
							<span className="font-bold text-lg">Hours of Operation</span>
						</div>
						<div className="divide-y divide-muted-foreground/20">
							{hours.map(({ day, hours }) => (
								<div key={day} className="flex justify-between py-1 text-sm md:text-base">
									<span className="font-medium text-muted-foreground">{day}</span>
									<span className={hours === 'Closed' ? 'text-destructive font-semibold' : 'font-semibold text-primary'}>{hours}</span>
								</div>
							))}
						</div>
					</aside>
                    <section className="flex-shrink-0 sm:min-w-xs bg-white dark:bg-neutral-900/90 rounded-2xl shadow-lg border border-slate-200 dark:border-neutral-800">
						<h2 className="text-xl font-bold text-center py-3.5 bg-black rounded-t-2xl text-primary-foreground">Contact Us</h2>
                        <div className='p-6 space-y-2'>
                            <div>
                                <span className="font-semibold">Address</span>
							    <div>55 Southdale Rd E,<br />London, ON<br />N6C 4X5</div>
                            </div>
                            <div>
							    <span className="font-semibold">Sales:</span> (519) 668-7111
						    </div>
                        </div>
					</section>
				</motion.div>
			</main>
			<Footer />
		</div>
	);
}
