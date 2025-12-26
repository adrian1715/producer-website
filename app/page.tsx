"use client";

import { useState, useEffect } from "react";

export default function ProducerLanding() {
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);
  const [stats, setStats] = useState({
    users: 0,
    blocksCount: 0,
    focusHours: 0,
    rating: 0,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    document.querySelectorAll(".fade-in").forEach((el) => {
      observer.observe(el);
    });

    const statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateStats();
            statsObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    const statsSection = document.getElementById("stats-section");
    if (statsSection) {
      statsObserver.observe(statsSection);
    }

    return () => {
      observer.disconnect();
      statsObserver.disconnect();
    };
  }, []);

  const animateStats = () => {
    const targets = {
      users: 10000,
      blocksCount: 2500000,
      focusHours: 150000,
      rating: 4.9,
    };

    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setStats({
        users: Math.floor(targets.users * progress),
        blocksCount: Math.floor(targets.blocksCount * progress),
        focusHours: Math.floor(targets.focusHours * progress),
        rating: parseFloat((targets.rating * progress).toFixed(1)),
      });

      if (currentStep >= steps) {
        clearInterval(interval);
        setStats(targets);
      }
    }, stepDuration);
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M+";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(num >= 10000 ? 0 : 1) + "K+";
    }
    return num.toString();
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const toggleFAQ = (index: number) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  const faqs = [
    {
      question: "How is Producer different from other website blockers?",
      answer:
        "Most blockers are rigid: they block entire websites or nothing. Producer offers granular control—block YouTube's homepage but allow educational playlists, block Reddit except study subreddits, or allow specific URL parameters. It's intelligent control over your digital environment.",
    },
    {
      question:
        "Can I really access educational content while blocking entertainment on the same site?",
      answer:
        "Yes! This is Producer's core innovation. Using our URL parameter filtering and allow-list system, you can block youtube.com/trending but allow your study playlists. #BeProducer and take control of your focus.",
    },
    {
      question: "Can I use Producer for free forever?",
      answer:
        "Yes! The core features—focus timer, smart blocking, URL filtering, and basic stats—are completely free forever at beproducer.app. Premium adds advanced analytics and insights for power users.",
    },
    {
      question: "Is Producer good for students who need to do online research?",
      answer:
        "Absolutely. You can access Google Scholar, Wikipedia, Khan Academy, and educational YouTube channels while blocking social media and entertainment feeds. Producer understands you need the internet for learning.",
    },
    {
      question: "Can remote workers use Producer for time tracking?",
      answer:
        "Yes! Producer's focus timer tracks your productive sessions, making it easy to log billable hours and create project-based modes for different clients. Visit beproducer.app to get started.",
    },
    {
      question: "Will Producer help creative professionals?",
      answer:
        "That's exactly what we built it for. Access design portfolios and tutorials while blocking infinite scroll feeds that destroy flow states. Producer is your creative companion.",
    },
  ];

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        minHeight: "100vh",
        color: "#fff",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif',
      }}
    >
      {/* Navigation */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          width: "100%",
          padding: "20px 5%",
          background: "rgba(0, 0, 0, 0.8)",
          backdropFilter: "blur(10px)",
          zIndex: 1000,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid rgba(102, 126, 234, 0.3)",
        }}
      >
        <button
          onClick={() => scrollToSection("home")}
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          <img
            src="producer-logo.png"
            alt="Producer Logo"
            style={{ height: "40px" }}
          />
        </button>
        <div style={{ display: "flex", gap: "30px", alignItems: "center" }}>
          <button
            onClick={() => scrollToSection("features")}
            style={{
              color: "#fff",
              cursor: "pointer",
              fontSize: "14px",
              background: "none",
              border: "none",
              fontWeight: 500,
              opacity: 0.9,
            }}
          >
            Features
          </button>
          <button
            onClick={() => scrollToSection("pricing")}
            style={{
              color: "#fff",
              cursor: "pointer",
              fontSize: "14px",
              background: "none",
              border: "none",
              fontWeight: 500,
              opacity: 0.9,
            }}
          >
            Pricing
          </button>
          <a
            href="https://chrome.google.com/webstore"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "#fff",
              padding: "10px 24px",
              borderRadius: "25px",
              textDecoration: "none",
              fontWeight: 600,
              boxShadow: "0 2px 10px rgba(102, 126, 234, 0.5)",
            }}
          >
            Get Extension
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "120px 5% 80px",
          position: "relative",
        }}
      >
        <div style={{ maxWidth: "800px", position: "relative", zIndex: 1 }}>
          <h1
            style={{
              fontSize: "64px",
              fontWeight: 800,
              marginBottom: "20px",
              lineHeight: 1.2,
              color: "#fff",
              textShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
            }}
          >
            Master Your Focus.
            <br />
            Transform Your Work.
          </h1>
          <p
            style={{
              fontSize: "20px",
              opacity: 0.95,
              marginBottom: "20px",
              lineHeight: 1.6,
            }}
          >
            The smart website blocker that understands nuance. Producer helps
            you block distractions, stay focused, and achieve deep work. Not
            just another blocker — it's your productivity companion.
          </p>
          <p
            style={{
              fontSize: "24px",
              fontWeight: 600,
              marginBottom: "40px",
              color: "#fff",
              textShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
            }}
          >
            Join the movement. #BeProducer
          </p>
          <div
            style={{
              display: "flex",
              gap: "20px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <a
              href="https://chrome.google.com/webstore"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "rgba(255, 255, 255, 0.95)",
                color: "#667eea",
                padding: "16px 40px",
                borderRadius: "30px",
                textDecoration: "none",
                fontWeight: 600,
                fontSize: "18px",
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
                transition: "all 0.3s ease",
              }}
            >
              Add to Chrome - It's Free
            </a>
            <button
              onClick={() => scrollToSection("features")}
              style={{
                background: "rgba(255, 255, 255, 0.2)",
                color: "#fff",
                padding: "16px 40px",
                borderRadius: "30px",
                fontWeight: 600,
                fontSize: "18px",
                border: "2px solid rgba(255, 255, 255, 0.3)",
                cursor: "pointer",
                backdropFilter: "blur(10px)",
              }}
            >
              See How It Works
            </button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" style={{ padding: "100px 5%" }}>
        <div style={{ textAlign: "center", marginBottom: "80px" }}>
          <h2
            style={{
              fontSize: "48px",
              fontWeight: 700,
              marginBottom: "20px",
              color: "#fff",
              textShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
            }}
          >
            Not Just Another Blocker
          </h2>
          <p style={{ fontSize: "18px", opacity: 0.95 }}>
            Producer understands that modern work requires internet access
          </p>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "40px",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          {[
            {
              icon: "🎯",
              title: "Selective Blocking",
              desc: "Block YouTube's homepage but allow educational playlists. This is what makes Producer different.",
            },
            {
              icon: "🔗",
              title: "URL Parameter Control",
              desc: "Allow only videos in your 'Watch Later' playlist. Fine-tune access for ultimate precision.",
            },
            {
              icon: "⏱️",
              title: "Focus Sessions",
              desc: "Track productive time and build better work habits. Perfect for billing hours and productivity tracking.",
            },
            {
              icon: "📊",
              title: "Real-Time Analytics",
              desc: "Monitor blocked attempts and understand your distraction patterns with detailed insights.",
            },
            {
              icon: "🎨",
              title: "Project-Based Modes",
              desc: "Create different blocking profiles for different work types. Switch between modes instantly.",
            },
            {
              icon: "⚡",
              title: "Instant Control",
              desc: "One-click activation. Import/export rules. Motivational block pages. Total control at your fingertips.",
            },
          ].map((feature, i) => (
            <div
              key={i}
              style={{
                background: "rgba(255, 255, 255, 0.15)",
                border: "2px solid rgba(255, 255, 255, 0.25)",
                borderRadius: "20px",
                padding: "40px",
                transition: "all 0.3s ease",
                backdropFilter: "blur(10px)",
              }}
            >
              <span
                style={{
                  fontSize: "48px",
                  display: "block",
                  marginBottom: "20px",
                }}
              >
                {feature.icon}
              </span>
              <h3 style={{ fontSize: "24px", marginBottom: "15px" }}>
                {feature.title}
              </h3>
              <p style={{ opacity: 0.7, lineHeight: 1.6 }}>{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section
        id="stats-section"
        style={{
          padding: "80px 5%",
          background: "rgba(0, 0, 0, 0.2)",
          backdropFilter: "blur(10px)",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "40px",
            maxWidth: "1200px",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          {[
            { value: formatNumber(stats.users), label: "Active Users" },
            {
              value: formatNumber(stats.blocksCount),
              label: "Distractions Blocked",
            },
            { value: formatNumber(stats.focusHours), label: "Focus Hours" },
            {
              value:
                stats.rating > 0 ? `${stats.rating.toFixed(1)}/5` : "0.0/5",
              label: "Rating",
            },
          ].map((stat, i) => (
            <div key={i} style={{ padding: "20px" }}>
              <div
                style={{
                  fontSize: "48px",
                  fontWeight: 800,
                  color: "#fff",
                  textShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
                  marginBottom: "10px",
                }}
              >
                {stat.value}
              </div>
              <div style={{ fontSize: "16px", opacity: 0.7 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section
        id="pricing"
        style={{
          padding: "100px 5%",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "80px" }}>
          <h2
            style={{
              fontSize: "48px",
              fontWeight: 700,
              marginBottom: "20px",
              color: "#fff",
              textShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
            }}
          >
            Simple Pricing
          </h2>
          <p style={{ fontSize: "18px", opacity: 0.95 }}>
            Start free. Upgrade when ready.
          </p>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "40px",
            maxWidth: "1000px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              background: "rgba(0, 0, 0, 0.4)",
              border: "2px solid rgba(255, 255, 255, 0.15)",
              borderRadius: "20px",
              padding: "50px 40px",
              textAlign: "center",
              backdropFilter: "blur(10px)",
            }}
          >
            <div
              style={{
                fontSize: "24px",
                fontWeight: 600,
                marginBottom: "10px",
                color: "#fff",
              }}
            >
              Free
            </div>
            <div
              style={{
                fontSize: "48px",
                fontWeight: 800,
                marginBottom: "10px",
                color: "#fff",
                textShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
              }}
            >
              $0
            </div>
            <div style={{ opacity: 0.7, marginBottom: "30px", color: "#fff" }}>
              Forever
            </div>
            <ul
              style={{
                listStyle: "none",
                marginBottom: "40px",
                textAlign: "left",
              }}
            >
              {[
                "Focus Mode & Timer",
                "Smart URL Blocking",
                "Parameter Filtering",
                "Basic Stats",
                "Import/Export",
              ].map((f, i) => (
                <li
                  key={i}
                  style={{
                    padding: "12px 0",
                    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                    color: "#fff",
                    opacity: 0.9,
                  }}
                >
                  ✓ {f}
                </li>
              ))}
            </ul>
            <a
              href="https://chrome.google.com/webstore"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "block",
                width: "100%",
                padding: "15px",
                borderRadius: "25px",
                border: "2px solid rgba(255, 255, 255, 0.2)",
                fontWeight: 600,
                background: "rgba(255, 255, 255, 0.1)",
                color: "#fff",
                cursor: "pointer",
                textDecoration: "none",
              }}
            >
              Get Extension
            </a>
          </div>

          <div
            style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              border: "none",
              borderRadius: "20px",
              padding: "50px 40px",
              textAlign: "center",
              transform: "scale(1.05)",
              boxShadow: "0 8px 30px rgba(102, 126, 234, 0.4)",
              color: "#fff",
            }}
          >
            <div
              style={{
                fontSize: "24px",
                fontWeight: 600,
                marginBottom: "10px",
              }}
            >
              Premium
            </div>
            <div
              style={{
                fontSize: "48px",
                fontWeight: 800,
                marginBottom: "10px",
                color: "#fff",
                textShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
              }}
            >
              $4.99
            </div>
            <div style={{ opacity: 0.9, marginBottom: "30px" }}>per month</div>
            <ul
              style={{
                listStyle: "none",
                marginBottom: "40px",
                textAlign: "left",
              }}
            >
              {[
                "Everything in Free",
                "Advanced Analytics",
                "Productivity Insights",
                "Focus History",
                "Project Modes",
                "Cloud Sync",
                "Priority Support",
              ].map((f, i) => (
                <li
                  key={i}
                  style={{
                    padding: "12px 0",
                    borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
                    color: "#fff",
                  }}
                >
                  ✓ {f}
                </li>
              ))}
            </ul>
            <a
              href="https://chrome.google.com/webstore"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "block",
                width: "100%",
                padding: "15px",
                borderRadius: "25px",
                border: "none",
                fontWeight: 600,
                background: "rgba(255, 255, 255, 0.95)",
                color: "#667eea",
                cursor: "pointer",
                textDecoration: "none",
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)",
              }}
            >
              Get Premium
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        style={{
          padding: "100px 5%",
          background: "rgba(0, 0, 0, 0.15)",
          backdropFilter: "blur(10px)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "80px" }}>
          <h2
            style={{
              fontSize: "48px",
              fontWeight: 700,
              marginBottom: "20px",
              color: "#fff",
              textShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
            }}
          >
            FAQ
          </h2>
          <p style={{ fontSize: "18px", opacity: 0.95 }}>
            Everything you need to know about Producer
          </p>
        </div>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          {faqs.map((faq, i) => (
            <div
              key={i}
              onClick={() => toggleFAQ(i)}
              style={{
                background: "rgba(255, 255, 255, 0.15)",
                border: "2px solid rgba(255, 255, 255, 0.25)",
                borderRadius: "15px",
                padding: "30px",
                marginBottom: "20px",
                cursor: "pointer",
                transition: "all 0.3s ease",
                backdropFilter: "blur(10px)",
              }}
            >
              <div
                style={{
                  fontSize: "18px",
                  fontWeight: 600,
                  marginBottom: activeFAQ === i ? "15px" : "0",
                }}
              >
                {faq.question}
              </div>
              {activeFAQ === i && (
                <div style={{ opacity: 0.7, lineHeight: 1.7 }}>
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "100px 5%", textAlign: "center" }}>
        <h2
          style={{
            fontSize: "48px",
            fontWeight: 700,
            marginBottom: "20px",
            color: "#fff",
            textShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
          }}
        >
          Ready to Take Control?
        </h2>
        <p style={{ fontSize: "20px", opacity: 0.95, marginBottom: "15px" }}>
          Join thousands transforming their productivity with Producer
        </p>
        <p
          style={{
            fontSize: "26px",
            fontWeight: 600,
            marginBottom: "40px",
            color: "#fff",
            textShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
          }}
        >
          #BeProducer
        </p>
        <a
          href="https://chrome.google.com/webstore"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            background: "rgba(255, 255, 255, 0.95)",
            color: "#667eea",
            padding: "18px 48px",
            borderRadius: "30px",
            textDecoration: "none",
            fontWeight: 600,
            fontSize: "18px",
            display: "inline-block",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
          }}
        >
          Add to Chrome - It's Free
        </a>
      </section>

      {/* Footer */}
      <footer
        style={{
          padding: "60px 5%",
          background: "rgba(255, 255, 255, 0.1)",
          borderTop: "2px solid rgba(255, 255, 255, 0.3)",
          textAlign: "center",
          backdropFilter: "blur(10px)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "30px",
            marginBottom: "30px",
            flexWrap: "wrap",
          }}
        >
          {["Privacy", "Terms", "Support", "Contact", "Blog"].map((link, i) => (
            <a
              key={i}
              href="#"
              style={{ color: "#fff", textDecoration: "none", opacity: 0.7 }}
            >
              {link}
            </a>
          ))}
        </div>
        <p style={{ opacity: 0.8, fontSize: "14px" }}>
          © 2025 Producer | beproducer.app | Built with focus. #BeProducer
        </p>
      </footer>
    </div>
  );
}
