import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

export function Testimonials() {
  const testimonials = [
    {
      quote:
        "After integrating Storyvord’s product into our production process, we've seen a significant improvement in efficiency and output quality. The intuitive interface and robust features have streamlined our workflow, allowing us to focus more on creativity.",
      name: "Alex Johnson",
      designation: "Film Producer",
      src: "gaurav1.svg",
    },
    {
      quote:
        "Utilizing Storyvord has revolutionized the way we manage our projects. The collaborative tools and real-time updates have enhanced communication among our team, leading to timely project completions and satisfied clients.",
      name: "Maria Gonzalez",
      designation: "Video Production Manager",
      src: "gaurav2.svg",
    },
    {
      quote:
        "The transition to Storyvord’s AI suggestion was seamless and has greatly benefited our post-production phase. The advanced editing capabilities and user-friendly design have made it an indispensable tool in our arsenal.",
      name: "Liam Smith",
      designation: "Post-Production Supervisor",
      src: "gaurav3.svg",
    },
  ];
  return (
    <section className=" pt-16">
      <h2 className="text-5xl col-start-3 col-span-8 font-bold mb-12 text-center text-background-2">
        What People are saying
      </h2>
      <AnimatedTestimonials testimonials={testimonials} />
    </section>
  );
}
