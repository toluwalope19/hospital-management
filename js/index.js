$(function(){
//TO GET PATIENTS
let getPatients = () =>{

    $.ajax({
    type: 'GET',
    url: 'http://localhost:3000/Patients',
    dataType: 'json',
    contentType: 'application/json',
    success: function(data) {
        var patient_data= '';

            for(i=0; i<data.length; i++){
                patient_data += '<tr>';
                patient_data += '<td>' +data[i].name+ '</td>';
                patient_data += '<td>' +data[i].email+ '</td>';
                patient_data += '<td>' +data[i].ailment+ '</td>';
                patient_data += '<td>' +data[i].status+ '</td>';
                patient_data += '<td>' +data[i].fees+ '</td>';    
                patient_data +=  `<td><button class="btn btn-primary"> <a style="color:white; text-decoration:none; font-size:12px"  href="patient-id.html?`+data[i].id+`">Edit</a></button></td>`   
                patient_data += '</tr>';

            }
            
                    $('#listPatients').append(patient_data);
    },
    error:function(err){
        console.log(err)
    }
})
}
getPatients();












//////GET A PATIENT DETAILS


var id=location.search.substring(1);
// console.log(query)



    $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/Patients/'+id,
        dataType: 'json',
        contentType: 'application/json',
        data:{
            format:'json'
        },
        success: function(data) {
                console.log(data)
            var div= $('.patientId');
            var patient_data=
            
            `
            <div class="row">
                <div class="col-lg-8">
                    <div class="card">
                    <div class="card-body">
                        <h3 class="card-title">`+data.name+`</h3>
             <table class="table table-bordered">
                <thead>
                    <tr>
                    <th scope="col">Email</th>
                    <th scope="col">Ailment</th>
                    <th scope="col">Status</th>
                    <th scope="col">Fees</th>
                    </tr>
                </thead>
                        <tbody>
                            <tr>
                            <th scope="row">`+data.email+`</th>
                            <td>`+data.ailment+`</td>
                            <td>`+data.status+`</td>
                            <td>`+data.fees+`</td>
                            </tr>
                        </tbody>
                </table>
                        <a  id="delete" class="btn btn-danger" >Delete</a>
                        <a data-toggle="modal" class="btn btn-success" href="update.html?`+data.id+`" >Edit</a>



                        
                        
                        
                        
                    </div>
                    </div>
                </div>
             </div>
            `

            div.append(patient_data);
        },
        error:function(err){
            console.log(err)
        }
    });






////UPDATE PATIENT
$('#update-patient').submit(function(e){

    e.preventDefault();
    $.ajax({
            url:"http://localhost:3000/Patients/"+id,
            dataType: 'json',
            type: 'put',
            contentType: 'application/json',
            data: JSON.stringify({
                "name": $('#name').val(),
                "email": $('#email').val(),
                "ailment": $('#ailment').val(),
                "status": $('#status').val(),
                "fees": $('#fees').val(),
    
            }),
            processData: false,
            success: function(){
                alert("patient updated successfully");
                window.addEventListener.assign('http://localhost:3000/patients.html')
            },
            error: function(err){
                console.log(err);
            }
    
    });

});










//CREATE A PATIENT AND GET ON A TABLE
    $('#submit').on('click', function(event){

        event.preventDefault();


        var newPatient= {
            name: $('#name').val(),
            email: $('#email').val(),
            ailment: $('#ailment').val(),
            status: $('#status').val(),
            fees: $('#fees').val(),
               
        }

        $.ajax({
            type: 'POST',
            data:JSON.stringify(newPatient),
            url: 'http://localhost:3000/Patients',
            dataType: 'json',
            contentType: 'application/json',
            success: function() {
                getPatients();
            },
            error:function(err){
                console.log(err)
            }
        })
    }
    )











