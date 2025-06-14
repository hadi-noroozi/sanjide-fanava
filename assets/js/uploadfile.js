var fileTypes = ['pdf', 'docx', 'pptx', 'jpg', 'png', 'txt','csv','xlsx','zip'];  //acceptable file types
function readURL(input) {
    if (input.files && input.files[0]) {
        var extension = input.files[0].name.split('.').pop().toLowerCase(),  //file extension from input file
            isSuccess = fileTypes.indexOf(extension) > -1;  //is extension in acceptable types

        if (isSuccess) { //yes
            var reader = new FileReader();
            reader.onload = function (e) {
                if (extension == 'pdf'){
                	$(input).closest('.fileUpload').find(".icon").attr('src','../assets/images/fileicon/icons8_pdf_1.svg');
                }
                else if (extension == 'docx'){
                	$(input).closest('.fileUpload').find(".icon").attr('src','../assets/images/fileicon/icons8_word_1.svg');
                }
                else if (extension == 'pptx'){
                	$(input).closest('.fileUpload').find(".icon").attr('src','../assets/images/fileicon/icons8_powerpoint.svg');
                }
                else if (extension == 'png'){ $(input).closest('.fileUpload').find(".icon").attr('src','../assets/images/fileicon/icons8_png.svg'); 
                }
                else if (extension == 'jpg' || extension == 'jpeg'){
                	$(input).closest('.fileUpload').find(".icon").attr('src','../assets/images/fileicon/icons8_jpg.svg');
                }
                else if (extension == 'txt'){
                	$(input).closest('.fileUpload').find(".icon").attr('src','../assets/images/fileicon/icons8_txt.svg');
                }
                else if (extension == 'zip'){
                	$(input).closest('.fileUpload').find(".icon").attr('src','../assets/images/fileicon/icons8_zip.svg');
                }
                else if (extension == 'csv') {
                  $(input).closest('.fileUpload').find(".icon").attr('src','../assets/images/fileicon/icons8_csv.svg');
                }
                else if (extension == 'xlsx') {
                  $(input).closest('.fileUpload').find(".icon").attr('src','../assets/images/fileicon/icons8_xls.svg');
                }
                else {
                	//console.log('here=>'+$(input).closest('.uploadDoc').length);
                	$(input).closest('.uploadDoc').find(".docErr").slideUp('slow');
                }
            }

            reader.readAsDataURL(input.files[0]);
        }
        else {
        		//console.log('here=>'+$(input).closest('.uploadDoc').find(".docErr").length);
            $(input).closest('.uploadDoc').find(".docErr").fadeIn();
            setTimeout(function() {
				   	$('.docErr').fadeOut('slow');
					}, 9000);
        }
    }
}
$(document).ready(function(){
   
   $(document).on('change','.up', function(){
   	var id = $(this).attr('id'); /* gets the filepath and filename from the input */
	   var profilePicValue = $(this).val();
	   var fileNameStart = profilePicValue.lastIndexOf('\\'); /* finds the end of the filepath */
	   profilePicValue = profilePicValue.substr(fileNameStart + 1).substring(0,20); /* isolates the filename */
	   //var profilePicLabelText = $(".upl"); /* finds the label text */
	   if (profilePicValue != '') {
	   	//console.log($(this).closest('.fileUpload').find('.upl').length);
	      $(this).closest('.fileUpload').find('.upl').html(profilePicValue); /* changes the label text */
	   }
   });

   $(".btn-new").on('click',function(){
      if($('.uploadDoc').length < 4) {
        $("#uploader").append('<div class="row uploadDoc"><div class="col-sm-3"><div class="docErr">لطفا یک نوع فابل قابل قبول آپلود کنید</div><!--error--><div class="fileUpload btn btn-orange"> <img src="https://image.flaticon.com/icons/svg/136/136549.svg" class="icon"><span class="upl text-dark pr-3" id="upload">آپلود فایل</span><input type="file" class="upload up" id="up" onchange="readURL(this);" /></div></div><div class="col-sm-8"><input type="text" class="form-control" style="border-bottom: 1px solid var(--secondary) !important;" name="" placeholder="توضیحات"></div><div class="col-sm-1"><a class="btn-check"><i class="mdi mdi-close"></i></a></div></div>');
      } else if ($('.uploadDoc').length == 4) {
        $("#uploader").append('<div class="row uploadDoc"><div class="col-sm-3"><div class="docErr">لطفا یک نوع فابل قابل قبول آپلود کنید</div><!--error--><div class="fileUpload btn btn-orange"> <img src="https://image.flaticon.com/icons/svg/136/136549.svg" class="icon"><span class="upl text-dark pr-3" id="upload">آپلود فایل</span><input type="file" class="upload up" id="up" onchange="readURL(this);" /></div></div><div class="col-sm-8"><input type="text" class="form-control" style="border-bottom: 1px solid var(--secondary) !important;" name="" placeholder="توضیحات"></div><div class="col-sm-1"><a class="btn-check"><i class="mdi mdi-close"></i></a></div></div>');
        $(".btn-new").remove();
      }
    });
    
   $(document).on("click", "a.btn-check" , function() {
     if($(".uploadDoc").length>1){
        $(this).closest(".uploadDoc").remove();
      }else{
        alert("نمی توان فایل آخر آپلود را حذف کرد");
      } 
   });
});