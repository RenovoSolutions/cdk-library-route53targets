import { awscdk, javascript } from 'projen';
const project = new awscdk.AwsCdkConstructLibrary({
  projenrcTs: true,
  author: 'Renovo Solutions',
  authorAddress: 'devops@renovo1.com',
  cdkVersion: '2.202.0',
  jsiiVersion: '^5.8.0',
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
    workflow: false,
  },
  buildWorkflow: false,
  githubOptions: {
    mergify: false,
    pullRequestLintOptions: {
      semanticTitle: false,
    },
  },
  stale: false,
  releaseToNpm: true,
  release: true,
  npmAccess: javascript.NpmAccess.PUBLIC,
  docgen: true,
  eslint: true,
  publishToPypi: {
    distName: 'renovosolutions.aws-cdk-route53targets',
    module: 'renovosolutions_route53targets',
  },
  publishToNuget: {
    dotNetNamespace: 'renovosolutions',
    packageId: 'Renovo.AWSCDK.Route53Targets',
  },
});

new javascript.UpgradeDependencies(project, {
  include: ['projen'],
  taskName: 'upgrade-projen',
  workflow: false,
  pullRequestTitle: 'upgrade projen',
});

project.gitignore.exclude('!/.github/workflows/release.yml');
project.gitignore.addPatterns('.github/workflows/release.yml');

project.synth();
