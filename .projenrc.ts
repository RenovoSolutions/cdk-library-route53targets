import { awscdk, javascript } from 'projen';
const project = new awscdk.AwsCdkConstructLibrary({
  projenrcTs: true,
  author: 'Renovo Solutions',
  authorAddress: 'devops@renovo1.com',
  cdkVersion: '2.51.1',
  defaultReleaseBranch: 'main',
  name: '@renovosolutions/cdk-library-route53targets',
  description: 'An AWS CDK library that adds functionality for targetting additional resources in Route53',
  repositoryUrl: 'https://github.com/RenovoSolutions/cdk-library-route53targets.git',
  keywords: [
    'aws-cdk',
    'aws-cdk-construct',
    'aws-route53',
    'projen',
  ],
  depsUpgrade: true,
  depsUpgradeOptions: {
    workflowOptions: {
      labels: ['auto-approve', 'deps-upgrade'],
    },
    exclude: ['projen'],
  },
  githubOptions: {
    mergify: true,
    mergifyOptions: {
      rules: [
        {
          name: 'Automatically approve dependency upgrade PRs if they pass build',
          actions: {
            review: {
              type: 'APPROVE',
              message: 'Automatically approved dependency upgrade PR',
            },
          },
          conditions: [
            'label=auto-approve',
            'label=deps-upgrade',
            '-label~=(do-not-merge)',
            'status-success=build',
            'author=github-actions[bot]',
            'title="chore(deps): upgrade dependencies"',
          ],
        },
      ],
    },
    pullRequestLintOptions: {
      semanticTitle: true,
      semanticTitleOptions: {
        types: [
          'chore',
          'docs',
          'feat',
          'fix',
          'ci',
          'refactor',
        ],
      },
    },
  },
  stale: true,
  releaseToNpm: true,
  release: true,
  npmAccess: javascript.NpmAccess.PUBLIC,
  docgen: true,
  eslint: true,
  publishToPypi: {
    distName: 'renovosolutions.aws-cdk-route53targets',
    module: 'route53targets',
  },
  publishToNuget: {
    dotNetNamespace: 'renovosolutions',
    packageId: 'Renovo.AWSCDK.Route53Targets',
  },
});

new javascript.UpgradeDependencies(project, {
  include: ['projen'],
  taskName: 'upgrade-projen',
  workflow: true,
  workflowOptions: {
    schedule: javascript.UpgradeDependenciesSchedule.expressions(['0 2 * * 1']),
  },
  pullRequestTitle: 'upgrade projen',
});

project.synth();
