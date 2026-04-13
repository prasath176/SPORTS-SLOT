import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Zap, ChevronRight, CheckCircle2, Calendar, Clock,
  MapPin, Users, User, Phone, ArrowRight, X,
  Shield, Star, Wifi
} from 'lucide-react';

// ─── DATA ────────────────────────────────────────────────────────────────────

const SPORTS = [
  {
    id: 'football',
    name: 'Football',
    icon: '⚽',
    price: 1200,
    location: 'Arena West · Stadium A',
    capacity: '22 players max',
    tags: ['Floodlit', 'Turf'],
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'badminton',
    name: 'Badminton',
    icon: '🏸',
    price: 400,
    location: 'Sports Complex · Court 1–4',
    capacity: '4 players max',
    tags: ['AC Indoor', 'Pro-Net'],
    image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'tennis',
    name: 'Tennis',
    icon: '🎾',
    price: 600,
    location: 'Outer Courts · Lane 3',
    capacity: '4 players max',
    tags: ['Clay Surface', 'Coaching'],
    image: 'https://images.unsplash.com/photo-1595435064214-08d18204e051?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'basketball',
    name: 'Basketball',
    icon: '🏀',
    price: 800,
    location: 'Indoor Arena · Court B',
    capacity: '10 players max',
    tags: ['Air Conditioned', 'Pro Hoops'],
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&q=80&w=1200'
  },
];

const SLOTS = [
  '06:00 AM', '07:00 AM', '08:00 AM', '09:00 AM',
  '10:00 AM', '04:00 PM', '05:00 PM', '06:00 PM',
  '07:00 PM', '08:00 PM', '09:00 PM', '10:00 PM'
];

// Pre-booked slots (simulated)
const BOOKED = ['07:00 AM', '08:00 AM', '05:00 PM'];

// ─── ANIMATIONS ──────────────────────────────────────────────────────────────

const PAGE_IN   = { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -16 } };
const TRANSITION = { duration: 0.45, ease: [0.16, 1, 0.3, 1] };

// ─── NAV ─────────────────────────────────────────────────────────────────────

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <a className="nav-logo" href="#">
          <div className="nav-logo-icon">
            <Zap size={18} color="#000" strokeWidth={3} />
          </div>
          <span className="nav-logo-text">SportSync</span>
        </a>

        <ul className="nav-links">
          <li><a href="#">Venues</a></li>
          <li><a href="#">Classes</a></li>
          <li><a href="#">My Bookings</a></li>
        </ul>

        <button className="nav-pill">Book Now</button>
      </div>
    </nav>
  );
}

// ─── PROGRESS ────────────────────────────────────────────────────────────────

