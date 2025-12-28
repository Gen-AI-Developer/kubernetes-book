import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
  {
    title: 'Kubernetes Fundamentals',
    description: (
      <>
        Master the fundamentals of container orchestration with Kubernetes.
        Understand Pods, Deployments, Services, and other core concepts.
      </>
    ),
  },
  {
    title: 'Docker & Containerization',
    description: (
      <>
        Learn containerization concepts and Docker best practices for
        packaging applications in containers.
      </>
    ),
  },
  {
    title: 'Helm & Package Management',
    description: (
      <>
        Package and deploy Kubernetes applications using Helm charts.
      </>
    ),
  },
  {
    title: 'ArgoCD & GitOps',
    description: (
      <>
        Implement GitOps practices with ArgoCD for declarative, version-controlled deployments.
      </>
    ),
  },
  {
    title: 'CI/CD Pipelines',
    description: (
      <>
        Build continuous integration and deployment pipelines for Kubernetes applications.
      </>
    ),
  },
  {
    title: 'GitHub Actions',
    description: (
      <>
        Automate your software workflows with GitHub Actions for containerized applications.
      </>
    ),
  },
];

function Feature({title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Kubernetes_logo_without_workmark.svg/1055px-Kubernetes_logo_without_workmark.svg.png"
          alt="Kubernetes Logo"
          className={styles.featureSvg}
          style={{maxWidth: '150px', margin: '0 auto 15px auto', display: 'block'}}
        />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={clsx('hero hero--secondary', styles.features)}>
      <div className="container padding-vert--lg">
        <div className="row">
          <div className="col col--12 text--center">
            <h1>Complete DevOps Learning Path</h1>
            <p className="padding-horiz--md">
              Master the complete DevOps ecosystem with our comprehensive guides covering
              all essential tools and practices for modern cloud-native development.
            </p>
          </div>
        </div>
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}