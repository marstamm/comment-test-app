/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Application} app
 */
module.exports = app => {
  // Your code here
  app.log('Yay, the app was loaded!')

  app.on(['pull_request.opened', 'issue.opened'], async context => {
    let membership = context.github.orgs.checkMembership({org: 'camunda', username: context.payload.sender.login}).then(res => {
      if(res.status === 204) {
        const issueComment = context.issue({ body: 'Hey there colleague, thanks for creating a PR!' });
        return context.github.issues.createComment(issueComment)
      }
    }).catch(err => {
      const issueComment = context.issue({ body: 'Thanks for opening this issue! We will look into you changes and will come back to you. This can take up to 7 days.' });

      return context.github.issues.createComment(issueComment)
    });
  })

  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
}