function Progress({ step }) {
  const steps = ['Sport', 'Schedule', 'Details'];
  return (
    <div className="step-progress">
      {steps.map((label, i) => {
        const s = i + 1;
        return (
          <React.Fragment key={s}>
            <div className="step-item">
              <div className={`step-node ${step > s ? 'done' : step === s ? 'active' : ''}`}>
                {step > s ? <CheckCircle2 size={15} strokeWidth={3} /> : s}
              </div>
              <span className={`step-label ${step === s ? 'active' : ''}`}>{label}</span>
            </div>
            {i < steps.length - 1 && (
              <div className="step-connector">
                <div className="step-connector-fill" style={{ width: step > s ? '100%' : '0%' }} />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

// ─── HERO / STEP 1 ────────────────────────────────────────────────────────────

function HeroStep({ onSelect }) {
  return (
    <motion.div {...PAGE_IN} transition={TRANSITION}>
      {/* Hero headline */}
      <div className="hero">
        <motion.div
          className="hero-badge"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, ...TRANSITION }}
        >
          <div className="hero-badge-dot" />
          Premium Sports Booking — Live
        </motion.div>

        <motion.h1
          className="hero-headline"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, ...TRANSITION }}
        >
          Own<br />
          The <span className="accent">Field</span><br />
          <span className="filled">Today.</span>
        </motion.h1>

        <motion.p
          className="hero-sub"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, ...TRANSITION }}
        >
          Instantly lock in elite slots at world-class facilities. No wait lists. No friction.
        </motion.p>

        <motion.div
          className="hero-stats"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, ...TRANSITION }}
        >
          <div className="stat"><div className="stat-num">42+</div><div className="stat-label">Arenas</div></div>
          <div className="stat"><div className="stat-num">12K</div><div className="stat-label">Athletes</div></div>
          <div className="stat"><div className="stat-num">4.9★</div><div className="stat-label">Rating</div></div>
        </motion.div>
      </div>

      {/* Sport Grid */}
      <div className="wrap section-relative">
        <div className="sports-section-title">Choose Your Arena</div>

        <div className="sports-grid">
          {SPORTS.map((sport, idx) => (
            <motion.div
              key={sport.id}
              className="sport-card"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + idx * 0.08, ...TRANSITION }}
              onClick={() => onSelect(sport)}
              whileHover={{ y: -4 }}
            >
              <div className="sport-card-img" style={{ backgroundImage: `url(${sport.image})` }} />
              <div className="sport-card-overlay">
                <div className="sc-top">
                  <span className="sc-tag sc-tag-volt">Available</span>
                  {sport.tags.map(t => <span key={t} className="sc-tag sc-tag-outline">{t}</span>)}
                </div>
                <div className="sc-name">{sport.name}</div>
                <div className="sc-bottom">
                  <div>
                    <div className="sc-price-label">Starting from</div>
                    <div className="sc-price">₹{sport.price}<span style={{fontSize:'0.9rem',fontWeight:500,color:'rgba(200,255,0,0.5)'}}>/hr</span></div>
                  </div>
                  <div className="sc-btn">
                    <ArrowRight size={18} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─── SCHEDULE / STEP 2 ────────────────────────────────────────────────────────

function ScheduleStep({ sport, date, onDateChange, slot, onSlotChange, onBack, onNext }) {
  return (
    <motion.div {...PAGE_IN} transition={TRANSITION} className="wrap section-relative">
      <div className="booking-back">
        <button className="back-btn" onClick={onBack}><X size={18} /></button>
        <h2 className="booking-title">Reserve <span>{sport.name}</span></h2>
        <div className="location-chip">
          <MapPin size={12} style={{ color: 'var(--volt)' }} />
          {sport.location}
        </div>
      </div>

      <div className="booking-layout">
        {/* Left panels */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

          <div className="panel">
            <div className="panel-header">
              <div className="panel-title">
                <div className="panel-icon"><Calendar size={16} /></div>
                Select Date
              </div>
              <span className="panel-step">Step 01 / 02</span>
            </div>
            <input
              type="date"
              className="date-input"
              value={date}
              onChange={e => onDateChange(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          <div className="panel">
            <div className="panel-header">
              <div className="panel-title">
                <div className="panel-icon"><Clock size={16} /></div>
                Time Slot
              </div>
              <span className="panel-step">Step 02 / 02</span>
            </div>

            <div style={{ fontSize: '0.7rem', color: 'var(--muted)', marginBottom: '1rem', display: 'flex', gap: '1.5rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '3px', background: 'var(--volt)', display:'inline-block' }} /> Available
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '3px', background: 'var(--bg-3)', display:'inline-block', opacity: 0.4 }} /> Booked
              </span>
            </div>

            <div className="slots-grid">
              {SLOTS.map(s => (
                <div
                  key={s}
                  className={`time-slot ${s === slot ? 'sel' : ''} ${BOOKED.includes(s) ? 'booked' : ''}`}
                  onClick={() => !BOOKED.includes(s) && onSlotChange(s)}
                >
                  {s}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <div className="summary-card">
          <img src={sport.image} alt={sport.name} className="summary-img" />
          <div className="summary-body">
            <div className="summary-fee-row">
              <div>
                <div className="summary-fee-label">Arena Fee</div>
                <div className="summary-fee-amount">₹{sport.price}</div>
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--muted)', textAlign: 'right' }}>
                <div style={{ fontWeight: 700 }}>{sport.capacity}</div>
                <div>per hour</div>
              </div>
            </div>

            {[
              { icon: <Shield size={14} />, text: 'ID-verified access' },
              { icon: <Wifi size={14} />, text: 'Free high-speed WiFi' },
              { icon: <Users size={14} />, text: sport.capacity },
              { icon: <Star size={14} />, text: 'Pro-grade equipment' },
            ].map((f, i) => (
              <div key={i} className="summary-feature">
                <div className="f-dot" />
                {f.text}
              </div>
            ))}

            <div style={{ marginTop: '1.5rem' }}>
              <button className="btn-volt" disabled={!slot} onClick={onNext}>
                {slot ? `Lock In ${slot}` : 'Select a Slot First'}
                {slot && <ArrowRight size={16} strokeWidth={3} />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── DETAILS / STEP 3 ────────────────────────────────────────────────────────

function DetailsStep({ sport, date, slot, form, onFormChange, onBack, onSubmit }) {
  return (
    <motion.div {...PAGE_IN} transition={TRANSITION} className="wrap section-relative">
      <div className="form-card">
        <div className="form-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <button
              className="back-btn"
              onClick={onBack}
              style={{ width: '36px', height: '36px', borderRadius: '10px', border: '1px solid var(--border)', background: 'var(--bg-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--white)' }}
            >
              <X size={15} />
            </button>
            <span style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--volt)' }}>Identity Verification</span>
          </div>
          <h2 className="form-title">Almost<br />There.</h2>
          <p className="form-sub">Register your athlete profile to generate your digital entry pass.</p>
        </div>

        <form className="form-body" onSubmit={onSubmit}>
          <div className="form-row">
            <div className="field">
              <label className="field-label">Full Name</label>
              <div className="field-wrap">
                <div className="field-icon"><User size={16} /></div>
                <input
                  required
                  type="text"
                  className="field-input"
                  placeholder="e.g. Marcus Aurelius"
                  value={form.name}
                  onChange={e => onFormChange({ ...form, name: e.target.value })}
                />
              </div>
            </div>
            <div className="field">
              <label className="field-label">Phone Number</label>
              <div className="field-wrap">
                <div className="field-icon"><Phone size={16} /></div>
                <input
                  required
                  type="tel"
                  className="field-input"
                  placeholder="+91 98765 43210"
                  value={form.phone}
                  onChange={e => onFormChange({ ...form, phone: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="booking-summary-row">
            <div className="bs-line">
              <span className="bs-key">Sport</span>
              <span className="bs-val">{sport.name}</span>
            </div>
            <div className="bs-line">
              <span className="bs-key">Date</span>
              <span className="bs-val">{new Date(date).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}</span>
            </div>
            <div className="bs-line">
              <span className="bs-key">Time Slot</span>
              <span className="bs-val">{slot}</span>
            </div>
            <div className="bs-line" style={{ borderTop: '1px solid var(--border)', paddingTop: '0.75rem' }}>
              <span className="bs-key" style={{ fontWeight: 700 }}>Total</span>
              <span className="bs-val bs-val-accent">₹{sport.price}</span>
            </div>
          </div>

          <button type="submit" className="btn-volt">
            Secure My Slot Now
            <ArrowRight size={16} strokeWidth={3} />
          </button>
          <button type="button" className="btn-ghost" style={{ marginTop: '0.75rem' }} onClick={onBack}>
            ← Change Time Slot
          </button>
        </form>
      </div>
    </motion.div>
  );
}

// ─── CONFIRMATION / STEP 4 ───────────────────────────────────────────────────

function ConfirmStep({ sport, date, slot, form, onReset }) {
  const passId = `#SS-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
  return (
    <motion.div {...PAGE_IN} transition={TRANSITION} className="wrap section-relative">
      <div className="confirm-wrap">
        <motion.div
          className="confirm-icon-wrap"
          initial={{ scale: 0, rotate: 0 }}
          animate={{ scale: 1, rotate: 6 }}
          transition={{ type: 'spring', stiffness: 220, damping: 14, delay: 0.1 }}
        >
          <CheckCircle2 size={52} color="#000" strokeWidth={3} />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, ...TRANSITION }}>
          <h2 className="confirm-title">You're<br />In.</h2>
          <p className="confirm-sub">
            Entry pass confirmed for <strong>{form.name}</strong>.<br />
            Your arena slot is locked and ready.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, ...TRANSITION }}>
          <div className="eticket">
            <div className="eticket-header">
              <div className="eticket-icon">{sport.icon}</div>
              <div>
                <div className="eticket-sport">{sport.name}</div>
                <div className="eticket-loc">{sport.location}</div>
              </div>
              <div className="eticket-badge">Confirmed</div>
            </div>
            <div className="eticket-body">
              <div>
                <div className="eticket-field-label">Date</div>
                <div className="eticket-field-value">{new Date(date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
              </div>
              <div>
                <div className="eticket-field-label">Time</div>
                <div className="eticket-field-value">{slot}</div>
              </div>
              <div>
                <div className="eticket-field-label">Athlete</div>
                <div className="eticket-field-value">{form.name}</div>
              </div>
              <div>
                <div className="eticket-field-label">Pass ID</div>
                <div className="eticket-field-value" style={{ color: 'var(--volt)' }}>{passId}</div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div className="confirm-actions" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, ...TRANSITION }}>
          <button className="btn-volt" onClick={onReset}>
            Book Another Arena <Zap size={15} strokeWidth={3} />
          </button>
          <div className="confirm-action-row">
            <button className="btn-ghost" style={{ flex: 1 }}>Download Receipt</button>
            <button className="btn-ghost" style={{ flex: 1 }}>Add to Wallet</button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// ─── APP ROOT ─────────────────────────────────────────────────────────────────

export default function App() {
  const [step, setStep]   = useState(1);
  const [sport, setSport] = useState(null);
  const [date, setDate]   = useState(new Date().toISOString().split('T')[0]);
  const [slot, setSlot]   = useState(null);
  const [form, setForm]   = useState({ name: '', phone: '' });

  const reset = () => { setStep(1); setSport(null); setSlot(null); setForm({ name: '', phone: '' }); };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', paddingBottom: '4rem' }}>
      {/* Animated background orbs */}
      <div className="bg-orbs" />

      <Navbar />

      {step < 4 && <Progress step={step} />}

      <AnimatePresence mode="wait">
        {step === 1 && (
          <HeroStep
            key="step1"
            onSelect={s => { setSport(s); setStep(2); }}
          />
        )}

        {step === 2 && sport && (
          <ScheduleStep
            key="step2"
            sport={sport}
            date={date}
            onDateChange={setDate}
            slot={slot}
            onSlotChange={setSlot}
            onBack={() => setStep(1)}
            onNext={() => setStep(3)}
          />
        )}

        {step === 3 && sport && (
          <DetailsStep
            key="step3"
            sport={sport}
            date={date}
            slot={slot}
            form={form}
            onFormChange={setForm}
            onBack={() => setStep(2)}
            onSubmit={e => { e.preventDefault(); setStep(4); }}
          />
        )}

        {step === 4 && (
          <ConfirmStep
            key="step4"
            sport={sport}
            date={date}
            slot={slot}
            form={form}
            onReset={reset}
          />
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer style={{ textAlign: 'center', padding: '3rem 0 1rem', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--muted)', opacity: 0.4, position: 'relative', zIndex: 1 }}>
        SportSync · Built for Champions
      </footer>
    </div>
  );
}
