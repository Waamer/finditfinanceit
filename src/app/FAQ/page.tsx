'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { motion } from 'framer-motion';
import Footer from '@/components/footer';
import { Card, CardContent } from '@/components/ui/card';

const faqs = [
    {
        question: 'Do I get to pick my choice of vehicle type/make/model/colour and other options?',
        answer: `Short answer is <b>yes</b>. But it is important to keep in mind that the more specific (picky) you are in your selection, the longer it takes to find the exact vehicle of your choice, and also be able to minimize the payment, and do a zero $0 down approval.`,
    },
    {
        question: 'Do you provide contactless purchase option and delivery to my home?',
        answer: `In vast majority of cases <b>yes</b>. Sometimes because of the quality (or lack) of the customer’s trade-in vehicle – if any, or them residing at a very remote location in Northern Ontario, then it may not be possible. But we will do our very best – always!`,
    },
    {
        question: 'I have a current car loan with a financial institution that I need to get out of before getting a new vehicle. Is that possible?',
        answer: `Yes. We have re-finance car agents standing by who specialize in negative equity situations. In general it is important to get out of a high interest car loan as soon as possible and especially before that vehicle potentially needs costly repairs or dies completely, while you will still continue to owe money on it and run into further credit problems, because your current financial institution on that vehicle will still require you the customer to keep up your payments on that vehicle regardless of the condition or drivability of that vehicle, as the car, and the car loan on it, are two separate matters.`,
    },
    {
        question: 'I have applied for bankruptcy and/or consumer proposal. Would I still qualify to get a proper vehicle?',
        answer: `Yes. In fact certain auto finance companies actually prefer clients who have applied for bankruptcy/consumer proposal. Logic being that you are the same “John/Mary”, less the annoying collection agency calls in your life, less the minimum monthly payments that you had to make to keep up with for the now-wiped out debt, while getting a brand new fresh start on your financial life which makes you a quality client in their eyes today!`,
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

export default function FAQPage() {
    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-white to-slate-200 dark:from-neutral-900 dark:to-neutral-950">
            <main className="flex-1 flex flex-col items-center px-4 py-10 md:pt-16 md:pb-36">
                <motion.h1
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="text-3xl md:text-4xl font-bold mb-10 text-primary dark:text-primary-foreground text-center"
                >
                    Frequently Asked Questions
                </motion.h1>
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: {},
                        visible: {
                            transition: {
                                staggerChildren: 0.15,
                            },
                        },
                    }}
                    className="w-full max-w-5xl flex flex-col md:flex-row gap-8"
                >
                    <section className="flex-1">
                        <Accordion type="single" collapsible className="">
                            {faqs.map((faq, i) => {
                                let rounded = '';
                                if (i === 0) rounded = 'rounded-t-lg';
                                if (i === faqs.length - 1) rounded = rounded ? `${rounded} rounded-b-lg` : 'rounded-b-lg';
                                return (
                                    <motion.div
                                        key={faq.question}
                                        variants={{
                                            hidden: { opacity: 0, y: 40 },
                                            visible: { opacity: 1, y: 0 },
                                        }}
                                        transition={{ duration: 0.5, ease: 'easeOut' }}
                                    >
                                        <AccordionItem value={`faq-${i}`} className={`border bg-white dark:bg-neutral-900/90 shadow-md ${rounded}`}>
                                            <AccordionTrigger className="text-lg md:text-xl font-semibold px-6 py-4">
                                                {faq.question}
                                            </AccordionTrigger>
                                            <AccordionContent className="px-6 pb-6 text-base md:text-lg text-muted-foreground leading-relaxed">
                                                <span dangerouslySetInnerHTML={{ __html: faq.answer }} />
                                            </AccordionContent>
                                        </AccordionItem>
                                    </motion.div>
                                );
                            })}
                        </Accordion>
                    </section>
                    <aside className="w-full md:w-80 flex-shrink-0">
                        <Card className="shadow-md py-0 rounded-lg bg-white dark:bg-neutral-900/90">
                            <CardContent className="p-6">
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
                            </CardContent>
                        </Card>
                    </aside>
                </motion.div>
            </main>
            <Footer />
        </div>
    );
}