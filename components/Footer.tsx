"use client";

import React from "react";
import { FaEnvelope, FaGithub, FaHome, FaLinkedin, FaPhone } from "react-icons/fa";

export default function Footer() {
    const socialLinks = [
        { href: "https://www.linkedin.com/in/abhi5hek001/", icon: <FaLinkedin className="h-5 w-5 text-green-600" /> },
        { href: "mailto:sahayabhishek.edu@gmail.com", icon: <FaEnvelope className="h-5 w-5 text-green-600" /> },
        { href: "https://github.com/abhi5hek001", icon: <FaGithub className="h-5 w-5 text-green-600" /> },
    ];

    const contactInfo = [
        { icon: <FaPhone className="h-5 w-5 mx-2" />, text: "+91 96967 88599" },
        { icon: <FaEnvelope className="h-5 w-5 mx-2" />, text: "sahayabhishek.edu@gmail.com", href: "mailto:sahayabhishek.edu@gmail.com" },
        { icon: <FaHome className="h-5 w-5 mx-2" />, text: (<>IIIT Sri City, 630, Gnan Marg Sri City, Sathyavedu,<br /> Andhra Pradesh, 517646 </>) },
    ];

    return (
        <footer className="z-50 text-white opacity-80 relative top-[125vh] w-[100%] h-auto py-10">
            <div className="flex flex-wrap flex-col">
                <div className="flex flex-wrap justify-around">
                    <div>
                        <a>
                            <h4 className="text-2xl text-green-600">SafeSky</h4>
                        </a>
                        <p className="w-96 text-gray-300">
                            Led by multidisciplinary undergraduates, SafeSky revolutionizes aerial hazard monitoring,
                            enforcing industry safety standards. This innovative software sets benchmarks for safety
                            protocols, ensuring regulatory compliance and a secure operational landscape, redefining
                            safety in diverse industries.
                        </p>
                        <ul className="socialIcons flex gap-2 py-4">
                            {socialLinks.map((link, index) => (
                                <li key={index}>
                                    <a href={link.href} target="_blank" rel="noopener noreferrer">
                                        {link.icon}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="col-md-4 contact float-right">
                        <h4 className="text-xl mb-5">Contact Info</h4>
                        <p className="text-lg mb-3">IIIT Sri City, Chittoor</p>
                        <ul className="flex flex-col gap-2">
                            {contactInfo.map((item, index) => (
                                <li key={index} className="flex gap-2">
                                    {item.icon}
                                    {item.href ? (
                                        <a href={item.href}>{item.text}</a>
                                    ) : (
                                        item.text
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="flex justify-start items-end pt-10">
                <div className="text-sm mx-5">Copyright © 2025 All Rights Reserved by Team Vishist</div>
            </div>
        </footer>
    );
}
