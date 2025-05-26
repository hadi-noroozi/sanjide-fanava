function readFile(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      var htmlPreview =
        '<img class="mx-auto mw-100" style="border-radius:15px;" src="' +
        e.target.result +
        '" />';
      var wrapperZone = $(input).parent();
      var previewZone = $(input).parent().parent().find(".preview-zone");
      var boxZone = $(input)
        .parent()
        .parent()
        .find(".preview-zone")
        .find(".box")
        .find(".box-body");

      var removeprev = $(input).parent().find(".remove-preview");
      var texts =  wrapperZone.find(".dropzone-desc")

      wrapperZone.removeClass("dragover");
      previewZone.removeClass("hidden");
      removeprev.css("display","block");
      texts.css("display","none");
      boxZone.empty();
      boxZone.append(htmlPreview);
    };
    reader.readAsDataURL(input.files[0]);
  }
}

function reset(e) {
  e.wrap("<form>").closest("form").get(0).reset();
  e.unwrap();
}

$(".dropzone").change(function () {
  readFile(this);
});

$(".dropzone-wrapper").on("dragover", function (e) {
  e.preventDefault();
  e.stopPropagation();
  $(this).addClass("dragover");
});

$(".dropzone-wrapper").on("dragleave", function (e) {
  e.preventDefault();
  e.stopPropagation();
  $(this).removeClass("dragover");
});

$(".remove-preview").on("click", function () {
  var boxZone = $(this).parents(".preview-zone").find(".box-body");
  var previewZone = $(this).parents(".preview-zone");
  var dropzone = $(this).parents(".form-group").find(".dropzone");
  var texts = $(this).parents(".form-group").find(".dropzone-desc");
  boxZone.empty();
  previewZone.addClass("hidden");
  reset(dropzone);
  $(this).css("display","none");
  texts.css("display","block");
});
