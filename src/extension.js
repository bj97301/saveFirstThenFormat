import * as vscode from 'vscode'

let executeCodeActionsOnSave = async () => {
  // Get the settings
  let codeActionsOnSave = vscode.workspace.getConfiguration().get('editor.codeActionsOnSave')

  // Iterate through each setting
  for (let [actionKind, shouldExecute] of Object.entries(codeActionsOnSave)) {
    // Check if the action should be executed
    console.log('actionKind,shouldExecute', actionKind, shouldExecute)
    if (shouldExecute) {
      let command = ''
      // Map actionKind to corresponding command
      switch (actionKind) {
        case 'source.fixAll.eslint':
          command = 'eslint.executeAutofix'
          break
        case 'source.fixAll':
          command = 'editor.action.fixAll'
          break
        default:
          console.log(`Unknown action kind: ${actionKind}`)
          continue
      }
      // Execute the command
      await vscode.commands.executeCommand(command)
    }
  }
}

// Call the function

export let activate = context => {
  let disposable = vscode.commands.registerCommand(
    'saveFirstThenFormat.saveFirstThenFormat',
    async () => {
      // The code you place here will be executed every time your command is executed
      // Get the active text editor
      let editor = vscode.window.activeTextEditor
      if (editor) {
        let document = editor.document
        await vscode.workspace
          .getConfiguration('editor')
          .update('formatOnSave', false, vscode.ConfigurationTarget.Global)

        await document.save()
        await vscode.workspace
          .getConfiguration('editor')
          .update('formatOnSave', true, vscode.ConfigurationTarget.Global)
        await setTimeout(() => {}, 100)
        await document.save()
      }
    },
  )

  context.subscriptions.push(disposable)
}
