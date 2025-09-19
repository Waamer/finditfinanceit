'use client';

import Footer from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import Link from "next/link";

const hours = [
    { day: "Monday", hours: "9:00 AM to 7:00 PM" },
    { day: "Tuesday", hours: "9:00 AM to 7:00 PM" },
    { day: "Wednesday", hours: "9:00 AM to 7:00 PM" },
    { day: "Thursday", hours: "9:00 AM to 7:00 PM" },
    { day: "Friday", hours: "9:00 AM to 6:00 PM" },
    { day: "Saturday", hours: "9:00 AM to 5:00 PM" },
    { day: "Sunday", hours: "Closed" },
];

export default function SimpleCarLoansPage() {
    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-white to-slate-200 dark:from-neutral-900 dark:to-neutral-950">
            <main className="flex-1 flex flex-col items-center px-4 py-10 md:py-16">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    viewport={{ once: true, margin: "-50px" }}
                    className="w-full max-w-5xl flex flex-col md:flex-row gap-8"
                >
                    <section className="flex-1">
                        <motion.h1 
                            className="text-2xl md:text-3xl font-bold mb-6 text-primary dark:text-primary-foreground"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.1 }}
                            viewport={{ once: true, margin: "-50px" }}
                        >
                            How a simple car loan can improve your car, your credit, and your life
                        </motion.h1>
                        <motion.div 
                            className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.2 }}
                            viewport={{ once: true, margin: "-50px" }}
                        >
                            <p>
                                When you look at your personal credit report, there is usually a number from 1 to 9 assigned to each credit account. The closer the number is to 1 indicates a good credit repayment history with that account, and the closer the number is in the other direction to 9, indicates a bad repayment history with that particular account. Naturally everyone should aim to be closer to 1 as opposed to 9.
                            </p>
                            <p>
                                But another important factor in understanding one’s own credit history report is the letter to the immediate left of those 1 to 9 numbers. Most commonly you will see (capital) letters R or I.
                            </p>
                            <p>
                                Letter <b>R</b> stands for a “Revolving” credit account and letter <b>I</b> stands for an “Installment” credit account.
                            </p>
                            <p>
                                Example of a <i>revolving</i> credit account would be a credit card. One could have a $5,000 Visa or Mastercard. On day one of the month your balance owing on it maybe $0. By day four you may have gone grocery shopping and have balance of $125 owing on it. By day fifteen of the month you may have gone on vacation and spent an additional $2,000. And by day 30 at the end of the month you decide to pay off <b>all</b> of the total amount owing – or – <b>some</b> of the balance owing – or – just the <b>minimum</b> payment due. So the balance owing at any given point of each month can be a <i>revolving</i> amount! This kind of account, based on the person’s repayment pattern shown above, could demonstrate a customer who at any given moment of the month may have a different financial situation.
                            </p>
                            <p>
                                Example of an <i>installment</i> credit account would be something similar to a car loan payment. It is a set amount each and every month. The payment does not change. Future creditors looking at an individual’s credit history tend to look more favourably toward these installment accounts. The reason usually is because it demonstrates a “no-drama” person. It shows that no matter what is going on in that person’s life on any given month, they make sure to have enough money set aside for their basic car payment. And at the end of the day, all creditors want is a client who is responsible and they don’t have to chase them back for a basic payment.
                            </p>
                            <p>
                                The above mentioned example is a demonstration as to how a simple car financing, can <b>IMPROVE</b> your car, and with that <b>IMPROVE</b> your credit, and with that <b>IMPROVE</b> the quality of your life!
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.3 }}
                            viewport={{ once: true, margin: "-50px" }}
                        >
                            <Link href="/survey" passHref>
                                <button className="w-full md:w-auto mt-8 px-8 py-3 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 hover:scale-[1.02] transition-all duration-200 text-lg shadow-lg">
                                    APPLY NOW
                                </button>
                            </Link>
                        </motion.div>
                    </section>
                    <motion.aside 
                        className="w-full md:w-80 flex-shrink-0"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.4 }}
                        viewport={{ once: true, margin: "-50px" }}
                    >
                        <Card className="shadow-md py-0 rounded-lg bg-white dark:bg-neutral-900/90 hover:shadow-xl transition-shadow duration-200">
                            <CardContent className="p-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
                                    <span className="font-bold text-lg">Hours of Operation</span>
                                </div>
                                <div className="divide-y divide-muted-foreground/20">
                                    {hours.map(({ day, hours }) => (
                                        <div key={day} className="flex justify-between py-1 text-sm md:text-base">
                                            <span className="font-medium text-muted-foreground">{day}</span>
                                            <span className={hours === "Closed" ? "text-destructive font-semibold" : "font-semibold text-primary"}>{hours}</span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </motion.aside>
                </motion.div>
            </main>
            <Footer />
        </div>
    );
}