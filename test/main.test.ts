import {
  App,
  Stack,
  aws_route53 as r53,
} from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { LoadBalancerTargetFromAttributes } from '../src/index';

test('Snapshot', () => {
  const app = new App();
  const stack = new Stack(app, 'TestStack', {
    env: {
      account: '123456789012', // not a real account
      region: 'us-east-1',
    },
  });

  const zone = new r53.HostedZone(stack, 'HostedZone', {
    zoneName: 'example.com',
  });

  new r53.ARecord(stack, 'AliasRecord', {
    zone,
    recordName: 'publiclb.example.com',
    target: r53.RecordTarget.fromAlias(new LoadBalancerTargetFromAttributes({
      dnsName: 'publiclb-1234567890.us-east-1.elb.amazonaws.com',
      hostedZoneId: 'Z3DZXE0Q79N41H',
    })),
  });

  expect(Template.fromStack(stack)).toMatchSnapshot();
});
