
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { FaStripe, FaGoogle, FaAmazon, FaFacebook, FaMicrosoft } from "react-icons/fa";

export function CardHoverEffect() {
  return (
    <div className="max-w-5xl mx-auto px-8">
      <HoverEffect items={projects} />
    </div>
  );
}
export const projects = [
  {
    title: "AI-Powered Drug Discovery",
    description:
      "Leverage advanced AI algorithms to accelerate the drug discovery process.",
    icon: <FaStripe className="text-blue-500" />,
    link: "/dashboard",
  },
  {
    title: "Molecular Modeling",
    description:
      "Utilize state-of-the-art molecular modeling and simulation tools for drug-target interactions.",
    icon: <FaGoogle className="text-red-500" />,
    link: "/dashboard",
  },
  {
    title: "Biomedical Data Analysis",
    description:
      "Harness machine learning and big data analytics to extract insights from complex biomedical datasets.",
    icon: <FaGoogle className="text-yellow-500" />,
    link: "/dashboard",
  },
  {
    title: "Target Identification",
    description:
      "Employ AI-driven approaches to identify and validate novel drug targets.",
    // eslint-disable-next-line react/jsx-no-undef
    icon: <FaFacebook className="text-blue-700" />,
    link: "/dashboard",
  },
  {
    title: "Precision Medicine",
    description:
      "Advance personalized healthcare solutions by leveraging AI algorithms to analyze patient-specific data.",
    icon: <FaAmazon className="text-green-500" />,
    link: "/dashboard",
  },
  {
    title: "Drug Repurposing",
    description:
      "Explore new therapeutic applications for existing drugs using AI-powered analysis.",
    icon: <FaMicrosoft className="text-purple-500" />,
    link: "/dashboard",
  },
];
export default CardHoverEffect;