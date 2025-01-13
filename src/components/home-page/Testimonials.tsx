import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { useTranslations } from "next-intl";

export function Testimonials() {
  const t = useTranslations("HomePage.Testimonials");
  const testimonials = [
    {
      quote: t("testimonials.0.quote"),
      name: t("testimonials.0.name"),
      designation: t("testimonials.0.designation"),
      src: "gaurav1.svg",
    },
    {
      quote: t("testimonials.1.quote"),
      name: t("testimonials.1.name"),
      designation: t("testimonials.1.designation"),
      src: "gaurav2.svg",
    },
    {
      quote: t("testimonials.2.quote"),
      name: t("testimonials.2.name"),
      designation: t("testimonials.2.designation"),
      src: "gaurav3.svg",
    },
  ];
  return (
    <section className=" py-20">
      <h2 className="text-5xl col-start-3 col-span-8 mb-4 font-poppins-bold text-center text-background-2">
        {t("heading")}
      </h2>
      <AnimatedTestimonials testimonials={testimonials} />
    </section>
  );
}
