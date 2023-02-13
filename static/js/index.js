let state = localStorage.getItem('state');
let submitted = document.getElementById('submitted');
submitted.style.display = 'none';
var profilePhoto = document.getElementById('profilePhoto');
var profilePhotoPreview = document.getElementById('profilePhotoPreview');
var pout_year = document.getElementById("pout_year");
var adm_year = document.getElementById("adm_year");
var alert = document.getElementById('alert');
var form = document.querySelector('#alumani-form');
let submitbtn = document.getElementById('submitbtn');

pout_year.max = (new Date()).getFullYear();
adm_year.max = (new Date()).getFullYear();

if (state == 'submitted') {
    form.style.display = "none";
    submitted.style.display = '';
}
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    submitbtn.setAttribute('disabled', true);
    let uniqueId = form.adm_year.value + form.email.value;
    let data = {
        uniqueId,
        name: form.name.value,
        enrollementno: form.enr_no.value,
        admissionyear: form.adm_year.value,
        passoutyear: form.pout_year.value,
        college: form.college.value,
        course: form.course.value,
        mobileno: form.mobileno.value,
        email: form.email.value,
        facebookid: form.facebookid.value,
        linkedinid: form.linkedinid.value,
        companyname: form.companyname.value,
        designation: form.designation.value,
        workinglocation: form.workinglocation.value,
        permanentaddress: form.permanentaddress.value,
        localaddress: form.localaddress.value
    }
    let res = await submitForm(data);
    res.json().then(async (d) => {
        let img = await uploadImage(d.data.id);
        if (res.status == 200 && img.status == 200) {
            localStorage.setItem('state', 'submitted');
            form.style.display = "none";
            submitted.style.display = '';
            form.reset();
        }
        else if (img.status != 200) {
            alertBox("Not able to upload profile photo");
            localStorage.setItem('state', 'submitted');
            form.style.display = "none";
            submitted.style.display = '';
            form.reset();
        } else {
            alertBox("Server error, try again after some time");
            form.reset();
        }
    });
});

async function uploadImage(Id) {
    const ImageData = new FormData();
    ImageData.append('file', profilePhoto.files[0]);
    let img = await fetch('/uploadImage', {
        method: 'POST',
        body: ImageData,
        headers: {
            'uniqueId': Id
        }
    });
    return img;
}

async function submitForm(data){
    let res = await fetch('/alumni', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', }
    });
    return res;
}

async function submitProfilePhoto(event) {
    profilePhotoPreview.src = URL.createObjectURL(event.target.files[0]);
    let fileSize = event.target.files[0].size;
    let fileMb = fileSize / 1024 ** 2;
    if (fileMb > 0.5) {
        profilePhotoPreview.src = "../static/default_profile_photo.webp";
        alertBox("select the image with a size up to 500Kb");
    }
}

function anotherResponse() {
    localStorage.removeItem('state');
    form.style.display = "";
    submitted.style.display = 'none';
    document.getElementById('submitbtn').removeAttribute('disabled');
}

function alertBox(msg) {
    alert.innerHTML = msg;
    alert.style.display = '';
    setTimeout(() => {
        alert.style.display = 'none';
    }, 3000);
}
