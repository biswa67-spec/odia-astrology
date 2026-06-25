// =============================
// ରାଶି ତାଲିକା
// =============================

const rashiList = [
"ମେଷ",
"ବୃଷ",
"ମିଥୁନ",
"କର୍କଟ",
"ସିଂହ",
"କନ୍ୟା",
"ତୁଳା",
"ବିଛା",
"ଧନୁ",
"ମକର",
"କୁମ୍ଭ",
"ମୀନ"
];

// =============================
// ନକ୍ଷତ୍ର ତାଲିକା
// =============================

const nakshatraList = [
"ଅଶ୍ୱିନୀ",
"ଭରଣୀ",
"କୃତ୍ତିକା",
"ରୋହିଣୀ",
"ମୃଗଶିରା",
"ଆର୍ଦ୍ରା",
"ପୁନର୍ବସୁ",
"ପୁଷ୍ୟ",
"ଆଶ୍ଲେଷା",
"ମଘା",
"ପୂର୍ବ ଫାଲ୍ଗୁନୀ",
"ଉତ୍ତର ଫାଲ୍ଗୁନୀ",
"ହସ୍ତ",
"ଚିତ୍ରା",
"ସ୍ୱାତୀ",
"ବିଶାଖା",
"ଅନୁରାଧା",
"ଜ୍ୟେଷ୍ଠା",
"ମୂଳ",
"ପୂର୍ବାଷାଢା",
"ଉତ୍ତରାଷାଢା",
"ଶ୍ରବଣ",
"ଧନିଷ୍ଠା",
"ଶତଭିଷା",
"ପୂର୍ବଭାଦ୍ର",
"ଉତ୍ତରଭାଦ୍ର",
"ରେବତୀ"
];

// =============================
// ମହାଦଶା ତାଲିକା
// =============================

const dashaList = [
"କେତୁ",
"ଶୁକ୍ର",
"ସୂର୍ଯ୍ୟ",
"ଚନ୍ଦ୍ର",
"ମଙ୍ଗଳ",
"ରାହୁ",
"ଗୁରୁ",
"ଶନି",
"ବୁଧ"
];

// =============================
// ଜ୍ୟୋତିଷ ଗଣନା
// =============================

function calculateAstro(){

document.getElementById("r_name").innerHTML = "ପରୀକ୍ଷା";
document.getElementById("r_rashi").innerHTML = "ମେଷ";
document.getElementById("r_nak").innerHTML = "ଅଶ୍ୱିନୀ";
document.getElementById("r_lagna").innerHTML = "ସିଂହ";
document.getElementById("r_maha").innerHTML = "ରାହୁ";
document.getElementById("r_antara").innerHTML = "ଶନି";

}


// Date Object

function calculateAstro(){

let name = document.getElementById("name").value;
let dob = document.getElementById("dob").value;
let tob = document.getElementById("tob").value;
let place = document.getElementById("place").value;

if(!name || !dob || !tob){
    alert("ସମସ୍ତ ତଥ୍ୟ ପୂରଣ କରନ୍ତୁ");
    return;
}

const birthDate = new Date(dob);

const month = birthDate.getMonth();
const day = birthDate.getDate();
const year = birthDate.getFullYear();

const rashi = rashiList[month % 12];
const nakshatra = nakshatraList[day % 27];
const lagna = rashiList[(month + day) % 12];
const mahaDasha = dashaList[year % 9];
const antaraDasha = dashaList[(month + day) % 9];

document.getElementById("r_name").innerText = name;
document.getElementById("r_rashi").innerText = rashi;
document.getElementById("r_nak").innerText = nakshatra;
document.getElementById("r_lagna").innerText = lagna;
document.getElementById("r_maha").innerText = mahaDasha;
document.getElementById("r_antara").innerText = antaraDasha;

window.currentResult = {
    name,
    dob,
    tob,
    place,
    rashi,
    nakshatra,
    lagna,
    mahaDasha,
    antaraDasha
};

showExtraDetails(rashi);

generateKundali();

}
// =============================
// Local Storage Save
// =============================

