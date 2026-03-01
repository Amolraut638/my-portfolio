import { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState(null); // success | error
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
    setStatus(null);

    if (!validateForm()) return;

    setIsSending(true);

    const service_id = import.meta.env.VITE_SERVICE_ID;
    const template_id = import.meta.env.VITE_TEMPLATE_ID;
    const user_id = import.meta.env.VITE_PUBLIC_KEY;

    const data = {
      service_id,
      template_id,
      user_id,
      template_params: {
      name: formData.name,
      email: formData.email,
      message: formData.message,
},
    };

    try {
      const response = await fetch(
        "https://api.emailjs.com/api/v1.0/email/send",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) throw new Error("Failed to send");

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("error");
      console.error(err);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-24 bg-darkBg text-lightText scroll-mt-20"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">

        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold">
            Get In{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Touch
            </span>
          </h2>
          <p className="text-mutedText mt-4">
            Open to internships, collaborations, and exciting opportunities.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">

          {/* Left Info */}
          <div className="space-y-6">
            <p className="text-mutedText leading-relaxed">
              I am actively looking for internship and full-time opportunities.
              If you'd like to collaborate or discuss a project, feel free to
              reach out.
            </p>

            <div className="bg-darkCard p-6 rounded-xl border border-gray-800">
              <p className="text-sm text-mutedText">Location</p>
              <p className="font-medium text-lightText">
                Pune, Maharashtra, India
              </p>
            </div>

            <div className="bg-darkCard p-6 rounded-xl border border-gray-800">
              <p className="text-sm text-mutedText">Mobile</p>
              <p className="font-medium text-lightText">
                <a href="tel:+917666824989" className="hover:text-primary transition">
                  +91 7666824989
                </a>
              </p>
            </div>

            <div className="bg-darkCard p-6 rounded-xl border border-gray-800">
              <p className="text-sm text-mutedText">Email</p>
              <p className="font-medium text-lightText">
                <a href="mailto:amolraut1902@gmail.com" className="hover:text-primary transition">
                  amolraut1902@gmail.com
                </a>
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="bg-darkCard p-8 rounded-2xl border border-gray-800 shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">

              <div>
                <label className="block text-sm mb-2 text-mutedText">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="w-full bg-transparent border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition"
                />
              </div>

              <div>
                <label className="block text-sm mb-2 text-mutedText">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="w-full bg-transparent border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition"
                />
              </div>

              <div>
                <label className="block text-sm mb-2 text-mutedText">
                  Message
                </label>
                <textarea
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message..."
                  className="w-full bg-transparent border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition"
                ></textarea>
              </div>

              {error && (
                <p className="text-red-400 text-sm">{error}</p>
              )}

              {status === "success" && (
                <p className="text-green-400 text-sm">
                  Message sent successfully!
                </p>
              )}

              {status === "error" && (
                <p className="text-red-400 text-sm">
                  Something went wrong. Please try again.
                </p>
              )}

              <button
                type="submit"
                disabled={isSending}
                className="w-full bg-primary hover:bg-accent transition duration-300 py-3 rounded-lg font-medium shadow-glow disabled:opacity-60"
              >
                {isSending ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;