///ADD ADMIN /REGISTER ADMIN

    $('#signUp').on('click', function(event){

        event.preventDefault();


        var admin= {
            name: $('#username').val(),
            password: $('#password').val(),
            
        }

        $.ajax({
            type: 'POST',
            data:JSON.stringify(admin),
            url: 'http://localhost:3000/Admin',
            dataType: 'json',
            contentType: 'application/json',
            success: function() {
                var div= $('.successAd');
                    var succ=

               `<span class="alert alert-success alert-dismissible fade show" role="alert">You've successfully added Admin</span>`
               
    div.append(succ);
            },
            error:function(err){
                console.log(err)
            }
        })
    }
    )





    










    

    $('#logIn').on('click', function(event){

        event.preventDefault();


        var admin= {
            name: $('#user').val(),
            password: $('#pass').val(),
            
        }
    $.ajax({
            type: 'GET',
            url: 'http://localhost:3000/Admin',
            dataType: 'json',
            async: false,
            username:name,
            password:password,
            contentType: 'application/json',
            data: {
                format:'json'
            },
            success: function(admin) {
                    var admin_info="";

                    for(i=0; i<admin.length; i++){
                        if(admin[i].name===(name) && admin[i].password===(password)){
                                window.location.href="file:///C:/Users/QuickPath/Desktop/decagon-project/hospital-management/index.html"
                        }else{
                            var div= $('.successAd');
                    var succ=

               `<span class="alert alert-danger alert-dismissible fade show" role="alert">Incorrect details</span>`
               
                        div.append(succ);
                        }
                    }
                    
            },
            error:function(err){
                console.log(err)
            }
        })
    })
   










    // $.ajax({
    //     type: 'GET',
    //     url: 'http://localhost:3000/Patients'/ + id,
    //     dataType: 'json',
    //     contentType: 'application/json',
    //     success: function(data) {
            
    //         var formData= '';
    
    //             for(i=0; i<data.length; i++){
    //                 form += '<form>';
    //                 patient_data += '<td>' +data[i].name+ '</td>'; <input type="text" class="form-control" id="ailment"  placeholder="Ailment">
    //                 patient_data += '<td>' +data[i].email+ '</td>';
    //                 patient_data += '<td>' +data[i].ailment+ '</td>';
    //                 patient_data += '<td>' +data[i].status+ '</td>';
    //                 patient_data += '<td>' +data[i].fees+ '</td>';    
    //                 patient_data +=  `<td><button> <a href="patient-id.html?" `+data[i].id+`>Edit</a></button></td>`   
    //                 patient_data += '</tr>';
    
    //             }
                
    //                     $('#listPatients').append(patient_data);
    //     },
    //     error:function(err){
    //         console.log(err)
    //     }
    // })









    //delete patient


    $('#delete').on('click', function(event){

        event.preventDefault();



    $.ajax({

        url: 'http://localhost:3000/Patients'/ + id,
        type: 'DELETE',
        success: function(data){
            alert(data)
        }
    })
    })
})






$('#delete').on('click',function(){

    var id = location.search.substring(1);
    console.log(id);
      $.ajax({
        url:"http://localhost:3000/Patients"+id,
        dataType:"json",
        type:'DELETE',     
        success:function(){
          alert("Product Deleted")
         window.location.assign('http://localhost:3000/patients.html');
      }
      }); 
  });







    // $('#signUp').on('click', function(event){

    //     event.preventDefault();


    //     var admin= {
    //         name: $('#username').val(),
    //         password: $('#password').val(),
            
    //     }

    //     $.ajax({
    //         type: 'POST',
    //         data:JSON.stringify(admin),
    //         url: 'http://localhost:3000/Admin',
    //         dataType: 'json',
    //         contentType: 'application/json',
    //         success: function() {
    //             var div= $('.successAd');
    //                 var succ=

    //            `<span class="alert alert-success alert-dismissible fade show" role="alert">You've successfully added Admin</span>`
               
    // div.append(succ);
    //         },
    //         error:function(err){
    //             console.log(err)
    //         }
    //     })
    // }
    // )





    












    // $('#logIn').on('click', function(event){

    //     event.preventDefault();


    //     var admin= {
    //         name: $('#user').val(),
    //         password: $('#pass').val(),
            
    //     }
    // $.ajax({
    //         type: 'GET',
    //         url: 'http://localhost:3000/Admin',
    //         dataType: 'json',
    //         async: false,
    //         username:name,
    //         password:password,
    //         contentType: 'application/json',
    //         data: {
    //             format:'json'
    //         },
    //         success: function(admin) {
    //                 var admin_info="";

    //                 for(i=0; i<admin.length; i++){
    //                     if(admin[i].name===(name) && admin[i].password===(password)){
    //                             window.location.href="file:///C:/Users/QuickPath/Desktop/decagon-project/hospital-management/index.html"
    //                     }else{
    //                         var div= $('.successAd');
    //                 var succ=

    //            `<span class="alert alert-danger alert-dismissible fade show" role="alert">Incorrect details</span>`
               
    //                     div.append(succ);
    //                     }
    //                 }
                    
    //         },
    //         error:function(err){
    //             console.log(err)
    //         }
    //     })
    // })
   

    

    //         var admin_data= '';
    
    //             for(i=0; i<data.length; i++){
    //                 _data += '<tr>';
    //                 admin_data += '<td>' +result[i].name+ '</td>';
    //                 admin_data += '<td>' +result[i].password+ '</td>';
    //                 patient_data += '<td>' +data[i].ailment+ '</td>';
    //                 patient_data += '<td>' +data[i].status+ '</td>';
    //                 patient_data += '<td>' +data[i].fees+ '</td>';    
    //                 patient_data +=  `<td><button> <a href="patient-id.html?" `+data[i].id+`>Edit</a></button></td>`   
    //                 patient_data += '</tr>';
    
    //             }
                
    //                     $('#listPatients').append(patient_data);
    //     },
    //     error:function(err){
    //         console.log(err)
    //     }
    // })


    //pick one patient
   






// var userId=location.search.substring(1);
//     console.log(query)
// $.ajax({
 

//     url:"http://localhost:3000/user/"+userId,
//     dataType:"json",
//     contentType:'application/json',
//     data:{
//        format: 'json'
//     },
//     // dataType:'jsonp',

//     success:function(data){
//         console.log(data);
//         var div = $(".freelancer");

            
//                 var string=
//                 `<ul>
//                 <li>`+data.id +`</li>
//                 <li>`+data.firstname+ `</li>
//                 <li>`+data.lastname+ `</li>
//                 </ul>`;

//                 // li.innerHTML = 
//                 div.append(string);
                
                
            
        
//     },
//     type:'GET',
// });  