---
slug: kubernetes-security-best-practices
title: Kubernetes Security Best Practices - Protecting Your Containerized Workloads
authors: [devops-engineer]
tags: [kubernetes, security, cncf, cloud-native]
date: 2025-02-05
---

# Kubernetes Security Best Practices - Protecting Your Containerized Workloads

Security is paramount when running containerized workloads in Kubernetes. With the complexity of container orchestration, it's essential to implement proper security measures at every layer. This guide covers the most important security best practices for Kubernetes.

<!-- truncate -->

## The Shared Security Model

In Kubernetes, security responsibilities are shared between the platform and the user:

- **Platform**: Securing the control plane, nodes, and network
- **User**: Securing workloads, applications, and data

Understanding this model is crucial for implementing effective security measures.

## 1. Authentication and Authorization

### Authentication

Kubernetes supports several authentication methods:

- **Client Certificates**: Most common for cluster communication
- **Service Accounts**: For applications within the cluster
- **OpenID Connect**: For user authentication
- **Webhook Token Authentication**: For custom authentication systems

### Authorization

Use Role-Based Access Control (RBAC) to limit access:

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  namespace: default
  name: pod-reader
rules:
- apiGroups: [""]
  resources: ["pods"]
  verbs: ["get", "watch", "list"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: read-pods
  namespace: default
subjects:
- kind: User
  name: jane
  apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: Role
  name: pod-reader
  apiGroup: rbac.authorization.k8s.io
```

### Best Practices:

- Use the principle of least privilege
- Regularly audit RBAC permissions
- Use groups instead of individual users
- Implement proper user authentication

## 2. Pod Security Standards

Kubernetes introduced Pod Security Standards to replace Pod Security Policies:

### Restricted Policy

- Requires containers to run as non-root users
- Requires read-only root filesystems
- Disallows privileged containers

### Baseline Policy

- Allows privileged containers but restricts other risky behaviors
- Provides a middle ground between restricted and privileged

### Privileged Policy

- Allows full control over Pod configuration
- Should only be used in trusted namespaces

## 3. Network Security

### Network Policies

Use NetworkPolicies to control traffic flow between Pods:

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: frontend-netpol
spec:
  podSelector:
    matchLabels:
      app: frontend
  policyTypes:
  - Ingress
  - Egress
  ingress:
  - from:
    - podSelector:
        matchLabels:
          app: api
    ports:
    - protocol: TCP
      port: 80
  egress:
  - to:
    - namespaceSelector:
        matchLabels:
          name: database
    ports:
    - protocol: TCP
      port: 5432
```

### Service Mesh Security

Implement service mesh (like Istio) for advanced traffic security:

- Mutual TLS (mTLS) for service-to-service communication
- Traffic encryption
- Identity management
- Policy enforcement

## 4. Secrets Management

### Kubernetes Secrets

Kubernetes Secrets are base64 encoded but not encrypted by default:

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: db-secret
type: Opaque
data:
  username: dXNlcg==
  password: cGFzc3dvcmQ=
```

### Best Practices:

- Use external secret management systems (HashiCorp Vault, AWS Secrets Manager)
- Never store secrets in plain text in Git repositories
- Use RBAC to limit access to secrets
- Rotate secrets regularly

### External Secret Stores

Consider using external secret stores with tools like External Secrets Operator:

```yaml
apiVersion: external-secrets.io/v1beta1
kind: SecretStore
metadata:
  name: vault-backend
spec:
  provider:
    vault:
      server: "https://vault.example.com"
      path: "secret"
      version: "v2"
```

## 5. Image Security

### Image Scanning

- Scan container images for vulnerabilities before deployment
- Use trusted base images
- Implement image scanning in CI/CD pipelines
- Only use images from trusted registries

### Image Policy

Implement policies to ensure only signed and verified images are deployed:

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: image-policy
data:
  policy: |
    apiVersion: imagepolicy.k8s.io/v1
    kind: ImageReview
    spec:
      containers:
      - image: trusted-registry/app:v1.0
```

### Minimal Images

- Use minimal base images (Alpine, Distroless)
- Remove unnecessary packages and tools
- Multi-stage builds to reduce attack surface

## 6. Admission Controllers

Admission controllers intercept requests to the Kubernetes API server and can modify or reject them.

### Built-in Admission Controllers:

- **AlwaysPullImages**: Always pull images to prevent using stale cached images
- **SecurityContextDeny**: Deny Pods that define a SecurityContext
- **NodeRestriction**: Limit kubelet access to Node and Pod resources

### Pod Security Admission

Use the built-in Pod Security Admission controller to enforce security standards:

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: development
  labels:
    pod-security.kubernetes.io/enforce: restricted
    pod-security.kubernetes.io/audit: restricted
    pod-security.kubernetes.io/warn: restricted
```

## 7. Security Contexts

Configure security contexts to control access and privileges:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: secure-pod
spec:
  securityContext:
    runAsNonRoot: true
    runAsUser: 1000
    fsGroup: 2000
  containers:
  - name: app-container
    image: my-app:latest
    securityContext:
      allowPrivilegeEscalation: false
      readOnlyRootFilesystem: true
      capabilities:
        drop:
        - ALL
```

## 8. Monitoring and Auditing

### API Server Auditing

Enable API server auditing to track all requests:

```yaml
apiVersion: audit.k8s.io/v1
kind: Policy
rules:
- level: Metadata
  resources:
  - group: ""
    resources: ["pods"]
```

### Security Monitoring

- Monitor for suspicious activities
- Track failed authentication attempts
- Alert on privileged container creation
- Monitor for unexpected network connections

### Tools for Security Monitoring:

- **Falco**: Runtime security monitoring
- **Aqua Security**: Container security platform
- **Twistlock**: Container security
- **OPA Gatekeeper**: Policy enforcement

## 9. Cluster Hardening

### Control Plane Security

- Use private clusters (no public control plane access)
- Enable authorized networks
- Regularly update Kubernetes versions
- Secure etcd with TLS and authentication

### Node Security

- Regularly update node operating systems
- Use minimal node OS (COS, Flatcar, etc.)
- Limit SSH access to nodes
- Use node auto-upgrades

### Network Security

- Use private clusters
- Implement network segmentation
- Encrypt data in transit
- Use VPN for cluster access

## 10. Incident Response

### Preparation

- Have a security incident response plan
- Regular security drills
- Document security procedures
- Establish communication channels

### Detection

- Implement security monitoring
- Set up appropriate alerts
- Regular security scans
- Vulnerability assessments

### Response

- Isolate affected resources
- Preserve evidence
- Follow incident response procedures
- Conduct post-incident reviews

## Conclusion

Kubernetes security requires a defense-in-depth approach that covers multiple layers of the system. By implementing these best practices, you can significantly improve the security posture of your Kubernetes clusters.

Remember that security is an ongoing process, not a one-time task. Regularly review and update your security measures, stay informed about new vulnerabilities, and continuously improve your security practices.

The Kubernetes ecosystem provides many tools and features to help implement these security measures. Take advantage of them and consider using security-focused distributions and services that can help automate many of these practices.