$(function () {

  let defaultURL = 'https://fiery13.wordpress.com/2013/11/07/ky-cambri-tro-lai-chuong-49/'

  function saveTextAsFile(text, fileName) {
    var textToSave = text
    var textToSaveAsBlob = new Blob([textToSave], { type: "text/plain" });
    var textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob);
    var fileNameToSaveAs = fileName;

    var downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "Download File";
    downloadLink.href = textToSaveAsURL;
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);

    downloadLink.click();
  }

  function loadContent() {
    let newURL = $('#txtURL').val();
    let loadURL = _.isEmpty(newURL) ? defaultURL : newURL

    let contentElement = 'div.entry-content'

    $.ajax({
      url: loadURL,
      type: 'GET',
      success: function (resp) {

        // define name of text file
        let fileName = [moment().format("DDMMYYYY.HHmmss"), 'txt'].join('.')

        // return tag that contains main content
        let htmlVal = $(resp.responseText).find(contentElement).html()

        // return an array of text in html tags
        let arr = _.map($(htmlVal), function (ele) {
          return ele.innerText
        })

        // adjust the content, display source url
        arr.splice(0, 0, '--------------------------------------------------------------------------------------------------')
        arr.splice(0, 0, 'source::: ' + loadURL)

        // export to txt file
        saveTextAsFile(arr.join("\n"), fileName)

        $('#container').html(arr.join("\n"))
      }
    })
  }

  $('#btnGet').click(function () {
    loadContent()
  })

})