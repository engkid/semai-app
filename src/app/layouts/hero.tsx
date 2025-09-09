import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["800"] });

export default function Hero() {
    return (
        <section className="section text-center py-0">
            <div className="container-max">
                <p className={`mb-6 text-7xl sm:text-8xl font-extrabold tracking-tight ${montserrat.className}`}>
                    Semai
                </p>
                <h1 className="mt-8 text-4x1 sm:text-6x1 font-extrabold leading-tight">
                    Crafting <span className="text-blue-600">Innovative</span> Digital Experiences
                </h1>
                <p className="mt-4 text-lg text-slate-700">
                    We blend creativity and technology to deliver cutting-edge solutions that drive success.
                </p>
                <div className="mt-8 flex items-center justify-center gap-3">
                    <Button asChild size="lg"><Link href="#contact">Start a project</Link></Button>
                    <Link href="#work" className="px-5 py-2.5 border rounded-xl">See our work</Link>
                </div>
            </div>
        </section>
    )
}