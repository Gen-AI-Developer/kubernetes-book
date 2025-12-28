import React from 'react';
import clsx from 'clsx';
import styles from './ParallaxCards.module.css';

const CardList = [
  {
    title: 'Kubernetes',
    svgPath: '/img/kubernetes.svg',
    description: 'Orchestrate containerized applications at scale',
  },
  {
    title: 'Docker',
    svgPath: '/img/docker.svg',
    description: 'Package applications into lightweight containers',
  },
  {
    title: 'Helm',
    svgPath: '/img/helm.svg',
    description: 'Manage Kubernetes applications with charts',
  },
  {
    title: 'CI/CD',
    svgPath: '/img/cicd.svg',
    description: 'Automate deployment pipelines',
  },
  {
    title: 'ArgoCD',
    svgPath: '/img/argo.svg',
    description: 'Implement GitOps practices',
  },
  {
    title: 'Monitoring',
    svgPath: '/img/monitering.svg',
    description: 'Track and monitor your applications',
  },
  {
    title: 'Security',
    svgPath: '/img/security.svg',
    description: 'Secure your Kubernetes clusters',
  },
  {
    title: 'Networking',
    svgPath: '/img/networking.svg',
    description: 'Connect services and applications',
  },
];

function Card({ title, description, svgPath, index }) {
  // Determine gradient class based on card index
  const getGradientClass = (idx) => {
    const gradientClasses = [
      styles.gradientKubernetes,
      styles.gradientDocker,
      styles.gradientHelm,
      styles.gradientCICD,
      styles.gradientArgoCD,
      styles.gradientMonitoring,
      styles.gradientSecurity,
      styles.gradientNetworking
    ];
    return gradientClasses[idx % gradientClasses.length];
  };

  return (
    <div className={clsx('col', styles.col)}>
      <div className={clsx(styles.container)}>
        <div className={clsx(styles.front, styles.card)}>
          <div className={styles.inner}>
            <div className={styles.info}>
              <img
                src={svgPath}
                alt={title}
                className={styles.cardIcon}
              />
            </div>
          </div>
        </div>
        <div className={`${clsx(styles.back, styles.card)} ${getGradientClass(index)}`}>
          <div className={styles.inner}>
            <div className={styles.info}>
              <p>{description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ParallaxCards() {
  return (
    <div className={styles.content}>
      <section className={styles.wrapper}>
        <h1>Kubernetes Concepts</h1>
        <div className={clsx('row', styles.cols)}>
          {CardList.map((card, index) => (
            <Card key={index} title={card.title} description={card.description} svgPath={card.svgPath} index={index} />
          ))}
        </div>
      </section>
    </div>
  );
}