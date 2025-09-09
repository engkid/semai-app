"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

const services = [
	{
		title: "Branding",
		description: "Crafting unique brand identities.",
		image: "/images/branding.png",
		detail: "We help you build a memorable brand with strategy, design, and storytelling that sets you apart.",
	},
	{
		title: "Web Design",
		description: "Modern, responsive websites.",
		image: "/images/web-design.png",
		detail: "Our web design team creates beautiful, fast, and accessible sites tailored to your business goals.",
	},
	{
		title: "Content Creation",
		description: "Engaging digital content.",
		image: "/images/content-creation.png",
		detail: "From copywriting to video, we produce content that connects and converts your audience.",
	},
	{
		title: "Social Media",
		description: "Strategic social campaigns.",
		image: "/images/social-media.png",
		detail: "Grow your brand with creative campaigns and data-driven social media management.",
	},
	{
		title: "UI/UX",
		description: "User-focused design solutions.",
		image: "/images/ui-ux.png",
		detail: "We design intuitive interfaces and experiences that delight users and drive engagement.",
	},
	{
		title: "Motion Graphics",
		description: "Dynamic visual storytelling.",
		image: "/images/motion-graphics.png",
		detail: "Bring your story to life with animated graphics and video for web, social, and ads.",
	},
];

export default function Carousel() {
	const [emblaRef, embla] = useEmblaCarousel({
		loop: true,
		align: "center",
	});
	const [selectedIndex, setSelectedIndex] = useState(0);

	const total = services.length;

	const scrollTo = useCallback(
		(index: number) => {
			if (!embla) return;
			if (index >= total - 1) {
				// If attempting to go to the last index, wrap to the first
				embla.scrollTo(0);
				return;
			}
			embla.scrollTo(index);
		},
		[embla, total]
	);

	useEffect(() => {
		if (!embla) return;
		const onSelect = () => setSelectedIndex(embla.selectedScrollSnap());
		embla.on("select", onSelect);
		onSelect();
		return () => embla.off("select", onSelect);
	}, [embla]);

	return (
		<div className="w-full py-8 bg-slate-50 justify-center flex glr flex-col md:flex-row items-start gap-6 md:gap-8">
			{/* Carousel Section */}
			<div className="w-full flex flex-col px-4 md:pr-8 md:px-0">
				<div className="embla" ref={emblaRef}>
					<div className="embla__container flex">
						{services.map((service, idx) => (
							<div
								className={`embla__slide relative rounded-2xl overflow-hidden shadow-lg flex-shrink-0 group mx-2 transition-all duration-500 ${
									idx === selectedIndex ? "scale-100 z-10" : "scale-80 opacity-60"
								}`}
								key={idx}
								style={{
									width: "50%",
									height: "340px",
									transform: idx === selectedIndex ? "scale(1)" : "scale(0.8)",
									transition: "transform 0.4s cubic-bezier(.4,0,.2,1), opacity 0.4s",
									cursor: idx === selectedIndex ? "default" : "pointer",
									boxShadow: idx === selectedIndex
										? "0 8px 32px rgba(37,99,235,0.15)"
										: "0 2px 12px rgba(0,0,0,0.08)",
									background: "#fff",
								}}
								onClick={() => scrollTo(idx)}
							>
								<img
									src={service.image}
									alt={service.title}
									className="w-full h-full object-cover"
									style={{
										borderRadius: "1rem",
									}}
								/>
								<div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
									<h3 className="text-lg font-bold text-white mb-1 drop-shadow-lg">
										{service.title}
									</h3>
									<p className="text-white text-sm drop-shadow">
										{service.description}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
				{/* Custom Dots */}
				<div className="flex justify-center items-center gap-2 mt-4">
					{services.map((_, idx) => (
						<svg
							key={idx}
							viewBox="0 0 10 10"
							className={`transition-all ${
								idx === selectedIndex
									? "w-4 h-4 opacity-100 scale-[1.5] mx-[2px]"
									: "w-3 h-3 opacity-50 scale-[1.1]"
							}`}
							style={{ cursor: "pointer" }}
							onClick={() => scrollTo(idx)}
						>
							<circle cx="5" cy="5" r="5" fill="black" />
						</svg>
					))}
				</div>
			</div>
			{/* Description Section */}
			{/* <div className="w-full md:w-2/3 px-4 md:px-0 mt-6 md:mt-0 flex items-center">
				<div className="bg-white rounded-xl shadow-lg p-6 md:p-8 sticky top-24 h-[480px] flex flex-col justify-center">
					<h2 className="text-3xl font-extrabold text-blue-600 mb-4">{services[selectedIndex].title}</h2>
					<p className="text-slate-700 text-lg">{services[selectedIndex].detail}</p>
				</div>
			</div> */}
		</div>
	);
}