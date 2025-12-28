import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import ParallaxCards from '@site/src/components/ParallaxCards/ParallaxCards';
import StarryBackground from '@site/src/components/StarryBackground';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <div className="row">
          <div className="col col--6">
            <h1 className="hero__title">{siteConfig.title}</h1>
            <p className="hero__subtitle">{siteConfig.tagline}</p>
            <p>Complete guide to Kubernetes and Cloud Native Technologies for absolute beginners.</p>
            <div className={styles.buttons}>
              <Link
                className="button button--secondary button--lg"
                to="/docs/intro">
                Read the Textbook - 5min ⏱️
              </Link>
              <Link
                className="button button--primary button--lg margin-left--sm"
                to="/blog">
                Read Blog Posts
              </Link>
            </div>
          </div>
          <div className="col col--6 text--center">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Kubernetes_logo_without_workmark.svg/1055px-Kubernetes_logo_without_workmark.svg.png"
              alt="Kubernetes Logo"
              className={styles.logo}
              style={{maxWidth: '300px', margin: 'auto'}}
            />
          </div>
        </div>
      </div>
    </header>
  );
}

function DevOpsSection() {
  return (
    <section className={styles.features}>
      <div className="container padding-vert--xl">
        <div className="row">
          <div className="col col--4">
            <h2>Kubernetes</h2>
            <p>Learn how to orchestrate containerized applications at scale with Kubernetes.</p>
            <ul>
              <li>Pods and Deployments</li>
              <li>Services and Ingress</li>
              <li>ConfigMaps and Secrets</li>
              <li>Namespaces and RBAC</li>
            </ul>
          </div>
          <div className="col col--4">
            <h2>Docker & Containers</h2>
            <p>Master the fundamentals of containerization and packaging applications.</p>
            <ul>
              <li>Dockerfile Best Practices</li>
              <li>Multi-stage Builds</li>
              <li>Container Security</li>
              <li>Image Optimization</li>
            </ul>
          </div>
          <div className="col col--4">
            <h2>Helm</h2>
            <p>Package and deploy Kubernetes applications using Helm charts.</p>
            <ul>
              <li>Chart Development</li>
              <li>Template Functions</li>
              <li>Release Management</li>
              <li>Repository Management</li>
            </ul>
          </div>
        </div>
        <div className="row padding-top--lg">
          <div className="col col--4">
            <h2>ArgoCD & GitOps</h2>
            <p>Implement GitOps practices with ArgoCD for declarative deployments.</p>
            <ul>
              <li>Declarative Configuration</li>
              <li>Sync Strategies</li>
              <li>Rollback Capabilities</li>
              <li>Multi-Cluster Management</li>
            </ul>
          </div>
          <div className="col col--4">
            <h2>CI/CD Pipelines</h2>
            <p>Build continuous integration and deployment pipelines for Kubernetes.</p>
            <ul>
              <li>Automated Testing</li>
              <li>Blue-Green Deployments</li>
              <li>Canary Releases</li>
              <li>Security Scanning</li>
            </ul>
          </div>
          <div className="col col--4">
            <h2>GitHub Actions</h2>
            <p>Automate your workflows with GitHub Actions for containerized applications.</p>
            <ul>
              <li>Workflow Configuration</li>
              <li>Secrets Management</li>
              <li>Reusable Actions</li>
              <li>Self-Hosted Runners</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  return (
    <section className={clsx('hero hero--secondary', styles.stats)}>
      <div className="container text--center padding-vert--xl">
        <div className="row">
          <div className="col col--3">
            <h2 className="text--accent">6</h2>
            <p>Chapters</p>
          </div>
          <div className="col col--3">
            <h2 className="text--accent">2</h2>
            <p>Hours Read Time</p>
          </div>
          <div className="col col--3">
            <h2 className="text--accent">100+</h2>
            <p>Concepts Covered</p>
          </div>
          <div className="col col--3">
            <h2 className="text--accent">Free</h2>
            <p>Cost to Access</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Home - ${siteConfig.title}`}
      description="Complete guide to Kubernetes and Cloud Native Technologies">
      <div style={{position: 'relative', zIndex: 5}}>
        <StarryBackground />
        <HomepageHeader />
        <StatsSection />
        <main>
          <ParallaxCards />
          <HomepageFeatures />
          <DevOpsSection />
        </main>
      </div>
    </Layout>
  );
}