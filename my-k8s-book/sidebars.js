// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Introduction',
      items: ['intro'],
    },
    {
      type: 'category',
      label: 'Chapter 1: History of Cloud Native Applications',
      items: ['chapter1-history'],
    },
    {
      type: 'category',
      label: 'Chapter 2: What, Why, Need, and How of Kubernetes',
      items: ['chapter2-what-why'],
    },
    {
      type: 'category',
      label: 'Chapter 3: Setting Up Your First Kubernetes Environment',
      items: ['chapter3-setup'],
    },
    {
      type: 'category',
      label: 'Chapter 4: Core Kubernetes Concepts: Pods, Deployments, and Services',
      items: ['chapter4-concepts'],
    },
    {
      type: 'category',
      label: 'Chapter 5: Developing and Deploying Cloud-Native Apps',
      items: ['chapter5-deploy'],
    },
    {
      type: 'category',
      label: 'Chapter 6: Best Practices and Scaling',
      items: ['chapter6-best-practices'],
    },
  ],
};

module.exports = sidebars;