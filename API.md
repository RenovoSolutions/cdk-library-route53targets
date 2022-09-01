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





