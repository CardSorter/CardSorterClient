'use client';

import React from 'react';
import { useRouter } from 'i18n/navigation';
import { useTranslations } from 'next-intl';

export default function HomePage() {
  const t = useTranslations('HomePage');
  const router = useRouter();

  return (
    <div className="homepage">
      <header className="homepage-header">
        <div className="logo">Card Sorter</div>
        <div className="nav-buttons">
          <button onClick={() => router.push('/login')}>LOGIN</button>
          <button className="signup" onClick={() => router.push('/register')}>SIGN UP</button>
        </div>
      </header>

      <main className="homepage-main">
        <section className="intro">
          <h1>{t('welcome')}</h1>
          <h2>
            <img
              src="/card-sorter/images/cardsorting.png"
              alt="Card Icon"
            />
            {t('cardSorts')}
          </h2>
          <p>{t('description')}</p>
        </section>

        <section className="features">
          <h3>{t('whatWeOffer')}</h3>
          <div className="homepage-cards">
            <div className="homepage-card">
              <div className="homepage-card-header">
              <h4>
                <img src="/card-sorter/images/modes.png" alt="Mode Icon" />
                MODES
              </h4>
              </div>
              <div className="homepage-card-body">
              <ul>
                <li>Open Card Sorting</li>
                <li>Closed Card Sorting</li>
                <li>Hybrid Card Sorting</li>
              </ul>
              </div>
            </div>

            <div className="homepage-card">
              <div className="homepage-card-header">
              <h4>
                <img src="/card-sorter/images/remote.png" alt="Remote Icon" />
                REMOTE PARTICIPATION
              </h4>
              </div>
              <div className="homepage-card-body">
                  <p>You can invite anyone,<br />anywhere to take part<br/>for your study</p>
              </div>
            
            </div>

            <div className="homepage-card">
              <div className="homepage-card-header">
              <h4>
                <img src="/card-sorter/images/chart-icon.png" alt="Results Icon" />
                VISUAL RESULTS
              </h4>
              </div>
              <div className="homepage-card-body">
               <p>Gain instant insights with similarity matrix and clusters! Visualize data relationships, uncover hidden patterns, and make informed decisions faster</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
