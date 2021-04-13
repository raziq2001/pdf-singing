/// <reference path='./webviewer.d.ts'/>

const input = document.getElementById('file_upload');
WebViewer({
    path: './WebViewer/lib',
    initialDoc: 'https://pdftron.s3.amazonaws.com/downloads/pl/demo-annotated.pdf' // path/to/local OR URL
}, document.getElementById('viewer')).then(function (instance) {
    // Call all the APIs and enjoy the power of static type checking and auto-fill
    // some namespaces from the declaration file:
   
    input.addEventListener('change', () => {

        // Get the file from the input
        const file = input.files[0];
        instance.loadDocument(file, { filename: file.name });
     
      });

      const {docViewer} = instance;
      docViewer.on('documentLoaded', () => {
        // perform document operations
      });
    var Annotations = instance.Annotations;
    var Actions = instance.Actions;
    var Tools = instance.Tools;
    instance.setCustomNoteFilter(annot => !(annot instanceof instance.Annotations.RectangleAnnotation));
    // the setTheme method can also be used for custom colors with an object input
    instance.setTheme('dark');
});
