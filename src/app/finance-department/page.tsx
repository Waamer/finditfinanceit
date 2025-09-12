'use client';

import Footer from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "motion/react";
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

export default function FinanceDepartmentPage() {
    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-white to-slate-200 dark:from-neutral-900 dark:to-neutral-950">
            <main className="flex-1 flex flex-col items-center px-4 py-10 md:py-16">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="w-full max-w-5xl flex flex-col md:flex-row gap-8"
                >
                    <section className="flex-1">
                        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-primary dark:text-primary-foreground">
                            What to consider <span className="text-destructive">BEFORE</span> you apply for car financing
                        </h1>
                        <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
                            <p>
                                When preparing to finance or lease a vehicle, it is important to understand a few things in advance.
                            </p>
                            <p>
                                Financial institutions do not give out <b>“open-ended” approvals</b>. This means there is an expiry date on an individual’s approval. Anyone’s job, family, overall financial and credit situations can fall apart rapidly overnight. Because of these reasons banks are hesitant to do car approvals longer than 21 (business) days.
                            </p>
                            <p>
                                Many times people say <i>“oh I was applying just to see if I’d get approved for when I am ACTUALLY ready – in 6 months!”</i>
                            </p>
                            <p>
                                Even if someone does get an approval now, it is worthless passed the 21 (business) days mentioned above, because the approval may not exist for one reason or another after that period.
                            </p>
                            <p>
                                <b>As a general rule of thumb</b> it is important to keep in mind that credit should always be taken advantage of – when it is <b>OFFERED</b> and available by a financial institution – as it may not always be there going forward.
                            </p>
                            <p>
                                Contrary to popular belief, a person’s credit rating is not as important of a factor to get car financing approval as their job situation. Credit history tells the story of your past, where the job situation tells the story of your future – your ability to pay back the car loan – going forward! And at the end of the day, that is more important to a financial institution than what you may or may not have done with your Rogers, Bell, CapitalOne accounts etc.
                            </p>
                            <p>
                                <b>To prepare for the application process, you need 2 things to begin (and only 2 things):</b>
                            </p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>
                                    <b>one (CLEAR) photo</b> of your driver’s license. Corner to corner – no letters or numbers missing!
                                </li>
                                <li>
                                    <b>one (CLEAR) photo</b> of a recent pay stub from the last 30 days or so. Corner to corner – no letters or numbers missing!
                                </li>
                            </ul>
                            <p>
                                That is usually more than enough info to secure a pre-approval with zero $0 down payment. In some exceptions, the bank may ask for your social insurance number if you have a common name and city (i.e. John Smith from Toronto, ON.) or very limited credit history.
                            </p>
                        </div>
                        <Link href="/survey" passHref>
                            <button className="w-full md:w-auto mt-8 px-8 py-3 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 transition-colors text-lg">
                                APPLY NOW
                            </button>
                        </Link>
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
                                            <span className={hours === "Closed" ? "text-destructive font-semibold" : "font-semibold text-primary"}>{hours}</span>
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