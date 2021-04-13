// @link WebViewerInstance: https://www.pdftron.com/api/web/WebViewerInstance.html
// @link WebViewerInstance.openElements: https://www.pdftron.com/api/web/WebViewerInstance.html#openElements__anchor
// @link WebViewerInstance.setToolMode: https://www.pdftron.com/api/web/WebViewerInstance.html#setToolMode__anchor

// @link AnnotationManager: https://www.pdftron.com/api/web/CoreControls.AnnotationManager.html
// @link AnnotationManager.setCurrentUser: https://www.pdftron.com/api/web/CoreControls.AnnotationManager.html#setCurrentUser__anchor
// @link AnnotationManager.getCurrentUser: https://www.pdftron.com/api/web/CoreControls.AnnotationManager.html#getCurrentUser__anchor
// @link AnnotationManager.setIsAdminUser: https://www.pdftron.com/api/web/CoreControls.AnnotationManager.html#setIsAdminUser__anchor
// @link AnnotationManager.setReadOnly: https://www.pdftron.com/api/web/CoreControls.AnnotationManager.html#setReadOnly__anchor
// @link AnnotationManager.getAnnotationsList: https://www.pdftron.com/api/web/CoreControls.AnnotationManager.html#getAnnotationsList__anchor
// @link AnnotationManager.showAnnotations: https://www.pdftron.com/api/web/CoreControls.AnnotationManager.html#showAnnotations__anchor
// @link AnnotationManager.hideAnnotations: https://www.pdftron.com/api/web/CoreControls.AnnotationManager.html#hideAnnotations__anchor

WebViewer(
  {
    path: '../../../lib',
    pdftronServer: 'https://demo.pdftron.com/', // comment this out to do client-side only
    initialDoc: 'https://pdftron.s3.amazonaws.com/downloads/pl/demo-annotated.pdf',
  },
  document.getElementById('viewer')
).then(instance => {
  samplesSetup(instance);
  const { annotManager } = instance;
  let shouldShowAnnotFromOtherUsers = true;

  const toggleVisibility = () => {
    const currentUser = annotManager.getCurrentUser();
    const allAnnotations = annotManager.getAnnotationsList().filter(annot => annot.Listable);
    let annotationsToShow = allAnnotations;
    annotManager.hideAnnotations(allAnnotations);

    if (!shouldShowAnnotFromOtherUsers) {
      annotationsToShow = allAnnotations.filter(annot => annot.Author === currentUser);
    }
    annotManager.showAnnotations(annotationsToShow);
  };

  annotManager.setCurrentUser('Justin');
  annotManager.setIsAdminUser(true);
  instance.openElements(['notesPanel']);

  document.getElementById('justin').onchange = () => {
    annotManager.setCurrentUser('Justin');
    annotManager.setIsAdminUser(true);
    instance.setReadOnly(false);
    toggleVisibility();
  };

  document.getElementById('sally').onchange = () => {
    annotManager.setCurrentUser('Sally');
    annotManager.setIsAdminUser(false);
    instance.setReadOnly(false);
    toggleVisibility();
  };

  document.getElementById('brian').onchange = () => {
    annotManager.setCurrentUser('Brian');
    annotManager.setIsAdminUser(false);
    instance.setReadOnly(true);
    toggleVisibility();
  };

  document.getElementById('display').onchange = e => {
    shouldShowAnnotFromOtherUsers = e.target.checked;
    toggleVisibility();
  };
});
