const core = require("@actions/core")
const { appendFile } = require("fs").promises
const { Toolkit } = require("actions-toolkit")

const GIT_NAME = core.getInput("GIT_NAME")
const GIT_EMAIL = core.getInput('GIT_EMAIL')
const COMMITS = core.getInput('COMMITS')

const setUser = async tools => {
  await tools.exec("git", ["config", "--global", "user.email", GIT_EMAIL])
  await tools.exec("git", ["config", "--global", "user.name", GIT_NAME])
}

const getMessage = () => `Contribution ${new Date().toISOString()}`

const appendREADME = async message => {
  await appendFile("./README.md", message)
}

const commitFile = async (tools, message) => {
  await tools.exec("git", ["add", "README.md"])
  await tools.exec("git", ["commit", "-m", message])
}

const push = async tools => {
  await tools.exec("git", ["push"])
}

Toolkit.run(
  async (tools) => {
    const message = getMessage()
    try {
      await setUser(tools)
      for (let i = 0; i < COMMITS; i += 1) {
        await appendREADME(message)
        await commitFile(tools, message)
      }
      await push()
    } catch (err) {
      tools.log.debug("Something went wrong")
      return tools.exit.failure(err)
    }
    tools.exit.success("Pushed to remote repository")
  },
  {
    event: ["schedule", "workflow_dispatch"],
    secrets: ["GITHUB_TOKEN"],
  }
)