function saveData() {

let records =
JSON.parse(localStorage.getItem("astroRecords")) || [];

const exists =
records.some(
r =>
r.name === window.currentResult.name &&
r.dob === window.currentResult.dob
);

if(exists){
alert("ଏହି ତଥ୍ୟ ପୂର୍ବରୁ ସେଭ୍ ହୋଇଛି");
return;
}

if (!window.currentResult) {
alert("ପ୍ରଥମେ ଗଣନା କରନ୍ତୁ");
return;
}

records.push(window.currentResult);

localStorage.setItem(
"astroRecords",
JSON.stringify(records)
);

loadHistory();
}



// =============================
// History Load
// =============================

function loadHistory() {

let records =
JSON.parse(localStorage.getItem("astroRecords")) || [];

const historyDiv =
document.getElementById("historyList");

historyDiv.innerHTML = "";

if (records.length === 0) {

historyDiv.innerHTML =
"<p>କୌଣସି ସଂରକ୍ଷିତ ତଥ୍ୟ ନାହିଁ</p>";

return;

}

records.forEach((item, index) => {

historyDiv.innerHTML += `

<div class="history-item">

<p><b>ନାମ:</b> ${item.name}</p>

<p><b>ରାଶି:</b> ${item.rashi}</p>

<p><b>ନକ୍ଷତ୍ର:</b> ${item.nakshatra}</p>

<p><b>ଲଗ୍ନ:</b> ${item.lagna}</p>

<p><b>ମହାଦଶା:</b> ${item.mahaDasha}</p>

<p><b>ଅନ୍ତରଦଶା:</b> ${item.antaraDasha}</p>

<button onclick="viewRecord(${index})">
ଦେଖନ୍ତୁ
</button>

<button onclick="deleteRecord(${index})">
ଡିଲିଟ୍
</button>

</div>

`;

});

}

// =============================
// View Saved Record
// =============================

function viewRecord(index) {

let records =
JSON.parse(localStorage.getItem("astroRecords")) || [];

const item = records[index];
window.currentResult = item;
document.getElementById("r_name").innerText =
item.name;

document.getElementById("r_rashi").innerText =
item.rashi;

document.getElementById("r_nak").innerText =
item.nakshatra;

document.getElementById("r_lagna").innerText =
item.lagna;

document.getElementById("r_maha").innerText =
item.mahaDasha;

document.getElementById("r_antara").innerText =
item.antaraDasha;

window.scrollTo({
top: 0,
behavior: "smooth"
});

}

// =============================
// Delete Record
// =============================

function deleteRecord(index) {

if (!confirm("ଏହି ତଥ୍ୟକୁ ଡିଲିଟ୍ କରିବେ କି ?")) {
return;
}

let records =
JSON.parse(localStorage.getItem("astroRecords")) || [];

records.splice(index, 1);

localStorage.setItem(
"astroRecords",
JSON.stringify(records)
);

loadHistory();

}

// =============================
// Clear All Records
// =============================

function clearAllRecords() {

if (!confirm("ସମସ୍ତ ତଥ୍ୟ ଡିଲିଟ୍ କରିବେ କି ?")) {
return;
}

localStorage.removeItem("astroRecords");

loadHistory();

alert("ସମସ୍ତ ତଥ୍ୟ ଡିଲିଟ୍ ହୋଇଛି");

}

// =============================
// Auto Load History
// =============================

window.onload = function () {

loadHistory();

};
// =============================
// ପ୍ରିଣ୍ଟ ଫଙ୍କସନ୍
// =============================

function printResult() {

if (!window.currentResult) {

alert("ପ୍ରଥମେ ଗଣନା କରନ୍ତୁ");
return;

}

window.print();

}

// =============================
// PDF Download
// =============================

