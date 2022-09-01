import {
  aws_route53 as route53,
} from 'aws-cdk-lib';

export interface LoadBalancerTargetAttributes {
  /**
   * The DNS name of the load balancer.
   */
  readonly dnsName: string;
  /**
   * The hosted zone ID of the load balancer.
   */
  readonly hostedZoneId: string;
}

export class LoadBalancerTargetFromAttributes implements route53.IAliasRecordTarget {
  constructor(private readonly loadBalancerTargetAttributes: LoadBalancerTargetAttributes) {}

  public bind(_record: route53.IRecordSet, _zone?: route53.IHostedZone): route53.AliasRecordTargetConfig {
    return {
      hostedZoneId: this.loadBalancerTargetAttributes.hostedZoneId,
      dnsName: `dualstack.${this.loadBalancerTargetAttributes.dnsName}`,
    };
  }
}
