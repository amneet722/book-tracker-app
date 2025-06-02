// client/src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import './Home.css'; // Make sure you have this import

function Home() {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Your Personal Book Tracker</h1>
          <p className="hero-subtitle">
            Organize your reading journey, set goals, and discover new books effortlessly.
          </p>
          <div className="hero-buttons">
            <Link to="/register" className="btn primary-btn">
              Get Started - It's Free!
            </Link>
            <Link to="/login" className="btn secondary-btn already-account"> {/* Added already-account class */}
              Already have an account?
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="features-title">Features Designed for Book Lovers</h2>
        <div className="features-grid">
          {/* Feature 1: Track Your Library */}
          <div className="feature-card">
            <div className="feature-icon">📚</div> {/* Icon */}
            <h3>Track Your Library</h3>
            <p>Keep a comprehensive list of all your books—whether physical, digital, or audio—and never forget what you own.</p>
          </div>

          {/* Feature 2: Monitor Progress */}
          <div className="feature-card">
            <div className="feature-icon">📈</div> {/* Icon */}
            <h3>Monitor Progress</h3>
            <p>Easily update reading statuses (Wishlist, Currently Reading, Read) and track your page-by-page progress.</p>
          </div>

          {/* Feature 3: Set Reading Goals */}
          <div className="feature-card">
            <div className="feature-icon">🎯</div> {/* Icon */}
            <h3>Set Reading Goals</h3>
            <p>Challenge yourself by setting annual reading goals and visualize your progress towards achieving them.</p>
          </div>

          {/* Feature 4: Discover New Books (Optional: Add more features if you plan to expand) */}
          <div className="feature-card">
            <div className="feature-icon">🔍</div> {/* Icon */}
            <h3>Discover New Books</h3>
            <p>Explore trending titles, get personalized recommendations, and add exciting new reads to your wishlist.</p>
          </div>
        </div>
      </section>

      {/* Optional: Call to Action Section */}
      <section className="call-to-action-section">
        <h2 className="cta-title">Ready to Start Your Reading Journey?</h2>
        <Link to="/register" className="btn primary-btn cta-button">
          Join Book Tracker Today!
        </Link>
      </section>
    </div>
  );
}

export default Home;