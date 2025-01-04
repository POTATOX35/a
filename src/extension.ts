import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    // Editor içeriği her değiştiğinde tetiklenen event
    vscode.window.onDidChangeTextEditorSelection((event) => {
        const editor = vscode.window.activeTextEditor;
        if (editor && editor.document.languageId === 'javascript') {
            // Yapıştırma olayını kontrol et
            removeComments(editor);
        }
    });

    console.log('Extension "Remove Comments On Paste" is now active!');
}

// Yorumları temizleyen fonksiyon
function removeComments(editor: vscode.TextEditor) {
    const document = editor.document;
    const fullText = document.getText();

    // JavaScript/TypeScript yorumlarını regex ile temizle
    const uncommentedText = fullText.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '');

    // Temizlenmiş metni geri yerleştir
    const fullRange = new vscode.Range(0, 0, document.lineCount, 0);
    editor.edit((editBuilder) => {
        editBuilder.replace(fullRange, uncommentedText);
    });
}

export function deactivate() {}
