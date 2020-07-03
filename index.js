/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Application} app
 */
module.exports = app => {
  app.on(['pull_request.opened'], async context => {
    const issueContext = context.issue();

    let membership = context.github.orgs.checkMembership({org: 'camunda', username: context.payload.sender.login}).then(res => {
      if(res.status === 204) {
         // const issueComment = context.issue({ body: 'Hey there colleague, thanks for creating a PR!' });
         // return context.github.issues.createComment(issueComment)
      }
    }).catch(err => {
      const issueComment = context.issue({ body: 'Thanks for opening this pull request! We will look into you changes and will come back to you.\nWe will look into it soon, usually within 1 week. You can have a look at our [Contribution Guidelines](https://github.com/camunda/camunda-bpm-platform/blob/master/CONTRIBUTING.md)' });
      context.github.issues.addLabels(context.issue({ issue_number: issueContext.number, labels: ['needs triage'] }));
      return context.github.issues.createComment(issueComment)
    });
  });
}
