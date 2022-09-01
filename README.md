# Additional Route53 Targets for AWS CDK

[![build](https://github.com/RenovoSolutions/cdk-library-route53targets/actions/workflows/build.yml/badge.svg)](https://github.com/RenovoSolutions/cdk-library-route53targets/actions/workflows/build.yml)

This repo's intention is to add additional avenues for defining Route53 targets or adding targets that might not be available otherwise. See the (limited) feature list below:

## Features

- Add a load balancer target using the load balancers attributes instead of the resource class [`LoadBalancer`](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_elasticloadbalancing.LoadBalancer.html). This is useful in cases where you need to add a Classic Load Balancer as a target, but the load balancer wasn't created in the same CDK app. Since the [ELBv2 package in the `aws-cdk`](https://github.com/aws/aws-cdk/blob/main/packages/%40aws-cdk/aws-elasticloadbalancing/lib/load-balancer.ts) doesn't implement a [resource interface](https://github.com/aws/aws-cdk/blob/main/docs/DESIGN_GUIDELINES.md#owned-vs-unowned-constructs) (`ILoadBalancer`) or other typical L2 concepts ([abstract base class](https://github.com/aws/aws-cdk/blob/main/docs/DESIGN_GUIDELINES.md#abstract-base), ["imports" using `from` methods](https://github.com/aws/aws-cdk/blob/main/docs/DESIGN_GUIDELINES.md#imports)) for constructs the [`ClassicLoadBalancerTarget`](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_route53_targets.ClassicLoadBalancerTarget.html) requires a [`LoadBalancer`](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_elasticloadbalancing.LoadBalancer.html) outright. Since `LoadBalancer` is a concrete resource class we can't redefine something we want to target from another CDK app. So, this feature allows us to use data we know about the load balancer to set it as a target more directly.

## Examples

```typescript
const zone = new r53.HostedZone(stack, 'HostedZone', {
  zoneName: 'example.com',
});

new r53.ARecord(stack, 'AliasRecord', {
  zone,
  recordName: 'publiclb.example.com',
  target: r53.RecordTarget.fromAlias(new LoadBalancerTargetFromAttributes({
    dnsName: 'publiclb-1234567890.us-east-1.elb.amazonaws.com',
    hostedZoneId: 'A1AAAA0A79A41A',
  })),
});
```
