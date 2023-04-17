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

# API Reference <a name="API Reference" id="api-reference"></a>


## Structs <a name="Structs" id="Structs"></a>

### LoadBalancerTargetAttributes <a name="LoadBalancerTargetAttributes" id="@renovosolutions/cdk-library-route53targets.LoadBalancerTargetAttributes"></a>

#### Initializer <a name="Initializer" id="@renovosolutions/cdk-library-route53targets.LoadBalancerTargetAttributes.Initializer"></a>

```typescript
import { LoadBalancerTargetAttributes } from '@renovosolutions/cdk-library-route53targets'

const loadBalancerTargetAttributes: LoadBalancerTargetAttributes = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@renovosolutions/cdk-library-route53targets.LoadBalancerTargetAttributes.property.dnsName">dnsName</a></code> | <code>string</code> | The DNS name of the load balancer. |
| <code><a href="#@renovosolutions/cdk-library-route53targets.LoadBalancerTargetAttributes.property.hostedZoneId">hostedZoneId</a></code> | <code>string</code> | The hosted zone ID of the load balancer. |

---

##### `dnsName`<sup>Required</sup> <a name="dnsName" id="@renovosolutions/cdk-library-route53targets.LoadBalancerTargetAttributes.property.dnsName"></a>

```typescript
public readonly dnsName: string;
```

- *Type:* string

The DNS name of the load balancer.

---

##### `hostedZoneId`<sup>Required</sup> <a name="hostedZoneId" id="@renovosolutions/cdk-library-route53targets.LoadBalancerTargetAttributes.property.hostedZoneId"></a>

```typescript
public readonly hostedZoneId: string;
```

- *Type:* string

The hosted zone ID of the load balancer.

---

## Classes <a name="Classes" id="Classes"></a>

### LoadBalancerTargetFromAttributes <a name="LoadBalancerTargetFromAttributes" id="@renovosolutions/cdk-library-route53targets.LoadBalancerTargetFromAttributes"></a>

- *Implements:* aws-cdk-lib.aws_route53.IAliasRecordTarget

#### Initializers <a name="Initializers" id="@renovosolutions/cdk-library-route53targets.LoadBalancerTargetFromAttributes.Initializer"></a>

```typescript
import { LoadBalancerTargetFromAttributes } from '@renovosolutions/cdk-library-route53targets'

new LoadBalancerTargetFromAttributes(loadBalancerTargetAttributes: LoadBalancerTargetAttributes)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@renovosolutions/cdk-library-route53targets.LoadBalancerTargetFromAttributes.Initializer.parameter.loadBalancerTargetAttributes">loadBalancerTargetAttributes</a></code> | <code><a href="#@renovosolutions/cdk-library-route53targets.LoadBalancerTargetAttributes">LoadBalancerTargetAttributes</a></code> | *No description.* |

---

##### `loadBalancerTargetAttributes`<sup>Required</sup> <a name="loadBalancerTargetAttributes" id="@renovosolutions/cdk-library-route53targets.LoadBalancerTargetFromAttributes.Initializer.parameter.loadBalancerTargetAttributes"></a>

- *Type:* <a href="#@renovosolutions/cdk-library-route53targets.LoadBalancerTargetAttributes">LoadBalancerTargetAttributes</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@renovosolutions/cdk-library-route53targets.LoadBalancerTargetFromAttributes.bind">bind</a></code> | Return hosted zone ID and DNS name, usable for Route53 alias targets. |

---

##### `bind` <a name="bind" id="@renovosolutions/cdk-library-route53targets.LoadBalancerTargetFromAttributes.bind"></a>

```typescript
public bind(_record: IRecordSet, _zone?: IHostedZone): AliasRecordTargetConfig
```

Return hosted zone ID and DNS name, usable for Route53 alias targets.

###### `_record`<sup>Required</sup> <a name="_record" id="@renovosolutions/cdk-library-route53targets.LoadBalancerTargetFromAttributes.bind.parameter._record"></a>

- *Type:* aws-cdk-lib.aws_route53.IRecordSet

---

###### `_zone`<sup>Optional</sup> <a name="_zone" id="@renovosolutions/cdk-library-route53targets.LoadBalancerTargetFromAttributes.bind.parameter._zone"></a>

- *Type:* aws-cdk-lib.aws_route53.IHostedZone

---





