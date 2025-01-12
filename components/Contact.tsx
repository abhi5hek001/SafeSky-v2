"use client";

import React, { useState } from 'react';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        comments: '',
    });

    const addressDetails = [
        {
            title: "Address:",
            lines: [
                "IIIT Sri City",
                "630, Gnan Marg Sri City",
                "Sathyavedu",
                "Andhra Pradesh",
                "Pin: 517646",
            ],
        },
        {
            title: "Phone:",
            lines: ["+91 96967 88599"],
        },
    ];

    // Form submission handler
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent the form from submitting normally

        const { name, email, phone, comments } = formData;

        // Create the mailto link
        const subject = 'User Feedback';
        const mailtoLink = `mailto:sahayabhishek.edu@gmail.com` +
            `?subject=${encodeURIComponent(subject)}` +
            `&body=${encodeURIComponent(comments)}` +
            `\n\nName: ${encodeURIComponent(name)}` +
            `\nEmail: ${encodeURIComponent(email)}` +
            `\nPhone: ${encodeURIComponent(phone)}`;

        // Open the default email client with prefilled data
        window.location.href = mailtoLink;
    };

    // Handle input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <section className="z-50 py-10 bg-white relative top-[125vh] w-full">
            <div className="flex flex-col justify-center">
                {/* Heading */}
                <div className="text-center">
                    <h2 className="text-4xl font-semibold tracking-wider text-green-500 p-1">
                        Contact Us
                    </h2>
                </div>

                {/* Content */}
                <div className="flex flex-wrap justify-between px-[5vw] md:px-[7vw] lg:px-[10vw] text-black">
                    {/* Address Section */}
                    <div>
                        {addressDetails.map((detail, index) => (
                            <div key={index} className="mb-6">
                                <h4 className="font-semibold text-lg">{detail.title}</h4>
                                <address className="text-sm text-gray-700">
                                    {detail.lines.map((line, idx) => (
                                        <span key={idx} className="block">
                                            {line}
                                        </span>
                                    ))}
                                </address>
                            </div>
                        ))}
                    </div>

                    {/* Form Section */}
                    <form id="contactfrm" onSubmit={handleSubmit} className="flex flex-col w-1/3 space-y-6">
                        <div>
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Enter Name"
                                title="Please enter your name (at least 2 characters)"
                            />
                        </div>
                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                type="email"
                                placeholder="Enter Email"
                                title="Please enter a valid email address"
                            />
                        </div>
                        <div>
                            <Label htmlFor="phone">Phone</Label>
                            <Input
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                type="tel"
                                placeholder="Enter Phone"
                                title="Please enter a valid phone number (at least 10 characters)"
                            />
                        </div>
                    </form>

                    {/* Comments Section */}
                    <div>
                        <div>
                            <Label htmlFor="comments">Comments</Label>
                            <Textarea
                                id="comments"
                                name="comments"
                                value={formData.comments}
                                onChange={handleInputChange}
                                placeholder="Enter your message…"
                                title="Please enter your message (at least 10 characters)"
                                rows={5}
                                cols={40}
                                className='mb-5'
                            />
                        </div>
                        <Button type="submit" form="contactfrm" className="w-1/2 bg-green-600">
                            Submit
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
