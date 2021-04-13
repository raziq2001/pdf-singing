/// <reference path='./webviewer.d.ts'/>

WebViewer({
    path: './WebViewer/lib',
    initialDoc: 'https://pdftron.s3.amazonaws.com/downloads/pl/demo-annotated.pdf' // path/to/local OR URL
  }, document.getElementById('viewer')).then(function(instance) {
    // Call all the APIs and enjoy the power of static type checking and auto-fill
    // some namespaces from the declaration file:
    var Annotations = instance.Annotations
    var Actions = instance.Actions
    var Tools = instance.Tools
    instance.setCustomNoteFilter(annot => !(annot instanceof instance.Annotations.RectangleAnnotation))
    
    // the setTheme method can also be used for custom colors with an object input
    instance.setTheme('dark');
  });
  