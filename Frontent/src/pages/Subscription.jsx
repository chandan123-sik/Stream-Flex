import React, { useState } from 'react';
import { Check, Crown, Star, Zap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Subscription.css';

const Subscription = () => {
  const { user } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState(user?.subscription || 'Basic');

  const plans = [
    {
      name: 'Basic',
      price: 8.99,
      icon: Star,
      color: 'var(--text-secondary)',
      features: [
        'Watch on 1 device at a time',
        'HD quality streaming',
        'Access to basic content library',
        'Limited downloads',
        'Standard support'
      ],
      popular: false
    },
    {
      name: 'Standard',
      price: 13.99,
      icon: Zap,
      color: 'var(--accent-blue)',
      features: [
        'Watch on 2 devices at a time',
        'Full HD quality streaming',
        'Access to full content library',
        'Unlimited downloads',
        'Priority support',
        'Early access to new releases'
      ],
      popular: true
    },
    {
      name: 'Premium',
      price: 17.99,
      icon: Crown,
      color: 'var(--accent-gold)',
      features: [
        'Watch on 4 devices at a time',
        '4K Ultra HD streaming',
        'Access to exclusive premium content',
        'Unlimited downloads',
        '24/7 premium support',
        'Early access to new releases',
        'Offline viewing on mobile',
        'Ad-free experience'
      ],
      popular: false
    }
  ];

  const handlePlanSelect = (planName) => {
    setSelectedPlan(planName);
  };

  const handleSubscribe = (planName) => {
    // Simulate subscription process
    alert(`Subscribing to ${planName} plan...`);
  };

  return (
    <div className="subscription-page">
      <div className="container">
        {/* Header */}
        <div className="subscription-header">
          <h1>Choose Your Plan</h1>
          <p>Enjoy unlimited access to movies and TV shows. Cancel anytime.</p>
        </div>

        {/* Current Plan (if user is logged in) */}
        {user && (
          <div className="current-plan">
            <div className="current-plan-info">
              <h3>Current Plan</h3>
              <div className="current-plan-details">
                <span className="plan-name">{user.subscription}</span>
                <span className="plan-price">
                  ${plans.find(p => p.name === user.subscription)?.price}/month
                </span>
              </div>
            </div>
            <div className="plan-status">
              <span className="status-badge active">Active</span>
              <span className="next-billing">Next billing: Feb 28, 2024</span>
            </div>
          </div>
        )}

        {/* Plans Grid */}
        <div className="plans-grid">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const isCurrentPlan = user?.subscription === plan.name;
            const isSelected = selectedPlan === plan.name;

            return (
              <div 
                key={plan.name}
                className={`plan-card ${isSelected ? 'selected' : ''} ${plan.popular ? 'popular' : ''}`}
                onClick={() => handlePlanSelect(plan.name)}
              >
                {plan.popular && (
                  <div className="popular-badge">
                    Most Popular
                  </div>
                )}

                <div className="plan-header">
                  <div className="plan-icon" style={{ color: plan.color }}>
                    <Icon size={32} />
                  </div>
                  <h3 className="plan-name">{plan.name}</h3>
                  <div className="plan-price">
                    <span className="price">${plan.price}</span>
                    <span className="period">/month</span>
                  </div>
                </div>

                <div className="plan-features">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="feature-item">
                      <Check size={16} className="feature-check" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="plan-action">
                  {isCurrentPlan ? (
                    <button className="btn-current" disabled>
                      Current Plan
                    </button>
                  ) : (
                    <button 
                      className={`btn-subscribe ${plan.popular ? 'btn-primary' : 'btn-secondary'}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSubscribe(plan.name);
                      }}
                    >
                      {user ? 'Switch Plan' : 'Get Started'}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Features Comparison */}
        <div className="features-comparison">
          <h2>Compare Plans</h2>
          <div className="comparison-table">
            <div className="comparison-header">
              <div className="feature-column">Features</div>
              {plans.map(plan => (
                <div key={plan.name} className="plan-column">
                  <div className="plan-icon" style={{ color: plan.color }}>
                    <plan.icon size={20} />
                  </div>
                  <span>{plan.name}</span>
                </div>
              ))}
            </div>

            <div className="comparison-rows">
              <div className="comparison-row">
                <div className="feature-name">Simultaneous Streams</div>
                <div className="feature-value">1</div>
                <div className="feature-value">2</div>
                <div className="feature-value">4</div>
              </div>

              <div className="comparison-row">
                <div className="feature-name">Video Quality</div>
                <div className="feature-value">HD</div>
                <div className="feature-value">Full HD</div>
                <div className="feature-value">4K Ultra HD</div>
              </div>

              <div className="comparison-row">
                <div className="feature-name">Downloads</div>
                <div className="feature-value">Limited</div>
                <div className="feature-value">Unlimited</div>
                <div className="feature-value">Unlimited</div>
              </div>

              <div className="comparison-row">
                <div className="feature-name">Ads</div>
                <div className="feature-value">Some ads</div>
                <div className="feature-value">Some ads</div>
                <div className="feature-value">Ad-free</div>
              </div>

              <div className="comparison-row">
                <div className="feature-name">Support</div>
                <div className="feature-value">Standard</div>
                <div className="feature-value">Priority</div>
                <div className="feature-value">24/7 Premium</div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="subscription-faq">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h4>Can I cancel anytime?</h4>
              <p>Yes, you can cancel your subscription at any time. You'll continue to have access until the end of your current billing period.</p>
            </div>
            <div className="faq-item">
              <h4>Can I change my plan?</h4>
              <p>Absolutely! You can upgrade or downgrade your plan at any time. Changes take effect immediately.</p>
            </div>
            <div className="faq-item">
              <h4>Is there a free trial?</h4>
              <p>New users get a 7-day free trial with any plan. No commitment required.</p>
            </div>
            <div className="faq-item">
              <h4>What payment methods do you accept?</h4>
              <p>We accept all major credit cards, PayPal, and digital wallets like Apple Pay and Google Pay.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscription;