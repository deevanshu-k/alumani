let state = localStorage.getItem('state');
let uId = localStorage.getItem('uniqueId');
let submitted = document.getElementById('submitted');
let uniqueIdDisplay = document.getElementById('uniqueIdDisplay');
uniqueIdDisplay.innerText = uId || '0000XX0000';
var profilePhoto = document.getElementById('profilePhoto');
var profilePhotoPreview = document.getElementById('profilePhotoPreview');
var pout_year = document.getElementById("pout_year");
var adm_year = document.getElementById("adm_year");
var alert = document.getElementById('alert');
var form = document.querySelector('#alumani-form');
let submitbtn = document.getElementById('submitbtn');
let submitbtnspinner = document.getElementById('submitbtnspinner');
let countrySelect = document.getElementById('countrySelect');
let stateSelect = document.getElementById('stateSelect');
let citySelect = document.getElementById('citySelect');
let textAreaMsg = document.getElementById('textAreaMsg');

pout_year.max = (new Date()).getFullYear();
adm_year.max = (new Date()).getFullYear();

if (state == 'submitted') {
    form.style.display = "none";
    submitted.style.display = '';
}
else {
    form.style.display = "";
    submitted.style.display = 'none';
}
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    submitbtnspinner.style.display = '';
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
        workinglocation: form.country.value+','+form.state.value+','+form.city.value,
        permanentaddress: form.permanentaddress.value,
        localaddress: form.localaddress.value,
        msg: form.textAreaMsg.value
    }
    let res = await submitForm(data);
    res.json().then(async (d) => {
        let img = await uploadImage(d.data.id);
        if (res.status == 200 && img.status == 200) {
            localStorage.setItem('state', 'submitted');
            localStorage.setItem('uniqueId', d.data.uniqueId);
            form.style.display = "none";
            uniqueIdDisplay.innerText = d.data.uniqueId;
            submitted.style.display = '';
            submitbtnspinner.style.display = 'none';
            form.reset();
        }
        else if (img.status != 200) {
            alertBox("Not able to upload profile photo");
            localStorage.setItem('state', 'submitted');
            localStorage.setItem('uniqueId', d.data.uniqueId);
            form.style.display = "none";
            uniqueIdDisplay.innerText = d.data.uniqueId;
            submitted.style.display = '';
            submitbtnspinner.style.display = 'none';
            form.reset();
        } else {
            alertBox("Server error, try again after some time");
            submitbtnspinner.style.display = 'none';
            form.reset();
        }
    });
});

async function uploadImage(Id) {
    const ImageData = new FormData();
    ImageData.append('file', profilePhoto.files[0]);
    let img = await fetch('/alumni/uploadImage', {
        method: 'POST',
        body: ImageData,
        headers: {
            'uniqueId': Id
        }
    });
    return img;
}

async function fetchState() {
    let option = document.createElement("option");
    option.innerText = 'State *';
    option.value = "";
    stateSelect.replaceChildren(option);

    let option2 = document.createElement("option");
    option2.innerText = 'City *';
    option2.value = "";
    citySelect.replaceChildren(option2);
    if(countrySelect.value != ''){
        let res = await fetch('/v1/api/states/' + countrySelect.value, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        res.json().then(d => {
            d.forEach(s => {
                let option = document.createElement("option");
                option.innerText = s.name;
                option.value = s.isoCode;
                stateSelect.appendChild(option);
            });
            console.log(d);
        }).catch((e) => {
            alertBox('Server error, try again after some time...')
        })
    }
}

async function  fetchCity() {
    let option = document.createElement("option");
    option.innerText = 'City *';
    option.value = "";
    citySelect.replaceChildren(option);
    if(countrySelect.value != '' && stateSelect.value != ''){
        let res = await fetch(`/v1/api/cities/${countrySelect.value}/${stateSelect.value}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        res.json().then(d => {
            d.forEach(c => {
                let option = document.createElement("option");
                option.innerText = c;
                option.value = c;
                citySelect.appendChild(option);
            });
            console.log(d);
        }).catch((e) => {
            alertBox('Server error, try again after some time...')
        })
    }
}

async function submitForm(data) {
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
    if (fileMb > 0.05) {
        profilePhotoPreview.src = "../static/default_profile_photo.webp";
        alertBox("select the image with a size up to 50Kb");
    }
}

function anotherResponse() {
    localStorage.removeItem('state');
    form.style.display = "";
    submitbtnspinner.style.display = 'none';
    uniqueIdDisplay.innerText = '0000XX0000';
    localStorage.setItem('uniqueId', '0000XX0000')
    submitted.style.display = 'none';
    document.getElementById('submitbtn').removeAttribute('disabled');
}

function copyToClipboard() {
    let text = uniqueIdDisplay.innerText;
    if (window.isSecureContext && navigator.clipboard) {
        navigator.clipboard.writeText(text);
        alertBox("Copied the text: " + text);
    } else {
        alertBox("Unable to copy to clipboard");
    }
}

function alertBox(msg) {
    alert.innerHTML = msg;
    alert.style.display = '';
    setTimeout(() => {
        alert.style.display = 'none';
    }, 3000);
}
