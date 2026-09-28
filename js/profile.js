
let profilePic = document.querySelector(".no__img");

let inputFile = document.querySelector("#input-file");

let no__imgss = document.querySelector(".no__imgs");

let sign__img = document.querySelector("#sign__imgu");


inputFile.onchange = function() {
    profilePic.src = URL.createObjectURL(inputFile.files[0]);

    no__imgss.src = URL.createObjectURL(inputFile.files[0]);

    sign__img.src = URL.createObjectURL(inputFile.files[0]);
}