function downloadPDF() {

if (!window.currentResult) {

alert("ପ୍ରଥମେ ଗଣନା କରନ୍ତୁ");
return;

}

const resultArea =
document.getElementById("resultCard");

const printWindow =
window.open('', '', 'width=800,height=600');

printWindow.document.write(`
<html>
<head>
<title>ଜ୍ୟୋତିଷ ରିପୋର୍ଟ</title>

<style>

body{
font-family:sans-serif;
padding:20px;
}

h1{
text-align:center;
}

.row{
padding:10px;
border-bottom:1px solid #ccc;
}

</style>

</head>

<body>

<h1>ଜ୍ୟୋତିଷ ରିପୋର୍ଟ</h1>

${resultArea.innerHTML}

</body>

</html>
`);

printWindow.document.close();

printWindow.print();

}

// =============================
// WhatsApp Share
// =============================

function shareWhatsApp() {

if (!window.currentResult) {

alert("ପ୍ରଥମେ ଗଣନା କରନ୍ତୁ");
return;

}

const r = window.currentResult;

const message =

`🔯 ଜ୍ୟୋତିଷ ଫଳାଫଳ

ନାମ : ${r.name}

ରାଶି : ${r.rashi}

ନକ୍ଷତ୍ର : ${r.nakshatra}

ଲଗ୍ନ : ${r.lagna}

ମହାଦଶା : ${r.mahaDasha}

ଅନ୍ତରଦଶା : ${r.antaraDasha}

`;

window.open(
`https://wa.me/?text=${encodeURIComponent(message)}`,
'_blank'
);

}

// =============================
// JSON Backup Export
// =============================

function exportBackup() {

let records =
JSON.parse(
localStorage.getItem("astroRecords")
) || [];

const dataStr =
JSON.stringify(records, null, 2);

const blob =
new Blob(
[dataStr],
{ type: "application/json" }
);

const url =
URL.createObjectURL(blob);

const a =
document.createElement("a");

a.href = url;

a.download =
"Astrology_Backup.json";

a.click();

URL.revokeObjectURL(url);

}

// =============================
// JSON Backup Import
// =============================

function importBackup(event) {

const file =
event.target.files[0];

if (!file) return;

const reader =
new FileReader();

reader.onload = function(e) {

try {

const records =
JSON.parse(e.target.result);

localStorage.setItem(
"astroRecords",
JSON.stringify(records)
);

alert("Backup Restore ସଫଳ");

loadHistory();

}
catch {

alert("ଅବୈଧ JSON ଫାଇଲ୍");

}

};

reader.readAsText(file);

}
// ===================================
// ଭାଗ୍ୟ ସଂଖ୍ୟା
// ===================================

const luckyNumbers = {
"ମେଷ":"9",
"ବୃଷ":"6",
"ମିଥୁନ":"5",
"କର୍କଟ":"2",
"ସିଂହ":"1",
"କନ୍ୟା":"5",
"ତୁଳା":"6",
"ବିଛା":"9",
"ଧନୁ":"3",
"ମକର":"8",
"କୁମ୍ଭ":"4",
"ମୀନ":"7"
};

// ===================================
// ଭାଗ୍ୟ ରଙ୍ଗ
// ===================================

const luckyColors = {
"ମେଷ":"ଲାଲ",
"ବୃଷ":"ଧଳା",
"ମିଥୁନ":"ସବୁଜ",
"କର୍କଟ":"କ୍ରିମ",
"ସିଂହ":"ସୁନାଲି",
"କନ୍ୟା":"ସବୁଜ",
"ତୁଳା":"ଗୋଲାପୀ",
"ବିଛା":"ମେରୁନ",
"ଧନୁ":"ହଳଦିଆ",
"ମକର":"ନୀଳ",
"କୁମ୍ଭ":"ଆକାଶୀ",
"ମୀନ":"ସମୁଦ୍ର ନୀଳ"
};

// ===================================
// ଜନ୍ମ ରତ୍ନ
// ===================================

const gemstones = {
"ମେଷ":"ମୁଙ୍ଗା",
"ବୃଷ":"ହୀରା",
"ମିଥୁନ":"ପନ୍ନା",
"କର୍କଟ":"ମୋତି",
"ସିଂହ":"ମାଣିକ୍ୟ",
"କନ୍ୟା":"ପନ୍ନା",
"ତୁଳା":"ହୀରା",
"ବିଛା":"ମୁଙ୍ଗା",
"ଧନୁ":"ପୁଖରାଜ",
"ମକର":"ନୀଳମ",
"କୁମ୍ଭ":"ନୀଳମ",
"ମୀନ":"ପୁଖରାଜ"
};

