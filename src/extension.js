import * as vscode from 'vscode'

export function activate(context) {
  let disposable = vscode.commands.registerCommand('extension.saveFormatSave', async () => {
    // The code you place here will be executed every time your command is executed

    // Get the active text editor
    let editor = vscode.window.activeTextEditor
    if (editor) {
      let document = editor.document

      // Save the document
      await document.save()

      // Format the document
      let options = {} // Formatting options
      let edits = await vscode.commands.executeCommand(
        'vscode.executeFormatDocumentProvider',
        document.uri,
        options,
      )

      if (edits && Array.isArray(edits)) {
        await editor.edit(editBuilder => {
          for (let edit of edits) {
            editBuilder.replace(edit.range, edit.newText)
          }
        })
      }

      // Save the document again
      await document.save()
    }
  })

  context.subscriptions.push(disposable)
}
