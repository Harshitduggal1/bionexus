/* eslint-disable react/display-name */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-no-comment-textnodes */
"use client";

import React, { useMemo } from "react";
import {
  Box,
  Grid,
  Stack,
  Text,
  Link,
  HStack,
  Icon,
  Divider,
  Image,
  BoxProps,
} from "@chakra-ui/react";
import {
  FaYoutube,
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaPinterest,
  FaGithub,
  FaLinkedin,
  FaMedium,
  FaSlack
} from "react-icons/fa";
import { motion, MotionProps, isValidMotionProp } from "framer-motion";
import flare from "@/public/flare.png";

interface FooterLink {
  href: string;
  text: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

type MotionBoxProps = BoxProps & MotionProps;

const MotionBox = motion(
  React.forwardRef<HTMLDivElement, MotionBoxProps>((props, ref) => {
    const chakraProps = Object.fromEntries(
      Object.entries(props).filter(([key]) => !isValidMotionProp(key))
    );
    return <Box ref={ref} {...chakraProps} />;
  })
);

MotionBox.displayName = "MotionBox";

const Footers: React.FC = () => {
  const footerSections: FooterSection[] = useMemo(
    () => [
      {
        title: "About Us",
        links: [
          { href: "/our-story", text: "Our Story" },
          { href: "/team", text: "Meet the Team" },
          { href: "/careers", text: "Careers" },
          { href: "/press", text: "Press Releases" },
          { href: "/blog", text: "Blog" },
          { href: "/contact", text: "Contact Us" },
          { href: "/partnerships", text: "Partnerships" },
          { href: "/investor-relations", text: "Investor Relations" },
        ],
      },
      {
        title: "Products",
        links: [
          { href: "/products/software", text: "Software Solutions" },
          { href: "/products/hardware", text: "Hardware" },
          { href: "/products/services", text: "Services" },
          { href: "/products/enterprise", text: "Enterprise" },
          { href: "/products/personal", text: "Personal" },
          { href: "/pricing", text: "Pricing" },
          { href: "/products/custom", text: "Custom Solutions" },
          { href: "/products/integrations", text: "Integrations" },
        ],
      },
      {
        title: "Resources",
        links: [
          { href: "/resources/documentation", text: "Documentation" },
          { href: "/resources/tutorials", text: "Tutorials" },
          { href: "/resources/webinars", text: "Webinars" },
          { href: "/resources/case-studies", text: "Case Studies" },
          { href: "/resources/white-papers", text: "White Papers" },
          { href: "/resources/faq", text: "FAQ" },
          { href: "/resources/api", text: "API Reference" },
          { href: "/resources/community", text: "Community Resources" },
        ],
      },
      {
        title: "Community",
        links: [
          { href: "/community/forums", text: "Forums" },
          { href: "/community/events", text: "Events" },
          { href: "/community/developers", text: "Developers" },
          { href: "/community/partners", text: "Partners" },
          { href: "/community/affiliates", text: "Affiliates" },
          { href: "/community/newsletter", text: "Newsletter" },
          { href: "/community/user-groups", text: "User Groups" },
          { href: "/community/hackathons", text: "Hackathons" },
        ],
      },
    ],
    []
  );

  return (
    <Box className="relative bg-white shadow-2xl text-gray-800">
      <MotionBox
        className="bg-gradient-to-r from-blue-500 via-purple-600 to-pink-600 w-full h-1 animate-pulse"
        style={{
          backgroundSize: "200% 100%",
          animation: "gradientAnimation 5s linear infinite alternate",
        }}
      />

      <Grid
        className="gap-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-16 mb-12 px-6 md:px-16 rounded-2xl"
        textAlign={{ base: "center", md: "left" }}
      >
        {footerSections.map((section, index) => (
          <Stack key={index} spacing={4} className="bg-white/10 hover:bg-white/20 hover:shadow-2xl backdrop-blur-lg p-8 rounded-3xl transition-all duration-500 hover:scale-105">
            <Text className="bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4 font-extrabold text-3xl text-transparent hover:scale-110 transition duration-300">
              {section.title}
            </Text>
            {section.links.map((link, linkIndex) => (
              <Link
                key={linkIndex}
                href={link.href}
                className="hover:font-semibold text-gray-700 text-lg hover:text-blue-600 hover:underline transform transition hover:translate-x-2 duration-300"
              >
                {link.text}
              </Link>
            ))}
          </Stack>
        ))}
      </Grid>

      <Divider className="opacity-50 my-12 border-t-2 border-blue-100 hover:border-blue-300 transition-colors duration-300" />
      
      <Grid
        className="items-center gap-8 lg:gap-12 grid grid-cols-1 lg:grid-cols-2 mt-12 px-6 md:px-16 pb-16 text-left"
      >
        <Stack className="space-y-8 bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 font-bold text-center text-transparent lg:text-left leading-tight transform hover:scale-105 transition-transform duration-300">
          <Text className="hover:bg-white/50 hover:backdrop-blur-md mx-auto lg:mx-0 p-6 rounded-2xl max-w-3xl font-extrabold text-8xl md:text-6xl lg:text-4xl leading-snug hover:leading-relaxed transition-all duration-300">
            © 2024 BioNexus AI Technologies, Inc.
          </Text>
          <Text className="hover:bg-white/50 hover:backdrop-blur-md mx-auto lg:mx-0 p-6 rounded-2xl max-w-3xl font-extrabold text-2xl md:text-3xl lg:text-4xl leading-snug hover:leading-relaxed transition-all duration-300">
            Accelerating drug discovery through AI-powered healthcare research. Not for diagnostic or treatment purposes.
          </Text>
        </Stack>
      
        <HStack className="flex justify-center md:justify-end space-x-6 mt-4 md:mt-0 text-9xl text-purple-800 md:text-8xl">
          <Link href="https://github.com/harshitduggal1" className="hover:text-pink-600 transition">
            <FaGithub className="w-6 h-6" />
          </Link>
          <Link href="#" className="hover:text-pink-600 transition">
            <FaYoutube className="w-6 h-6" />
          </Link>
          <Link href="#" className="hover:text-pink-600 transition">
            <FaTwitter className="w-6 h-6" />
          </Link>
          <Link href="#" className="hover:text-pink-600 transition">
            <FaFacebook className="w-6 h-6" />
          </Link>
          <Link href="#" className="hover:text-pink-600 transition">
            <FaInstagram className="w-6 h-6" />
          </Link>
          <Link href="#" className="hover:text-pink-600 transition">
            <FaPinterest className="w-6 h-6" />
          </Link>
        </HStack>
      </Grid>

      <Image
        src={flare.src}
        alt="Flare effect"
        zIndex={1}
        width="100%"
        height="auto"
        position="absolute"
        bottom={0}
        left={0}
        right={0}
        style={{ mixBlendMode: "lighten" }}
      />
    </Box>
  );}

export default Footers;