// ===================================
// ରାଶିଫଳ
// ===================================

const rashiPhala = {
"ମେଷ":"ଆଜି ଆପଣଙ୍କ ପାଇଁ ଶୁଭ ଦିନ।",
"ବୃଷ":"ଆର୍ଥିକ ଲାଭର ସମ୍ଭାବନା ଅଛି।",
"ମିଥୁନ":"ନୂଆ ସୁଯୋଗ ମିଳିପାରେ।",
"କର୍କଟ":"ପରିବାରର ସହଯୋଗ ପାଇବେ।",
"ସିଂହ":"କାର୍ଯ୍ୟକ୍ଷେତ୍ରରେ ସଫଳତା।",
"କନ୍ୟା":"ସ୍ୱାସ୍ଥ୍ୟର ଯତ୍ନ ନିଅନ୍ତୁ।",
"ତୁଳା":"ନୂଆ ସମ୍ପର୍କ ଗଢ଼ିଉଠିବ।",
"ବିଛା":"ଧୈର୍ଯ୍ୟ ଧରନ୍ତୁ।",
"ଧନୁ":"ଯାତ୍ରା ଶୁଭ ରହିବ।",
"ମକର":"ପରିଶ୍ରମର ଫଳ ମିଳିବ।",
"କୁମ୍ଭ":"ନୂଆ ଯୋଜନା ସଫଳ ହେବ।",
"ମୀନ":"ମନ ପ୍ରସନ୍ନ ରହିବ।"
};

// ===================================
// ଅତିରିକ୍ତ ଫଳାଫଳ ଦେଖାନ୍ତୁ
// ===================================

function showExtraDetails(rashi){

const html = `

<div class="extra-box">

<h3>🔮 ଅତିରିକ୍ତ ସୂଚନା</h3>

<p><b>ଭାଗ୍ୟ ସଂଖ୍ୟା:</b>
${luckyNumbers[rashi]}</p>

<p><b>ଭାଗ୍ୟ ରଙ୍ଗ:</b>
${luckyColors[rashi]}</p>

<p><b>ଜନ୍ମ ରତ୍ନ:</b>
${gemstones[rashi]}</p>

<p><b>ରାଶିଫଳ:</b>
${rashiPhala[rashi]}</p>

</div>

`;

const resultCard =
document.getElementById("resultCard");

const old =
document.getElementById("extraDetails");

if(old){
old.remove();
}

const div =
document.createElement("div");

div.id = "extraDetails";

div.innerHTML = html;

resultCard.appendChild(div);

}

// ===================================
// Kundali Chart
// ===================================

function generateKundali(){

const chart = `
<div id="kundali">

<h3>🕉️ ଜନ୍ମ କୁଣ୍ଡଳୀ</h3>

<div class="diamond-chart">

<div class="house h1">୧<br>ଲଗ୍ନ</div>
<div class="house h2">୨<br>ସୂର୍ଯ୍ୟ</div>
<div class="house h3">୩<br>ବୁଧ</div>
<div class="house h4">୪<br>ଶୁକ୍ର</div>

<div class="house h5">୫<br>ମଙ୍ଗଳ</div>
<div class="house h6">୬<br>ଗୁରୁ</div>

<div class="house h7">୭<br>ଶନି</div>
<div class="house h8">୮<br>ରାହୁ</div>

<div class="house h9">୯<br>କେତୁ</div>
<div class="house h10">୧୦<br>ଚନ୍ଦ୍ର</div>

<div class="house h11">୧୧</div>
<div class="house h12">୧୨</div>

<div class="center-text">
କୁଣ୍ଡଳୀ
</div>

</div>

</div>
`;

const old = document.getElementById("kundali");

if(old){
old.remove();
}

document
.getElementById("resultCard")
.insertAdjacentHTML("beforeend", chart);

}




