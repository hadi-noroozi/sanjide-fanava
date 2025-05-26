<?php
      require_once('../../inc/config.php');
?>

const popupData = [{
id: "1",
name: "لیست قفسه",
title: "",
data: [],
cols: [],
},
{
id: "2",
name: "انبارها",
title: "storage",
data: [],
cols: [],
},
{
id: "3",
name: "لیست قالب",
title: "ingot",
data: <?php 
                  $select_ingot="SELECT 
                                  `ingot_id` AS id, `ingot_code` AS FormatId,
                                  `ingot_name` AS FormatTitle, `status` 
                                  FROM `base_ingot` 
                                  WHERE 1";
                  $result_ingot=mysqli_query($db,$select_ingot);
                  while($row_ingot=mysqli_fetch_assoc($result_ingot)):
                    if($row_ingot['status']==1){$row_ingot['status']=true;}else{$row_ingot['status']=false;}
                    $ingot_data[]=$row_ingot;
                  endwhile;
                  echo json_encode($ingot_data,JSON_UNESCAPED_UNICODE);
              ?>,
cols: [{
dataField: "id",
caption: "ردیف",
alignment: "center",
width: 65,
allowEditing: false,
visible: false,
},
{
dataField: "FormatId",
caption: "کد قالب",
alignment: "center",
width: 80,
validationRules: [{
type: "required",
message: "ثبت این ورودی الزامی است!",
}, ],
},
{
dataField: "FormatTitle",
caption: "عنوان قالب",
alignment: "center",
validationRules: [{
type: "required",
message: "ثبت این ورودی الزامی است!",
}, ],
},
{
dataField: "status",
caption: "فعال",
alignment: "center",
width: 60,
allowFiltering: false,
cellTemplate(container, options) {
if (options.value) {
$("<i>", {
    class: `mdi mdi-check text-success`,
    }).appendTo(container);
    } else {
    $("<i>", {
        class: `mdi mdi-close text-danger`,
        }).appendTo(container);
        }
        },
        },
        ],
        },
        {
        id: "4",
        name: "دپارتمان ها",
        title: "department",
        data: <?php 
                  $select_department="SELECT 
                                  `department_id` AS id , `department_name` AS departmentTitle,`status` 
                                  FROM `base_department` WHERE 1";
                  $result_department=mysqli_query($db,$select_department);
                  while($row_department=mysqli_fetch_assoc($result_department)):
                    if($row_department['status']==1){$row_department['status']=true;}else{$row_department['status']=false;}
                    $department_data[]=$row_department;
                  endwhile;
                  echo json_encode($department_data,JSON_UNESCAPED_UNICODE);
              ?>,
        cols: [{
        dataField: "id",
        caption: "ردیف",
        alignment: "center",
        width: 65,
        allowEditing: false,
        visible: false,
        },
        {
        dataField: "departmentTitle",
        caption: "عنوان دپارتمان",
        alignment: "center",
        validationRules: [{
        type: "required",
        message: "ثبت این ورودی الزامی است!",
        }, ],
        },
        {
        dataField: "status",
        caption: "فعال",
        alignment: "center",
        width: 60,
        allowFiltering: false,
        cellTemplate(container, options) {
        if (options.value) {
        $("<i>", {
            class: `mdi mdi-check text-success`,
            }).appendTo(container);
            } else {
            $("<i>", {
                class: `mdi mdi-close text-danger`,
                }).appendTo(container);
                }
                },
                },
                ],
                },
                {
                id: "5",
                name: "نوع سند",
                title: "doc_type",
                data: <?php 
                  $select_doc_type="SELECT `doc_type_id` AS id , `doc_type_name` AS documentTitle, `status` FROM `base_doc_type` WHERE 1";
                  $result_doc_type=mysqli_query($db,$select_doc_type);
                  while($row_doc_type=mysqli_fetch_assoc($result_doc_type)):
                    if($row_doc_type['status']==1){$row_doc_type['status']=true;}else{$row_doc_type['status']=false;}
                    $doc_type_data[]=$row_doc_type;
                  endwhile;
                  echo json_encode($doc_type_data,JSON_UNESCAPED_UNICODE);
              ?>,
                // data: [{
                // id: 1,
                // documentTitle: "ارسال امانی ما نزد دیگران",
                // status: true,
                // },
                // {
                // id: 2,
                // documentTitle: "ارسال به تولید",
                // status: true,
                // },
                // {
                // id: 3,
                // documentTitle: "برگشت از فروش",
                // status: true,
                // },
                // {
                // id: 4,
                // documentTitle: "برگشت از مصرف پروژه",
                // status: true,
                // },
                // {
                // id: 5,
                // documentTitle: "برگشت از مصرف مرکز",
                // status: true,
                // },
                // {
                // id: 6,
                // documentTitle: "تحویل فروش",
                // status: true,
                // },
                // ],
                cols: [{
                dataField: "id",
                caption: "ردیف",
                alignment: "center",
                width: 65,
                allowEditing: false,
                visible: false,
                },
                {
                dataField: "documentTitle",
                caption: "عنوان سند",
                alignment: "center",
                validationRules: [{
                type: "required",
                message: "ثبت این ورودی الزامی است!",
                }, ],
                },
                {
                dataField: "status",
                caption: "فعال",
                alignment: "center",
                width: 60,
                allowFiltering: false,
                cellTemplate(container, options) {
                if (options.value) {
                $("<i>", {
                    class: `mdi mdi-check text-success`,
                    }).appendTo(container);
                    } else {
                    $("<i>", {
                        class: `mdi mdi-close text-danger`,
                        }).appendTo(container);
                        }
                        },
                        },
                        ],
                        },
                        {
                        id: "6",
                        name: "واحدها",
                        title: "unit",
                        data: <?php 
                  $select_unit="SELECT 
                                          `unit_id` AS id,
                                          `unit_name_fa` AS unitTitle,
                                          `status` 
                                        FROM `base_unit` WHERE 1";
                  $result_unit=mysqli_query($db,$select_unit);
                  while($row_unit=mysqli_fetch_assoc($result_unit)):
                    if($row_unit['status']==1){$row_unit['status']=true;}else{$row_unit['status']=false;}
                    $unit_data[]=$row_unit;
                  endwhile;
                  echo json_encode($unit_data,JSON_UNESCAPED_UNICODE);
              ?>,
                        cols: [{
                        dataField: "id",
                        caption: "ردیف",
                        alignment: "center",
                        width: 65,
                        allowEditing: false,
                        visible: false,
                        },
                        {
                        dataField: "unitTitle",
                        caption: "عنوان واحد",
                        alignment: "center",
                        validationRules: [{
                        type: "required",
                        message: "ثبت این ورودی الزامی است!",
                        }, ],
                        },
                        {
                        dataField: "status",
                        caption: "فعال",
                        alignment: "center",
                        width: 60,
                        allowFiltering: false,
                        cellTemplate(container, options) {
                        if (options.value) {
                        $("<i>", {
                            class: `mdi mdi-check text-success`,
                            }).appendTo(container);
                            } else {
                            $("<i>", {
                                class: `mdi mdi-close text-danger`,
                                }).appendTo(container);
                                }
                                },
                                },
                                ],
                                },
                                {
                                id: "7",
                                name: "علل توقف",
                                title: "stopCause",
                                data: <?php 
                  $select_stop="SELECT 
                                `stop_cause_id` AS id,
                                `stop_cause_name` AS stopTitle,
                                `status` 
                                FROM `base_stop_cause` WHERE 1";
                  $result_stop=mysqli_query($db,$select_stop);
                  while($row_stop=mysqli_fetch_assoc($result_stop)):
                    if($row_stop['status']==1){$row_stop['status']=true;}else{$row_stop['status']=false;}
                    $stop_data[]=$row_stop;
                  endwhile;
                  echo json_encode($stop_data,JSON_UNESCAPED_UNICODE);
              ?>,
                                cols: [{
                                dataField: "id",
                                caption: "ردیف",
                                alignment: "center",
                                width: 65,
                                allowEditing: false,
                                visible: false,
                                },
                                {
                                dataField: "stopTitle",
                                caption: "عنوان علت توقف",
                                alignment: "center",
                                validationRules: [{
                                type: "required",
                                message: "ثبت این ورودی الزامی است!",
                                }, ],
                                },
                                {
                                dataField: "status",
                                caption: "فعال",
                                alignment: "center",
                                width: 60,
                                allowFiltering: false,
                                cellTemplate(container, options) {
                                if (options.value) {
                                $("<i>", {
                                    class: `mdi mdi-check text-success`,
                                    }).appendTo(container);
                                    } else {
                                    $("<i>", {
                                        class: `mdi mdi-close text-danger`,
                                        }).appendTo(container);
                                        }
                                        },
                                        },
                                        ],
                                        },
                                        {
                                        id: "8",
                                        name: "علل عدم انطباق",
                                        title: "errorCause",
                                        data: <?php 
                  $select_error="SELECT `error_cause_id` AS id,
                                  `error_cause_name` AS notEqualTitle,
                                  `status` 
                                  FROM `base_error_cause` 
                                  WHERE 1";
                  $result_error=mysqli_query($db,$select_error);
                  while($row_error=mysqli_fetch_assoc($result_error)):
                    if($row_error['status']==1){$row_error['status']=true;}else{$row_error['status']=false;}
                    $error_data[]=$row_error;
                  endwhile;
                  echo json_encode($error_data,JSON_UNESCAPED_UNICODE);
              ?>,
                                        // data: [{
                                        // id: 1,
                                        // notEqualTitle: "اپراتور",
                                        // status: true,
                                        // },
                                        // {
                                        // id: 2,
                                        // notEqualTitle: "قالب",
                                        // status: true,
                                        // },
                                        // {
                                        // id: 3,
                                        // notEqualTitle: "دستگاه",
                                        // status: true,
                                        // },
                                        // {
                                        // id: 4,
                                        // notEqualTitle: "مواد اولیه",
                                        // status: true,
                                        // },
                                        // ],
                                        cols: [{
                                        dataField: "id",
                                        caption: "ردیف",
                                        alignment: "center",
                                        width: 65,
                                        allowEditing: false,
                                        visible: false,
                                        },
                                        {
                                        dataField: "notEqualTitle",
                                        caption: "عنوان علت عدم انطباق",
                                        alignment: "center",
                                        validationRules: [{
                                        type: "required",
                                        message: "ثبت این ورودی الزامی است!",
                                        }, ],
                                        },
                                        {
                                        dataField: "status",
                                        caption: "فعال",
                                        alignment: "center",
                                        width: 60,
                                        allowFiltering: false,
                                        cellTemplate(container, options) {
                                        if (options.value) {
                                        $("<i>", {
                                            class: `mdi mdi-check text-success`,
                                            }).appendTo(container);
                                            } else {
                                            $("<i>", {
                                                class: `mdi mdi-close text-danger`,
                                                }).appendTo(container);
                                                }
                                                },
                                                },
                                                ],
                                                },
                                                {
                                                id: "9",
                                                name: "سایر کارها",
                                                title: "otherWorks",
                                                data:<?php 
                                                          $select_other_works="SELECT other_work_id AS id, other_work_name AS Title, status FROM `base_other_works` WHERE status=1";
                                                          $result_other_works=mysqli_query($db,$select_other_works);
                                                          if(mysqli_num_rows($result_other_works)>0):
                                                            while($row_other_works=mysqli_fetch_assoc($result_other_works)):
                                                              if($row_other_works['status']==1){$row_other_works['status']=true;}else{$row_other_works['status']=false;}
                                                              $other_works[]=$row_other_works;
                                                            endwhile;
                                                          else:
                                                            $other_works=[];
                                                          endif;
                                                          echo json_encode($other_works,JSON_UNESCAPED_UNICODE);
                                                      ?> ,
                                                cols: [
                                                {
                                                dataField: "id",
                                                caption: "ردیف",
                                                alignment: "center",
                                                width: 65,
                                                allowEditing: false,
                                                visible: false,
                                                },
                                                {
                                                dataField: "Title",
                                                caption: "عنوان کار",
                                                alignment: "center",
                                                validationRules: [
                                                {
                                                type: "required",
                                                message: "ثبت این ورودی الزامی است!",
                                                },
                                                ],
                                                },
                                                {
                                                dataField: "status",
                                                caption: "فعال",
                                                alignment: "center",
                                                width: 60,
                                                allowFiltering: false,
                                                cellTemplate(container, options) {
                                                if (options.value) {
                                                $("<i>", {
                                                    class: `mdi mdi-check text-success`,
                                                    }).appendTo(container);
                                                    } else {
                                                    $("<i>", {
                                                        class: `mdi mdi-close text-danger`,
                                                        }).appendTo(container);
                                                        }
                                                        },
                                                        },
                                                        ],
                                                        },
                                                        ];

                                                        function popupSection(opt) {
                                                        $(".dx-viewport").append("<div id='popup'></div>");

                                                        $("#popup").dxPopup({
                                                        width: "500",
                                                        height: 565,
                                                        visible: true,
                                                        showTitle: true,
                                                        rtlEnabled: true,
                                                        title: opt.name,
                                                        closeOnOutsideClick: false,
                                                        showCloseButton: true,
                                                        onHidden() {
                                                        $("#popup").remove();
                                                        },
                                                        contentTemplate: popupContentTemplate(),
                                                        container: ".dx-viewport",
                                                        });

                                                        $("#datagrid").dxDataGrid({
                                                        dataSource: opt.data,
                                                        keyExpr: "id",
                                                        showBorders: true,
                                                        hoverStateEnabled: true,
                                                        rowAlternationEnabled: true,
                                                        rtlEnabled: true,
                                                        autoNavigateToFocusedRow: true,
                                                        allowColumnReordering: true,
                                                        allowColumnResizing: true,
                                                        columnAutoWidth: true,
                                                        noDataText: "داده ای جهت نمایش موجود نیست",
                                                        width: "100%",
                                                        height: 485,
                                                        paging: {
                                                          pageSize: "all",
                                                        },
                                                        filterRow: {
                                                            visible: true,
                                                        },
                                                        headerFilter: {
                                                            visible: false,
                                                        },                                                        
                                                        loadPanel: {
                                                        enabled: true,
                                                        },
                                                        scrolling: {
                                                        mode: "infinite",
                                                        },
                                                        editing: {
                                                        allowUpdating: true,
                                                        allowDeleting: false,
                                                        allowAdding: true,
                                                        useIcons: true,
                                                        },
                                                        columns: opt.cols,
                                                        onRowInserted(e) {
                                                        const body = e.data;
                                                        body.request = opt.title;
                                                        body.type = "new";
                                                        $.post("API/v0.1/controller.php", body)
                                                        .done(function(response) {
                                                        if (response.status == 200) {
                                                        DevExpress.ui.notify({
                                                        message: `
                                                        ${opt.name} مورد نظر شما ثبت گردید
                                                        `,
                                                        width: 320,
                                                        },
                                                        "success",
                                                        1000
                                                        );
                                                        setTimeout(() => {
                                                        location.reload();
                                                        }, 2000);
                                                        } else {
                                                        DevExpress.ui.notify({
                                                        message: `فرآیند ثبت این ${opt.name} با خطا مواجه شد`,
                                                        width: 320,
                                                        },
                                                        "error",
                                                        1000
                                                        );
                                                        setTimeout(() => {
                                                        location.reload();
                                                        }, 2000);
                                                        }
                                                        })
                                                        .fail(function(response) {
                                                        DevExpress.ui.notify({
                                                        message: `فرآیند ثبت این ${opt.name} با خطا مواجه شد`,
                                                        width: 320,
                                                        },
                                                        "error",
                                                        30000
                                                        );
                                                        setTimeout(() => {
                                                        location.reload();
                                                        }, 2000);
                                                        });
                                                        },
                                                        onRowUpdated(e) {
                                                        const body = e.data;
                                                        body.request = opt.title;
                                                        body.type = "update";
                                                        $.post("API/v0.1/controller.php", body)
                                                        .done(function(response) {
                                                        if (response.status == 200) {
                                                        DevExpress.ui.notify({
                                                        message: `
                                                        ${opt.name} مورد نظر شما بروزرسانی گردید
                                                        `,
                                                        width: 320,
                                                        },
                                                        "success",
                                                        1000
                                                        );
                                                        setTimeout(() => {
                                                        location.reload();
                                                        }, 2000);
                                                        } else {
                                                        DevExpress.ui.notify({
                                                        message: `فرآیند بروزرسانی این ${opt.name} با خطا مواجه شد`,
                                                        width: 320,
                                                        },
                                                        "error",
                                                        1000
                                                        );
                                                        setTimeout(() => {
                                                        location.reload();
                                                        }, 2000);
                                                        }
                                                        })
                                                        .fail(function(response) {
                                                        DevExpress.ui.notify({
                                                        message: `فرآیند بروزرسانی این ${opt.name} با خطا مواجه شد`,
                                                        width: 320,
                                                        },
                                                        "error",
                                                        30000
                                                        );
                                                        setTimeout(() => {
                                                        location.reload();
                                                        }, 2000);
                                                        });
                                                        },
                                                        });
                                                        }

                                                        function popupContentTemplate() {
                                                        content = `
                                                        <div class="container-fluid px-0">
                                                            <div class="row">
                                                                <div class="col-12 px-0 ">
                                                                    <div id="datagrid">

                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        `;
                                                        return $("<div>").append(content);
                                                            }