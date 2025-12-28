import React from 'react';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import styles from './contact.module.css';

export default function ContactPage() {
  return (
    <Layout title="Contact" description="Contact information for Syed Safdar Ali Shah">
      <div className="container margin-vert--lg">
        <div className={styles.pageContainer}>
          <div className={styles.container}>
            <div className={clsx(styles.side, styles.front)}>
              <div className={styles.content}>
                <h1>Syed Safdar Ali Shah</h1>
                <p>AI Engineer - Lecturer Computer Science</p>
                <p>Like to work on Docker, Kubernetes and Dapr Agentic Cloud Ascent (DACA) - Planet Level Scaling AI Agents</p>
              </div>
            </div>
            <div className={clsx(styles.side, styles.back)}>
              <div className={styles.content}>
                <h1>Get in Touch</h1>
                <form>
                  <label htmlFor="name">Name</label>
                  <input type="text" id="name" name="name" />

                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" name="email" />

                  <label htmlFor="message">Message</label>
                  <textarea id="message" name="message" rows="4"></textarea>

                  <input type="submit" value="Send Message" />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}