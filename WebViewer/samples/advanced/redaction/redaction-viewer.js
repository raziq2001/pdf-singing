// @link WebViewerInstance: https://www.pdftron.com/api/web/WebViewerInstance.html
// @link WebViewerInstance.loadDocument: https://www.pdftron.com/api/web/WebViewerInstance.html#loadDocument__anchor
// @link WebViewerInstance.disableTools: https://www.pdftron.com/api/web/WebViewerInstance.html#disableTools__anchor
// @link WebViewerInstance.enableTools: https://www.pdftron.com/api/web/WebViewerInstance.html#enableTools__anchor
// @link WebViewerInstance.setToolMode: https://www.pdftron.com/api/web/WebViewerInstance.html#setToolMode__anchor

WebViewer(
  {
    path: '../../../lib',
    initialDoc: 'https://s3.amazonaws.com/pdftron/downloads/pl/legal-contract.pdf',
    fullAPI: true,
    enableRedaction: true,
  },
  document.getElementById('viewer')
).then(instance => {
  samplesSetup(instance);

  const { docViewer } = instance;

  document.getElementById('select').onchange = e => {
    instance.loadDocument(e.target.value);
  };

  document.getElementById('file-picker').onchange = e => {
    const file = e.target.files[0];
    if (file) {
      instance.loadDocument(file);
    }
  };

  document.getElementById('url-form').onsubmit = e => {
    e.preventDefault();
    instance.loadDocument(document.getElementById('url').value);
  };

  docViewer.on('documentLoaded', () => {
    document.getElementById('apply-redactions').onclick = () => {
      instance.showWarningMessage({
        title: 'Apply redaction?',
        message: 'This action will permanently remove all items selected for ' + 'redaction. It cannot be undone.',
        onConfirm: () => {
          instance.docViewer.getAnnotationManager().applyRedactions();
          return Promise.resolve();
        },
      });
    };
  });

  instance.setToolbarGroup('toolbarGroup-Edit');
  instance.setToolMode('AnnotationCreateRedaction');
});
