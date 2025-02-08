"use client";

import React from "react";

const GeneralPolicy = () => {
  const policies = [
    {
      title: "Privacy Policy",
      content: `
        We respect your privacy and are committed to protecting your personal data. 
        This policy outlines how we collect, use, and store your information. By using 
        our platform, you consent to the data practices described in this policy.`,
    },
    {
      title: "Terms of Service",
      content: `
        By using our platform, you agree to abide by the terms and conditions set forth. 
        Any misuse or violation of these terms may result in restricted access to our services.`,
    },
    {
      title: "Policy 3",
      content: ``,
    },
    {
      title: " Policy 4",
      content: ``,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Header */}
      <header className="bg-white shadow p-6 rounded-lg mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800">General Policy</h1>
        <p className="text-gray-600 mt-2">
          Learn about our policies regarding privacy, terms of use, refunds, and more.
        </p>
      </header>

      {/* 2x2 Grid for Policies */}
      <main className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {policies.map((policy, index) => (
          <section
            key={index}
            className="bg-white shadow p-6 rounded-lg border border-gray-200"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              {policy.title}
            </h2>
            <p className="text-gray-700">{policy.content}</p>
          </section>
        ))}
      </main>

      {/* Footer */}
      <footer className="mt-16 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Your Company Name. All Rights Reserved.
      </footer>
    </div>
  );
};

export default GeneralPolicy;
