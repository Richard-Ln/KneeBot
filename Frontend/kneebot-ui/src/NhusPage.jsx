import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import exerciseData from './ExerciseData.json';

// Flatten the JSON data to easily search for image URLs
const allExercises = [
  ...(exerciseData.stretch || []),
  ...(exerciseData.strength || []),
  ...(exerciseData.other || [])
];

// Helper function to dynamically find an image URL based on a keyword
const getExerciseImage = (keyword) => {
  const match = allExercises.find(ex => ex.name.toLowerCase().includes(keyword.toLowerCase()));
  return match ? match.image : "YOUR_MISSING_IMAGE_URL";
};

const C = {
  navy900: "#0a1628", navy800: "#0d1f3c", navy700: "#102952", navy600: "#1a3a6b",
  navy500: "#1e4a8a", navy400: "#2563b0", navy300: "#4a80c4", navy200: "#93b8e0",
  navy100: "#cfe0f3", navy50:  "#e8f1fa", accent:  "#3b82f6", accentLight: "#dbeafe",
  gold:    "#f59e0b", goldLight: "#fef3c7", goldDark: "#92400e", white:   "#ffffff",
  gray50:  "#f8fafc", gray100: "#f1f5f9", gray200: "#e2e8f0", gray500: "#64748b",
  gray700: "#334155", warn:    "#fef3c7", warnText:"#92400e",
};

const IMAGES = {
  hero: "/knee-banner.jpg",
  otc: {
    ibuprofen:     "/images/Ibuprofen.jpg",
    naproxen:      "/images/Naproxen.jpg",
    acetaminophen: "/images/Tylenol.jpg",
    voltaren:      "/images/Voltaren.jpg",
    capsaicin:     "/images/Capsaicin.jpg",
  },
  exercises: {
    walking:    getExerciseImage("walking"),
    swimming:   getExerciseImage("swimming"),
    straightLeg:getExerciseImage("straight-leg"),
    calfStretch:getExerciseImage("calf"),
    figure4:    getExerciseImage("figure 4"),
  },
};

