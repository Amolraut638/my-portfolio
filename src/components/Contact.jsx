import { useState } from "react";
import { FiMail, FiPhone, FiMapPin, FiSend } from "react-icons/fi";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.message) {
      setError("All fields are required.");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address.");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSending(true);
    setStatus(null);

    const data = {
      service_id: import.meta.env.VITE_SERVICE_ID,
      template_id: import.meta.env.VITE_TEMPLATE_ID,
      user_id: import.meta.env.VITE_PUBLIC_KEY,
      template_params: { ...formData },
    };

    try {
      const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed");
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("error");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-darkBg text-lightText scroll-mt-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* Background Glow */}
        <div className="absolute -top-24 -right-24 w-48 md:w-96 h-48 md:h-96 bg-primary/10 blur-[120px] rounded-full -z-10" />
        <div className="absolute -bottom-24 -left-24 w-48 md:w-96 h-48 md:h-96 bg-accent/10 blur-[120px] rounded-full -z-10" />

        {/* Heading */}
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            Get In{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Touch
            </span>
          </h2>

          {/* ✅ Underline Added */}
          <div className="h-1.5 w-12 bg-primary mx-auto mt-4 rounded-full opacity-40" />

          <p className="text-mutedText mt-3 sm:mt-4 max-w-lg mx-auto text-sm sm:text-base">
            Currently seeking new opportunities. Whether you have a question or just want to say hi, I'll get back to you!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-12 items-start">

          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            <ContactCard icon={<FiMail className="text-primary" />} label="Email" value="amolraut1902@gmail.com" link="mailto:amolraut1902@gmail.com" />
            <ContactCard icon={<FiPhone className="text-primary" />} label="Phone" value="+91 7666824989" link="tel:+917666824989" />
            <ContactCard icon={<FiMapPin className="text-primary" />} label="Location" value="Pune, Maharashtra, India" />
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="bg-darkCard/50 backdrop-blur-sm p-5 sm:p-8 rounded-3xl border border-gray-800 shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="your name"
                    className="w-full bg-darkBg/50 border border-gray-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary"
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="youremail@example.com"
                    className="w-full bg-darkBg/50 border border-gray-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary"
                  />
                </div>

                <textarea
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="type your message..."
                  className="w-full bg-darkBg/50 border border-gray-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary resize-none"
                />

                {error && <p className="text-red-400 text-sm">{error}</p>}
                {status === "success" && <p className="text-green-400 text-sm">Message sent!</p>}
                {status === "error" && <p className="text-red-400 text-sm">Something went wrong.</p>}

                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full bg-primary hover:bg-accent text-white py-3 rounded-xl font-bold transition"
                >
                  {isSending ? "Sending..." : "Send Message"}
                </button>

              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

function ContactCard({ icon, label, value, link }) {
  return (
    <div className="group bg-darkCard/30 p-4 rounded-2xl border border-gray-800 flex items-center gap-4">
      <div className="w-10 h-10 bg-darkBg rounded-xl flex items-center justify-center border border-gray-800">
        {icon}
      </div>
      <div>
        <p className="text-xs text-mutedText">{label}</p>
        {link ? <a href={link}>{value}</a> : <p>{value}</p>}
      </div>
    </div>
  );
}

export default Contact;