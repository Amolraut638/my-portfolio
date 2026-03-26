import { useState } from "react";
import { FiMail, FiPhone, FiMapPin, FiSend, FiGithub, FiLinkedin } from "react-icons/fi";

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
    <section id="contact" className="py-24 bg-darkBg text-lightText scroll-mt-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative">
        
        {/* Decorative Background Glows */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 blur-[120px] rounded-full -z-10" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-accent/10 blur-[120px] rounded-full -z-10" />

        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Get In <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Touch</span>
          </h2>
          <p className="text-mutedText mt-4 max-w-lg mx-auto">
            Currently seeking new opportunities. Whether you have a question or just want to say hi, I’ll get back to you!
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          
          {/* Left Side: Contact Info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-6">
              <ContactCard 
                icon={<FiMail className="text-primary" />} 
                label="Email" 
                value="amolraut1902@gmail.com" 
                link="mailto:amolraut1902@gmail.com"
              />
              <ContactCard 
                icon={<FiPhone className="text-primary" />} 
                label="Phone" 
                value="+91 7666824989" 
                link="tel:+917666824989"
              />
              <ContactCard 
                icon={<FiMapPin className="text-primary" />} 
                label="Location" 
                value="Pune, Maharashtra, India" 
              />
            </div>

            {/* Quick Socials */}
          {/*
            <div className="pt-6 border-t border-gray-800">
              <p className="text-sm text-mutedText mb-4">Follow me on</p>
              <div className="flex gap-4">
                <a href="https://github.com" className="p-3 bg-darkCard border border-gray-800 rounded-lg hover:border-primary transition-colors text-xl"><FiGithub /></a>
                <a href="https://linkedin.com" className="p-3 bg-darkCard border border-gray-800 rounded-lg hover:border-primary transition-colors text-xl"><FiLinkedin /></a>
              </div>
            </div> 
          */}

          </div>

          {/* Right Side: Form */}
          <div className="lg:col-span-3">
            <div className="bg-darkCard/50 backdrop-blur-sm p-8 rounded-3xl border border-gray-800 shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-mutedText ml-1">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="your name"
                      className="w-full bg-darkBg/50 border border-gray-700 rounded-xl px-4 py-3.5 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-gray-600"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-mutedText ml-1">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="youremail@example.com"
                      className="w-full bg-darkBg/50 border border-gray-700 rounded-xl px-4 py-3.5 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-gray-600"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-mutedText ml-1">Message</label>
                  <textarea
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="type your message to me ..."
                    className="w-full bg-darkBg/50 border border-gray-700 rounded-xl px-4 py-3.5 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-gray-600 resize-none"
                  ></textarea>
                </div>

                {error && <p className="text-red-400 text-sm animate-pulse">{error}</p>}
                {status === "success" && <p className="text-green-400 text-sm font-medium">Message sent successfully!</p>}
                {status === "error" && <p className="text-red-400 text-sm">Something went wrong. Please try again.</p>}

                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full group bg-primary hover:bg-accent text-white py-4 rounded-xl font-bold transition-all duration-300 shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)] disabled:opacity-50 flex items-center justify-center gap-2 overflow-hidden relative"
                >
                  <span className={`transition-all duration-300 ${isSending ? 'translate-y-10' : ''}`}>
                    Send Message
                  </span>
                  <FiSend className={`transition-all duration-300 ${isSending ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} absolute`} />
                  {isSending && <span>Sending...</span>}
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
    <div className="group bg-darkCard/30 p-5 rounded-2xl border border-gray-800 hover:border-primary/50 transition-all duration-300 flex items-center gap-5">
      <div className="w-12 h-12 bg-darkBg rounded-xl flex items-center justify-center text-xl border border-gray-800 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <div>
        <p className="text-xs text-mutedText uppercase tracking-widest font-semibold mb-1">{label}</p>
        {link ? (
          <a href={link} className="text-lightText font-medium hover:text-primary transition-colors">{value}</a>
        ) : (
          <p className="text-lightText font-medium">{value}</p>
        )}
      </div>
    </div>
  );
}

export default Contact;