const S = {
  root: { fontFamily: "'Open Sans', 'Segoe UI', sans-serif", fontSize: "18px", lineHeight: "1.8", color: C.gray700, width: "100%", minHeight: "100vh", background: C.gray50 },
  nav: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 48px", height: "68px", background: C.navy800, flexWrap: "wrap", gap: "10px", width: "100%", boxSizing: "border-box", position: "sticky", top: 0, zIndex: 100 },
  navLogo: { fontFamily: "'Merriweather', Georgia, serif", fontSize: "24px", fontWeight: "700", color: C.white, letterSpacing: "0.02em", cursor: "pointer" },
  navLinks: { display: "flex", gap: "4px", flexWrap: "wrap" },
  navBtn: (active) => ({ background: active ? C.navy500 : "transparent", border: "none", color: active ? C.white : C.navy200, fontSize: "16px", fontWeight: "600", padding: "8px 18px", borderRadius: "8px", cursor: "pointer", fontFamily: "inherit", transition: "background 0.15s, color 0.15s" }),
  heroWithImg: { background: C.navy700, width: "100%", boxSizing: "border-box", position: "relative", overflow: "hidden", textAlign: "center" },
  heroImg: { width: "100%", maxHeight: "420px", objectFit: "cover", display: "block", opacity: 0.45 },
  heroOverlay: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "3rem 48px" },
  hero: { background: C.navy700, padding: "5rem 48px 4rem", textAlign: "center", width: "100%", boxSizing: "border-box" },
  heroImgPlaceholder: { width: "100%", height: "200px", background: C.navy600, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "15px", color: C.navy200, letterSpacing: "0.04em", borderBottom: `2px dashed ${C.navy400}` },
  heroH1: { fontFamily: "'Merriweather', Georgia, serif", fontSize: "2.8rem", fontWeight: "700", color: C.white, lineHeight: "1.25", marginBottom: "1rem" },
  heroP: { fontSize: "20px", color: C.navy100, maxWidth: "600px", margin: "0 auto 2rem", lineHeight: "1.7" },
  primaryBtn: { background: C.accent, color: C.white, border: "none", borderRadius: "12px", padding: "16px 36px", fontSize: "18px", fontWeight: "700", cursor: "pointer", fontFamily: "inherit", transition: "background 0.2s, box-shadow 0.2s, transform 0.1s" },
  showMoreBtn: { background: C.gray50, color: C.navy600, border: `2px solid ${C.navy300}`, borderRadius: "10px", padding: "12px 28px", fontSize: "16px", fontWeight: "700", cursor: "pointer", fontFamily: "inherit", marginBottom: "2rem", display: "block", width: "100%", transition: "background 0.15s, border-color 0.15s, box-shadow 0.15s, transform 0.1s" },
  page: { width: "100%", boxSizing: "border-box" },
  inner: { maxWidth: "1200px", margin: "0 auto", padding: "3rem 48px", boxSizing: "border-box" },
  sectionTitle: { fontFamily: "'Merriweather', Georgia, serif", fontSize: "1.6rem", fontWeight: "700", color: C.navy800, marginBottom: "1.25rem", paddingBottom: "0.6rem", borderBottom: `3px solid ${C.navy300}` },
  cardsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginBottom: "1.25rem" },
  card: { background: C.white, border: `1px solid ${C.gray200}`, borderRadius: "14px", overflow: "hidden", transition: "border-color 0.2s, box-shadow 0.2s", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" },
  cardImg: { width: "100%", height: "140px", objectFit: "cover", display: "block" },
  cardImgPlaceholder: { width: "100%", height: "140px", background: C.navy50, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontSize: "12px", color: C.navy300, borderBottom: `1px solid ${C.gray200}`, gap: "6px" },
  cardBody: { padding: "1.25rem 1.25rem 1.5rem" },
  cardIcon: { fontSize: "30px", marginBottom: "0.75rem", display: "block" },
  cardH3: { fontSize: "17px", fontWeight: "700", marginBottom: "0.4rem", color: C.navy800 },
  cardP: { fontSize: "15px", color: C.gray500, lineHeight: "1.6" },
  tag: (bg, color) => ({ display: "inline-block", fontSize: "13px", fontWeight: "700", padding: "3px 10px", borderRadius: "20px", marginTop: "0.6rem", background: bg, color: color }),
  quizBanner: { background: C.navy800, borderRadius: "16px", padding: "2rem 2.5rem", display: "flex", alignItems: "center", gap: "2rem", marginBottom: "3rem", flexWrap: "wrap" },
  divider: { border: "none", borderTop: `2px solid ${C.gray200}`, margin: "0" },
  aboutSection: { background: C.white, width: "100%", boxSizing: "border-box" },
  aboutGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px", marginBottom: "2.5rem" },
  aboutBox: { background: C.navy50, border: `1px solid ${C.navy100}`, borderRadius: "14px", padding: "1.5rem" },
  aboutBoxH3: { fontFamily: "'Merriweather', Georgia, serif", fontSize: "1.1rem", fontWeight: "700", marginBottom: "0.6rem", color: C.navy700 },
  exList: { display: "flex", flexDirection: "column", gap: "14px", marginBottom: "2.5rem" },
  exItem: { background: C.white, border: `1px solid ${C.gray200}`, borderRadius: "12px", padding: "1.1rem 1.5rem", display: "flex", gap: "1rem", alignItems: "flex-start", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" },
  exNum: { background: C.navy600, color: C.white, fontSize: "15px", fontWeight: "700", width: "34px", height: "34px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "3px" },
  contactSection: { background: C.gray50, width: "100%", boxSizing: "border-box" },
  contactGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px", marginBottom: "2rem" },
  contactForm: { background: C.white, border: `1px solid ${C.gray200}`, borderRadius: "14px", padding: "2rem", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" },
  fieldLabel: { display: "block", fontSize: "17px", fontWeight: "600", marginBottom: "6px", color: C.navy800 },
  fieldInput: { width: "100%", fontSize: "17px", padding: "12px 14px", border: `1px solid ${C.gray200}`, borderRadius: "8px", background: C.gray50, color: C.gray700, fontFamily: "inherit", marginBottom: "1.25rem", boxSizing: "border-box", transition: "border-color 0.15s, box-shadow 0.15s" },
  contactInfo: { background: C.navy800, borderRadius: "14px", padding: "2rem", display: "flex", flexDirection: "column", gap: "1.5rem" },
  infoLabel: { fontSize: "13px", color: C.navy200, fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: "2px" },
  infoVal: { fontSize: "17px", color: C.white },
  disclaimer: { textAlign: "center", fontSize: "14px", color: C.gray500, padding: "1.5rem 48px", borderTop: `1px solid ${C.gray200}`, marginTop: "1rem", background: C.white },
  successBox: { background: C.navy50, border: `1px solid ${C.navy200}`, borderRadius: "12px", padding: "2rem", textAlign: "center" },
  backBtn: { background: "none", border: `2px solid ${C.navy400}`, borderRadius: "8px", color: C.navy600, fontSize: "16px", fontWeight: "600", padding: "8px 20px", cursor: "pointer", marginBottom: "1.75rem", fontFamily: "inherit", transition: "background 0.15s, transform 0.1s" }
};

const questions = [
  { id: 'Age',        text: 'What is your age?',                                    type: 'number',   placeholder: 'e.g. 65' },
  { id: 'Height',     text: 'What is your height in inches?',                       type: 'number',   placeholder: 'e.g. 64' },
  { id: 'Weight',     text: 'What is your weight in pounds?',                       type: 'number',   placeholder: 'e.g. 180' },
  { id: 'Gender',     text: 'What is your gender?',                                 type: 'choice',   options: ['Male', 'Female', 'Prefer not to say'] },
  { id: 'Education',  text: 'What is your highest level of education?',             type: 'choice',   options: ["Associate's Degree", "Bachelor's Degree", "Doctorate Degree", "Master's Degree", "Prefer not to say", "Regular high school diploma, GED or alternative credential", "Some college credit, but less than 1 year of college", "Trade/technical/vocational school certification", "one or more years of college credit", "no degree"] },
  { id: 'Employment', text: 'What is your current employment status?',              type: 'choice',   options: ['Employed Full-Time', 'Employed Part-Time', 'Prefer not to say', 'Retired', 'Seeking Opportunities'] },
  { id: 'Income',     text: 'What is your approximate annual income?',              type: 'choice',   options: ['$120,000 - $149,999', '$150,000 - $179,999', '$30,000 - $59,999', '$60,000 - $89,999', '$90,000 - $119,999', 'Less than $29,999', 'More than $180,000', 'Prefer not to say'] },
  { id: 'Ethnicity',  text: 'Are you of Hispanic, Latino, or Spanish origin?',     type: 'choice',   options: ['No', 'Yes'] },
  { id: 'Race',       text: 'What is your race?',                                  type: 'checkbox', options: ['American Indian or Alaska Native', 'Asian', 'Black or African American', 'Native Hawaiian or Pacific Islander', 'Prefer not to say', 'White'] },
  { id: 'MedBackgrnd',text: 'Do you have a family history of joint pain?',         type: 'checkbox', options: ['I had surgery or hospitalization that might be related to my knee pain in the past 10 years. Please specify:', 'I have a medical history related to orthopedics. Please specify:', 'None of the above.', 'Someone in my family has a medical history related to joint pain.', 'Something related to my home life (such as using stairs all the time and strenuous housework) may have caused my knee joint pain. Please specify', 'Something related to my job may have caused my knee joint pain. Please specify:'] },
  { id: 'Industry',   text: 'If employed, what industry do you work in?',          type: 'checkbox', options: ['Accounting', 'Advertising', 'Agriculture/Fishing', 'Architecture', 'Automotive', 'Banking/Financial', 'Brokerage', 'Chemicals/Plastics/Rubber', 'Communications/Information', 'Construction', 'Consulting', 'Consumer Electronics', 'Consumer Packaged Goods', 'Education', 'Energy/Utilities/Oil and Gas', 'Engineering', 'Fashion/Apparel', 'Food/Beverage', 'Government/Public Sector', 'Healthcare', 'Hospitality/Tourism', 'Human Resources', 'Information Technology (IT)', 'Insurance', 'Legal/Law', 'Manufacturing', 'Marketing', 'Media/Entertainment', 'Military', 'Non Profit/Social services', 'Not Applicable', 'Personal Services', 'Printing Publishing', 'Real Estate/Property', 'Retail/Wholesale trade', 'Sales', 'Security', 'Shipping/Distribution', 'Telecommunications', 'Transportation'] },
  { id: 'Department', text: 'What is your primary department?',                    type: 'checkbox', options: ['Administration/General Staff', 'Creative/Design', 'Customer Service/Client Service', 'Executive Leadership', 'Finance/Accounting', 'Human Resources', 'Legal/Law', 'Logistics/Shipping', 'Market Research', 'Marketing', 'Not Applicable', 'Operations', 'Other', 'Procurement', 'Product Management/Product Development', 'Production', 'Research & Development', 'Sales/Business Development', 'Technology/IT'] },
  { id: 'Stand',      text: 'How many hours of your day is spent standing?',       type: 'number',   placeholder: 'e.g. 6' },
  { id: 'Profession', text: 'Have you worked in any of the following professions?', type: 'checkbox', options: ['I have worked in a health insurance company.', 'I have worked in a healthcare/medical marketing, market research, or advertising company.', 'I have worked in a pharmacy, pharmaceutical, medical device, or managed care company.', 'I have worked in the US Department of Health and Human Services (HHS) or the Food and Drug Administration (FDA).', 'I have worked or have been trained as a healthcare professional (physician, nurse, therapist, pharmacist, medical technician, etc.)', 'None of the above.'] },
  { id: 'Insurance',  text: 'Do you have health insurance?',                       type: 'choice',   options: ['No', 'Yes'] },
];

function useHover() {
  const [hovered, setHovered] = useState(false);
  return { hovered, onMouseEnter: () => setHovered(true), onMouseLeave: () => setHovered(false) };
}

function PrimaryBtn({ onClick, style = {}, children }) {
  const { hovered, ...handlers } = useHover();
  return (
    <button onClick={onClick} style={{ ...S.primaryBtn, ...(hovered ? { background: "#2563eb", boxShadow: "0 4px 12px rgba(59,130,246,0.35)", transform: "translateY(-1px)" } : {}), ...style }} {...handlers}>
      {children}
    </button>
  );
}

function ShowMoreBtn({ onClick, children }) {
  const { hovered, ...handlers } = useHover();
  return (
    <button onClick={onClick} style={{ ...S.showMoreBtn, ...(hovered ? { background: C.navy50, borderColor: C.navy400, boxShadow: "0 2px 8px rgba(26,58,107,0.14)", transform: "translateY(-1px)" } : {}) }} {...handlers}>
      {children}
    </button>
  );
}

function NavBtn({ active, onClick, children }) {
  const { hovered, ...handlers } = useHover();
  return (
    <button onClick={onClick} style={{ ...S.navBtn(active), ...(hovered && !active ? { background: C.navy500, color: C.white } : {}) }} {...handlers}>
      {children}
    </button>
  );
}

function CardImage({ src, alt }) {
  const isPlaceholder = !src || src.startsWith("YOUR_");
  if (isPlaceholder) {
    return (
      <div style={S.cardImgPlaceholder}>
        <span style={{ fontSize: "22px" }}>🖼</span>
        <span>{alt} — add image in IMAGES at top of file</span>
      </div>
    );
  }
  return <img src={src} alt={alt} style={S.cardImg} />;
}

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

const HomePage = () => {
  const navigate = useNavigate();
  const hasHeroImg = IMAGES.hero && !IMAGES.hero.startsWith("YOUR_");
  const [form, setForm] = useState({ name: "", email: "", phone: "", topic: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = () => {
    if (!form.name || !form.email || !form.message) { alert("Please fill in your name, email, and message."); return; }
    setSubmitted(true);
  };

  const otcCards = [
    { imgKey: "ibuprofen",     icon: "💊", title: "Ibuprofen (Advil, Motrin)",  desc: "Reduces pain and swelling.",                  tag: "Oral",    tagBg: C.navy100,   tagC: C.navy800  },
    { imgKey: "naproxen",      icon: "💊", title: "Naproxen (Aleve)",           desc: "Long-lasting relief. 12 hrs per dose.",       tag: "Oral",    tagBg: C.navy100,   tagC: C.navy800  },
    { imgKey: "acetaminophen", icon: "💊", title: "Acetaminophen (Tylenol)",    desc: "Gentle, stomach-friendly pain relief.",       tag: "Oral",    tagBg: C.navy100,   tagC: C.navy800  },
    { imgKey: "voltaren",      icon: "🧴", title: "Voltaren Gel",               desc: "Anti-inflammatory gel applied to the knee.", tag: "Topical", tagBg: C.goldLight, tagC: C.goldDark },
    { imgKey: "capsaicin",     icon: "🧴", title: "Capsaicin cream (Capzasin)", desc: "Reduces pain signals in the knee.",           tag: "Topical", tagBg: C.goldLight, tagC: C.goldDark },
  ];

  const exCards = [
    { imgKey: "walking",     icon: "🚶", title: "Walking",                 desc: "Low-impact, joint-friendly cardio.",             tag: "Cardio",   tagBg: C.navy100,   tagC: C.navy800  },
    { imgKey: "swimming",    icon: "🏊", title: "Swimming",                desc: "Water supports body weight. Easy on knees.",    tag: "Cardio",   tagBg: C.navy100,   tagC: C.navy800  },
    { imgKey: "straightLeg", icon: "🦵", title: "Straight-leg raise",      desc: "Strengthens quads without bending the knee.",  tag: "Strength", tagBg: "#dcfce7",   tagC: "#166534"  },
    { imgKey: "calfStretch", icon: "🧘", title: "Heel and calf stretch",   desc: "Releases tension behind the knee.",             tag: "Stretch",  tagBg: C.goldLight, tagC: C.goldDark },
    { imgKey: "figure4",     icon: "🪑", title: "Seated figure 4 stretch", desc: "Eases hip tightness linked to knee pain.",      tag: "Stretch",  tagBg: C.goldLight, tagC: C.goldDark },
  ];

  return (
    <div style={S.page}>
      <section id="home">
        {hasHeroImg ? (
          <div style={S.heroWithImg}>
            <img src={IMAGES.hero} alt="Older adults staying active and healthy" style={S.heroImg} />
            <div style={S.heroOverlay}>
              <h1 style={S.heroH1}>Feel Better on Your Feet</h1>
              <p style={S.heroP}>Trusted knee care guidance for adults 50 and older. From over-the-counter options to gentle daily exercises.</p>
              <PrimaryBtn onClick={() => navigate("/quiz")}>Take the Quiz. Find My Relief Plan.</PrimaryBtn>
            </div>
          </div>
        ) : (
          <div>
            <div style={S.heroImgPlaceholder}>Hero image placeholder — add your image URL to IMAGES.hero at the top of this file</div>
            <div style={S.hero}>
              <h1 style={S.heroH1}>Feel Better on Your Feet</h1>
              <p style={S.heroP}>Trusted knee care guidance for adults 50 and older. From over-the-counter options to gentle daily exercises.</p>
              <PrimaryBtn onClick={() => navigate("/quiz")}>Take the Quiz. Find My Relief Plan.</PrimaryBtn>
            </div>
          </div>
        )}
      </section>

      <div style={{ background: C.gray50 }}>
        <div style={S.inner}>
          <h2 style={S.sectionTitle}>Most commonly used OTC products</h2>
          <div style={S.cardsGrid}>
            {otcCards.map((item) => (
              <div key={item.title} style={S.card}>
                <CardImage src={IMAGES.otc[item.imgKey]} alt={item.title} />
                <div style={S.cardBody}>
                  <span style={S.cardIcon}>{item.icon}</span>
                  <h3 style={S.cardH3}>{item.title}</h3>
                  <p style={S.cardP}>{item.desc}</p>
                  <span style={S.tag(item.tagBg, item.tagC)}>{item.tag}</span>
                </div>
              </div>
            ))}
          </div>
          <ShowMoreBtn onClick={() => navigate("/medications")}>Show More OTC Options</ShowMoreBtn>

          <h2 style={S.sectionTitle}>Top recommended exercises</h2>
          <div style={S.cardsGrid}>
            {exCards.map((item) => (
              <div key={item.title} style={S.card}>
                <CardImage src={IMAGES.exercises[item.imgKey]} alt={item.title} />
                <div style={S.cardBody}>
                  <span style={S.cardIcon}>{item.icon}</span>
                  <h3 style={S.cardH3}>{item.title}</h3>
                  <p style={S.cardP}>{item.desc}</p>
                  <span style={S.tag(item.tagBg, item.tagC)}>{item.tag}</span>
                </div>
              </div>
            ))}
          </div>
          <ShowMoreBtn onClick={() => navigate("/exercise")}>Show More Exercises</ShowMoreBtn>

          <div className="bg-[#0d1f3c] rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center gap-8 mb-12 shadow-md">
            <div className="flex-1 text-center md:text-left">
              <h2 className="font-serif text-2xl font-bold text-white mb-2">
                Not sure what is right for you?
              </h2>
              <p className="text-lg text-[#93b8e0] m-0">
                Answer a few questions about your symptoms and we will match you with the best OTC and exercise plan.
              </p>
            </div>
            <button
                onClick={() => navigate("/quiz")}
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-8 rounded-xl text-lg shadow-sm transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-400"
            >
              Take the Quiz
            </button>
          </div>
        </div>
      </div>

      <hr style={S.divider} />

      <section id="about" style={S.aboutSection}>
        <div style={S.inner}>
          <h2 style={S.sectionTitle}>About KneeBot</h2>
          <p style={{ fontSize: "18px", marginBottom: "2rem", color: C.gray700, lineHeight: "1.8" }}>
            KneeBot was created for people who want straightforward answers about knee pain without complex medical jargon.
            Whether you are dealing with arthritis, stiffness, or general aches, we guide you toward safe, effective relief options.
          </p>
          <div style={S.aboutGrid}>
            {[
              { title: "Who we help", text: "Adults aged 50 and older who experience knee discomfort and want to explore over-the-counter solutions and gentle exercises before seeing a specialist." },
              { title: "What we provide", text: "Clear, easy-to-understand information on OTC medications and exercises, plus a personalized quiz to match you with the best options for your specific symptoms." },
              { title: "Our approach", text: "We believe knee care should be accessible. All content is written in plain language, uses large readable text, and is reviewed for safety and accuracy." },
              { title: "Important reminder", text: "KneeBot is an educational resource and not a substitute for professional medical advice. Always speak with your doctor about your personal health situation." },
            ].map((box) => (
              <div key={box.title} style={S.aboutBox}>
                <h3 style={S.aboutBoxH3}>{box.title}</h3>
                <p style={{ fontSize: "16px", color: C.gray500, lineHeight: "1.7" }}>{box.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr style={S.divider} />

      <section id="contact" style={S.contactSection}>
        <div style={S.inner}>
          <h2 style={S.sectionTitle}>Contact us</h2>
          <p style={{ fontSize: "18px", marginBottom: "2rem", color: C.gray700, lineHeight: "1.8" }}>
            Have a question or need help navigating KneeBot? We would love to hear from you.
          </p>
          <div style={S.contactGrid}>
            <div style={S.contactForm}>
              {!submitted ? (
                <>
                  <label style={S.fieldLabel}>Your full name</label>
                  <input name="name" value={form.name} onChange={handleChange} placeholder="e.g. Margaret Johnson" style={S.fieldInput} />
                  <label style={S.fieldLabel}>Email address</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="e.g. margaret@email.com" style={S.fieldInput} />
                  <label style={S.fieldLabel}>What is your question about?</label>
                  <select name="topic" value={form.topic} onChange={handleChange} style={S.fieldInput}>
                    <option value="">Please select</option>
                    <option>OTC medications</option>
                    <option>Exercises</option>
                  </select>
                  <label style={S.fieldLabel}>Your message</label>
                  <textarea name="message" value={form.message} onChange={handleChange} placeholder="Type your question here..." style={{ ...S.fieldInput, minHeight: "120px", resize: "vertical" }} />
                  <PrimaryBtn onClick={handleSubmit} style={{ width: "100%", fontSize: "18px", padding: "15px", marginTop: "0.5rem" }}>
                    Send my message
                  </PrimaryBtn>
                </>
              ) : (
                <div style={S.successBox}>
                  <h3 style={{ fontFamily: "'Merriweather', serif", fontSize: "1.3rem", color: C.navy700, marginBottom: "0.5rem" }}>Thank you for reaching out!</h3>
                  <p style={{ fontSize: "17px", color: C.navy500 }}>We received your message and will get back to you within 1 to 2 business days.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default function NhusPage() {
  const [activeNav, setActiveNav] = useState("home");
  const navigate = useNavigate();

  // Keep IntersectionObserver so the Nav bar still highlights on scroll
  useEffect(() => {
    const sections = ["home", "about", "contact"];
    const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActiveNav(entry.target.id);
          });
        },
        { threshold: 0.3 }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  function handleNav(id) {
    if (id === "about" || id === "contact" || id === "home") {
      // These sections live on the Home Page, so we just scroll to them
      scrollToSection(id);
    } else if (id === "exercises") {
      // Tell React Router to load the Exercise page
      navigate("/exercise");
    } else if (id === "otc") {
      // Tell React Router to load the Medications page
      navigate("/medications");
    }
  }

  const navItems = [
    { id: "home",      label: "Home" },
    { id: "about",     label: "About" },
    { id: "exercises", label: "Exercises" },
    { id: "otc",       label: "OTC Meds" },
    { id: "contact",   label: "Contact Us" },
  ];

  return (
      <div className="w-full pb-12">
        {/* Render the HomePage content directly */}
        <HomePage />
      </div>
  );
}